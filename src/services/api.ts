import axios from 'axios';

const apiURL = 'https://pokeapi.co/api/v2/';

const api = axios.create({
  baseURL: apiURL
})

export default api;
