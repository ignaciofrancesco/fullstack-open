import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  /* State */
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  // const [filteredPersons, setFilteredPersons] = useState(persons);

  /* Computed Values */
  let filteredPersons = null;
  if (filter != "") {
    filteredPersons = persons.filter((person) => {
      return person.name
        .trim()
        .toUpperCase()
        .includes(filter.trim().toUpperCase());
    });
  } else {
    filteredPersons = [...persons];
  }

  /* Event Handlers */
  const handleChangeFilter = (event) => {
    const newFilter = event.target.value;
    setFilter(newFilter);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const personExists = persons.some((person) => {
      return person.name.trim().toUpperCase() === newName.trim().toUpperCase();
    });

    if (personExists) {
      window.alert(`${newName} already exists in your contacts.`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    const newPersons = [...persons, newPerson];

    setPersons(newPersons);
    setNewName("");
    setNewNumber("");
    setFilter("");
  };

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  /* Return */
  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={filter} onChange={handleChangeFilter} />

      <h2>Add a new contact</h2>
      <PersonForm
        onSubmit={handleSubmit}
        nameValue={newName}
        onChangeName={handleChangeName}
        numberValue={newNumber}
        onChangeNumber={handleChangeNumber}
      />

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
