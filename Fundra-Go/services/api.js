import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API = axios.create({baseURL: 'http://192.168.1.2:5000'});

API.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('token');
    console.log('Token retrieved for request:', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const authAPI = {
    login: (data) => API.post('/user/login', data),
    register: (data) => API.post('/user/register', data),
}

export const transactionsAPI = {
    createTransaction: (data) => API.post('/transactions', data),
    getTransactions: () => API.get(`/transactions`),
    getTemplateCategories: (userId) => API.get(`/transactions/getUserTemplateCategories/?userId=${userId}`),
}

export const templatesAPI = {
    createTemplate: (data) => API.post('/templates/create', data),
    getTemplates: (userId) => API.get(`/templates/?userId=${userId}`),
}