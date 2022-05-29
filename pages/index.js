import { Row, Col, Container } from 'react-bootstrap'
import prisma from '../lib/prisma'
import Note from '../components/note'
import Layout from '../components/layout'
import { Fab } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import RestrictRender from '../components/restrict-render'
import Link from 'next/link'
import { splitArray } from '../lib/utils'

const fabStyle = {
  position: {
    bottom: 0,
    right: 0,
  },
  mainButtonStyles: {
    backgroundColor: '#362ad4',
  },
  alwaysShowTitle: true,
}

export default function Home({ notes }) {

  return (
    <Layout>
      <RestrictRender client>
        <Container>
          {splitArray(notes, 3).map((row, i) => (
            <Row key={i}>
              {row.map((col, i) => (
                <Col key={i}>
                  <Note note={col} key={col.id} />
                </Col>
              ))}
            </Row>
          ))}
        </Container>
        <Link href="/add-note">
          <Fab
            mainButtonStyles={fabStyle.mainButtonStyles}
            style={fabStyle.position}
            icon="+"
            alwaysShowTitle={fabStyle.alwaysShowTitle}
          />
        </Link>
      </RestrictRender>
    </Layout>
  )
}


// Get static props from database
export async function getStaticProps(context) {
  const data = await prisma.notes.findMany({});

  const notes = data.map((note) => ({
    ...note,
    date: JSON.parse(JSON.stringify(new Date(note.date))),
  })).sort(
    ({ date: a }, { date: b }) => {
      if (a < b) {
        return 1;
      } else if (a > b) {
        return -1;
      } else {
        return 0;
      }
    }
  );

  return {
    props: { notes },
  }
} 