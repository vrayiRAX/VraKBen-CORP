import React, { useState, useEffect } from 'react';
// src/pages/Perfil.jsx
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Perfil({ isDarkMode }) {
  const { user } = useAuth();
  
  // Estados para datos del usuario
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.sub || '',
  });
  const [isEditing, setIsEditing] = useState(false);
  
  // Estado para foto de perfil simulada con localStorage
  const [profilePic, setProfilePic] = useState(null);

  // Autos del usuario (cargados dinámicamente)
  const [autos, setAutos] = useState([]);

  const theme = {
    bg: isDarkMode ? '#121212' : '#f4f7f6',
    card: isDarkMode ? '#1e1e1e' : '#ffffff',
    text: isDarkMode ? '#f8f9fa' : '#212529',
    textMuted: isDarkMode ? '#adb5bd' : '#6c757d',
    border: isDarkMode ? '1px solid #333' : '1px solid #e9ecef',
    inputBg: isDarkMode ? '#2b2b2b' : '#fff',
    inputBorder: isDarkMode ? '1px solid #444' : '1px solid #ccc',
  };

  useEffect(() => {
    if (!user?.sub) return;

    // Cargar foto guardada
    const savedPic = localStorage.getItem(`profile_pic_${user.sub}`);
    setProfilePic(savedPic || null);

    // Cargar datos guardados
    const savedDataStr = localStorage.getItem(`profile_data_${user.sub}`);
    if (savedDataStr) {
      try {
        const savedData = JSON.parse(savedDataStr);
        setProfileData({
          name: savedData.name || user?.name || '',
          email: savedData.email || user?.sub || '',
        });
      } catch (e) {
        console.error("Error al parsear datos de perfil", e);
      }
    } else {
      setProfileData({
        name: user?.name || '',
        email: user?.sub || '',
      });
    }

    // Cargar autos específicos del usuario (Simulado)
    const savedAutosStr = localStorage.getItem(`profile_autos_${user.sub}`);
    if (savedAutosStr) {
      setAutos(JSON.parse(savedAutosStr));
    } else {
      // Data de relleno inicial solo para dar el ejemplo, luego se vaciaría o se traería de DB
      if (user.sub === 'vicente.placet@gmail.com') {
        const adminCars = [{ id: 1, marca: 'Audi', modelo: 'A4', anio: 2021, patente: 'XX-YY-88' }];
        setAutos(adminCars);
        localStorage.setItem(`profile_autos_${user.sub}`, JSON.stringify(adminCars));
      } else {
        setAutos([]); // Los demás usuarios inician sin autos en este simulacro
      }
    }
  }, [user]);

  const handlePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        localStorage.setItem(`profile_pic_${user?.sub}`, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (user?.sub) {
      localStorage.setItem(`profile_data_${user.sub}`, JSON.stringify(profileData));
    }
    setIsEditing(false);
    alert('Datos guardados correctamente en el navegador.');
  };

  // Función para formatear patente chilena (AAAA-11 o AA-1111)
  const formatPatente = (patente) => {
    const clean = patente.replace(/[^A-Z0-9]/gi, '').toUpperCase();
    if (clean.length === 6) {
      // Formato viejo AA-1111 o nuevo AAAA-11
      const isNewFormat = /^[A-Z]{4}[0-9]{2}$/.test(clean);
      if (isNewFormat) {
        return `${clean.substring(0, 4)}-${clean.substring(4, 6)}`;
      } else {
        return `${clean.substring(0, 2)}-${clean.substring(2, 6)}`;
      }
    }
    return patente; // fallback
  };

  return (
    <div style={{ padding: '40px', backgroundColor: theme.bg, color: theme.text, minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <div style={{ maxWidth: '900px', width: '100%', display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        
        {/* Tarjeta de Perfil */}
        <div style={{ flex: '1 1 300px', backgroundColor: theme.card, border: theme.border, borderRadius: '12px', padding: '30px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <div style={{ position: 'relative', width: '150px', height: '150px', margin: '0 auto 20px auto' }}>
            {profilePic ? (
              <img src={profilePic} alt="Perfil" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: `3px solid #3a86ff` }} />
            ) : (
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', backgroundColor: '#3a86ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', border: `3px solid #3a86ff` }}>
                👤
              </div>
            )}
            <label style={{
              position: 'absolute', bottom: '0', right: '0', backgroundColor: '#e63946', color: 'white',
              width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', border: '2px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}>
              📷
              <input type="file" accept="image/*" onChange={handlePicUpload} style={{ display: 'none' }} />
            </label>
          </div>
          <h2 style={{ margin: '0 0 10px 0' }}>{profileData.name || 'Usuario VrakBen'}</h2>
          <p style={{ margin: '0 0 20px 0', color: theme.textMuted }}>{profileData.email}</p>
          <div style={{ display: 'inline-block', padding: '5px 15px', borderRadius: '20px', backgroundColor: '#3a86ff22', color: '#3a86ff', fontWeight: 'bold' }}>
            Rol: {user?.role || 'Desconocido'}
          </div>
        </div>

        {/* Tarjeta de Datos y Edición */}
        <div style={{ flex: '2 1 500px', backgroundColor: theme.card, border: theme.border, borderRadius: '12px', padding: '30px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0 }}>Mis Datos Personales</h3>
            <button onClick={() => setIsEditing(!isEditing)} style={{ padding: '8px 15px', backgroundColor: isEditing ? '#e63946' : '#3a86ff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
              {isEditing ? 'Cancelar' : '✏️ Editar Datos'}
            </button>
          </div>
          
          <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: theme.textMuted }}>Nombre Completo</label>
              <input 
                type="text" 
                value={profileData.name} 
                onChange={(e) => setProfileData({...profileData, name: e.target.value})} 
                disabled={!isEditing}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: theme.inputBorder, backgroundColor: isEditing ? theme.inputBg : 'transparent', color: theme.text }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: theme.textMuted }}>Correo Electrónico (Username)</label>
              <input 
                type="email" 
                value={profileData.email} 
                onChange={(e) => setProfileData({...profileData, email: e.target.value})} 
                disabled={!isEditing}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: theme.inputBorder, backgroundColor: isEditing ? theme.inputBg : 'transparent', color: theme.text }}
              />
            </div>
            {isEditing && (
              <button type="submit" style={{ padding: '12px', backgroundColor: '#38b000', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
                💾 Guardar Cambios
              </button>
            )}
          </form>
        </div>

      </div>

      {/* Tarjeta de Vehículos */}
      <div style={{ maxWidth: '900px', width: '100%', marginTop: '30px', backgroundColor: theme.card, border: theme.border, borderRadius: '12px', padding: '30px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h3 style={{ margin: '0 0 20px 0' }}>🚗 Mis Vehículos Registrados</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: isDarkMode ? '#2b2b2b' : '#f8f9fa' }}>
                <th style={{ padding: '12px', borderBottom: theme.border, color: theme.textMuted }}>Patente</th>
                <th style={{ padding: '12px', borderBottom: theme.border, color: theme.textMuted }}>Marca</th>
                <th style={{ padding: '12px', borderBottom: theme.border, color: theme.textMuted }}>Modelo</th>
                <th style={{ padding: '12px', borderBottom: theme.border, color: theme.textMuted }}>Año</th>
              </tr>
            </thead>
            <tbody>
              {autos.length > 0 ? (
                autos.map(auto => (
                  <tr key={auto.id} style={{ borderBottom: theme.border }}>
                    <td style={{ padding: '12px', fontWeight: 'bold', color: '#f8961e', fontFamily: 'monospace', fontSize: '1.1rem' }}>
                      {formatPatente(auto.patente)}
                    </td>
                    <td style={{ padding: '12px' }}>{auto.marca}</td>
                    <td style={{ padding: '12px' }}>{auto.modelo}</td>
                    <td style={{ padding: '12px' }}>{auto.anio}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: theme.textMuted }}>
                    No tienes vehículos registrados a tu nombre.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
