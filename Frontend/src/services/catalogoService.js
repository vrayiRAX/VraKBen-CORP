// src/services/catalogoService.js
import apiClient from './apiClient';

export const obtenerProductos = async () => {
  try {
    const response = await apiClient.get('/api/catalog'); 
    return response.data;
  } catch (error) {
    console.error("Error al obtener los productos del backend:", error);
    return []; 
  }
};