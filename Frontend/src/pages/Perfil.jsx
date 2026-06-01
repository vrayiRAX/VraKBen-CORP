// src/pages/Perfil.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Perfil({ isDarkMode }) {
  const { user } = useAuth();
  
  // Estados para datos del usuario
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.sub || '',
  });
  const [isEditing, setIsEditing] = useState(false);
  
  // Estado para foto de perfil simulada con localStorage
  const [profilePic, setProfilePic] = useState(null);

  // Autos del usuario (cargados dinámicamente)
  const [autos, setAutos] = useState([]);

  useEffect(() => {
    if (!user?.sub) return;

    // Cargar foto guardada
    const savedPic = localStorage.getItem(`profile_pic_${user.sub}`);
    setProfilePic(savedPic || null);

    // Cargar datos guardados
    const savedDataStr = localStorage.getItem(`profile_data_${user.sub}`);
    if (savedDataStr) {
      try {
        const savedData = JSON.parse(savedDataStr);
        setProfileData({
          name: savedData.name || user?.name || '',
          email: savedData.email || user?.sub || '',
        });
      } catch (e) {
        console.error("Error al parsear datos de perfil", e);
      }
    } else {
      setProfileData({
        name: user?.name || '',
        email: user?.sub || '',
      });
    }

    // Cargar autos específicos del usuario (Simulado)
    const savedAutosStr = localStorage.getItem(`profile_autos_${user.sub}`);
    if (savedAutosStr) {
      setAutos(JSON.parse(savedAutosStr));
    } else {
      // Data de relleno inicial solo para dar el ejemplo, luego se vaciaría o se traería de DB
      if (user.sub === 'vicente.placet@gmail.com') {
        const adminCars = [{ id: 1, marca: 'Audi', modelo: 'A4', anio: 2021, patente: 'XXYY88' }];
        setAutos(adminCars);
        localStorage.setItem(`profile_autos_${user.sub}`, JSON.stringify(adminCars));
      } else {
        setAutos([]); // Los demás usuarios inician sin autos en este simulacro
      }
    }
  }, [user]);

  const handlePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        localStorage.setItem(`profile_pic_${user?.sub}`, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (user?.sub) {
      localStorage.setItem(`profile_data_${user.sub}`, JSON.stringify(profileData));
    }
    setIsEditing(false);
    alert('Datos guardados correctamente en el navegador.');
  };

  // Función para formatear patente chilena (AAAA-11 o AA-1111)
  const formatPatente = (patente) => {
    const clean = patente.replace(/[^A-Z0-9]/gi, '').toUpperCase();
    if (clean.length === 6) {
      // Formato viejo AA-1111 o nuevo AAAA-11
      const isNewFormat = /^[A-Z]{4}[0-9]{2}$/.test(clean);
      if (isNewFormat) {
        return `${clean.substring(0, 4)}·${clean.substring(4, 6)}`;
      } else {
        return `${clean.substring(0, 2)}·${clean.substring(2, 6)}`;
      }
    }
    return patente;
  };

  // Configuración de badges según rol
  const getRolBadgeStyles = (rol) => {
    const r = rol?.toUpperCase();
    if (r === 'ADMIN') {
      return {
        background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
        color: '#FFFFFF',
        label: '🔑 Administrador'
      };
    } else if (r === 'MECANICO' || r === 'TECNICO') {
      return {
        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
        color: '#FFFFFF',
        label: '🔧 Técnico Mecánico'
      };
    }
    return {
      background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
      color: '#FFFFFF',
      label: '👤 Cliente'
    };
  };

  const rolInfo = getRolBadgeStyles(user?.roles?.[0]);

  return (
    <div data-theme={isDarkMode ? 'dark' : 'light'} style={{
      backgroundColor: 'var(--bg)',
      minHeight: '100vh',
      fontFamily: 'var(--font)',
      color: 'var(--text)',
      transition: 'var(--transition)'
    }}>
      
      {/* ── HERO DE PERFIL ── */}
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
            🔐 Área de Cliente Segura
          </div>
          <h1 style={{
            color: '#fff', margin: '0 0 12px',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 900, letterSpacing: '-1px',
          }}>
            Mi Perfil
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', margin: 0 }}>
            Administra tu información de cuenta, gestiona tus vehículos registrados y consulta tus agendas.
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

      {/* ── SECCIÓN CENTRAL DE PERFIL ── */}
      <div style={{ padding: '20px 8% 80px', display: 'flex', flexDirection: 'column', gap: 32 }}>
        
        {/* Contenedor Grid Principal */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 32,
          alignItems: 'start'
        }}>
          
          {/* Columna Izquierda: Tarjeta de Perfil */}
          <div className="card" style={{
            padding: '40px 30px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}>
            {/* Foto de Perfil */}
            <div style={{
              position: 'relative',
              width: 140,
              height: 140,
              marginBottom: 24,
              borderRadius: '50%',
              boxShadow: 'var(--shadow-lg)',
              border: '4px solid var(--card-bg)',
              outline: '3px solid var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'visible'
            }}>
              {profilePic ? (
                <img 
                  src={profilePic} 
                  alt="Perfil" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    borderRadius: '50%', 
                    objectFit: 'cover'
                  }} 
                />
              ) : (
                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  borderRadius: '50%', 
                  background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '3.5rem', 
                  color: '#fff' 
                }}>
                  👤
                </div>
              )}
              
              {/* Botón de Subida */}
              <label style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                background: 'var(--accent)',
                color: 'white',
                width: 36,
                height: 36,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                border: '3px solid var(--card-bg)',
                boxShadow: 'var(--shadow-md)',
                transition: 'var(--transition)'
              }}
              title="Cambiar Foto de Perfil"
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                📸
                <input type="file" accept="image/*" onChange={handlePicUpload} style={{ display: 'none' }} />
              </label>
            </div>

            {/* Nombre y Rol */}
            <h2 style={{ fontSize: '1.4rem', color: 'var(--text-h)', margin: '0 0 8px 0' }}>
              {profileData.name || 'Usuario VrakBen'}
            </h2>
            <p style={{ margin: '0 0 24px 0', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              {profileData.email}
            </p>
            
            {/* Badge de Rol */}
            <div style={{
              display: 'inline-flex',
              padding: '6px 18px',
              borderRadius: '9999px',
              background: rolInfo.background,
              color: rolInfo.color,
              fontWeight: '700',
              fontSize: '0.8rem',
              letterSpacing: '0.5px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              textTransform: 'uppercase'
            }}>
              {rolInfo.label}
            </div>
          </div>

          {/* Columna Derecha: Formulario de Datos */}
          <div className="card" style={{ padding: '36px', flex: 2 }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 28,
              borderBottom: '1px solid var(--border)',
              paddingBottom: 16
            }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-h)' }}>
                Mis Datos Personales
              </h3>
              <button 
                onClick={() => setIsEditing(!isEditing)} 
                className="btn"
                style={{ 
                  padding: '8px 16px', 
                  fontSize: '0.82rem',
                  backgroundColor: isEditing ? 'var(--danger-bg)' : 'var(--accent-glow)', 
                  color: isEditing ? 'var(--danger)' : 'var(--accent)', 
                  border: `1px solid ${isEditing ? 'rgba(239, 68, 68, 0.2)' : 'rgba(59, 130, 246, 0.2)'}`,
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer', 
                  fontWeight: '700',
                  transition: 'var(--transition)'
                }}
              >
                {isEditing ? '✕ Cancelar' : '✏️ Editar Datos'}
              </button>
            </div>
            
            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: '600', color: 'var(--text-h)', fontSize: '0.88rem' }}>
                  Nombre Completo
                </label>
                <input 
                  type="text" 
                  value={profileData.name} 
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})} 
                  disabled={!isEditing}
                  style={{ 
                    width: '100%', 
                    padding: '12px 16px', 
                    borderRadius: 'var(--radius-sm)', 
                    border: '1px solid var(--border)', 
                    backgroundColor: isEditing ? 'var(--bg)' : 'var(--bg-secondary)', 
                    color: 'var(--text)',
                    fontSize: '0.95rem',
                    transition: 'var(--transition)',
                    outline: 'none',
                    opacity: isEditing ? 1 : 0.85
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: '600', color: 'var(--text-h)', fontSize: '0.88rem' }}>
                  Correo Electrónico (Username)
                </label>
                <input 
                  type="email" 
                  value={profileData.email} 
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})} 
                  disabled={!isEditing}
                  style={{ 
                    width: '100%', 
                    padding: '12px 16px', 
                    borderRadius: 'var(--radius-sm)', 
                    border: '1px solid var(--border)', 
                    backgroundColor: isEditing ? 'var(--bg)' : 'var(--bg-secondary)', 
                    color: 'var(--text)',
                    fontSize: '0.95rem',
                    transition: 'var(--transition)',
                    outline: 'none',
                    opacity: isEditing ? 1 : 0.85
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
                />
              </div>
              
              {isEditing && (
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  style={{ 
                    padding: '12px 24px', 
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    alignSelf: 'flex-start',
                    marginTop: 10,
                    boxShadow: 'var(--shadow-blue)'
                  }}
                >
                  💾 Guardar Cambios
                </button>
              )}
            </form>
          </div>

        </div>

        {/* ── SECCIÓN DE VEHÍCULOS REGISTRADOS ── */}
        <div className="card" style={{ padding: '36px', marginTop: 8 }}>
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ margin: '0 0 6px 0', fontSize: '1.3rem', color: 'var(--text-h)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span>🚗</span> Mis Vehículos Registrados
            </h3>
            <div style={{ width: 60, height: 4, background: 'linear-gradient(90deg, var(--primary-light), var(--accent))', borderRadius: 4, marginTop: 10 }} />
          </div>

          <div style={{ overflowX: 'auto', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 500 }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}>
                  <th style={{ padding: '16px 20px', color: 'var(--text-h)', fontWeight: '700', fontSize: '0.88rem' }}>Patente</th>
                  <th style={{ padding: '16px 20px', color: 'var(--text-h)', fontWeight: '700', fontSize: '0.88rem' }}>Marca</th>
                  <th style={{ padding: '16px 20px', color: 'var(--text-h)', fontWeight: '700', fontSize: '0.88rem' }}>Modelo</th>
                  <th style={{ padding: '16px 20px', color: 'var(--text-h)', fontWeight: '700', fontSize: '0.88rem' }}>Año</th>
                </tr>
              </thead>
              <tbody>
                {autos.length > 0 ? (
                  autos.map((auto, idx) => (
                    <tr key={auto.id || idx} style={{ 
                      borderBottom: idx === autos.length - 1 ? 'none' : '1px solid var(--border)',
                      backgroundColor: 'var(--card-bg)',
                      transition: 'var(--transition)'
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--card-bg)'}
                    >
                      <td style={{ padding: '16px 20px' }}>
                        {/* Patente Chilena Estilizada */}
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#FFFFFF',
                          border: '2px solid #000000',
                          borderRadius: '6px',
                          color: '#000000',
                          fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
                          fontWeight: '800',
                          padding: '3px 12px',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                          fontSize: '0.9rem',
                          letterSpacing: '1px',
                          textTransform: 'uppercase',
                          position: 'relative',
                          userSelect: 'none'
                        }}>
                          {/* Mini barra superior azul para dar estilo patente */}
                          <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '3px',
                            background: '#002F6C',
                            borderRadius: '4px 4px 0 0'
                          }} />
                          <span style={{ marginTop: '2px' }}>
                            {formatPatente(auto.patente)}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '16px 20px', fontWeight: '600', color: 'var(--text)' }}>
                        {auto.marca}
                      </td>
                      <td style={{ padding: '16px 20px', color: 'var(--text)' }}>
                        {auto.modelo}
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{ 
                          background: 'var(--bg-secondary)', 
                          color: 'var(--primary-light)', 
                          padding: '4px 10px', 
                          borderRadius: 9999, 
                          fontSize: '0.8rem',
                          fontWeight: '700' 
                        }}>
                          {auto.anio}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                      <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🚗</div>
                      <h4 style={{ margin: '0 0 6px 0', color: 'var(--text-h)' }}>No tienes vehículos registrados</h4>
                      <p style={{ margin: 0, fontSize: '0.88rem' }}>Puedes añadir vehículos al agendar un nuevo servicio técnico.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
