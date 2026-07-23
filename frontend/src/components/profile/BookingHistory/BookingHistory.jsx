import React from 'react';
import { handleImageError } from '../../../utils/helpers';
import { formatCurrency } from '../../../utils/formatters';
import EmptyState from '../../common/EmptyState/EmptyState';

export const BookingHistory = ({ bookings = [], onCancelBooking }) => {
  if (!bookings || bookings.length === 0) {
    return <EmptyState icon="🎟️" title="No bookings found" description="You haven't booked any movie tickets yet." />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {bookings.map((b) => (
        <div
          key={b.id}
          style={{
            background: 'var(--color-card)',
            padding: '24px',
            borderRadius: 'var(--radius-2xl)',
            border: '1px solid var(--color-card-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
            <img
              src={b.posterUrl || b.poster}
              alt={b.movieTitle}
              onError={handleImageError}
              style={{ width: '70px', height: '100px', borderRadius: '10px', objectFit: 'cover' }}
            />
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: 700 }}>BOOKING #{b.id}</div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', margin: '4px 0' }}>{b.movieTitle}</h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                {b.theatreName} • {b.screenName || 'Screen 1'}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#fff', marginTop: '4px', fontWeight: 600 }}>
                {b.showDate || 'Today'} • {b.showTime} | Seats: {Array.isArray(b.seats) ? b.seats.join(', ') : b.seats}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
            <span
              style={{
                background: b.status === 'Confirmed' ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.08)',
                color: b.status === 'Confirmed' ? '#10b981' : 'var(--color-text-muted)',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '0.78rem',
                fontWeight: 700,
              }}
            >
              {b.status || 'Confirmed'}
            </span>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>{formatCurrency(b.totalAmount || 834)}</div>
            {b.status === 'Confirmed' && onCancelBooking && (
              <button
                onClick={() => onCancelBooking(b.id)}
                style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Cancel Ticket
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingHistory;
