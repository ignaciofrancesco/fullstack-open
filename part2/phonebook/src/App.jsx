import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import axios from "axios";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  /* State */
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  /* Effects */
  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
      console.log("promise fullfilled");
    });
  }, []);

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
