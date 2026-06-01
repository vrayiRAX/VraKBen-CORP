// src/pages/Agendar.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import apiClient from '../services/apiClient';

const SERVICIOS = [
  { value: 'REVISION_25',   label: 'Revisión 25 Puntos',          icon: '🔍', desc: 'Diagnóstico completo del vehículo' },
  { value: 'CAMBIO_ACEITE', label: 'Cambio de Aceite y Filtro',   icon: '💧', desc: 'Incluye filtro original' },
  { value: 'FRENOS',        label: 'Revisión de Frenos',          icon: '🛑', desc: 'Sistema completo de frenos' },
  { value: 'MANTENIMIENTO', label: 'Mantenimiento General',        icon: '⚙️', desc: 'Mantención programada' },
  { value: 'OTRO',          label: 'Otro servicio',               icon: '🔧', desc: 'Especificar en el taller' },
];

const HORARIOS = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

function FormField({ label, required, children }) {
  return (
    <div>
      <label style={{ display: 'block', marginBottom: 8, fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-h)' }}>
        {label} {required && <span style={{ color: 'var(--danger)' }}>*</span>}
      </label>
      {children}
    </div>
  );
}

export default function Agendar({ isDarkMode }) {
  const { user } = useAuth();
  const [form, setForm] = useState({ serviceType: '', brand: '', model: '', plate: '', date: '', time: '', notes: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [step, setStep] = useState(1); // 1 = servicio, 2 = vehículo, 3 = fecha/hora

  const inputStyle = {
    width: '100%', boxSizing: 'border-box',
    padding: '11px 14px',
    background: 'var(--bg)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--text-h)',
    fontSize: '0.95rem',
    outline: 'none',
    fontFamily: 'var(--font)',
    transition: 'border-color 0.2s',
  };

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage({ text: '', type: '' });
    if (!form.serviceType || !form.date || !form.time) {
      setMessage({ text: 'Por favor completa el servicio, fecha y hora.', type: 'error' });
      return;
    }
    setLoading(true);
    try {
      await apiClient.post('/api/appointments', {
        customerUsername: user?.name,
        serviceType: form.serviceType,
        vehicleBrand: form.brand,
        vehicleModel: form.model,
        vehiclePlate: form.plate,
        appointmentDate: form.date,
        appointmentTime: form.time,
        notes: form.notes,
      });
      setMessage({ text: '¡Cita agendada exitosamente! Te contactaremos para confirmar en máximo 24 horas.', type: 'success' });
      setForm({ serviceType: '', brand: '', model: '', plate: '', date: '', time: '', notes: '' });
      setStep(1);
    } catch {
      setMessage({ text: 'Error al agendar. Por favor intenta nuevamente.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const servicioSeleccionado = SERVICIOS.find(s => s.value === form.serviceType);

  return (
    <div data-theme={isDarkMode ? 'dark' : 'light'} style={{ backgroundColor: 'var(--bg)', minHeight: '100vh', fontFamily: 'var(--font)' }}>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
        padding: '52px 8% 60px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.07) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 600 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 9999, padding: '5px 14px', fontSize: '0.78rem', fontWeight: 600, color: '#fff', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 16 }}>
            🗓 Agendamiento en línea
          </div>
          <h1 style={{ color: '#fff', margin: '0 0 12px', fontWeight: 900, letterSpacing: '-1px' }}>Agenda tu Servicio</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0, fontSize: '1.05rem' }}>
            Reserva en minutos. Te confirmamos tu hora en máximo 24 horas.
          </p>
        </div>
      </div>

      <div style={{ padding: '48px 8% 80px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>

          {/* Mensaje de éxito */}
          {message.type === 'success' && (
            <div style={{
              background: 'var(--success-bg)', border: '1px solid rgba(16,185,129,0.3)',
              borderRadius: 'var(--radius-lg)', padding: '28px 32px', marginBottom: 32,
              textAlign: 'center', animation: 'fadeInUp 0.4s ease',
            }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
              <h3 style={{ color: 'var(--success)', margin: '0 0 8px', fontWeight: 700 }}>¡Reserva enviada!</h3>
              <p style={{ color: 'var(--text-muted)', margin: 0 }}>{message.text}</p>
            </div>
          )}

          {/* Formulario principal */}
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
            {/* Barra de acento */}
            <div style={{ height: 4, background: 'linear-gradient(90deg, var(--primary-light), var(--accent))' }} />

            {/* Header del formulario */}
            <div style={{ padding: '28px 32px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 44, height: 44, background: 'linear-gradient(135deg, var(--primary-light), var(--accent))', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🔧</div>
                <div>
                  <h2 style={{ color: 'var(--text-h)', margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>Formulario de Agendamiento</h2>
                  <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.85rem' }}>Bienvenido, {user?.name || 'cliente'}</p>
                </div>
              </div>
            </div>

            {/* Cuerpo del formulario */}
            <form onSubmit={handleSubmit} style={{ padding: '32px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                {/* ── Tipo de servicio ── */}
                <FormField label="Tipo de Servicio" required>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10 }}>
                    {SERVICIOS.map(({ value, label, icon, desc }) => (
                      <button
                        key={value} type="button"
                        onClick={() => setForm(p => ({ ...p, serviceType: value }))}
                        style={{
                          padding: '14px 12px',
                          border: `2px solid ${form.serviceType === value ? 'var(--primary-light)' : 'var(--border)'}`,
                          borderRadius: 'var(--radius-md)',
                          background: form.serviceType === value ? 'rgba(37,99,235,0.08)' : 'var(--bg)',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'var(--transition)',
                          fontFamily: 'var(--font)',
                        }}
                      >
                        <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: form.serviceType === value ? 'var(--primary-light)' : 'var(--text-h)', lineHeight: 1.3 }}>{label}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 3 }}>{desc}</div>
                      </button>
                    ))}
                  </div>
                </FormField>

                {/* ── Datos del vehículo ── */}
                <div>
                  <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-h)', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 24, height: 24, background: 'var(--bg-secondary)', borderRadius: 6, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🚗</span>
                    Datos del Vehículo
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                    {[
                      { name: 'brand', label: 'Marca', placeholder: 'Toyota' },
                      { name: 'model', label: 'Modelo', placeholder: 'Yaris' },
                      { name: 'plate', label: 'Patente', placeholder: 'ABCD12' },
                    ].map(({ name, label, placeholder }) => (
                      <FormField key={name} label={label}>
                        <input
                          name={name} type="text" placeholder={placeholder}
                          value={form[name]} onChange={handleChange}
                          style={inputStyle}
                          onFocus={e => e.target.style.borderColor = 'var(--primary-light)'}
                          onBlur={e => e.target.style.borderColor = 'var(--border)'}
                        />
                      </FormField>
                    ))}
                  </div>
                </div>

                {/* ── Fecha y hora ── */}
                <div>
                  <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-h)', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 24, height: 24, background: 'var(--bg-secondary)', borderRadius: 6, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>📅</span>
                    Fecha y Hora Preferida
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <FormField label="Fecha" required>
                      <input
                        name="date" type="date" min={minDate}
                        value={form.date} onChange={handleChange} required
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = 'var(--primary-light)'}
                        onBlur={e => e.target.style.borderColor = 'var(--border)'}
                      />
                    </FormField>
                    <FormField label="Hora" required>
                      <select
                        name="time" value={form.time} onChange={handleChange} required
                        style={{ ...inputStyle, cursor: 'pointer' }}
                        onFocus={e => e.target.style.borderColor = 'var(--primary-light)'}
                        onBlur={e => e.target.style.borderColor = 'var(--border)'}
                      >
                        <option value="">Selecciona horario...</option>
                        {HORARIOS.map(h => (
                          <option key={h} value={h}>{h} hrs</option>
                        ))}
                      </select>
                    </FormField>
                  </div>
                </div>

                {/* ── Notas ── */}
                <FormField label="Notas adicionales (opcional)">
                  <textarea
                    name="notes" rows={3}
                    placeholder="Describe el problema o cualquier detalle relevante de tu vehículo..."
                    value={form.notes} onChange={handleChange}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }}
                    onFocus={e => e.target.style.borderColor = 'var(--primary-light)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                </FormField>

                {/* Error */}
                {message.type === 'error' && (
                  <div style={{ background: 'var(--danger-bg)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 'var(--radius-sm)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span>❌</span>
                    <p style={{ color: 'var(--danger)', margin: 0, fontSize: '0.88rem' }}>{message.text}</p>
                  </div>
                )}

                {/* Resumen rápido */}
                {(form.serviceType || form.date) && (
                  <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '16px 20px', display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                    {servicioSeleccionado && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span>{servicioSeleccionado.icon}</span>
                        <span style={{ color: 'var(--text-h)', fontSize: '0.88rem', fontWeight: 600 }}>{servicioSeleccionado.label}</span>
                      </div>
                    )}
                    {form.date && <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>📅 {form.date}</span>}
                    {form.time && <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>🕐 {form.time} hrs</span>}
                    {form.plate && <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>🚗 {form.plate}</span>}
                  </div>
                )}

                {/* Botón */}
                <button
                  type="submit" disabled={loading}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '15px', fontSize: '1rem', fontWeight: 700, opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
                >
                  {loading ? '⚙️ Enviando reserva...' : '📅 Confirmar Reserva'}
                </button>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', textAlign: 'center', margin: 0 }}>
                  🔒 Tus datos están protegidos. Te confirmaremos por correo o WhatsApp.
                </p>
              </div>
            </form>
          </div>

          {/* Información de contacto */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginTop: 28 }}>
            {[
              { icon: '📞', title: 'Teléfono', desc: '+56 9 1234 5678' },
              { icon: '🕒', title: 'Horario taller', desc: 'Lun - Vie: 09:00 - 18:00' },
              { icon: '✅', title: 'Confirmación', desc: 'En menos de 24 horas' },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '16px 20px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 22 }}>{icon}</span>
                <div>
                  <p style={{ color: 'var(--text-h)', margin: '0 0 3px', fontWeight: 700, fontSize: '0.85rem' }}>{title}</p>
                  <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.82rem' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}