import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000', // adjust if needed
});

export default API;
