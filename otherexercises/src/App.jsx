import { useState } from "react";
import Note from "./components/Note";

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => {
        return note.important;
      });

  const addNote = (event) => {
    event.preventDefault();

    const newNoteObject = {
      id: notes.length + 1,
      content: newNote,
      important: Math.random() > 0.5,
    };

    const newNotesArray = notes.concat(newNoteObject);

    setNotes(newNotesArray);
    setNewNote("");
  };

  const handleChangeNewNote = (event) => {
    setNewNote(event.target.value);
  };

  return (
    <div>
      <h1>Notes</h1>
      <button
        onClick={(event) => {
          setShowAll(!showAll);
        }}
      >
        show {showAll ? "important" : "all"}
      </button>
      <ul>
        {notesToShow.map((note) => {
          return <Note key={note.id} note={note} />; // When creating a li component inside a ul componente, i can just pass the key in the ul list.
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
