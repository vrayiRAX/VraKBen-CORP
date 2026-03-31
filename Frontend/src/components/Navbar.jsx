// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

export default function Navbar({ isDarkMode, setIsDarkMode, isLoggedIn }) {
  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '15px 30px', 
      backgroundColor: '#111', 
      color: 'white', 
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
    }}>
      
      {/* Logo */}
      <h2 style={{ margin: 0 }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>VrakBen</Link>
      </h2>

      {/* Enlaces centrales */}
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/tienda" style={{ color: 'white', textDecoration: 'none' }}>Catálogo</Link>
        
        {/* MAGIA: Solo mostramos el carrito si está logueado */}
        {isLoggedIn && (
          <Link to="/carrito" style={{ color: 'white', textDecoration: 'none' }}>Carrito</Link>
        )}
      </div>

      {/* Botones de acción */}
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        
        {/* BOTÓN DE MODO OSCURO */}
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer', transition: 'transform 0.2s' }}
          title={isDarkMode ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
        
        {/* CONTROLES DE SESIÓN */}
        {isLoggedIn ? (
          <button style={{ padding: '8px 16px', backgroundColor: '#e63946', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            Agendar Servicio
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/login" style={{ padding: '8px 16px', backgroundColor: 'transparent', color: 'white', border: '1px solid white', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold' }}>
              Ingresar
            </Link>
            <Link to="/register" style={{ padding: '8px 16px', backgroundColor: '#e63946', color: 'white', border: 'none', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold' }}>
              Registrarse
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}