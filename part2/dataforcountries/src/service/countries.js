import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = () => {
  const request = axios.get(`${baseUrl}/all`);

  // Returns a promise, with the return value inside.
  return request.then((response) => {
    const countries = response.data;
    return countries;
  });
};

export default { getAll };
