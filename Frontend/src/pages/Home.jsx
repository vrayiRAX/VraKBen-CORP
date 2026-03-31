// src/pages/Home.jsx
import { useNavigate } from 'react-router-dom';

export default function Home({ isDarkMode, isLoggedIn }) {
  const navigate = useNavigate();

  // --- LÓGICA DE RUTAS PROTEGIDAS ---
  const handleAgendarClick = () => {
    if (isLoggedIn) {
      navigate('/agendar'); // Si está logueado, lo llevamos a reservar
    } else {
      navigate('/login'); // Si no, directo a iniciar sesión
    }
  };

  const handleCatalogoClick = () => {
    navigate('/tienda'); // El catálogo siempre es público
  };

  // --- VARIABLES DE COLORES DINÁMICOS ---
  const theme = {
    background: isDarkMode ? '#121212' : '#ffffff',
    textMain: isDarkMode ? '#f8f9fa' : '#111111',
    textSecondary: isDarkMode ? '#adb5bd' : '#666666',
    sectionBg: isDarkMode ? '#1e1e1e' : '#f4f4f4',
    cardBg: isDarkMode ? '#2b2b2b' : '#ffffff',
    cardBorder: isDarkMode ? 'none' : '0 4px 15px rgba(0,0,0,0.05)',
  };

  // --- TUS LINKS DE IMÁGENES ---
  const heroImageUrl = "https://images.unsplash.com/photo-1613214149922-f1809c99b414?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"; 
  const fotoEquipo1 = "https://via.placeholder.com/300x400"; // Placeholder temporal
  const fotoEquipo2 = "https://via.placeholder.com/300x400";
  const fotoEquipo3 = "https://via.placeholder.com/300x400";

  return (
    <div style={{ fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif", backgroundColor: theme.background, color: theme.textMain, transition: 'all 0.3s ease' }}>

      {/* 1. SECCIÓN HERO */}
      <div style={{ 
        position: 'relative', height: '80vh', minHeight: '500px',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${heroImageUrl})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', alignItems: 'center', padding: '0 10%'
      }}>
        <div style={{ maxWidth: '600px', color: 'white' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', margin: '0 0 20px 0', lineHeight: '1.2' }}>
            Servicio Técnico <span style={{ color: '#e63946' }}>VrakBen</span>
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '40px', color: '#f0f0f0', lineHeight: '1.5' }}>
            Nuestra red cuenta con técnicos altamente calificados. Asegura el rendimiento de tu vehículo con los más estrictos estándares de calidad.
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <button 
              onClick={handleAgendarClick}
              style={{ padding: '15px 30px', backgroundColor: '#e63946', color: 'white', border: 'none', borderRadius: '4px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Agendar Servicio
            </button>
            <button 
              onClick={handleCatalogoClick}
              style={{ padding: '15px 30px', backgroundColor: 'transparent', color: 'white', border: '2px solid white', borderRadius: '4px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Ver Repuestos
            </button>
          </div>
        </div>
      </div>

      {/* 2. SERVICIOS RÁPIDOS */}
      <div style={{ padding: '60px 10%', backgroundColor: theme.sectionBg, transition: 'background-color 0.3s' }}>
        <h2 style={{ fontSize: '2rem', color: theme.textMain, marginBottom: '30px', borderLeft: '5px solid #e63946', paddingLeft: '15px' }}>
          Servicios adicionales
        </h2>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '250px', backgroundColor: theme.cardBg, padding: '25px', borderRadius: '8px', boxShadow: theme.cardBorder, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: '0 0 5px 0', color: theme.textMain }}>Revisión 25 Puntos</h3>
              <p style={{ margin: '0', color: theme.textSecondary, fontSize: '0.9rem' }}>Diagnóstico completo</p>
            </div>
            <button 
              onClick={handleAgendarClick}
              style={{ padding: '8px 15px', backgroundColor: '#e63946', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Lo quiero
            </button>
          </div>
          <div style={{ flex: '1', minWidth: '250px', backgroundColor: theme.cardBg, padding: '25px', borderRadius: '8px', boxShadow: theme.cardBorder, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: '0 0 5px 0', color: theme.textMain }}>Cambio de Aceite</h3>
              <p style={{ margin: '0', color: theme.textSecondary, fontSize: '0.9rem' }}>Incluye filtro original</p>
            </div>
            <button 
              onClick={handleAgendarClick}
              style={{ padding: '8px 15px', backgroundColor: '#e63946', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Lo quiero
            </button>
          </div>
        </div>
      </div>

      {/* 3. NUESTRO SERVICIO TÉCNICO */}
      <div style={{ padding: '80px 10%', backgroundColor: theme.background, transition: 'background-color 0.3s' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '2.5rem', color: theme.textMain, margin: '0 0 15px 0' }}>Nuestro Servicio Técnico</h2>
          <p style={{ color: theme.textSecondary, fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>Trabajamos siempre con el compromiso y calidad que nos caracteriza.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ flex: '1', minWidth: '280px', maxWidth: '350px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>⚙️</div>
            <h3 style={{ color: theme.textMain, fontSize: '1.5rem', marginBottom: '15px' }}>Mantención y Reparación</h3>
            <p style={{ color: theme.textSecondary, lineHeight: '1.6' }}>Técnicos altamente calificados. Tus mantenciones bajo estrictos estándares.</p>
          </div>
          <div style={{ flex: '1', minWidth: '280px', maxWidth: '350px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🚗</div>
            <h3 style={{ color: theme.textMain, fontSize: '1.5rem', marginBottom: '15px' }}>Desabolladura y Pintura</h3>
            <p style={{ color: theme.textSecondary, lineHeight: '1.6' }}>Taller equipado para devolverle la línea original a tu auto.</p>
          </div>
          <div style={{ flex: '1', minWidth: '280px', maxWidth: '350px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🔧</div>
            <h3 style={{ color: theme.textMain, fontSize: '1.5rem', marginBottom: '15px' }}>Repuestos Originales</h3>
            <p style={{ color: theme.textSecondary, lineHeight: '1.6' }}>Compra de manera rápida, fácil y segura el repuesto que necesitas.</p>
          </div>
        </div>
      </div>

      {/* 4. SECCIÓN EQUIPO */}
      <div style={{ padding: '80px 10%', backgroundColor: theme.sectionBg, borderTop: `1px solid ${isDarkMode ? '#333' : '#eaeaea'}`, transition: 'all 0.3s' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '2.5rem', color: theme.textMain, margin: '0 0 15px 0' }}>Conoce a Nuestro Equipo</h2>
        </div>

        <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ width: '280px', backgroundColor: theme.cardBg, padding: '20px', borderRadius: '8px', boxShadow: theme.cardBorder, textAlign: 'center' }}>
            <div style={{ width: '100%', height: '220px', backgroundColor: '#dee2e6', borderRadius: '4px', marginBottom: '20px', overflow: 'hidden' }}>
              <img src={fotoEquipo1} alt="Vicente" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h3 style={{ color: theme.textMain, margin: '0 0 5px 0', fontSize: '1.3rem' }}>Vicente Placencia</h3>
            <p style={{ color: '#e63946', fontWeight: 'bold', margin: '0', fontSize: '0.85rem' }}>Jefe de Taller</p>
          </div>
          <div style={{ width: '280px', backgroundColor: theme.cardBg, padding: '20px', borderRadius: '8px', boxShadow: theme.cardBorder, textAlign: 'center' }}>
            <div style={{ width: '100%', height: '220px', backgroundColor: '#dee2e6', borderRadius: '4px', marginBottom: '20px', overflow: 'hidden' }}>
              <img src={fotoEquipo2} alt="Ian" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h3 style={{ color: theme.textMain, margin: '0 0 5px 0', fontSize: '1.3rem' }}>Ian Badilla</h3>
            <p style={{ color: '#e63946', fontWeight: 'bold', margin: '0', fontSize: '0.85rem' }}>Arquitecto Microservicios</p>
          </div>
          <div style={{ width: '280px', backgroundColor: theme.cardBg, padding: '20px', borderRadius: '8px', boxShadow: theme.cardBorder, textAlign: 'center' }}>
            <div style={{ width: '100%', height: '220px', backgroundColor: '#dee2e6', borderRadius: '4px', marginBottom: '20px', overflow: 'hidden' }}>
              <img src={fotoEquipo3} alt="Benjamín" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h3 style={{ color: theme.textMain, margin: '0 0 5px 0', fontSize: '1.3rem' }}>Benjamín Almonacid</h3>
            <p style={{ color: '#e63946', fontWeight: 'bold', margin: '0', fontSize: '0.85rem' }}>Especialista Repuestos</p>
          </div>
        </div>
      </div>

    </div>
  );
}