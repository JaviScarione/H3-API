import axios from "./axios.js";

export const getClientsRequest = () => axios.get('/clients'); 

export const getClientRequest = (id) => axios.get(`/clients/${id}`); 

export const createClientRequest = (client) => axios.post('/clients', client); 

export const updateClientRequest = (client) => axios.put(`/clients/${client._id}`, client); 

export const deleteClientRequest = (id) => axios.delete(`/${id}`);

