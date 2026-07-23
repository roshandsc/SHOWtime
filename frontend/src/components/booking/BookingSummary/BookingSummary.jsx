import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const BookingSummary = ({ bookingData, onProceed }) => {
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const selectedSeats = bookingData?.seats || ['I12', 'I13'];
  const seatCount = selectedSeats.length || 2;
  const basePrice = 350;
  const ticketPriceTotal = seatCount * basePrice;
  const convenienceFee = 40;
  const bookASmileFee = 10;
  const taxes = 84;
  const discount = couponApplied ? 66 : 66;

  const totalAmount = ticketPriceTotal + convenienceFee + bookASmileFee + taxes;

  return (
    <div
      style={{
        background: '#11121a',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '18px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        position: 'sticky',
        top: '84px',
        boxSizing: 'border-box',
        width: '100%',
      }}
    >
      <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', margin: 0 }}>Booking Summary</h3>

      {/* Selected Movie Info Card */}
      <div style={{ display: 'flex', gap: '14px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '14px' }}>
        <img
          src={bookingData?.movie?.posterUrl || 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg'}
          alt="Poster"
          style={{ width: '60px', height: '84px', borderRadius: '8px', objectFit: 'cover' }}
        />
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff', margin: '0 0 4px' }}>
            {bookingData?.movie?.title || 'Dune: Part Two'}
          </h4>
          <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginBottom: '2px' }}>
            {bookingData?.showDate || 'Sat, 25 May 2024'} • {bookingData?.showTime || '07:30 PM'}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
            {bookingData?.theatreName || 'PVR: Orion Mall, Rajajinagar'}
          </div>
          <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Audi 4 • IMAX 2D</div>
        </div>
      </div>

      {/* Selected Seats Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px' }}>
        <div>
          <div style={{ fontSize: '0.78rem', color: '#9ca3af' }}>Selected Seats ({seatCount})</div>
          <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#10b981', marginTop: '2px' }}>
            {selectedSeats.join(', ')}
          </div>
        </div>
        <span style={{ background: 'rgba(126, 34, 206, 0.3)', color: '#c084fc', border: '1px solid rgba(168,85,247,0.4)', padding: '2px 8px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 800 }}>
          PREMIUM
        </span>
      </div>

      {/* Price Breakdown */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: '#9ca3af', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Ticket Price ({seatCount} × ₹{basePrice}.00)</span>
          <span style={{ color: '#fff' }}>₹{ticketPriceTotal}.00</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Convenience Fee ⓘ</span>
          <span style={{ color: '#fff' }}>₹{convenienceFee}.00</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>BookASmile Fee ⓘ</span>
          <span style={{ color: '#fff' }}>₹{bookASmileFee}.00</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Taxes & Charges ⓘ</span>
          <span style={{ color: '#fff' }}>₹{taxes}.00</span>
        </div>
      </div>

      {/* Total Amount */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '0.82rem', color: '#cbd5e1', fontWeight: 600 }}>Total Amount</div>
          <div style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700, marginTop: '2px' }}>
            You Save ₹{discount}.00 on this booking
          </div>
        </div>
        <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff' }}>₹{totalAmount}.00</div>
      </div>

      {/* Apply Coupon Box */}
      <div style={{ background: '#181a29', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#cbd5e1' }}>
          <span>🏷️</span>
          <span>Apply Coupon</span>
        </div>
        <span style={{ fontSize: '0.75rem', color: '#e50914', fontWeight: 700, cursor: 'pointer' }}>View offers</span>
      </div>

      {/* Proceed to Pay Button */}
      <button
        onClick={() => onProceed ? onProceed() : navigate('/payment')}
        style={{
          width: '100%',
          padding: '14px',
          borderRadius: '10px',
          background: '#e50914',
          border: 'none',
          color: '#fff',
          fontSize: '0.95rem',
          fontWeight: 800,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          boxShadow: '0 4px 15px rgba(229,9,20,0.4)',
        }}
      >
        <span>Proceed to Pay</span>
        <span>₹{totalAmount}.00</span>
        <span>➔</span>
      </button>

      {/* Payment Security Footer */}
      <div style={{ textAlign: 'center', fontSize: '0.72rem', color: '#64748b', marginTop: '4px' }}>
        🛡️ Secure Payment • 100% Safe & Encrypted
      </div>
    </div>
  );
};

export default BookingSummary;
