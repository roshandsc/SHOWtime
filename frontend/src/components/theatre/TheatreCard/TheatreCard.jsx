import React from 'react';

export const TheatreCard = ({ theatre, onSelectShowtime }) => {
  const showtimes = theatre.showtimes || [
    { time: '10:30 AM', format: '2D', status: 'available' },
    { time: '01:45 PM', format: '3D', status: 'filling' },
    { time: '05:00 PM', format: 'IMAX 2D', status: 'full' },
    { time: '08:30 PM', format: '4DX', status: 'available' },
  ];

  return (
    <div style={{ background: 'var(--color-card)', padding: '24px', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--color-card-border)', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', margin: 0 }}>{theatre.name}</h3>
          <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
            {theatre.location || 'Bengaluru'} • {theatre.dist || '3.2 km away'}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>★ {theatre.rating || 4.5}</span>
          <span style={{ background: 'rgba(255,255,255,0.08)', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', color: '#fff' }}>
            {theatre.statusText || 'Available'}
          </span>
        </div>
      </div>

      {theatre.amenities && (
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {theatre.amenities.map((a, i) => (
            <span key={i} style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', background: 'rgba(255,255,255,0.04)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.06)' }}>
              {a}
            </span>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {showtimes.map((st, idx) => (
          <button
            key={idx}
            onClick={() => onSelectShowtime && onSelectShowtime(theatre.name, st.time)}
            disabled={st.status === 'full'}
            style={{
              padding: '10px 16px',
              borderRadius: 'var(--radius-lg)',
              border: '1.5px solid var(--color-card-border)',
              background: st.status === 'filling' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(255,255,255,0.03)',
              borderColor: st.status === 'filling' ? '#f59e0b' : 'var(--color-card-border)',
              color: st.status === 'full' ? 'var(--color-text-muted)' : '#fff',
              cursor: st.status === 'full' ? 'not-allowed' : 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minWidth: '90px',
              opacity: st.status === 'full' ? 0.5 : 1,
            }}
          >
            <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{st.time}</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>{st.format || '2D'}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TheatreCard;
