import { useEffect, useState } from "react";
import Search from "./components/Search";
import Results from "./components/Results";
import countriesService from "./service/countries";
import weatherService from "./service/weather";

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

  // If countries are not fetched yet, render loading
  if (countries === null) {
    return <div>Loading...</div>;
  }

  /* COMPUTED VALUES */

  // Filtered countries
  const countriesCopy = JSON.parse(JSON.stringify(countries));
  const filteredCountries = countriesCopy.filter((c) => {
    const officialName = c.name.official.trim().toUpperCase();

    return officialName.includes(searchValue.trim().toUpperCase());
  });

  /* EVENT HANDLERS */

  const handleChangeSearch = (event) => {
    const newSearchValue = event.target.value;
    setSearchValue(newSearchValue);
  };

  const handleClickShow = (flag) => {
    const selectedCountry = filteredCountries.find((c) => {
      return c.flag === flag;
    });

    return () => {
      setSearchValue(selectedCountry.name.official);
    };
  };

  return (
    <div>
      <Search value={searchValue} onChange={handleChangeSearch} />
      <Results
        searchValue={searchValue}
        countries={filteredCountries}
        onClick={handleClickShow}
      />
    </div>
  );
};

export default App;
