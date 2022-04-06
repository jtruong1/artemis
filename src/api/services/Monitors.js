import axios from '../axios';

const getMonitors = () => {
  return axios.get('/monitors');
};

const getMonitor = (id) => {
  return axios.get(`/monitors/${id}`);
};

const addMonitor = (data) => {
  return axios.post('/monitors', data);
};

const updateMonitor = (id, data) => {
  return axios.put(`/monitors/${id}`, data);
};

const deleteMonitor = (id) => {
  return axios.delete(`/monitors/${id}`);
};

export { getMonitors, getMonitor, addMonitor, updateMonitor, deleteMonitor };
