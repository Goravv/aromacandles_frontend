import axios from 'axios';

const API = axios.create({
  baseURL: 'https://aromacandles-backend.onrender.com',
});

export default API;
