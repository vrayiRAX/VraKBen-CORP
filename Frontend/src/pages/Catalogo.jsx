// src/pages/Catalogo.jsx
import { useState, useEffect } from 'react';
import { obtenerProductos } from '../services/catalogoService';
import { agregarAlCarrito } from '../services/carritoService';
import { useAuth } from '../context/AuthContext';

function ProductSkeleton() {
  return (
    <div style={{
      background: 'var(--card-bg)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
    }}>
      <div className="skeleton" style={{ height: 200 }} />
      <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div className="skeleton" style={{ height: 20, width: '70%', borderRadius: 6 }} />
        <div className="skeleton" style={{ height: 14, width: '90%', borderRadius: 6 }} />
        <div className="skeleton" style={{ height: 14, width: '60%', borderRadius: 6 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
          <div className="skeleton" style={{ height: 28, width: '30%', borderRadius: 6 }} />
          <div className="skeleton" style={{ height: 36, width: '35%', borderRadius: 8 }} />
        </div>
      </div>
    </div>
  );
}

export default function Catalogo({ isDarkMode }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [agregado, setAgregado] = useState(null);
  const { user, isLoggedIn } = useAuth();

  useEffect(() => {
    const cargarDatos = async () => {
      setCargando(true);
      try {
        const data = await obtenerProductos();
        setProductos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error al cargar productos:', error);
        setProductos([]);
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, []);

  const handleAnadir = async (producto) => {
    if (!isLoggedIn) {
      alert('Debes iniciar sesión para añadir productos al carrito.');
      return;
    }
    try {
      await agregarAlCarrito({
        customerRut: user.name,
        productId: producto.id,
        quantity: 1,
        unitPrice: producto.price,
      });
      setAgregado(producto.id);
      setTimeout(() => setAgregado(null), 2000);
    } catch (error) {
      console.error('Error al añadir al carrito:', error);
      alert('Hubo un error al añadir al carrito.');
    }
  };

  const productosFiltrados = productos.filter(p =>
    p.name?.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.description?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div data-theme={isDarkMode ? 'dark' : 'light'} style={{
      backgroundColor: 'var(--bg)',
      minHeight: '100vh',
      fontFamily: 'var(--font)',
    }}>
      {/* ── HERO DEL CATÁLOGO ── */}
      <div style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
        padding: '60px 8% 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(255,255,255,0.05) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', maxWidth: 700 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.15)',
            borderRadius: 9999, padding: '5px 14px',
            fontSize: '0.78rem', fontWeight: 600, color: '#fff',
            letterSpacing: '0.5px', textTransform: 'uppercase',
            marginBottom: 16, border: '1px solid rgba(255,255,255,0.2)',
          }}>
            🔩 Repuestos certificados
          </div>
          <h1 style={{
            color: '#fff', margin: '0 0 12px',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 900, letterSpacing: '-1px',
          }}>
            Catálogo de Repuestos
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', margin: '0 0 32px' }}>
            Piezas originales y de alta calidad para tu vehículo. Envío a todo Chile.
          </p>

          {/* Buscador */}
          <div style={{ position: 'relative', maxWidth: 500 }}>
            <span style={{
              position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
              fontSize: 18, pointerEvents: 'none',
            }}>🔍</span>
            <input
              type="text"
              placeholder="Buscar repuesto por nombre o descripción..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '14px 16px 14px 48px',
                borderRadius: 12,
                border: 'none',
                fontSize: '0.95rem',
                background: 'rgba(255,255,255,0.95)',
                color: '#0F172A',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                outline: 'none',
                fontFamily: 'var(--font)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Ola decorativa */}
      <div style={{
        height: 40,
        background: 'var(--bg)',
        marginTop: -1,
        position: 'relative',
      }}>
        <svg viewBox="0 0 1440 40" style={{ position: 'absolute', bottom: 0, width: '100%', height: '100%' }} preserveAspectRatio="none">
          <path d="M0,40 L1440,40 L1440,10 Q1080,40 720,20 Q360,0 0,20 Z" fill="var(--bg)" />
        </svg>
      </div>

      {/* ── CONTENIDO PRINCIPAL ── */}
      <div style={{ padding: '40px 8% 80px' }}>

        {/* Barra de estado */}
        {!cargando && (
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: 32, flexWrap: 'wrap', gap: 12,
          }}>
            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>
              {busqueda
                ? `${productosFiltrados.length} resultado${productosFiltrados.length !== 1 ? 's' : ''} para "${busqueda}"`
                : `${productos.length} productos disponibles`}
            </p>
            {busqueda && (
              <button onClick={() => setBusqueda('')} style={{
                background: 'var(--accent-glow)', color: 'var(--accent)',
                border: '1px solid rgba(59,130,246,0.3)',
                borderRadius: 9999, padding: '4px 12px',
                fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
                fontFamily: 'var(--font)',
              }}>
                ✕ Limpiar
              </button>
            )}
          </div>
        )}

        {/* Skeletons de carga */}
        {cargando && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 28 }}>
            {Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)}
          </div>
        )}

        {/* Sin resultados */}
        {!cargando && productosFiltrados.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>{productos.length === 0 ? '🔌' : '🔍'}</div>
            <h3 style={{ color: 'var(--text-h)', marginBottom: 12 }}>
              {productos.length === 0 ? 'No hay productos disponibles' : 'Sin resultados'}
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>
              {productos.length === 0
                ? 'El servidor no está disponible o no hay productos cargados.'
                : `No encontramos repuestos que coincidan con "${busqueda}".`}
            </p>
            {busqueda && (
              <button onClick={() => setBusqueda('')} className="btn btn-primary" style={{ padding: '10px 24px' }}>
                Ver todos los productos
              </button>
            )}
          </div>
        )}

        {/* Grid de productos */}
        {!cargando && productosFiltrados.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 28,
          }}>
            {productosFiltrados.map((producto) => (
              <div key={producto.id} className="card" style={{
                display: 'flex', flexDirection: 'column',
                overflow: 'hidden',
                padding: 0,
              }}>
                {/* Imagen */}
                <div style={{
                  height: 200,
                  background: 'var(--bg-secondary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden',
                  position: 'relative',
                }}>
                  <img
                    src={producto.imageUrl || `https://via.placeholder.com/300x200/EFF6FF/1E3A5F?text=${encodeURIComponent(producto.name || 'Repuesto')}`}
                    alt={producto.name}
                    style={{
                      width: '100%', height: '100%',
                      objectFit: 'contain',
                      padding: 20,
                      boxSizing: 'border-box',
                      transition: 'transform 0.4s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  {/* Badge stock */}
                  <div style={{
                    position: 'absolute', top: 12, right: 12,
                    background: 'var(--success-bg)',
                    color: 'var(--success)',
                    border: '1px solid rgba(16,185,129,0.3)',
                    borderRadius: 9999,
                    padding: '3px 10px',
                    fontSize: '0.72rem', fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.3px',
                  }}>
                    ✓ En stock
                  </div>
                </div>

                {/* Contenido */}
                <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                  <h3 style={{
                    color: 'var(--text-h)', margin: 0,
                    fontSize: '1rem', fontWeight: 700, lineHeight: 1.3,
                  }}>
                    {producto.name}
                  </h3>
                  <p style={{
                    color: 'var(--text-muted)', margin: 0,
                    fontSize: '0.85rem', lineHeight: 1.6,
                    flex: 1,
                  }}>
                    {producto.description || 'Repuesto de alta calidad para tu vehículo.'}
                  </p>

                  {/* Precio + Botón */}
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', marginTop: 16,
                    paddingTop: 16,
                    borderTop: '1px solid var(--border)',
                  }}>
                    <div>
                      <span style={{
                        color: 'var(--primary-light)',
                        fontWeight: 800,
                        fontSize: '1.3rem',
                        letterSpacing: '-0.5px',
                      }}>
                        ${producto.price?.toLocaleString('es-CL')}
                      </span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginLeft: 4 }}>CLP</span>
                    </div>
                    <button
                      onClick={() => handleAnadir(producto)}
                      className="btn btn-primary"
                      style={{
                        padding: '9px 16px',
                        fontSize: '0.82rem',
                        background: agregado === producto.id ? 'var(--success)' : 'var(--primary-light)',
                        transition: 'all 0.3s',
                      }}
                    >
                      {agregado === producto.id ? '✓ Añadido' : '🛒 Añadir'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}