// src/pages/Carrito.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { obtenerCarrito } from '../services/carritoService';
import { obtenerProductos } from '../services/catalogoService';

function CartItemSkeleton() {
  return (
    <div style={{ display: 'flex', gap: 20, padding: '20px 24px', borderBottom: '1px solid var(--border)', alignItems: 'center' }}>
      <div className="skeleton" style={{ width: 70, height: 70, borderRadius: 10, flexShrink: 0 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div className="skeleton" style={{ height: 18, width: '55%', borderRadius: 6 }} />
        <div className="skeleton" style={{ height: 14, width: '35%', borderRadius: 6 }} />
      </div>
      <div className="skeleton" style={{ width: 80, height: 24, borderRadius: 6 }} />
    </div>
  );
}

export default function Carrito({ isDarkMode }) {
  const { user, isLoggedIn } = useAuth();
  const [carrito, setCarrito] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      if (!isLoggedIn) { setCargando(false); return; }
      setCargando(true);
      try {
        const [cartData, catalogData] = await Promise.all([
          obtenerCarrito(user.name),
          obtenerProductos(),
        ]);
        setProductos(Array.isArray(catalogData) ? catalogData : []);
        setCarrito(Array.isArray(cartData) ? cartData : []);
      } catch (error) {
        console.error('Error al cargar el carrito:', error);
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, [isLoggedIn, user]);

  const carritoConDetalles = carrito.map(item => {
    const prod = productos.find(p => p.id === item.productId);
    return {
      ...item,
      nombre: prod ? prod.name : `Producto #${item.productId}`,
      descripcion: prod ? prod.description : 'Sin descripción',
      imageUrl: prod?.imageUrl,
    };
  });

  const total = carritoConDetalles.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
  const totalItems = carritoConDetalles.reduce((s, i) => s + i.quantity, 0);

  if (!isLoggedIn) {
    return (
      <div data-theme={isDarkMode ? 'dark' : 'light'} style={{ minHeight: '80vh', backgroundColor: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <div style={{ textAlign: 'center', maxWidth: 400 }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>🔒</div>
          <h2 style={{ color: 'var(--text-h)', marginBottom: 12 }}>Acceso restringido</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 28 }}>Debes iniciar sesión para ver tu carrito.</p>
          <Link to="/login" className="btn btn-primary" style={{ padding: '12px 28px' }}>Iniciar sesión</Link>
        </div>
      </div>
    );
  }

  return (
    <div data-theme={isDarkMode ? 'dark' : 'light'} style={{ backgroundColor: 'var(--bg)', minHeight: '100vh', fontFamily: 'var(--font)', padding: '48px 8%' }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <h1 style={{ color: 'var(--text-h)', margin: 0, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800 }}>
            Tu Carrito
          </h1>
          {!cargando && carritoConDetalles.length > 0 && (
            <span style={{
              background: 'var(--accent-glow)', color: 'var(--accent)',
              border: '1px solid rgba(59,130,246,0.3)',
              borderRadius: 9999, padding: '3px 12px',
              fontSize: '0.82rem', fontWeight: 700,
            }}>
              {totalItems} {totalItems === 1 ? 'artículo' : 'artículos'}
            </span>
          )}
        </div>
        <p style={{ color: 'var(--text-muted)', margin: 0 }}>Revisa y confirma los repuestos seleccionados</p>
      </div>

      {cargando ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 28, alignItems: 'start' }}>
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            {Array.from({ length: 3 }).map((_, i) => <CartItemSkeleton key={i} />)}
          </div>
          <div className="skeleton" style={{ height: 260, borderRadius: 'var(--radius-lg)' }} />
        </div>
      ) : carritoConDetalles.length === 0 ? (
        /* Carrito vacío */
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <div style={{ fontSize: 72, marginBottom: 20 }}>🛒</div>
          <h3 style={{ color: 'var(--text-h)', marginBottom: 12, fontSize: '1.4rem' }}>Tu carrito está vacío</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: 32, maxWidth: 400, margin: '0 auto 32px' }}>
            ¡Explora nuestro catálogo y encuentra los repuestos que necesitas!
          </p>
          <Link to="/tienda" className="btn btn-primary" style={{ padding: '13px 28px', fontSize: '0.95rem' }}>
            Ver Catálogo →
          </Link>
        </div>
      ) : (
        /* Layout 2 columnas */
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 28, alignItems: 'start' }}>

          {/* Lista de items */}
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
            {carritoConDetalles.map((item, index) => (
              <div key={item.id || index} style={{
                display: 'flex', alignItems: 'center', gap: 20,
                padding: '20px 24px',
                borderBottom: index < carritoConDetalles.length - 1 ? '1px solid var(--border)' : 'none',
                transition: 'var(--transition)',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {/* Miniatura */}
                <div style={{
                  width: 72, height: 72, flexShrink: 0,
                  background: 'var(--bg-secondary)',
                  borderRadius: 10, overflow: 'hidden',
                  border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <img
                    src={item.imageUrl || `https://via.placeholder.com/72x72/EFF6FF/1E3A5F?text=🔩`}
                    alt={item.nombre}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 6 }}
                    onError={e => { e.target.style.display = 'none'; e.target.parentElement.textContent = '🔩'; }}
                  />
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ color: 'var(--text-h)', margin: '0 0 4px', fontSize: '0.98rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.nombre}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.83rem' }}>
                    {item.descripcion?.slice(0, 60)}{item.descripcion?.length > 60 ? '...' : ''}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                    <span style={{
                      background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                      borderRadius: 6, padding: '2px 10px',
                      fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500,
                    }}>
                      Cant: {item.quantity}
                    </span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                      × ${item.unitPrice?.toLocaleString('es-CL')} c/u
                    </span>
                  </div>
                </div>

                {/* Precio */}
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <span style={{ color: 'var(--primary-light)', fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.5px' }}>
                    ${(item.unitPrice * item.quantity).toLocaleString('es-CL')}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen del pedido */}
          <div style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '28px',
            boxShadow: 'var(--shadow-md)',
            position: 'sticky',
            top: 100,
          }}>
            {/* Acento superior */}
            <div style={{ height: 3, background: 'linear-gradient(90deg, var(--primary-light), var(--accent))', borderRadius: '3px 3px 0 0', margin: '-28px -28px 24px', borderRadius: '12px 12px 0 0' }} />

            <h3 style={{ color: 'var(--text-h)', margin: '0 0 20px', fontSize: '1.1rem', fontWeight: 700 }}>
              Resumen del pedido
            </h3>

            {/* Líneas de detalle */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Subtotal ({totalItems} items)</span>
                <span style={{ color: 'var(--text-h)', fontWeight: 600, fontSize: '0.9rem' }}>${total.toLocaleString('es-CL')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Envío</span>
                <span style={{ color: 'var(--success)', fontWeight: 600, fontSize: '0.9rem' }}>Gratis</span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-h)', fontWeight: 700, fontSize: '1rem' }}>Total</span>
                <span style={{ color: 'var(--primary-light)', fontWeight: 900, fontSize: '1.5rem', letterSpacing: '-0.5px' }}>
                  ${total.toLocaleString('es-CL')}
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: '4px 0 0', textAlign: 'right' }}>CLP · IVA incluido</p>
            </div>

            <Link to="/pago" className="btn btn-primary" style={{ display: 'block', width: '100%', padding: '14px', fontSize: '0.95rem', fontWeight: 700, textAlign: 'center', boxSizing: 'border-box' }}>
              💳 Proceder al Pago
            </Link>

            <Link to="/tienda" style={{
              display: 'block', textAlign: 'center', marginTop: 14,
              color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500,
              transition: 'var(--transition)',
            }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--primary-light)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              ← Seguir comprando
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}