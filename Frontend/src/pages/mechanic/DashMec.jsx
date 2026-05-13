import React from 'react';
import { ClipboardList, CheckCircle, Clock } from 'lucide-react';

export default function DashMec({ isDarkMode }) {
  const theme = {
    bg: isDarkMode ? '#121212' : '#f4f7f6',
    card: isDarkMode ? '#1e1e1e' : '#ffffff',
    text: isDarkMode ? '#f8f9fa' : '#212529',
    textMuted: isDarkMode ? '#adb5bd' : '#6c757d',
    border: isDarkMode ? '1px solid #333' : '1px solid #e9ecef',
  };

  const jobs = [
    { id: 'OT-1001', vehicle: 'Toyota Corolla 2018', patente: 'BB-CC-12', status: 'En Progreso', time: '2h', icon: <Clock color="#fb5607" /> },
    { id: 'OT-1002', vehicle: 'Ford Ranger 2021', patente: 'LW-XR-99', status: 'Completado', time: 'Ayer', icon: <CheckCircle color="#38b000" /> },
    { id: 'OT-1003', vehicle: 'Nissan Sentra 2015', patente: 'ABCD-34', status: 'Pendiente', time: 'En espera', icon: <ClipboardList color="#3a86ff" /> },
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: theme.bg, color: theme.text, minHeight: '80vh' }}>
      <h1 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <WrenchIcon /> Panel de Mecánico
      </h1>
      <p style={{ color: theme.textMuted, marginBottom: '30px' }}>Resumen de tus órdenes de trabajo asignadas.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {jobs.map(job => (
          <div key={job.id} style={{
            backgroundColor: theme.card,
            padding: '20px',
            borderRadius: '10px',
            border: theme.border,
            boxShadow: isDarkMode ? '0 4px 10px rgba(0,0,0,0.3)' : '0 4px 10px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            transition: 'transform 0.2s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{job.id}</span>
              <span style={{ 
                padding: '4px 8px', backgroundColor: '#f8961e22', color: '#f8961e', 
                borderRadius: '6px', fontWeight: 'bold', fontFamily: 'monospace', border: '1px solid #f8961e44'
              }}>{job.patente}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
              <div style={{ fontSize: '1.1rem' }}>{job.vehicle}</div>
              {job.icon}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', color: theme.textMuted, fontSize: '0.9rem' }}>
              <span>{job.status}</span>
              <span>{job.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const WrenchIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
  </svg>
);
