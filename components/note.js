import Date from "./date"

export default function Note({ note }) {
  const { date, title, text } = note

  return (
    <div
      className="max-w-[250px] rounded overflow-hidden shadow-lg mb-3"
      key={note.id}
    >
      <div className="px-6 py-4">
        <Date dateString={date.toString()}/>
        <h3 className="text-center px-3">{title}</h3>
        <p className="text-newline text-justify px-3 text-gray-900">{text}</p>
      </div>
    </div>
  )
}