import React from 'react';

export const TheatreFilters = ({ selectedAmenity, onSelectAmenity, searchQuery, onSearchChange }) => {
  const amenities = ['All', 'IMAX', '4DX', 'Dolby Atmos', 'Recliners', 'Food Court', 'Parking'];

  return (
    <div className="theatre-filter-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px', background: 'var(--color-card)', padding: '16px 24px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-card-border)' }}>
      <input
        type="text"
        placeholder="Filter by theatre name or area..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-card-border)', color: '#fff', padding: '8px 16px', borderRadius: 'var(--radius-lg)', width: '280px', fontSize: '0.88rem' }}
      />
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
        {amenities.map((a) => (
          <button
            key={a}
            onClick={() => onSelectAmenity(a)}
            style={{
              padding: '6px 14px',
              borderRadius: '16px',
              border: '1px solid var(--color-card-border)',
              background: selectedAmenity === a ? 'var(--color-primary)' : 'transparent',
              color: '#fff',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {a}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TheatreFilters;
