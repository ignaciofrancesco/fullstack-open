import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);

  const handleChangeFilter = (event) => {
    const newFilter = event.target.value;
    setFilter(newFilter);

    // Filter the persons array: include only those that include the filter string
    const newFilteredPersons = persons.filter((person) => {
      return person.name
        .trim()
        .toUpperCase()
        .includes(newFilter.trim().toUpperCase());
    });

    setFilteredPersons(newFilteredPersons);
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

    const newPerson = { name: newName, number: newNumber };
    const newPersons = [...persons, newPerson];

    setPersons(newPersons);
    setNewName("");
    setNewNumber("");
    setFilteredPersons(newPersons);
    setFilter("");
  };

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <div>filter: {filter}</div>
      <h1>Phonebook</h1>
      <div>
        <label htmlFor="filter">Filter shown with: </label>
        <input
          id="filter"
          type="text"
          placeholder="Type filter..."
          value={filter}
          onChange={handleChangeFilter}
        />
      </div>
      <h2>Add a new contact</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:
          <input
            type="text"
            value={newName}
            placeholder="Name your contact..."
            onChange={handleChangeName}
          />
        </div>
        <div>
          number:
          <input
            type="text"
            value={newNumber}
            placeholder="Type the number..."
            onChange={handleChangeNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person, index) => {
          return (
            <li key={index}>
              {person.name} {person.number}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
