import AXIOS from '../../config/api';

export const getAllProducts = token => AXIOS.get('/products', { headers: { Authorization: `Bearer ${token}` } });

export const createProduct = ({ token, data }) => AXIOS.post('/products', data, { headers: { Authorization: `Bearer ${token}` } });

export const getProduct = ({ token, id }) => AXIOS.get(`/products/${id}`, { headers: { Authorization: `Bearer ${token}` } });

export const editProduct = ({ token, id, data }) => AXIOS.put(`/products/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });

export const deleteProduct = ({ token, id }) => AXIOS.delete(`/products/${id}`, { headers: { Authorization: `Bearer ${token}` } });

