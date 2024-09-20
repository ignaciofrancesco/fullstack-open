const { log } = require("console");
const express = require("express");

const app = express();
app.use(express.json());

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!!!</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const noteId = request.params.id;
  const note = notes.find((n) => {
    return n.id === noteId;
  });

  if (note) {
    response.json(note);
  } else {
    response.statusMessage = `The note ${noteId} cannot be found.`;
    response.status(404).end();
  }
});

app.delete("/api/notes/:id", (request, response) => {
  const noteId = request.params.id;
  notes = notes.filter((n) => {
    return n.id !== noteId;
  });
  response.status(204).end();
});

const generateId = () => {
  if (notes.length === 0) {
    return 1;
  }

  return (
    Math.max(
      ...notes.map((n) => {
        return Number(n.id);
      })
    ) + 1
  );
};

app.post("/api/notes", (request, response) => {
  console.log(notes);

  // validate that content property exists
  const note = request.body;
  if (!note.content) {
    return response
      .status(400)
      .json({ error: "Property 'content' is missing." });
  }

  // generate new id
  const newId = generateId();

  // create new note
  const newNote = {
    content: note.content,
    important: Boolean(note.important) || false,
    id: newId,
  };

  // save new note to notes
  notes = notes.concat(newNote);

  // produce response with new note
  response.json(newNote);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
