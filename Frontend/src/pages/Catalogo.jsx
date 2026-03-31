// src/pages/Catalogo.jsx
import { useState, useEffect } from 'react';
import { obtenerProductos } from '../services/catalogoService';

export default function Catalogo({ isDarkMode }) {
  // --- ESTADOS ---
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // --- COLORES DEL TEMA ---
  const theme = {
    background: isDarkMode ? '#121212' : '#ffffff',
    textMain: isDarkMode ? '#f8f9fa' : '#111111',
    textSecondary: isDarkMode ? '#adb5bd' : '#666666',
    cardBg: isDarkMode ? '#2b2b2b' : '#f8f9fa',
    cardBorder: isDarkMode ? 'none' : '1px solid #eaeaea',
  };

  // --- EFECTO: CARGAR DATOS AL ENTRAR A LA PÁGINA ---
useEffect(() => {
    const cargarDatos = async () => {
      setCargando(true);
      try {
        const data = await obtenerProductos();
        
        // EL CHALECO ANTIBALAS: Si "data" no es un arreglo válido, forzamos a que sea un arreglo vacío []
        if (Array.isArray(data)) {
          setProductos(data);
        } else {
          console.warn("El backend no devolvió una lista válida. Devolvió:", data);
          setProductos([]); 
        }
      } catch (error) {
        console.error("Error al procesar la data:", error);
        setProductos([]);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  return (
    <div style={{ padding: '40px 10%', backgroundColor: theme.background, minHeight: '80vh' }}>
      <h1 style={{ color: theme.textMain, marginBottom: '10px', fontSize: '2.5rem' }}>Catálogo de Repuestos</h1>
      <p style={{ color: theme.textSecondary, marginBottom: '40px', fontSize: '1.1rem' }}>
        Encuentra piezas originales y alternativas de alta calidad.
      </p>

      {/* ESTADO DE CARGA */}
      {cargando ? (
        <h3 style={{ color: theme.textMain }}>Cargando repuestos desde el servidor... ⚙️</h3>
      ) : productos.length === 0 ? (
        <h3 style={{ color: '#e63946' }}>No se encontraron productos o el backend está apagado.</h3>
      ) : (
        /* GRILLA DE PRODUCTOS */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
          {productos.map((producto) => (
            <div key={producto.id} style={{ 
              backgroundColor: theme.cardBg, 
              border: theme.cardBorder, 
              borderRadius: '8px', 
              padding: '20px', 
              display: 'flex', 
              flexDirection: 'column',
              boxShadow: isDarkMode ? '0 4px 10px rgba(0,0,0,0.5)' : '0 4px 15px rgba(0,0,0,0.05)'
            }}>
              {/* Imagen del producto (usamos placeholder si no viene URL del backend) */}
              <div style={{ width: '100%', height: '200px', backgroundColor: '#fff', borderRadius: '4px', marginBottom: '15px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img 
                  src={producto.imagen || "https://via.placeholder.com/200?text=Repuesto"} 
                  alt={producto.nombre} 
                  style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
                />
              </div>
              
              <h3 style={{ color: theme.textMain, margin: '0 0 10px 0', fontSize: '1.2rem' }}>{producto.nombre}</h3>
              <p style={{ color: theme.textSecondary, fontSize: '0.9rem', flexGrow: 1 }}>{producto.descripcion}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                <span style={{ color: '#e63946', fontWeight: 'bold', fontSize: '1.3rem' }}>
                  ${producto.precio?.toLocaleString('es-CL')}
                </span>
                <button style={{ 
                  backgroundColor: '#111', 
                  color: 'white', 
                  border: 'none', 
                  padding: '8px 15px', 
                  borderRadius: '4px', 
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}>
                  Añadir 🛒
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}