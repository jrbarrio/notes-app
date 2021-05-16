import { useState, useEffect } from "react";
import Note from "./components/note/Note";
import Notification from "./components/Notification";
import noteService from "./services/notes";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import NoteForm from "./components/NoteForm";

function App() {
  const [notes, setNotes] = useState([])
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

  const addNote = (note) => {
    const {token} = user

    noteService.create(note, {token})
    .then(note => {
      setNotes([...notes, note])
    })
    .catch(error => {
      setErrorMessage("La API ha petado")
    })
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

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}></Notification>

      {
        user ? 
        <NoteForm
          addNote={addNote}
          handleLogout={handleLogout}
        ></NoteForm> :
        <LoginForm 
          username={username} 
          password={password} 
          handleUsernameChange={ event => setUsername(event.target.value) }
          handlePasswordChange={ event => setPassword(event.target.value) }
          handleSubmit={handleLoginSubmit}
        ></LoginForm>
      }

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
