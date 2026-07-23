import React from 'react';

export const Seat = ({ id, status, label, price, onSelect }) => {
  const getSeatColor = () => {
    switch (status) {
      case 'selected':
        return '#10b981'; // Green
      case 'booked':
        return '#374151'; // Dark gray
      case 'vip':
        return '#8b5cf6'; // Purple
      default:
        return 'rgba(255,255,255,0.08)';
    }
  };

  return (
    <button
      disabled={status === 'booked'}
      onClick={() => onSelect(id)}
      title={`${label} - ₹${price}`}
      style={{
        width: '32px',
        height: '32px',
        borderRadius: '6px',
        border: status === 'selected' ? '2px solid #10b981' : '1px solid var(--color-card-border)',
        background: getSeatColor(),
        color: status === 'booked' ? '#6b7280' : '#fff',
        fontSize: '0.72rem',
        fontWeight: 700,
        cursor: status === 'booked' ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.15s ease',
      }}
    >
      {label}
    </button>
  );
};

export default Seat;
