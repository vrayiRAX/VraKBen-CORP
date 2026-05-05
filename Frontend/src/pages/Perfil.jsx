import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Perfil({ isDarkMode }) {
  const { user } = useAuth();
  const bgColor = isDarkMode ? '#1e1e1e' : '#f9f9f9';
  const textColor = isDarkMode ? '#fff' : '#333';

  return (
    <div style={{ padding: '40px', backgroundColor: bgColor, color: textColor, minHeight: '80vh' }}>
      <h1>Mi Perfil</h1>
      <p>Bienvenido, {user?.name || 'Cliente'}. Aquí puedes ver el historial de tu vehículo.</p>
    </div>
  );
}
