import axios from 'axios';

const URL = process.env.REACT_APP_BASE_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const AXIOS = axios.create({
  baseURL: URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'X-Api-Key': apiKey,
  },
});

export default AXIOS;
