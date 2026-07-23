import React from 'react';

export const ShowTimings = ({ dates = [], selectedDate, onSelectDate }) => {
  return (
    <div className="date-picker-bar" style={{ display: 'flex', gap: '12px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '8px' }}>
      {dates.map((d, idx) => (
        <button
          key={idx}
          onClick={() => onSelectDate(d.dayName)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '10px 20px',
            borderRadius: 'var(--radius-xl)',
            background: selectedDate === d.dayName ? 'var(--color-primary)' : 'var(--color-card)',
            border: '1.5px solid var(--color-card-border)',
            color: '#fff',
            cursor: 'pointer',
            minWidth: '75px',
          }}
        >
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.8 }}>{d.dayName}</span>
          <span style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: '2px' }}>{d.dayNum}</span>
          <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>{d.month}</span>
        </button>
      ))}
    </div>
  );
};

export default ShowTimings;
