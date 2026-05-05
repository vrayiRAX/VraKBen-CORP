import React from 'react';

export default function InvMec({ isDarkMode }) {
  const bgColor = isDarkMode ? '#1e1e1e' : '#f9f9f9';
  const textColor = isDarkMode ? '#fff' : '#333';

  return (
    <div style={{ padding: '40px', backgroundColor: bgColor, color: textColor, minHeight: '80vh' }}>
      <h1>Inventario Taller</h1>
      <p>Consulta rápida de repuestos y materiales en bodega.</p>
    </div>
  );
}
