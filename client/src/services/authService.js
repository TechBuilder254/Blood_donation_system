import axios from 'axios';

const API = 'http://localhost:5000/api/auth';

export const signup = (user) => axios.post(`${API}/register`, user);
export const login = (user) => axios.post(`${API}/login`, user);
