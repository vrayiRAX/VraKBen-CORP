// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/authService';
import { Lock, User } from 'lucide-react';

export default function Login({ isDarkMode }) {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const theme = {
    background: isDarkMode ? '#121212' : '#ffffff',
    textMain: isDarkMode ? '#f8f9fa' : '#111111',
    textSecondary: isDarkMode ? '#adb5bd' : '#666666',
    cardBg: isDarkMode ? '#1e1e1e' : '#f8f9fa',
    border: isDarkMode ? '1px solid #333' : '1px solid #eaeaea',
    inputBg: isDarkMode ? '#2b2b2b' : '#ffffff',
    inputColor: isDarkMode ? '#f8f9fa' : '#111111',
    inputBorder: isDarkMode ? '1px solid #444' : '1px solid #ccc',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Llama al backend real via BFF
      const data = await loginUser(username, password);
      // data = { token, username, message }

      // Guardamos al usuario en el contexto. El rol aún no viene del backend,
      // por ahora lo dejamos como 'CLIENTE' por defecto.
      // TODO: extraer el rol del JWT o del endpoint de perfil.
      const userData = { name: data.username, role: 'CLIENTE' };
      login(userData, data.token);

      navigate('/perfil');
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Usuario o contraseña incorrectos.');
      } else {
        setError('Error de conexión. ¿Está el servidor activo?');
      }
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: theme.inputBg,
    color: theme.inputColor,
    border: theme.inputBorder,
    borderRadius: '6px',
    fontSize: '1rem',
    boxSizing: 'border-box',
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh',
      backgroundColor: theme.background,
      color: theme.textMain
    }}>
      <div style={{
        backgroundColor: theme.cardBg,
        padding: '40px',
        borderRadius: '10px',
        border: theme.border,
        width: '100%',
        maxWidth: '420px',
        boxShadow: isDarkMode ? '0 8px 20px rgba(0,0,0,0.5)' : '0 8px 20px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '8px', fontSize: '2rem' }}>
          Bienvenido de vuelta
        </h2>
        <p style={{ textAlign: 'center', color: theme.textSecondary, marginBottom: '30px' }}>
          Ingresa tus credenciales para continuar
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Campo usuario */}
          <div style={{ position: 'relative' }}>
            <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: theme.textSecondary }} />
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ ...inputStyle, paddingLeft: '38px' }}
            />
          </div>

          {/* Campo contraseña */}
          <div style={{ position: 'relative' }}>
            <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: theme.textSecondary }} />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ ...inputStyle, paddingLeft: '38px' }}
            />
          </div>

          {/* Mensaje de error */}
          {error && (
            <p style={{ color: '#e63946', textAlign: 'center', fontSize: '0.9rem', margin: 0 }}>
              {error}
            </p>
          )}

          {/* Botón de envío */}
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '14px',
              backgroundColor: loading ? '#555' : '#3a86ff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '4px',
            }}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
}