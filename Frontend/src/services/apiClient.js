// src/services/apiClient.js
import axios from 'axios';

// Creamos una "instancia" de Axios pre-configurada
const apiClient = axios.create({
  // Vite lee la variable de entorno que creamos en el paso 2
  baseURL: import.meta.env.VITE_API_GATEWAY_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;