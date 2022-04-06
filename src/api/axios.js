import axios from 'axios';
import { loadProgressBar } from 'axios-progress-bar';

const http = axios.create({
  withCredentials: true,
});

loadProgressBar(null, http);

export default http;
