import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MOCK_BOOKINGS } from '../../constants/mockData';
import { formatCurrency } from '../../utils/formatters';

export const BookingConfirmation = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('bookingId') || 'BMS-982341';
  const booking = MOCK_BOOKINGS[0];

  return (
    <div style={{ padding: '60px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', color: '#fff', boxShadow: '0 10px 30px rgba(16,185,129,0.4)', marginBottom: '24px' }}>
        ✓
      </div>

      <h1 style={{ fontSize: '2.25rem', fontWeight: 900, color: '#fff', margin: 0 }}>Booking Confirmed!</h1>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', marginTop: '8px', marginBottom: '36px' }}>
        Your tickets have been sent to your email and SMS. Enjoy your movie!
      </p>

      {/* Ticket Pass Card */}
      <div style={{ background: 'var(--color-card)', border: '1px solid var(--color-card-border)', borderRadius: 'var(--radius-2xl)', padding: '32px', maxWidth: '520px', width: '100%', textAlign: 'left', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--color-card-border)', paddingBottom: '16px', marginBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: 800 }}>BOOKING ID</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#fff' }}>{bookingId}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>STATUS</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#10b981' }}>Confirmed</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '24px' }}>
          <img src={booking.posterUrl} alt={booking.movieTitle} style={{ width: '90px', borderRadius: '10px', objectFit: 'cover' }} />
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#fff', margin: '0 0 6px' }}>{booking.movieTitle}</h3>
            <div style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>{booking.theatreName} • Screen 3</div>
            <div style={{ fontSize: '0.88rem', color: '#fff', fontWeight: 700, marginTop: '6px' }}>{booking.showDate} | {booking.showTime}</div>
            <div style={{ fontSize: '0.88rem', color: 'var(--color-primary)', fontWeight: 800, marginTop: '4px' }}>Seats: {booking.seats.join(', ')}</div>
          </div>
        </div>

        <div style={{ textAlign: 'center', paddingTop: '16px', borderTop: '1px dashed var(--color-card-border)' }}>
          <img src={booking.qrCode} alt="Ticket QR Code" style={{ borderRadius: '8px', margin: '0 auto 8px', width: '130px', height: '130px' }} />
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Scan this QR code at cinema entrance</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginTop: '36px' }}>
        <Link to="/my-bookings" className="btn btn-primary btn-md">
          View My Bookings
        </Link>
        <Link to="/" className="btn btn-outline btn-md">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default BookingConfirmation;
