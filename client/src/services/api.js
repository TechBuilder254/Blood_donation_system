import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000',
});

export const fetchDonors = () => API.get('/donors');
export const requestBlood = (data) => API.post('/request', data);
