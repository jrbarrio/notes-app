import { useState, useEffect } from "react";
import Note from "./components/Note";
import Notification from "./components/Notification";
import noteService from "./services/notes";
import loginService from "./services/login";

function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("")
  const [loading, setLoading] = useState(false)

  const [errorMessage, setErrorMessage] = useState(null)
  
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [user, setUser] = useState(null)

  useEffect(() => {
    setLoading(true)
    noteService.getAll().then(notes => {
      setNotes(notes)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser') 
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user);
      noteService.setToken(null);
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    noteService.setToken()
    window.localStorage.removeItem('loggedNoteAppUser') 
  }

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const noteToAddToState = {
      content: newNote,
      important: Math.random() < 0.5
    }

    const {token} = user

    noteService.create(noteToAddToState, {token})
    .then(note => {
      setNotes([...notes, note])
    })
    .catch(error => {
      setErrorMessage("La API ha petado")
    })

    setNewNote("")
  }

  const toggleImportanceOf = (id) => {

    console.log(id)

    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleLoginSubmit = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({username, password})
      
      console.log(user)
      
      setUser(user)

      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)

      setUsername("")
      setPassword("")
    } catch (error) {
      setErrorMessage("Wrong login")
      setTimeout(() => setErrorMessage(null), 2000)
    }    
  }

  const renderLoginForm = () => {
    return (
      <form onSubmit={handleLoginSubmit}>
        <input
          type="text"
          value={username}
          name='Username'
          placeholder='Username'
          onChange={ event => setUsername(event.target.value)}></input>
        <input
          type="password"
          value={password}
          name='Password'
          placeholder='Password'
          onChange={ event => setPassword(event.target.value)}></input>
        <button>Login</button>
      </form>
    )
  }

  const renderCreateNoteForm = () => {
    return (
      <>
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
        <button onClick={handleLogout}>Cerrar sesion</button>
      </div>
      </>
    )
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}></Notification>

      {user? renderCreateNoteForm(): renderLoginForm()}

      {
        loading && <p>Cargando...</p>
      }
      <ol>
          { notes
            .map((note) => {
            return <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
          })}          
      </ol>
      
    </div>
  );
}

export default App;
