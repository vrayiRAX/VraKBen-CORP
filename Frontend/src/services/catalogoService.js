// src/services/catalogoService.js
import apiClient from './apiClient';

export const obtenerProductos = async () => {
  const response = await apiClient.get('/api/catalog/all');
  return response.data;
};

export const obtenerProductoPorSku = async (sku) => {
  const response = await apiClient.get(`/api/catalog/${sku}`);
  return response.data;
};

export const crearProducto = async (producto) => {
  const response = await apiClient.post('/api/catalog/create', producto);
  return response.data;
};