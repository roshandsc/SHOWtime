import React from 'react';
import { handleImageError } from '../../../utils/helpers';

export const DigitalTicket = ({ booking, onAction }) => {
  const ticketData = booking || {
    movieTitle: 'Interstellar',
    posterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    format: 'IMAX 2D',
    showDate: 'Sat, 26 Jul',
    showTime: '07:30 PM',
    theatreName: 'PVR Orion Mall, Rajajinagar',
    seats: 'A12, A13, A14',
    status: 'Confirmed',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ST789245678',
  };

  return (
    <div>
      <div className="ticket-card">
        <div className="ticket-top">
          <span className="ticket-title-text">Your Ticket</span>
          <span className="status-badge-confirmed" style={{ fontSize: '0.72rem', padding: '2px 8px' }}>
            <span>✔</span>
            <span>{ticketData.status || 'Confirmed'}</span>
          </span>
        </div>

        <div className="ticket-info-flex">
          <img
            src={ticketData.posterUrl || ticketData.poster}
            alt={ticketData.movieTitle}
            className="ticket-poster"
            onError={handleImageError}
          />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', margin: '0 0 4px' }}>
              {ticketData.movieTitle}
            </h4>
            {ticketData.format && <span className="format-pill" style={{ width: 'fit-content', marginBottom: '6px' }}>{ticketData.format}</span>}

            <div style={{ fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '2px' }}>
              📅 {ticketData.showDate || 'Sat, 26 Jul'} • {ticketData.showTime || '07:30 PM'}
            </div>
            <div style={{ fontSize: '0.73rem', color: '#9ca3af', marginBottom: '2px' }}>
              {ticketData.theatreName || 'PVR Orion Mall'}
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ffffff' }}>
              {Array.isArray(ticketData.seats) ? ticketData.seats.join(', ') : ticketData.seats}
            </div>
          </div>
        </div>

        <div className="ticket-divider"></div>

        {/* QR Code Container */}
        <div className="qr-box-wrap">
          <div className="qr-logo-row">
            <div className="logo-icon" style={{ width: '16px', height: '16px' }}>
              <div className="logo-icon-inner" style={{ width: '6px', height: '6px' }}></div>
            </div>
            <span>Show<span style={{ color: '#e50914' }}>Time</span></span>
          </div>

          <img
            src={ticketData.qrCode || `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ST789245678`}
            alt="Ticket QR"
            className="qr-code-img"
          />

          <div className="qr-subtext">Scan at the theatre entry</div>
        </div>
      </div>

      {/* Quick Action Icons Bar */}
      <div className="ticket-actions-bar">
        <button className="action-icon-btn" onClick={() => onAction && onAction('download')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span>Download</span>
        </button>

        <button className="action-icon-btn" onClick={() => onAction && onAction('share')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          <span>Share</span>
        </button>

        <button className="action-icon-btn" onClick={() => onAction && onAction('email')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <span>Email</span>
        </button>

        <button className="action-icon-btn" onClick={() => onAction && onAction('directions')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="3 11 22 2 13 21 11 13 3 11" />
          </svg>
          <span>Directions</span>
        </button>
      </div>
    </div>
  );
};

export default DigitalTicket;
