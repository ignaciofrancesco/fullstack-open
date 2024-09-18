import personsService from "../Service/persons";

const Persons = (props) => {
  const { filteredPersons, onDeletePerson } = props;

  return (
    <div>
      <ul>
        {filteredPersons.map((person) => {
          return (
            <li key={person.id}>
              <PersonDetails person={person} />
              <button
                onClick={() => {
                  if (confirm(`Do you really want to delete ${person.name}?`)) {
                    onDeletePerson(person.id);
                  }
                }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Persons;

const PersonDetails = (props) => {
  const { person } = props;

  return (
    <span>
      {person.name} {person.number}
    </span>
  );
};
