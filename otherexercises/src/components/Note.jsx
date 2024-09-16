const Note = ({ note, toggleImportance }) => {
  return (
    <li>
      {note.content}
      <button onClick={toggleImportance}>
        {note.important ? "make not important" : "make important"}
      </button>
    </li>
  );
};

export default Note;
