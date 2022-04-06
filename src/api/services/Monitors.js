import axios from '../axios';

const getAllMonitors = () => {
  return axios.get('/monitors');
};

const getSingleMonitor = (id) => {
  return axios.get(`/monitors/${id}`);
};

const createMonitor = (data) => {
  return axios.post('/monitors', data);
};

const updateMonitor = (id, data) => {
  return axios.put(`/monitors/${id}`, data);
};

const deleteMonitor = (id) => {
  return axios.delete(`/monitors/${id}`);
};

export {
  getAllMonitors,
  getSingleMonitor,
  createMonitor,
  updateMonitor,
  deleteMonitor,
};
