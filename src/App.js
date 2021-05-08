import { useState, useEffect } from "react";
import Note from "./components/Note";
import { create as createNote, getAll as getAllNotes} from "./services/notes";

function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    setLoading(true)
    getAllNotes().then(notes => {
      setNotes(notes)
      setLoading(false)
    })
  }, [])

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const noteToAddToState = {
      title: newNote,
      body: newNote,
      userId: 1
    }

    createNote(noteToAddToState)
    .then(note => {
      setNotes([...notes, note])
    })
    .catch(error => {
      setError(error)
    })

    setNewNote("")
  }

  return (
    <div>
      <h1>Notes</h1>

      {
        loading && <p>Cargando...</p>
      }

      <ol>
          { notes
            .map((note) => {
            return <Note key={note.id} { ...note }></Note>;
          })}          
      </ol>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={newNote}></input>
          <button>Crear nota</button>
      </form>

      { error && <span style={{color: "red"}}>La API ha petado</span>}
    </div>
  );
}

export default App;
