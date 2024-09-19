import { useEffect, useState } from "react";
import Search from "./components/Search";
import Results from "./components/Results";
import countriesService from "./service/countries";

const App = (props) => {
  /* STATES */
  const [searchValue, setSearchValue] = useState("");
  const [countries, setCountries] = useState(null);

  /* EFFECTS */

  useEffect(() => {
    countriesService.getAll().then((allCountries) => {
      setCountries(allCountries);
    });
  }, []);

  // If countries are not fetched yet, render null
  if (countries === null) {
    return null;
  }

  /* COMPUTED VALUES */

  // Filtered countries
  const countriesCopy = JSON.parse(JSON.stringify(countries));
  const filteredCountries = countriesCopy.filter((c) => {
    const commonName = c.name.common.trim().toUpperCase();
    return commonName.includes(searchValue.trim().toUpperCase());
  });

  /* EVENT HANDLERS */

  const handleChangeSearch = (event) => {
    const newSearchValue = event.target.value;
    setSearchValue(newSearchValue);
  };

  return (
    <div>
      <Search value={searchValue} onChange={handleChangeSearch} />
      <Results countries={filteredCountries} />
    </div>
  );
};

export default App;
