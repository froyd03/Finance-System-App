import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import {router} from 'expo-router'
//https://fundra-go-api.onrender.com
//http://192.168.1.2:5000
const API = axios.create({baseURL: 'http://192.168.1.2:5000'});

API.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      const message = error.response.data.message;

      if (message === "No token") {
        alert("Session expired. Please log in again.");
      } else if (message === "Invalid token") {
        alert("Invalid session. Please log in again.");
      } 
      
      await SecureStore.deleteItemAsync('token');
      router.replace('/')
    }
    return Promise.reject(error);
  }
)

export const authAPI = {
    login: (data) => API.post('/user/login', data),//
    register: (data) => API.post('/user/register', data),//
}

export const transactionsAPI = {
    createTransaction: (data) => API.post('/transactions', data),//  
    getTransactions: () => API.get(`/transactions`),//
    getTransactionByCategory: (category) => API.get(`/transactions/getTransactionByCategory/?category=${category}`)//
}

export const templatesAPI = {
    createTemplate: (data) => API.post('/templates', data),//
    getTemplates: () => API.get(`/templates`),//
    updateTemplate: (data) => API.put(`/templates`, data),//
    getUserTemplateCategory: () => API.get('/templates/user-template'),//
    getCategoriesByTemplateId: (templateId) => API.get(`/templates/categories/?templateId=${templateId}`),//
    setAsActiveTemplate: (templatetId) =>API.patch(`/templates/set-active/?templateId=${templatetId}`),
    setDeactivateTemplate: (templatetId) =>API.patch(`/templates/set-deactivate/?templateId=${templatetId}`)
}

export const usersAPI = {
    getBalance: () => API.get(`/user/user-balance`),
    getUserInfo: () => API.get('/user/user-info')
}