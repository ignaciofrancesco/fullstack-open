import { useState, useEffect } from "react";
import notesService from "./Service/notes.js";
import Note from "./components/Note";
import Notification from "./components/Notification.jsx";
import Footer from "./components/Footer.jsx";

const App = (props) => {
  const [notes, setNotes] = useState(null);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    notesService.getAll().then((allNotes) => {
      setNotes(allNotes);
    });
  }, []);

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

  const handleChangeNewNote = (event) => {
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

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
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
      <form onSubmit={addNote}>
        <input
          type="text"
          value={newNote}
          placeholder="Type your note..."
          onChange={handleChangeNewNote}
        />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;

/*
import { useState } from "react";

 const Display = ({ counter }) => {
  return <div>{counter}</div>;
};

const Button = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

const History = ({ allClicks }) => {
  return allClicks.length === 0 ? (
    <p>To start, press the buttons.</p>
  ) : (
    <p>History: {allClicks.join(" ")}</p>
  );
};

/// MAIN COMPONENT

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAllClicks] = useState([]);
  debugger;
  const handleClickLeft = () => {
    setLeft(left + 1);
    setAllClicks(allClicks.concat("L"));
  };
  const handleClickRight = () => {
    setRight(right + 1);
    setAllClicks(allClicks.concat("R"));
  };

  return (
    <>
      {left}
      <Button label="Left" onClick={handleClickLeft} />
      <Button label="Right" onClick={handleClickRight} />
      {right}
      <History allClicks={allClicks} />
    </>
  );
};

export default App;
 */
