// src/components/Footer.jsx
import { Link } from 'react-router-dom';

export default function Footer({ isDarkMode }) {
  const theme = {
    background: isDarkMode ? '#111111' : '#2b2b2b', // Siempre oscuro, pero varía un poco la intensidad
    textMain: '#ffffff',
    textSecondary: '#adb5bd',
    borderTop: isDarkMode ? '1px solid #333' : '1px solid #444',
  };

  return (
    <footer style={{ 
      backgroundColor: theme.background, 
      color: theme.textMain, 
      padding: '50px 10% 20px 10%', 
      borderTop: theme.borderTop,
      marginTop: 'auto' // Esto ayuda a empujarlo siempre al fondo
    }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '30px', marginBottom: '40px' }}>
        
        {/* COLUMNA 1: Sobre la Empresa */}
        <div style={{ flex: '1', minWidth: '250px' }}>
          <h2 style={{ color: '#e63946', margin: '0 0 15px 0' }}>VrakBen</h2>
          <p style={{ color: theme.textSecondary, lineHeight: '1.6' }}>
            Tu taller mecánico y tienda de repuestos de confianza. Calidad, transparencia y tecnología al servicio de tu vehículo.
          </p>
        </div>

        {/* COLUMNA 2: Enlaces Rápidos */}
        <div style={{ flex: '1', minWidth: '200px' }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '1.2rem' }}>Enlaces Rápidos</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li><Link to="/" style={{ color: theme.textSecondary, textDecoration: 'none' }}>Inicio</Link></li>
            <li><Link to="/tienda" style={{ color: theme.textSecondary, textDecoration: 'none' }}>Catálogo de Repuestos</Link></li>
            <li><Link to="/agendar" style={{ color: theme.textSecondary, textDecoration: 'none' }}>Agendar Servicio</Link></li>
            <li><Link to="/login" style={{ color: theme.textSecondary, textDecoration: 'none' }}>Iniciar Sesión</Link></li>
          </ul>
        </div>

        {/* COLUMNA 3: Contacto */}
        <div style={{ flex: '1', minWidth: '250px' }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '1.2rem' }}>Contacto</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: theme.textSecondary, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li>📍 Av. Mecánica 1234, Santiago, Chile</li>
            <li>📞 +56 9 1234 5678</li>
            <li>✉️ contacto@vrakben.cl</li>
            <li>🕒 Lun - Vie: 09:00 - 18:00 hrs</li>
          </ul>
        </div>

      </div>

      {/* BARRA INFERIOR DE COPYRIGHT */}
      <div style={{ 
        textAlign: 'center', 
        paddingTop: '20px', 
        borderTop: `1px solid ${isDarkMode ? '#333' : '#555'}`,
        color: theme.textSecondary,
        fontSize: '0.9rem'
      }}>
        © {new Date().getFullYear()} VrakBen. Todos los derechos reservados. | Diseñado por Vicente, Ian y Benjamín.
      </div>
    </footer>
  );
}