import styles from '../styles/Add-Note.module.css'
import { Form, Button } from 'react-bootstrap'
import React from 'react'
import Layout from '../components/layout'
import { useRouter } from 'next/router'


export default function AddNote() {
  const [noteText, setNoteText] = React.useState('');
  const [noteTitle, setNoteTitle] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const router = useRouter();


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
        .then(() => {
          setSubmitting(false);
          resetStates();
          router.push('/');
        });

    } else {
      console.log('Title is empty!!') // TODO: Replace with pop-up
    }

  }


  return (
    <Layout>
      {submitting ? (
        <h1>Loading...</h1>) : (
        <Form className={styles.form}>
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
        </Form>)}
    </Layout>
  )
}