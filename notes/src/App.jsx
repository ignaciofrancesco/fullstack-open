import { useState, useEffect } from "react";
import loginService from "./services/login.js";
import notesService from "./services/notes.js";
import Note from "./components/Note";
import Notification from "./components/Notification.jsx";
import Footer from "./components/Footer.jsx";
const App = (props) => {
  const [notes, setNotes] = useState(null);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

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

  if (!notes) {
    return null;
  }

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => {
        return note.important;
      });

  const addNote = (event) => {
    event.preventDefault();

    const newNoteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    };

    notesService.create(newNoteObject).then((createdNote) => {
      const newNotesArray = notes.concat(createdNote);
      setNotes(newNotesArray);
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input value={newNote} onChange={handleNoteChange} />
      <button type="submit">save</button>
    </form>
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
      )}{" "}
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
