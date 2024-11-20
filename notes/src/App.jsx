import { useState, useEffect, useRef } from "react";
import loginService from "./services/login.js";
import notesService from "./services/notes.js";
import Note from "./components/Note";
import Notification from "./components/Notification.jsx";
import Footer from "./components/Footer.jsx";
import LoginForm from "./components/LoginForm.jsx";
import Togglable from "./components/Togglable.jsx";
import NoteForm from "./components/NoteForm.jsx";

const App = (props) => {
  /* STATE */

  const [notes, setNotes] = useState(null);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  /* REFS */

  // This is a reference that im going to use to reference the NoteForm component
  const noteFormRef = useRef();

  /* EFFECTS */

  // Get all notes
  useEffect(() => {
    notesService.getAll().then((allNotes) => {
      setNotes(allNotes);
    });
  }, []);

  // Check if there s a logged in user in local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      notesService.setToken(user.token);
    }
  }, []); // the empty array means to only run after the first render

  /* BEHAVIOR */

  // If there are no notes, dont show anything
  if (!notes) {
    return null;
  }

  // Filters the notes to show
  const notesToShow = showAll
    ? notes
    : notes.filter((note) => {
      return note.important;
    });

  // Handler for updating the importance of a note
  const toggleImportanceOf = (id) => {
    const note = notes.find((note) => {
      return note.id === id;
    });

    const changedNote = { ...note, important: !note.important };

    // Update the note in the server
    notesService
      .update(id, changedNote)
      .then((updatedNote) => {
        // Update the state of the notes
        const newNotesArray = notes.map((note) => {
          return note.id === id ? updatedNote : note;
        });
        setNotes(newNotesArray);
      })
      .catch((error) => {
        // alert(`The note ${id} doesn't exist anymore in the DB.`);

        setErrorMessage(`The note ${id} doesn't exist anymore in the DB.`);

        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);

        const newNotesArray = notes.filter((note) => {
          return note.id !== id;
        });
        setNotes(newNotesArray);
      });
  };

  // Handles login
  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);

    try {
      const user = await loginService.login({
        username,
        password,
      });

      // Save token in local storage
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));

      // Sets the token to the private variable of the notesService
      notesService.setToken(user.token);

      // Set new states
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  // Handles submit new note
  const addNote = (noteObject) => {
    // I use the ref to the NoteForm to access its toggleVisibility function
    noteFormRef.current.toggleVisibility();
    notesService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
    });
  };

  /* VIEW */

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    );
  };

  const noteForm = () => (
    <Togglable buttonLabel="new note" ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  );

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          {noteForm()}
        </div>
      )}
      <br></br>
      <button
        onClick={(event) => {
          setShowAll(!showAll);
        }}
      >
        show {showAll ? "important" : "all"}
      </button>
      <ul>
        {notesToShow.map((note) => {
          return (
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => {
                toggleImportanceOf(note.id);
              }}
            />
          ); // When creating a li component inside a ul componente, i can just pass the key in the ul list.
        })}
      </ul>
      <Footer />
    </div>
  );
};

export default App;
