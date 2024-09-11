const Filter = (props) => {
  const { value, onChange } = props;

  return (
    <div>
      <label htmlFor="filter">Filter shown with: </label>
      <input
        id="filter"
        type="text"
        placeholder="Type filter..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Filter;
