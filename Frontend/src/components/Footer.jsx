// src/components/Footer.jsx
import { Link } from 'react-router-dom';

export default function Footer({ isDarkMode }) {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      backgroundColor: 'var(--navbar-bg)',
      color: 'var(--navbar-text)',
      marginTop: 'auto',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Degradado decorativo superior */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 3,
        background: 'linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 50%, var(--accent) 100%)',
      }} />

      {/* Glow decorativo de fondo */}
      <div style={{
        position: 'absolute',
        top: -80, left: '10%',
        width: 300, height: 300,
        background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* CONTENIDO PRINCIPAL */}
      <div style={{
        padding: '60px 8% 40px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 48,
        position: 'relative',
      }}>

        {/* ── COLUMNA 1: Marca ── */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{
              width: 36, height: 36,
              background: 'linear-gradient(135deg, var(--primary-light), var(--accent))',
              borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18,
            }}>
              🔧
            </div>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.3px' }}>
              Vrak<span style={{ color: 'var(--accent)' }}>Ben</span>
            </span>
          </div>
          <p style={{
            color: 'rgba(148,163,184,0.8)',
            lineHeight: 1.7,
            fontSize: '0.9rem',
            marginBottom: 24,
          }}>
            Tu taller de confianza con más de 10 años de experiencia. Calidad, transparencia y tecnología al servicio de tu vehículo.
          </p>
          {/* Redes sociales */}
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { icon: '🔗', label: 'LinkedIn' },
              { icon: '📘', label: 'Facebook' },
              { icon: '📸', label: 'Instagram' },
            ].map(({ icon, label }) => (
              <button key={label} title={label} style={{
                width: 36, height: 36,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                cursor: 'pointer',
                fontSize: 16,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,99,235,0.3)'; e.currentTarget.style.borderColor = 'var(--primary-light)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* ── COLUMNA 2: Servicios ── */}
        <div>
          <h4 style={{
            color: '#fff',
            fontSize: '0.85rem',
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: 20,
            paddingBottom: 10,
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}>
            Servicios
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Mantención y Reparación', path: '/agendar' },
              { label: 'Desabolladura y Pintura', path: '/agendar' },
              { label: 'Revisión 25 Puntos', path: '/agendar' },
              { label: 'Catálogo de Repuestos', path: '/tienda' },
              { label: 'Agendar Servicio', path: '/agendar' },
            ].map(({ label, path }) => (
              <li key={label}>
                <Link to={path} style={{
                  color: 'rgba(148,163,184,0.8)',
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.paddingLeft = '4px'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(148,163,184,0.8)'; e.currentTarget.style.paddingLeft = '0'; }}
                >
                  <span style={{ color: 'var(--primary-light)', fontSize: 10 }}>▶</span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── COLUMNA 3: Contacto ── */}
        <div>
          <h4 style={{
            color: '#fff',
            fontSize: '0.85rem',
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: 20,
            paddingBottom: 10,
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}>
            Contacto
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { icon: '📍', text: 'Av. Mecánica 1234, Santiago, Chile' },
              { icon: '📞', text: '+56 9 1234 5678' },
              { icon: '✉️', text: 'contacto@vrakben.cl' },
              { icon: '🕒', text: 'Lun - Vie: 09:00 - 18:00 hrs' },
            ].map(({ icon, text }) => (
              <li key={text} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                color: 'rgba(148,163,184,0.8)',
                fontSize: '0.9rem',
              }}>
                <span style={{
                  fontSize: 16,
                  flexShrink: 0,
                  marginTop: 1,
                  filter: 'grayscale(0.2)',
                }}>{icon}</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* BARRA DE COPYRIGHT */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.07)',
        padding: '20px 8%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <p style={{ color: 'rgba(148,163,184,0.6)', fontSize: '0.82rem', margin: 0 }}>
          © {year} VrakBen. Todos los derechos reservados.
        </p>
        <p style={{ color: 'rgba(148,163,184,0.4)', fontSize: '0.82rem', margin: 0 }}>
          Diseñado por Vicente, Ian y Benjamín 🚗
        </p>
      </div>
    </footer>
  );
}