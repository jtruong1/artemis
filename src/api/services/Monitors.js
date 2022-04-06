import axios from '../axios';

const getAllMonitors = () => {
  return axios.get('/monitors');
};

const addMonitor = (data) => {
  return axios.post('/monitors', data);
};

export { getAllMonitors, addMonitor };
