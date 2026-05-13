// src/pages/Perfil.jsx
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Perfil({ isDarkMode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const theme = {
    background: isDarkMode ? '#121212' : '#ffffff',
    textMain: isDarkMode ? '#f8f9fa' : '#111111',
    textSecondary: isDarkMode ? '#adb5bd' : '#666666',
    cardBg: isDarkMode ? '#1e1e1e' : '#f8f9fa',
    border: isDarkMode ? '1px solid #333' : '1px solid #eaeaea',
    badgeBg: isDarkMode ? '#2b2b2b' : '#e9ecef',
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Información del rol con ícono y color
  const rolInfo = {
    CLIENTE:  { label: 'Cliente',       icon: '🛒', color: '#3a86ff', link: null },
    MECANICO: { label: 'Mecánico',      icon: '🔧', color: '#f8961e', link: '/mecanico/dashboard' },
    ADMIN:    { label: 'Administrador', icon: '⚙️', color: '#e63946', link: '/admin/metricas' },
  };
  const rol = rolInfo[user?.role] || rolInfo.CLIENTE;

  const quickLinks = [
    { label: '🛒 Ver Carrito', path: '/carrito', roles: ['CLIENTE', 'ADMIN'] },
    { label: '📅 Agendar Servicio', path: '/agendar', roles: ['CLIENTE'] },
    { label: '🔧 Panel Mecánico', path: '/mecanico/dashboard', roles: ['MECANICO'] },
    { label: '⚙️ Panel Admin', path: '/admin/metricas', roles: ['ADMIN'] },
    { label: '🏪 Ver Catálogo', path: '/tienda', roles: ['CLIENTE', 'MECANICO', 'ADMIN'] },
  ].filter(link => link.roles.includes(user?.role));

  return (
    <div style={{
      padding: '40px 10%',
      backgroundColor: theme.background,
      minHeight: '80vh',
      color: theme.textMain,
      transition: 'all 0.3s ease'
    }}>
      {/* Header */}
      <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Mi Perfil</h1>
      <p style={{ color: theme.textSecondary, marginBottom: '40px', fontSize: '1.1rem' }}>
        Gestiona tu cuenta y accede a tus servicios
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', maxWidth: '900px' }}>

        {/* Tarjeta de usuario */}
        <div style={{
          backgroundColor: theme.cardBg,
          border: theme.border,
          borderRadius: '12px',
          padding: '30px',
          boxShadow: isDarkMode ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.08)',
          gridColumn: '1 / -1'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '25px' }}>
            {/* Avatar */}
            <div style={{
              width: '80px', height: '80px',
              borderRadius: '50%',
              backgroundColor: rol.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2rem', flexShrink: 0
            }}>
              {rol.icon}
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.8rem' }}>{user?.name || 'Usuario'}</h2>
              <span style={{
                display: 'inline-block',
                marginTop: '8px',
                padding: '4px 14px',
                borderRadius: '20px',
                backgroundColor: rol.color + '22',
                color: rol.color,
                fontWeight: 'bold',
                fontSize: '0.9rem',
                border: `1px solid ${rol.color}44`
              }}>
                {rol.icon} {rol.label}
              </span>
            </div>
          </div>

          {/* Info fields */}
          <div style={{ display: 'grid', gap: '15px' }}>
            {[
              { label: 'Nombre de usuario', value: user?.name },
              { label: 'Rol en el sistema', value: rol.label },
            ].map(({ label, value }) => (
              <div key={label} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '14px 18px',
                backgroundColor: theme.badgeBg,
                borderRadius: '8px',
                fontSize: '1rem'
              }}>
                <span style={{ color: theme.textSecondary }}>{label}</span>
                <span style={{ fontWeight: 'bold' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Accesos rápidos */}
        <div style={{
          backgroundColor: theme.cardBg,
          border: theme.border,
          borderRadius: '12px',
          padding: '25px',
          boxShadow: isDarkMode ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.08)',
        }}>
          <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '1.2rem' }}>
            🚀 Accesos Rápidos
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {quickLinks.map(({ label, path }) => (
              <Link key={path} to={path} style={{
                display: 'block',
                padding: '12px 16px',
                backgroundColor: isDarkMode ? '#2b2b2b' : '#ffffff',
                border: theme.border,
                borderRadius: '8px',
                color: theme.textMain,
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'all 0.2s ease',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = rol.color}
                onMouseLeave={e => e.currentTarget.style.borderColor = isDarkMode ? '#333' : '#eaeaea'}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Cerrar sesión */}
        <div style={{
          backgroundColor: theme.cardBg,
          border: theme.border,
          borderRadius: '12px',
          padding: '25px',
          boxShadow: isDarkMode ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.08)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          textAlign: 'center', gap: '15px'
        }}>
          <span style={{ fontSize: '2.5rem' }}>👋</span>
          <p style={{ margin: 0, color: theme.textSecondary }}>
            ¿Listo para salir?
          </p>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '13px',
              backgroundColor: '#e63946',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Cerrar Sesión
          </button>
        </div>

      </div>
    </div>
  );
}
