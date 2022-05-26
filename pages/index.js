import { Row, Col, Container } from 'react-bootstrap'
import React from 'react'
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
    backgroundColor: '#e74c3c',
  },
  alwaysShowTitle: true,
}

export default function Home({ notes }) {
  const [noteText, setNoteText] = React.useState('');
  const [noteTitle, setNoteTitle] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState(null);

  React.useEffect(() => {

    if (!submitting) {
      const response = fetch('/api/notes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(r => r.json()).then(data => {
        setItems(data.data.sort(
          ({ date: a }, { date: b }) => {
            if (a < b) {
              return 1;
            } else if (a > b) {
              return -1;
            } else {
              return 0;
            }
          }
        ));
        setLoading(false);
      });
    }

  }, [submitting]);


  function resetStates() {
    setNoteText('');
    setNoteTitle('');
  }

  async function submitForm() {
    if (noteTitle) {
      setSubmitting(true);
      fetch('/api/notes', {
        method: 'POST',
        body: JSON.stringify({
          title: noteTitle,
          text: noteText
        }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(r => r.json())
        .then(item => {
          setSubmitting(false);
          setLoading(true);
          resetStates();
        });

    } else {
      console.log('Title is empty!!') // TODO: Replace with pop-up
    }

  }

  function NotesLoader() {
    if (loading) {
      return (<h1>Loading...</h1>);
    } else {
      return (
        <Container>
          {splitArray(items, 3).map((row, i) => (
            <Row key={i}>
              {row.map((col, i) => (
                <Col key={i}>
                  <Note note={col} key={col.id} />
                </Col>
              ))}
            </Row>
          ))}
        </Container>);
    }
  }

  return (
    <Layout>
      <NotesLoader />
      <RestrictRender client>
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


// If you need to get static props from database
export async function getStaticProps(context) {
  const data = await prisma.notes.findMany({});

  const notes = data.map((note) => ({
    ...note,
    date: JSON.parse(JSON.stringify(new Date(note.date))),
  }))

  return {
    props: { notes },
  }
} 