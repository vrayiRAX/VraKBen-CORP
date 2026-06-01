// src/pages/Pago.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Pago({ isDarkMode }) {
  const navigate = useNavigate();
  const [metodo, setMetodo] = useState('tarjeta');
  const [procesando, setProcesando] = useState(false);
  const [datosPago, setDatosPago] = useState({
    nombre: '',
    numero: '',
    exp: '',
    cvv: ''
  });

  const handlePagar = (e) => {
    e.preventDefault();
    setProcesando(true);
    setTimeout(() => {
      setProcesando(false);
      alert('¡Pago simulado con éxito! Gracias por tu compra en VrakBen.');
      navigate('/');
    }, 2000);
  };

  return (
    <div data-theme={isDarkMode ? 'dark' : 'light'} style={{
      backgroundColor: 'var(--bg)',
      minHeight: '100vh',
      fontFamily: 'var(--font)',
      color: 'var(--text)',
      transition: 'var(--transition)'
    }}>
      
      {/* ── HERO DE PAGO ── */}
      <div style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
        padding: '60px 8% 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.06) 0%, transparent 60%)',
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
            🔒 Pago 100% Seguro
          </div>
          <h1 style={{
            color: '#fff', margin: '0 0 12px',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 900, letterSpacing: '-1px',
          }}>
            Finalizar Compra
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', margin: 0 }}>
            Estás a un paso de completar tu pedido. Selecciona tu método de pago y completa la transacción.
          </p>
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

      {/* ── SECCIÓN CENTRAL DE PAGO ── */}
      <div style={{ padding: '20px 8% 80px', display: 'flex', flexDirection: 'column', gap: 32 }}>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 32,
          alignItems: 'start'
        }}>
          
          {/* Columna Izquierda: Formulario de Pago */}
          <div className="card" style={{ padding: '36px' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '1.25rem', color: 'var(--text-h)' }}>
              Método de Pago
            </h3>
            
            {/* Opciones de Métodos */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 28, flexWrap: 'wrap' }}>
              <button 
                type="button"
                onClick={() => setMetodo('tarjeta')}
                style={{
                  flex: '1 1 140px',
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: metodo === 'tarjeta' ? '2px solid var(--primary-light)' : '1px solid var(--border)',
                  background: metodo === 'tarjeta' ? 'var(--bg-secondary)' : 'var(--card-bg)',
                  color: 'var(--text-h)',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>💳</span>
                <span>Tarjeta de Crédito/Débito</span>
              </button>
              
              <button 
                type="button"
                onClick={() => setMetodo('webpay')}
                style={{
                  flex: '1 1 140px',
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: metodo === 'webpay' ? '2px solid var(--primary-light)' : '1px solid var(--border)',
                  background: metodo === 'webpay' ? 'var(--bg-secondary)' : 'var(--card-bg)',
                  color: 'var(--text-h)',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>🚀</span>
                <span>Webpay Plus</span>
              </button>
            </div>

            {/* Contenido según Método */}
            {metodo === 'tarjeta' ? (
              <form onSubmit={handlePagar} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', marginBottom: 6, fontWeight: '600', color: 'var(--text-h)', fontSize: '0.85rem' }}>
                    Nombre del Titular
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="Ej. Juan Pérez"
                    value={datosPago.nombre}
                    onChange={e => setDatosPago({...datosPago, nombre: e.target.value})}
                    style={{
                      width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border)', backgroundColor: 'var(--bg)',
                      color: 'var(--text)', outline: 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: 6, fontWeight: '600', color: 'var(--text-h)', fontSize: '0.85rem' }}>
                    Número de Tarjeta
                  </label>
                  <input 
                    type="text" 
                    required
                    maxLength="19"
                    placeholder="4500 1234 5678 9012"
                    value={datosPago.numero}
                    onChange={e => setDatosPago({...datosPago, numero: e.target.value})}
                    style={{
                      width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border)', backgroundColor: 'var(--bg)',
                      color: 'var(--text)', outline: 'none'
                    }}
                  />
                </div>
                <div style={{ display: 'flex', gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: 6, fontWeight: '600', color: 'var(--text-h)', fontSize: '0.85rem' }}>
                      Vencimiento
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="MM/AA"
                      maxLength="5"
                      value={datosPago.exp}
                      onChange={e => setDatosPago({...datosPago, exp: e.target.value})}
                      style={{
                        width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border)', backgroundColor: 'var(--bg)',
                        color: 'var(--text)', outline: 'none'
                      }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: 6, fontWeight: '600', color: 'var(--text-h)', fontSize: '0.85rem' }}>
                      CVV / Código
                    </label>
                    <input 
                      type="password" 
                      required
                      placeholder="123"
                      maxLength="4"
                      value={datosPago.cvv}
                      onChange={e => setDatosPago({...datosPago, cvv: e.target.value})}
                      style={{
                        width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border)', backgroundColor: 'var(--bg)',
                        color: 'var(--text)', outline: 'none'
                      }}
                    />
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  disabled={procesando}
                  className="btn btn-primary"
                  style={{
                    padding: '14px', width: '100%', marginTop: 12,
                    fontSize: '1rem', fontWeight: '700'
                  }}
                >
                  {procesando ? 'Procesando Pago Seguro...' : 'Confirmar y Pagar'}
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <p style={{ color: 'var(--text)', marginBottom: 20 }}>
                  Serás redirigido al portal oficial de Transbank para realizar la transacción bancaria de manera segura.
                </p>
                <button 
                  onClick={handlePagar}
                  disabled={procesando}
                  className="btn btn-primary"
                  style={{
                    padding: '14px 28px', fontSize: '1rem', fontWeight: '700'
                  }}
                >
                  {procesando ? 'Redireccionando...' : 'Ir a Webpay Plus'}
                </button>
              </div>
            )}
          </div>

          {/* Columna Derecha: Sellos de Confianza e Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="card" style={{ padding: '30px' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '1.15rem', color: 'var(--text-h)' }}>
                🔒 Transacción Encriptada
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '0 0 20px 0', lineHeight: 1.6 }}>
                Toda la información ingresada está encriptada mediante protocolo SSL y cumple con los estándares internacionales PCI-DSS. No almacenamos tus datos bancarios.
              </p>
              
              {/* Badges de Confianza */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <span style={{
                  padding: '6px 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                  borderRadius: 6, fontSize: '0.75rem', fontWeight: '600', color: 'var(--primary-light)'
                }}>
                  🛡️ SSL Secure 256-bit
                </span>
                <span style={{
                  padding: '6px 12px', background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                  borderRadius: 6, fontSize: '0.75rem', fontWeight: '600', color: 'var(--primary-light)'
                }}>
                  ✅ PCI-DSS Compliant
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
