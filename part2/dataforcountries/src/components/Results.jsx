import CountryInfo from "./CountryInfo";

const Results = (props) => {
  const { countries } = props;

  // Results JSX
  let results = null;
  if (countries.length > 10) {
    results = <p>Too many matches, specify another filter please.</p>;
  } else if (countries.length > 1) {
    results = (
      <ul>
        {countries.map((c) => {
          return <li key={c.flag}>{c.name.common}</li>;
        })}
      </ul>
    );
  } else if (countries.length === 1) {
    results = <CountryInfo country={countries[0]} />;
  }

  return <>{results}</>;
};

export default Results;
