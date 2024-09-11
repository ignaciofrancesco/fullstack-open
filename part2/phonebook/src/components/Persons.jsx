const Persons = (props) => {
  const { filteredPersons } = props;

  return (
    <div>
      <ul>
        {filteredPersons.map((person) => {
          return <PersonDetails key={person.id} person={person} />;
        })}
      </ul>
    </div>
  );
};

export default Persons;

const PersonDetails = (props) => {
  const { person } = props;

  return (
    <li>
      {person.name} {person.number}
    </li>
  );
};
