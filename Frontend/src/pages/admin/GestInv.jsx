import React from 'react';

export default function GestInv({ isDarkMode }) {
  const bgColor = isDarkMode ? '#1e1e1e' : '#f9f9f9';
  const textColor = isDarkMode ? '#fff' : '#333';

  return (
    <div style={{ padding: '40px', backgroundColor: bgColor, color: textColor, minHeight: '80vh' }}>
      <h1>Gestión Total de Bodega</h1>
      <p>CRUD para agregar, editar y eliminar repuestos y su stock.</p>
    </div>
  );
}
