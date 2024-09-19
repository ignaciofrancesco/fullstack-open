import CountryInfo from "./CountryInfo";

const Results = (props) => {
  const { searchValue, countries, onClick } = props;

  // Results JSX
  let results = null;
  if (searchValue === "") {
    results = <p>Use the search box to fin a country.</p>;
  } else if (countries.length > 10) {
    results = <p>Too many matches, specify another filter please.</p>;
  } else if (countries.length > 1) {
    results = (
      <ul>
        {countries.map((c) => {
          return (
            <li key={c.flag}>
              <span>{c.name.official}</span>
              <button onClick={onClick(c.flag)}>Show</button>
            </li>
          );
        })}
      </ul>
    );
  } else if (countries.length === 1) {
    results = <CountryInfo country={countries[0]} />;
  }

  return <>{results}</>;
};

export default Results;
