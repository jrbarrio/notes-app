import { useRef, useState } from "react"
import Togglable from "./togglable/Togglable"

export default function NoteForm(props) {

    const [newNote, setNewNote] = useState("")
    const togglableRef = useRef()
      
    const handleChange = (event) => {
        setNewNote(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const noteToAddToState = {
          content: newNote,
          important: Math.random() < 0.5
        }
    
        props.addNote(noteToAddToState);
    
        setNewNote("")
        togglableRef.current.toggleVisibility()
      }

    return (
        <Togglable ref={togglableRef} buttonLabel="Show">
            <h3>Create a new note</h3>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    onChange={handleChange} 
                    value={newNote}
                    placeholder="Write your note..."
                ></input>
                    <button>Crear nota</button>
            </form>
            <div>
                <button onClick={props.handleLogout}>Cerrar sesion</button>
            </div>
        </Togglable>
    )
}