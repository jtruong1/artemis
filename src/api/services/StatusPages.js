import axios from '../axios';

const getAllStatusPages = () => {
  return axios.get('/status-pages');
};

const getSingleStatusPage = (id) => {
  return axios.get(`/status-pages/${id}`);
};

const createStatusPage = (data) => {
  return axios.post('/status-pages', data);
};

const updateStatusPage = (id, data) => {
  return axios.put(`/status-pages/${id}`, data);
};

const deleteStatusPage = (id) => {
  return axios.delete(`/status-pages/${id}`);
};

export {
  getAllStatusPages,
  getSingleStatusPage,
  createStatusPage,
  updateStatusPage,
  deleteStatusPage,
};
