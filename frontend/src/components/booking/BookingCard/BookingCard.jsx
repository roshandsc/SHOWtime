import React from 'react';
import { handleImageError } from '../../../utils/helpers';
import { formatCurrency } from '../../../utils/formatters';

export const BookingCard = ({
  booking,
  onViewTicket,
  onDownload,
  onActionClick,
}) => {
  if (!booking) return null;

  const seatsList = Array.isArray(booking.seats) ? booking.seats : (typeof booking.seats === 'string' ? booking.seats.split(',').map(s => s.trim()) : []);

  return (
    <div className="booking-card-item">
      <img
        src={booking.posterUrl || booking.poster}
        alt={booking.movieTitle}
        className="booking-poster"
        onError={handleImageError}
      />

      <div className="booking-main-info">
        <div className="booking-card-top">
          <div>
            <div className="card-title-row">
              <h3 className="card-movie-title">{booking.movieTitle}</h3>
              {booking.format && <span className="format-pill">{booking.format}</span>}
              {booking.imdbRating && (
                <span className="imdb-rating">★ {booking.imdbRating} (IMDb)</span>
              )}
            </div>
            <div className="card-meta-line">{booking.languages || 'English | Hindi'}</div>
          </div>

          <div className="status-badge-confirmed">
            <span>✔</span>
            <span>{booking.status || 'Confirmed'}</span>
          </div>
        </div>

        <div className="card-details-grid">
          <div>
            <span style={{ marginRight: '6px' }}>📅</span>
            <span>{booking.showDate || 'Sat, 26 Jul 2025'}</span>
            <span style={{ margin: '0 6px' }}>•</span>
            <span style={{ fontWeight: 700, color: '#fff' }}>{booking.showTime || '07:30 PM'}</span>
          </div>

          <div>
            <span style={{ color: '#9ca3af', marginRight: '6px' }}>Seats</span>
            {seatsList.map((seat, i) => (
              <span key={i} className="seat-chip">{seat}</span>
            ))}
            {booking.isPremium && <span className="gold-badge" style={{ fontSize: '0.68rem', padding: '1px 6px' }}>👑 Premium</span>}
          </div>

          <div>
            <span>{booking.theatreName || 'PVR Orion Mall'}</span>
          </div>

          <div>
            <span>{booking.audiInfo || 'Audi 4 • IMAX 2D'}</span>
          </div>

          <div className="booking-id-text">
            Booking ID: {booking.id}
          </div>
        </div>

        <div className="card-bottom-row">
          <div className="card-actions">
            <button className="btn-card-action-dark" onClick={() => onViewTicket && onViewTicket(booking)}>
              <span>♡</span>
              <span>View Ticket</span>
            </button>
            <button className="btn-card-action-dark" onClick={() => onDownload && onDownload(booking)}>
              <span>↓</span>
              <span>Download</span>
            </button>
            {booking.actionType === 'calendar' && (
              <button className="btn-card-action-red" onClick={() => onActionClick && onActionClick(booking, 'calendar')}>
                <span>📅</span>
                <span>Add to Calendar</span>
              </button>
            )}
            {booking.actionType === 'reschedule' && (
              <button className="btn-card-action-red" onClick={() => onActionClick && onActionClick(booking, 'reschedule')}>
                <span>📅</span>
                <span>Reschedule</span>
              </button>
            )}
            {booking.actionType === 'cancel' && (
              <button className="btn-card-action-red" onClick={() => onActionClick && onActionClick(booking, 'cancel')}>
                <span>🗑</span>
                <span>Cancel Booking</span>
              </button>
            )}
          </div>

          <div className="card-price">
            {formatCurrency(booking.totalAmount || 840)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
