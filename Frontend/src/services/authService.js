// src/services/authService.js
import apiClient from './apiClient';
import axios from 'axios';

/**
 * Llama al endpoint POST /api/auth/login del BFF.
 * Espera recibir { token, username, message } desde el backend.
 */
export const loginUser = async (username, password) => {
  const response = await axios.post('http://localhost:8083/api/auth/login', { username, password });
  return response.data; // { token, username, message }
};

/**
 * Llama al endpoint POST /api/auth/register.
 */
export const registerUser = async (username, password) => {
  const response = await axios.post('http://localhost:8083/api/auth/register', { username, password });
  return response.data;
};
