import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Carrito from './pages/Carrito';
import Login from './pages/Login';
import Register from './pages/Register';
import Agendar from './pages/Agendar';
// Aquí luego importaremos Login y Register

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // NUEVO ESTADO: Por defecto lo ponemos en "false" (no está logueado)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div style={{ backgroundColor: isDarkMode ? '#121212' : '#ffffff', minHeight: '100vh' }}>
        {/* Le pasamos la variable isLoggedIn al Navbar */}
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} isLoggedIn={isLoggedIn} />
        
        <Routes>
          <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
          <Route path="/tienda" element={<Catalogo isDarkMode={isDarkMode} />} />
          <Route path="/carrito" element={<Carrito isDarkMode={isDarkMode} />} />
          
          {/* RUTAS DE AUTENTICACIÓN */}
          <Route path="/login" element={<Login isDarkMode={isDarkMode} />} />
          <Route path="/register" element={<Register isDarkMode={isDarkMode} />} />
          {/*Ruta Agendar*/}
          <Route path="/agendar" element={<Agendar isDarkMode={isDarkMode} />} />
        </Routes>
        <Footer isDarkMode={isDarkMode} />
      </div>
    </Router>
  );
}

export default App;