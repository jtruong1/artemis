import axios from '../axios';

const getAllMonitors = () => {
  return axios.get('/monitors');
};

const getMonitor = (id) => {
  return axios.get(`/monitors/${id}`);
};

export { getAllMonitors, getMonitor };
