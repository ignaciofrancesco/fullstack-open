const Search = (props) => {
  const { value, onChange } = props;

  return (
    <div>
      <span>Find countries: </span>
      <input
        type="text"
        placeholder="Type country name..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
