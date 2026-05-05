import React from 'react';

export default function Solicitud({ isDarkMode }) {
  const bgColor = isDarkMode ? '#1e1e1e' : '#f9f9f9';
  const textColor = isDarkMode ? '#fff' : '#333';

  return (
    <div style={{ padding: '40px', backgroundColor: bgColor, color: textColor, minHeight: '80vh' }}>
      <h1>Solicitar Materiales</h1>
      <p>Formulario para generar solicitud de repuestos para una orden de trabajo.</p>
    </div>
  );
}
