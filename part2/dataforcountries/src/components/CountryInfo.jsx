const CountryInfo = (props) => {
  const { country } = props;

  return (
    <div>
      <h2>{country.name.common}</h2>
      <h3>Capitals:</h3>
      <ul>
        {country.capital.map((cap) => {
          return <li key={cap}>{cap}</li>;
        })}
      </ul>
      <h3>Area:</h3>
      <p>{country.area}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.keys(country.languages).map((langKey) => {
          return <li key={langKey}>{country.languages[langKey]}</li>;
        })}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} width="100" />
    </div>
  );
};
export default CountryInfo;
