// src/pages/Register.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';

function PasswordStrength({ password }) {
  const checks = [
    { label: 'Mínimo 6 caracteres', ok: password.length >= 6 },
    { label: 'Contiene número', ok: /\d/.test(password) },
    { label: 'Contiene mayúscula', ok: /[A-Z]/.test(password) },
  ];
  const strength = checks.filter(c => c.ok).length;
  const colors = ['var(--danger)', 'var(--warning)', 'var(--success)'];
  const labels = ['Débil', 'Regular', 'Fuerte'];

  if (!password) return null;
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: 'flex', gap: 4, marginBottom: 6 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            flex: 1, height: 4, borderRadius: 4,
            background: i < strength ? colors[strength - 1] : 'var(--border)',
            transition: 'background 0.3s',
          }} />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: colors[strength - 1] || 'var(--text-muted)', fontSize: '0.78rem', fontWeight: 600 }}>
          {password ? labels[strength - 1] || 'Muy débil' : ''}
        </span>
        <div style={{ display: 'flex', gap: 10 }}>
          {checks.map(({ label, ok }) => (
            <span key={label} style={{
              fontSize: '0.72rem', color: ok ? 'var(--success)' : 'var(--text-muted)',
              display: 'flex', alignItems: 'center', gap: 3,
            }}>
              {ok ? '✓' : '○'} {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Register({ isDarkMode }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (password !== confirmPassword) { setError('Las contraseñas no coinciden.'); return; }
    if (password.length < 6) { setError('La contraseña debe tener al menos 6 caracteres.'); return; }
    setLoading(true);
    try {
      await registerUser(username, password);
      setSuccess('¡Cuenta creada exitosamente! Redirigiendo...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      if (err.response?.status === 400) setError('Ese nombre de usuario ya está en uso.');
      else setError('Error de conexión. ¿Está el servidor activo?');
    } finally { setLoading(false); }
  };

  const inputStyle = {
    width: '100%', boxSizing: 'border-box',
    padding: '12px 14px',
    background: 'var(--bg)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--text-h)',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'var(--font)',
  };

  const labelStyle = {
    display: 'block', marginBottom: 8,
    fontSize: '0.85rem', fontWeight: 600,
    color: 'var(--text-h)',
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
      {/* Glows decorativos */}
      <div style={{ position: 'absolute', top: '5%', right: '15%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '5%', left: '10%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{
        width: '100%', maxWidth: 480,
        background: 'var(--card-bg)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '48px 40px',
        boxShadow: 'var(--shadow-xl)',
        position: 'relative',
        animation: 'fadeInUp 0.5s ease both',
      }}>
        {/* Acento superior */}
        <div style={{
          position: 'absolute', top: 0, left: 24, right: 24, height: 3,
          background: 'linear-gradient(90deg, var(--success), var(--primary-light))',
          borderRadius: '0 0 4px 4px',
        }} />

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            width: 52, height: 52,
            background: 'linear-gradient(135deg, var(--success), var(--primary-light))',
            borderRadius: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, margin: '0 auto 16px',
            boxShadow: '0 8px 24px rgba(16,185,129,0.3)',
          }}>🚗</div>
          <h2 style={{ color: 'var(--text-h)', margin: '0 0 8px', fontSize: '1.7rem', fontWeight: 800 }}>
            Únete a VrakBen
          </h2>
          <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>
            Crea tu cuenta y accede a todos los servicios
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Usuario */}
          <div>
            <label style={labelStyle}>Nombre de usuario</label>
            <input
              type="text"
              placeholder="Ej. juanperez"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'var(--primary-light)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>

          {/* Contraseña */}
          <div>
            <label style={labelStyle}>Contraseña</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Crea una contraseña segura"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{ ...inputStyle, paddingRight: 44 }}
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
            <PasswordStrength password={password} />
          </div>

          {/* Confirmar contraseña */}
          <div>
            <label style={labelStyle}>Confirmar contraseña</label>
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Repite tu contraseña"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              style={{
                ...inputStyle,
                borderColor: confirmPassword && confirmPassword !== password ? 'var(--danger)' : 'var(--border)',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--primary-light)'}
              onBlur={e => e.target.style.borderColor = confirmPassword !== password ? 'var(--danger)' : 'var(--border)'}
            />
            {confirmPassword && confirmPassword !== password && (
              <p style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: 6 }}>Las contraseñas no coinciden</p>
            )}
          </div>

          {/* Mensajes */}
          {error && (
            <div style={{ background: 'var(--danger-bg)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>❌</span>
              <p style={{ color: 'var(--danger)', margin: 0, fontSize: '0.88rem' }}>{error}</p>
            </div>
          )}
          {success && (
            <div style={{ background: 'var(--success-bg)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>✅</span>
              <p style={{ color: 'var(--success)', margin: 0, fontSize: '0.88rem' }}>{success}</p>
            </div>
          )}

          {/* Botón */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{
              width: '100%', padding: '14px',
              fontSize: '0.95rem', fontWeight: 700,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: 4,
            }}
          >
            {loading ? '⚙️ Creando cuenta...' : '🚀 Crear Cuenta'}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>¿Ya tienes cuenta?</span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>

        <Link to="/login" style={{
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
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
}