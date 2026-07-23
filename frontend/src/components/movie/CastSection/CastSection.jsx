import React from 'react';

export const CastSection = ({ cast = [] }) => {
  if (!cast || cast.length === 0) return null;

  return (
    <section className="cast-section" style={{ marginTop: '40px' }}>
      <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '20px' }}>Cast & Crew</h3>
      <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '12px' }}>
        {cast.map((actor, idx) => (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', minWidth: '100px' }}>
            <img
              src={actor.profileUrl}
              alt={actor.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/80x80/181924/6b7280?text=?';
              }}
              style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-card-border)', marginBottom: '8px' }}
            />
            <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#fff' }}>{actor.name}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>{actor.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CastSection;
