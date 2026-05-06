// src/services/catalogoService.js
import apiClient from './apiClient';

// GET /api/catalog/all — no requiere JWT (ruta pública según el BFF)
export const obtenerProductos = async () => {
  const response = await apiClient.get('/api/catalog/all');
  return response.data; // Array de ProductCatalog
};

// GET /api/catalog/{sku}
export const obtenerProductoPorSku = async (sku) => {
  const response = await apiClient.get(`/api/catalog/${sku}`);
  return response.data;
};

// POST /api/catalog/create — solo Admin
export const crearProducto = async (producto) => {
  const response = await apiClient.post('/api/catalog/create', producto);
  return response.data;
};