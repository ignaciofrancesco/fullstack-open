import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request;
};

const create = (person) => {
  const request = axios.post(baseUrl, person);
  return request;
};

const update = (person) => {
  const request = axios.put(`${baseUrl}/${person.id}`, person);
  return request;
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request;
};

export default { getAll, create, update, deletePerson };
