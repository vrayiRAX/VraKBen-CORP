import React from 'react';

export default function GestUser({ isDarkMode }) {
  const bgColor = isDarkMode ? '#1e1e1e' : '#f9f9f9';
  const textColor = isDarkMode ? '#fff' : '#333';

  return (
    <div style={{ padding: '40px', backgroundColor: bgColor, color: textColor, minHeight: '80vh' }}>
      <h1>Gestión de Usuarios</h1>
      <p>Panel para crear cuentas, asignar roles (Mecánico/Admin) y restablecer accesos.</p>
    </div>
  );
}
