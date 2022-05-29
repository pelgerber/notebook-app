import { useRouter } from "next/router";
import { useCallback } from "react";
import { CloseButton } from "react-bootstrap"
import Date from "./date"
import styles from "./note.module.css"


export default function Note({ note }) {
  const { id, date, title, text } = note;
  const router = useRouter();

  const deleteNote = useCallback(() => {
    console.log('Delete note id ' + id);
    fetch('/api/notes', {
      method: 'DELETE',
      body: JSON.stringify({
        id: id
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(r => r.json())
      .then(() => {
        router.push('/');
      });
  });

  return (
    <div
      className="max-w-[250px] rounded overflow-hidden shadow-lg mb-3"
      key={note.id}
    >
      <div className={styles.noteheader}>
        <CloseButton className={styles.closebtn} onClick={deleteNote} />
        <Date dateString={date.toString()} />
        <h3 className={styles.notetitle + " text-center px-3"}>{title}</h3>
      </div>
      <hr className={styles.divider} />
      <div className={styles.notebody}>
        <p className="text-newline text-justify px-3 text-gray-900">{text}</p>
      </div>
    </div>
  )
}