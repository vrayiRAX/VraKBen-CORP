// src/pages/Login.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Wrench, ShieldAlert } from 'lucide-react';

export default function Login({ isDarkMode }) {
  const { login } = useAuth();
  const navigate = useNavigate();

  const theme = {
    background: isDarkMode ? '#121212' : '#ffffff',
    textMain: isDarkMode ? '#f8f9fa' : '#111111',
    textSecondary: isDarkMode ? '#adb5bd' : '#666666',
    cardBg: isDarkMode ? '#1e1e1e' : '#f8f9fa',
    border: isDarkMode ? '1px solid #333' : '1px solid #eaeaea',
    inputBg: isDarkMode ? '#2b2b2b' : '#ffffff',
  };

  const handleMockLogin = (role) => {
    let userData = {};
    if (role === 'CLIENTE') {
      userData = { id: 1, name: 'Juan Perez', role: 'CLIENTE' };
    } else if (role === 'MECANICO') {
      userData = { id: 2, name: 'Carlos Taller', role: 'MECANICO' };
    } else if (role === 'ADMIN') {
      userData = { id: 3, name: 'Super Admin', role: 'ADMIN' };
    }
    
    login(userData);

    // Redirigir basado en el rol
    if (role === 'CLIENTE') navigate('/perfil');
    else if (role === 'MECANICO') navigate('/mecanico/dashboard');
    else if (role === 'ADMIN') navigate('/admin/metricas');
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
        maxWidth: '450px',
        boxShadow: isDarkMode ? '0 8px 20px rgba(0,0,0,0.5)' : '0 8px 20px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '10px', fontSize: '2rem' }}>Bienvenido de vuelta</h2>
        <p style={{ textAlign: 'center', color: theme.textSecondary, marginBottom: '30px' }}>
          Selecciona un rol para simular el inicio de sesión
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <button 
            onClick={() => handleMockLogin('CLIENTE')}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '15px', backgroundColor: '#3a86ff', color: 'white', border: 'none', borderRadius: '5px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}
          >
            <User size={20} /> Ingresar como Cliente
          </button>

          <button 
            onClick={() => handleMockLogin('MECANICO')}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '15px', backgroundColor: '#fb5607', color: 'white', border: 'none', borderRadius: '5px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}
          >
            <Wrench size={20} /> Ingresar como Mecánico
          </button>

          <button 
            onClick={() => handleMockLogin('ADMIN')}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '15px', backgroundColor: '#8338ec', color: 'white', border: 'none', borderRadius: '5px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}
          >
            <ShieldAlert size={20} /> Ingresar como Administrador
          </button>
        </div>

        <p style={{ textAlign: 'center', marginTop: '35px', color: theme.textSecondary }}>
          (Solo para demostración de UI)
        </p>
      </div>
    </div>
  );
}