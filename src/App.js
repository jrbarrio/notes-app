import { useState } from "react";
import Note from "./components/Note";


function App(props) {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState("")

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleClick = (event) => {
    const noteToAddToState = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      import: Math.random()
    }

    setNotes([...notes, noteToAddToState])
    setNewNote("")
  }

  if (typeof notes === "undefined" || notes.length === 0) {
    return "No tenemos notas que mostrar"
  }  

  return (
    <div>
      <h1>Notes</h1>
      <ol>
          { notes.map((note) => {
            return <Note key={note.id} { ...note }></Note>;
          })}          
      </ol>
      <div>
        <input type="text" onChange={handleChange} value={newNote}></input>
          <button onClick={handleClick}>Crear nota</button>
      </div>
    </div>
  );
}

export default App;
