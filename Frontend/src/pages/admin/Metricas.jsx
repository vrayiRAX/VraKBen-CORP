import React from 'react';
import { TrendingUp, Users, Calendar, DollarSign } from 'lucide-react';

export default function Metricas({ isDarkMode }) {
  const theme = {
    bg: isDarkMode ? '#121212' : '#f4f7f6',
    card: isDarkMode ? '#1e1e1e' : '#ffffff',
    text: isDarkMode ? '#f8f9fa' : '#212529',
    textMuted: isDarkMode ? '#adb5bd' : '#6c757d',
    border: isDarkMode ? '1px solid #333' : '1px solid #e9ecef',
  };

  const stats = [
    { label: 'Ingresos del Mes', value: '$12,450', icon: <DollarSign size={24} color="#38b000" /> },
    { label: 'Citas Nuevas', value: '142', icon: <Calendar size={24} color="#3a86ff" /> },
    { label: 'Nuevos Clientes', value: '28', icon: <Users size={24} color="#8338ec" /> },
    { label: 'Crecimiento', value: '+14%', icon: <TrendingUp size={24} color="#ff006e" /> },
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: theme.bg, color: theme.text, minHeight: '80vh' }}>
      <h1 style={{ marginBottom: '20px' }}>Panel de Administración</h1>
      <p style={{ color: theme.textMuted, marginBottom: '30px' }}>Vista general de métricas y rendimiento del taller.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {stats.map((stat, i) => (
          <div key={i} style={{
            backgroundColor: theme.card,
            padding: '25px',
            borderRadius: '10px',
            border: theme.border,
            boxShadow: isDarkMode ? '0 4px 10px rgba(0,0,0,0.3)' : '0 4px 10px rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>
            <div style={{ padding: '15px', backgroundColor: isDarkMode ? '#2b2b2b' : '#f8f9fa', borderRadius: '50%' }}>
              {stat.icon}
            </div>
            <div>
              <div style={{ color: theme.textMuted, fontSize: '0.9rem', marginBottom: '5px' }}>{stat.label}</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{stat.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
