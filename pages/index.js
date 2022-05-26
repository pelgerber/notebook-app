import styles from '../styles/Home.module.css'
import { Form, Button } from 'react-bootstrap'
import React from 'react'
import prisma from '../lib/prisma'
import Note from '../components/note'
import Layout from '../components/layout'
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import RestrictRender from '../components/restrict-render'
import Link from 'next/link'

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

  /* const onNewItem = React.useCallback(
     newItem => {
       setItems([...items, newItem]);
     },
     [items],
   );  */

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
          //onNewItem(item);
          setSubmitting(false);
          setLoading(true);
          resetStates();
        });

      //console.log('Title:\n' + noteTitle)
      //console.log('Text:\n' + noteText)
    } else {
      console.log('Title is empty!!') // TODO: Replace with pop-up
    }

  }

  function NotesLoader() {
    if (loading) {
      return (<h1>Loading...</h1>);
    } else {
      return (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-items-center  gap-4">
          {items.map((item) => (
            <Note note={item} key={item.id} />
          ))}
        </div>);
    }
  }

  return (
    <Layout>
      {/*       <Form className={styles.form}>
        <Form.Group className={"mb-3 " + styles.titlefield}>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter title" onChange={evt => setNoteTitle(evt.target.value)} value={noteTitle} />
          <Form.Text className="text-muted">
            The title of your note.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Text</Form.Label>
          <Form.Control as="textarea" className={styles.notetext} type="text" placeholder="Note text" onChange={evt => setNoteText(evt.target.value)} value={noteText} />
        </Form.Group>
        <Button className='mb-5' onClick={submitForm}>
          Submit
        </Button>
      </Form> */}
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