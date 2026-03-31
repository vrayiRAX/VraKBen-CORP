// src/pages/Register.jsx
import { Link } from 'react-router-dom';

export default function Register({ isDarkMode }) {
  const theme = {
    background: isDarkMode ? '#121212' : '#ffffff',
    textMain: isDarkMode ? '#f8f9fa' : '#111111',
    textSecondary: isDarkMode ? '#adb5bd' : '#666666',
    cardBg: isDarkMode ? '#1e1e1e' : '#f8f9fa',
    border: isDarkMode ? '1px solid #333' : '1px solid #eaeaea',
    inputBg: isDarkMode ? '#2b2b2b' : '#ffffff',
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '80vh', 
      backgroundColor: theme.background,
      color: theme.textMain,
      padding: '40px 0'
    }}>
      <div style={{ 
        backgroundColor: theme.cardBg, 
        padding: '40px', 
        borderRadius: '10px', 
        border: theme.border,
        width: '100%',
        maxWidth: '450px',
        boxShadow: isDarkMode ? '0 8px 20px rgba(0,0,0,0.5)' : '0 8px 20px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '10px', fontSize: '2rem' }}>Únete a VrakBen</h2>
        <p style={{ textAlign: 'center', color: theme.textSecondary, marginBottom: '30px' }}>
          Crea tu cuenta para acceder a todos los servicios
        </p>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Nombre Completo</label>
            <input 
              type="text" 
              placeholder="Ej. Juan Pérez" 
              style={{ width: '100%', padding: '12px', borderRadius: '5px', border: theme.border, backgroundColor: theme.inputBg, color: theme.textMain, boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Correo Electrónico</label>
            <input 
              type="email" 
              placeholder="tu@correo.com" 
              style={{ width: '100%', padding: '12px', borderRadius: '5px', border: theme.border, backgroundColor: theme.inputBg, color: theme.textMain, boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Contraseña</label>
            <input 
              type="password" 
              placeholder="Crea una contraseña segura" 
              style={{ width: '100%', padding: '12px', borderRadius: '5px', border: theme.border, backgroundColor: theme.inputBg, color: theme.textMain, boxSizing: 'border-box' }}
            />
          </div>

          <button 
            type="button" 
            style={{ 
              marginTop: '10px', 
              padding: '15px', 
              backgroundColor: '#e63946', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px', 
              fontSize: '1.1rem', 
              fontWeight: 'bold', 
              cursor: 'pointer' 
            }}
          >
            Crear Cuenta
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '25px', color: theme.textSecondary }}>
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" style={{ color: '#e63946', textDecoration: 'none', fontWeight: 'bold' }}>
            Ingresa aquí
          </Link>
        </p>
      </div>
    </div>
  );
}