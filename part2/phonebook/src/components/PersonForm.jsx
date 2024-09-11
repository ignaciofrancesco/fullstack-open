const PersonForm = (props) => {
  const { onSubmit, nameValue, onChangeName, numberValue, onChangeNumber } =
    props;

  return (
    <form onSubmit={onSubmit}>
      <div>
        name:
        <input
          type="text"
          value={nameValue}
          placeholder="Name your contact..."
          onChange={onChangeName}
        />
      </div>
      <div>
        number:
        <input
          type="text"
          value={numberValue}
          placeholder="Type the number..."
          onChange={onChangeNumber}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
