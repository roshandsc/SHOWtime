import React from 'react';

export const Amenities = ({ items = [] }) => {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {items.map((item, i) => (
        <span
          key={i}
          style={{
            fontSize: '0.78rem',
            color: 'var(--color-text-muted)',
            background: 'rgba(255,255,255,0.05)',
            padding: '4px 10px',
            borderRadius: '6px',
            border: '1px solid var(--color-card-border)',
          }}
        >
          {item}
        </span>
      ))}
    </div>
  );
};

export default Amenities;
