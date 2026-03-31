// src/pages/Carrito.jsx
export default function Carrito({ carrito = [], isDarkMode }) {
  // --- COLORES DEL TEMA ---
  const theme = {
    background: isDarkMode ? '#121212' : '#ffffff',
    textMain: isDarkMode ? '#f8f9fa' : '#111111',
    textSecondary: isDarkMode ? '#adb5bd' : '#666666',
    cardBg: isDarkMode ? '#1e1e1e' : '#f8f9fa',
    border: isDarkMode ? '1px solid #333' : '1px solid #eaeaea',
  };

  // --- CALCULAR EL TOTAL ---
  // Sumamos el precio de todos los items en el carrito
  const total = carrito.reduce((suma, item) => suma + (item.precio || 0), 0);

  return (
    <div style={{ padding: '40px 10%', backgroundColor: theme.background, minHeight: '80vh', color: theme.textMain, transition: 'all 0.3s ease' }}>
      <h1 style={{ marginBottom: '30px', fontSize: '2.5rem' }}>Tu Carrito 🛒</h1>

      {carrito.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', backgroundColor: theme.cardBg, borderRadius: '8px', border: theme.border }}>
          <p style={{ color: theme.textSecondary, fontSize: '1.2rem', margin: 0 }}>
            Tu carrito está vacío. ¡Ve al catálogo a buscar los repuestos que necesitas!
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* LISTA DE PRODUCTOS SELECCIONADOS */}
          {carrito.map((item, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              backgroundColor: theme.cardBg, 
              padding: '20px', 
              borderRadius: '8px', 
              border: theme.border 
            }}>
              <div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem' }}>{item.nombre}</h3>
                <p style={{ margin: 0, color: theme.textSecondary, fontSize: '0.9rem' }}>{item.descripcion}</p>
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#e63946' }}>
                ${item.precio?.toLocaleString('es-CL')}
              </div>
            </div>
          ))}
          
          {/* SECCIÓN DEL TOTAL Y PAGO */}
          <div style={{ 
            marginTop: '30px', 
            padding: '25px', 
            borderTop: `2px solid ${isDarkMode ? '#333' : '#eaeaea'}`, 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}>
            <h2 style={{ margin: 0 }}>Total a Pagar:</h2>
            <h2 style={{ margin: 0, color: '#e63946', fontSize: '2rem' }}>
              ${total.toLocaleString('es-CL')}
            </h2>
          </div>
          
          <button style={{ 
            alignSelf: 'flex-end', 
            padding: '15px 40px', 
            backgroundColor: '#e63946', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            fontSize: '1.2rem', 
            fontWeight: 'bold', 
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(230, 57, 70, 0.3)'
          }}>
            Proceder al Pago
          </button>

        </div>
      )}
    </div>
  );
}