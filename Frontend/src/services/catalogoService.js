// src/services/catalogoService.js
import apiClient from './apiClient';
import axios from 'axios';

export const obtenerProductos = async () => {
  const response = await axios.get('http://localhost:8084/api/catalog/all');
  return response.data; // Array de ProductCatalog
};

export const obtenerProductoPorSku = async (sku) => {
  const response = await axios.get(`http://localhost:8084/api/catalog/${sku}`);
  return response.data;
};

export const crearProducto = async (producto) => {
  const response = await axios.post('http://localhost:8084/api/catalog/create', producto);
  return response.data;
};