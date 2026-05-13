// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User as UserIcon } from 'lucide-react';

export default function Navbar({ isDarkMode, setIsDarkMode }) {
  const { isLoggedIn, role, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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

      {/* Enlaces centrales dinámicos según el Rol */}
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/tienda" style={{ color: 'white', textDecoration: 'none' }}>Catálogo</Link>
        
        {/* ROL CLIENTE */}
        {(role === 'CLIENTE' || role === 'ADMIN') && (
          <>
            <Link to="/carrito" style={{ color: 'white', textDecoration: 'none' }}>Carrito</Link>
            <Link to="/agendar" style={{ color: 'white', textDecoration: 'none' }}>Agendar</Link>
          </>
        )}

        {/* ROL MECÁNICO */}
        {role === 'MECANICO' && (
          <>
            <Link to="/mecanico/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Órdenes</Link>
            <Link to="/mecanico/inventario" style={{ color: 'white', textDecoration: 'none' }}>Inventario Taller</Link>
            <Link to="/mecanico/solicitud" style={{ color: 'white', textDecoration: 'none' }}>Solicitar Material</Link>
          </>
        )}

        {/* ROL ADMIN */}
        {role === 'ADMIN' && (
          <>
            <Link to="/admin/metricas" style={{ color: 'white', textDecoration: 'none' }}>Métricas</Link>
            <Link to="/admin/inventario" style={{ color: 'white', textDecoration: 'none' }}>Bodega</Link>
            <Link to="/admin/usuarios" style={{ color: 'white', textDecoration: 'none' }}>Usuarios</Link>
            <Link to="/admin/solicitudes" style={{ color: 'white', textDecoration: 'none' }}>Solicitudes</Link>
          </>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Link to="/perfil" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <UserIcon size={18} /> {user?.name || 'Perfil'}
            </Link>
            <button 
              onClick={handleLogout}
              style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '8px 16px', backgroundColor: '#e63946', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
              <LogOut size={16} /> Salir
            </button>
          </div>
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