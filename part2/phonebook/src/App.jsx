import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personsService from "./Service/persons";

const App = () => {
  /* State */
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [statusMessage, setStatusMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  /* Effects */
  useEffect(() => {
    personsService
      .getAll()
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
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

    const existentPerson = persons.find((person) => {
      return person.name.trim().toUpperCase() === newName.trim().toUpperCase();
    });

    if (existentPerson) {
      const wantsReplace = confirm(
        `${newName} already exists in your contacts. Do you want to replace the current number with the new number?`
      );

      if (!wantsReplace) {
        return;
      }

      const existentPersonCopy = { ...existentPerson, number: newNumber };

      // Update person in backend and set new state on success
      personsService
        .update(existentPersonCopy)
        .then((response) => {
          const existentPersonUpdated = response.data;

          const newPersons = persons.map((person) => {
            return person.id === existentPersonUpdated.id
              ? existentPersonUpdated
              : person;
          });

          setPersons(newPersons);
          setNewName("");
          setNewNumber("");
          setFilter("");
          setStatusMessage(`You edited ${existentPersonUpdated.name}`);
          setTimeout(() => {
            setStatusMessage(null);
          }, 3000);
        })
        .catch((error) => {
          setErrorMessage(error.message);
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        });

      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    // Save new person to backend
    personsService
      .create(newPerson)
      .then((response) => {
        const personCreated = response.data;
        const newPersons = [...persons, personCreated];
        setPersons(newPersons);
        setNewName("");
        setNewNumber("");
        setFilter("");
        setStatusMessage(`You added ${personCreated.name}`);
        setTimeout(() => {
          setStatusMessage(null);
        }, 3000);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      });
  };

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleDeletePerson = (id) => {
    personsService
      .deletePerson(id)
      .then((response) => {
        const newPersons = persons.filter((person) => {
          return person.id !== id;
        });
        setPersons(newPersons);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      });
  };

  /* Return */
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={statusMessage} notificationClass="success" />
      <Notification message={errorMessage} notificationClass="error" />
      <Filter value={filter} onChange={handleChangeFilter} />

      <h2>Add a new contact</h2>
      <PersonForm
        onSubmit={handleSubmit}
        nameValue={newName}
        onChangeName={handleChangeName}
        numberValue={newNumber}
        onChangeNumber={handleChangeNumber}
      />

      <h2>Numbers!</h2>
      <Persons
        filteredPersons={filteredPersons}
        onDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
