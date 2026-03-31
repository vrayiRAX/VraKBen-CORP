// src/pages/Agendar.jsx
export default function Agendar({ isDarkMode }) {
  const theme = {
    background: isDarkMode ? '#121212' : '#ffffff',
    textMain: isDarkMode ? '#f8f9fa' : '#111111',
    textSecondary: isDarkMode ? '#adb5bd' : '#666666',
    cardBg: isDarkMode ? '#1e1e1e' : '#f8f9fa',
    border: isDarkMode ? '1px solid #333' : '1px solid #eaeaea',
    inputBg: isDarkMode ? '#2b2b2b' : '#ffffff',
  };

  return (
    <div style={{ padding: '40px 10%', backgroundColor: theme.background, minHeight: '80vh', color: theme.textMain, transition: 'all 0.3s ease' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: theme.cardBg, padding: '40px', borderRadius: '10px', boxShadow: isDarkMode ? '0 8px 20px rgba(0,0,0,0.5)' : '0 8px 20px rgba(0,0,0,0.1)' }}>
        
        <h1 style={{ marginBottom: '10px', fontSize: '2.2rem', textAlign: 'center' }}>Agendar Servicio 🔧</h1>
        <p style={{ textAlign: 'center', color: theme.textSecondary, marginBottom: '30px' }}>
          Completa los datos para reservar tu hora en nuestro taller.
        </p>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* SELECCIÓN DE SERVICIO */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Tipo de Servicio</label>
            <select style={{ width: '100%', padding: '12px', borderRadius: '5px', border: theme.border, backgroundColor: theme.inputBg, color: theme.textMain, boxSizing: 'border-box' }}>
              <option value="">Selecciona un servicio...</option>
              <option value="revision">Revisión 25 Puntos</option>
              <option value="aceite">Cambio de Aceite y Filtro</option>
              <option value="frenos">Revisión de Frenos</option>
              <option value="general">Mantenimiento General</option>
              <option value="otro">Otro (Especificar en taller)</option>
            </select>
          </div>

          {/* DATOS DEL VEHÍCULO */}
          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Marca</label>
              <input type="text" placeholder="Ej. Toyota" style={{ width: '100%', padding: '12px', borderRadius: '5px', border: theme.border, backgroundColor: theme.inputBg, color: theme.textMain, boxSizing: 'border-box' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Modelo</label>
              <input type="text" placeholder="Ej. Yaris" style={{ width: '100%', padding: '12px', borderRadius: '5px', border: theme.border, backgroundColor: theme.inputBg, color: theme.textMain, boxSizing: 'border-box' }} />
            </div>
          </div>

          {/* FECHA Y HORA */}
          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Fecha</label>
              <input type="date" style={{ width: '100%', padding: '12px', borderRadius: '5px', border: theme.border, backgroundColor: theme.inputBg, color: theme.textMain, boxSizing: 'border-box' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Hora Preferida</label>
              <input type="time" style={{ width: '100%', padding: '12px', borderRadius: '5px', border: theme.border, backgroundColor: theme.inputBg, color: theme.textMain, boxSizing: 'border-box' }} />
            </div>
          </div>

          <button 
            type="button" 
            style={{ 
              marginTop: '20px', 
              padding: '15px', 
              backgroundColor: '#e63946', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px', 
              fontSize: '1.1rem', 
              fontWeight: 'bold', 
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(230, 57, 70, 0.3)'
            }}
          >
            Confirmar Reserva
          </button>
        </form>

      </div>
    </div>
  );
}