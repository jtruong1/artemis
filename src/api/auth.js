import axios from './axios';

const auth = {
  login(email, password) {
    return axios.post('/auth/login', { email, password });
  },
  register(name, email, password) {
    return axios.post('/auth/register', { name, email, password });
  },
  profile() {
    return axios.get('/auth/profile');
  },
};

export default auth;
