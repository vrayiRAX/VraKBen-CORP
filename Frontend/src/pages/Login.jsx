// src/pages/Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/authService';
import { Lock, User } from 'lucide-react';

export default function Login({ isDarkMode }) {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
      );
      return JSON.parse(jsonPayload);
    } catch { return {}; }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await loginUser(username, password);
      const payload = parseJwt(data.token);
      const rawRoles = payload.roles || payload.role || payload.authorities || [];
      const rolesArr = Array.isArray(rawRoles) ? rawRoles : [rawRoles];
      let role = 'CLIENTE';
      const rolesUpper = rolesArr.map(r => (typeof r === 'string' ? r : r.authority || '').toUpperCase());
      if (rolesUpper.some(r => r.includes('ADMIN'))) role = 'ADMIN';
      else if (rolesUpper.some(r => r.includes('MECANICO') || r.includes('MECHANIC'))) role = 'MECANICO';
      const userData = { name: data.username, role };
      login(userData, data.token);
      if (role === 'ADMIN') navigate('/admin');
      else if (role === 'MECANICO') navigate('/mecanico');
      else navigate('/perfil');
    } catch (err) {
      if (err.response?.status === 401) setError('Usuario o contraseña incorrectos.');
      else setError('Error de conexión. ¿Está el servidor activo?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-theme={isDarkMode ? 'dark' : 'light'} style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 16px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Glow de fondo */}
      <div style={{
        position: 'absolute', top: '10%', left: '20%',
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '15%',
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Tarjeta principal */}
      <div style={{
        width: '100%',
        maxWidth: 440,
        background: 'var(--card-bg)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '48px 40px',
        boxShadow: 'var(--shadow-xl)',
        position: 'relative',
        animation: 'fadeInUp 0.5s ease both',
      }}>
        {/* Línea superior de acento */}
        <div style={{
          position: 'absolute', top: 0, left: 24, right: 24, height: 3,
          background: 'linear-gradient(90deg, var(--primary-light), var(--accent))',
          borderRadius: '0 0 4px 4px',
        }} />

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 52, height: 52,
            background: 'linear-gradient(135deg, var(--primary-light), var(--accent))',
            borderRadius: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, margin: '0 auto 16px',
            boxShadow: 'var(--shadow-blue)',
          }}>🔧</div>
          <h2 style={{ color: 'var(--text-h)', margin: '0 0 8px', fontSize: '1.7rem', fontWeight: 800 }}>
            Bienvenido de vuelta
          </h2>
          <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>
            Ingresa tus credenciales para continuar
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Campo usuario */}
          <div>
            <label style={{ display: 'block', marginBottom: 8, fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-h)' }}>
              Usuario
            </label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{
                position: 'absolute', left: 14, top: '50%',
                transform: 'translateY(-50%)', color: 'var(--text-muted)',
              }} />
              <input
                type="text"
                placeholder="Nombre de usuario"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                style={{
                  width: '100%', boxSizing: 'border-box',
                  padding: '12px 14px 12px 40px',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-h)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  fontFamily: 'var(--font)',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--primary-light)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
          </div>

          {/* Campo contraseña */}
          <div>
            <label style={{ display: 'block', marginBottom: 8, fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-h)' }}>
              Contraseña
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{
                position: 'absolute', left: 14, top: '50%',
                transform: 'translateY(-50%)', color: 'var(--text-muted)',
              }} />
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Tu contraseña"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{
                  width: '100%', boxSizing: 'border-box',
                  padding: '12px 44px 12px 40px',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-h)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  fontFamily: 'var(--font)',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--primary-light)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--text-muted)', fontSize: 16, padding: 4,
              }}>
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: 'var(--danger-bg)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px 14px',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span>❌</span>
              <p style={{ color: 'var(--danger)', margin: 0, fontSize: '0.88rem' }}>{error}</p>
            </div>
          )}

          {/* Botón */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{
              width: '100%', marginTop: 8, padding: '14px',
              fontSize: '0.95rem', fontWeight: 700,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⚙️</span>
                Iniciando sesión...
              </span>
            ) : 'Iniciar Sesión →'}
          </button>
        </form>

        {/* Divider */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0',
        }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>¿Eres nuevo?</span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>

        <Link to="/register" style={{
          display: 'block', textAlign: 'center',
          padding: '12px',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
          color: 'var(--text-h)',
          fontWeight: 600, fontSize: '0.9rem',
          transition: 'var(--transition)',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary-light)'; e.currentTarget.style.color = 'var(--primary-light)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-h)'; }}
        >
          Crear una cuenta gratuita
        </Link>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}