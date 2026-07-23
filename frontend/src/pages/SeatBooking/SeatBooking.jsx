import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BookingSummary from '../../components/booking/BookingSummary/BookingSummary';
import { useBooking } from '../../hooks/useBooking';
import { useToast } from '../../hooks/useToast';

export const SeatBooking = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [searchParams] = useSearchParams();
  const { bookingData, updateBooking } = useBooking();

  const [selectedSeats, setSelectedSeats] = useState(['I12', 'I13']);
  const [zoomLevel, setZoomLevel] = useState(1);

  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
  const seatsPerRow = 14;

  const reservedSeats = ['D4', 'D5', 'D6', 'D7', 'D10', 'F8'];
  const occupiedSeats = ['E2', 'E3', 'E8', 'E9', 'E10'];

  const toggleSeat = (seatId) => {
    if (reservedSeats.includes(seatId) || occupiedSeats.includes(seatId)) {
      toast.warn('This seat is unavailable');
      return;
    }
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
    } else {
      if (selectedSeats.length >= 8) {
        toast.warn('Maximum 8 seats allowed per booking');
        return;
      }
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      toast.warn('Please select at least one seat to proceed');
      return;
    }
    updateBooking({ seats: selectedSeats });
    navigate('/payment');
  };

  return (
    <div style={{ background: '#08090d', minHeight: '100vh', padding: '16px 32px 60px', color: '#fff', boxSizing: 'border-box', overflowX: 'hidden' }}>
      
      {/* Stepper Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
          ← Back
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '0.85rem', fontWeight: 700 }}>
          <span style={{ color: '#9ca3af' }}>① Select Show</span>
          <span style={{ color: '#e50914', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ background: '#e50914', color: '#fff', width: '20px', height: '20px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>2</span>
            Select Seats
          </span>
          <span style={{ color: '#64748b' }}>③ Review & Pay</span>
        </div>

        <div style={{ width: '60px' }}></div>
      </div>

      {/* Selected Movie & Show Info Header Card */}
      <div style={{ background: '#11121a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <img src="https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg" alt="Dune" style={{ width: '40px', height: '56px', borderRadius: '6px', objectFit: 'cover' }} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', margin: 0 }}>Dune: Part Two</h3>
              <span style={{ fontSize: '0.7rem', color: '#9ca3af', border: '1px solid rgba(255,255,255,0.2)', padding: '1px 6px', borderRadius: '4px' }}>UA 13+</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '2px' }}>
              2h 46m • Action, Adventure, Drama • English, Hindi, Tamil, Telugu • 2D, IMAX 2D
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '24px', fontSize: '0.8rem' }}>
          <div>
            <div style={{ color: '#fff', fontWeight: 700 }}>Sat, 25 May</div>
            <div style={{ color: '#e50914', cursor: 'pointer', fontSize: '0.72rem' }}>Change Date</div>
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 700 }}>07:30 PM</div>
            <div style={{ color: '#e50914', cursor: 'pointer', fontSize: '0.72rem' }}>Change Time</div>
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 700 }}>PVR: Orion Mall, Rajajinagar</div>
            <div style={{ color: '#9ca3af', fontSize: '0.72rem' }}>Audi 4 • IMAX 2D • <span style={{ color: '#e50914', cursor: 'pointer' }}>Change Theatre</span></div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Seat Map + Right Booking Summary Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 370px', gap: '20px', maxWidth: '1280px', margin: '0 auto', width: '100%', alignItems: 'start' }}>
        
        {/* Left Column Seat Layout */}
        <div style={{ background: '#11121a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '18px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* Seat Legend */}
          <div style={{ display: 'flex', gap: '20px', fontSize: '0.78rem', color: '#9ca3af', marginBottom: '24px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '14px', height: '14px', borderRadius: '4px', background: '#334155' }}></span> Available</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '14px', height: '14px', borderRadius: '4px', background: '#10b981' }}></span> Selected</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '14px', height: '14px', borderRadius: '4px', background: '#f59e0b' }}></span> Reserved</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '14px', height: '14px', borderRadius: '4px', background: '#ef4444' }}></span> Occupied</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '14px', height: '14px', borderRadius: '4px', background: '#7e22ce' }}></span> Premium</span>
          </div>

          {/* Curved Screen Indicator Bar */}
          <div style={{ width: '80%', margin: '0 auto 30px', textAlign: 'center' }}>
            <div style={{ height: '8px', borderTop: '2px solid #38bdf8', borderRadius: '50%', boxShadow: '0 -4px 12px rgba(56, 189, 248, 0.5)' }}></div>
            <div style={{ fontSize: '0.7rem', color: '#9ca3af', letterSpacing: '2px', marginTop: '6px', fontWeight: 700 }}>SCREEN THIS WAY</div>
          </div>

          {/* Seat Rows Matrix A to K */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', transform: `scale(${zoomLevel})`, transformOrigin: 'top center', transition: 'transform 0.2s ease', maxWidth: '100%', overflowX: 'auto', paddingBottom: '10px' }}>
            {rows.map((row) => (
              <div key={row} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '20px', fontSize: '0.75rem', color: '#64748b', fontWeight: 700 }}>{row}</span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {Array.from({ length: seatsPerRow }, (_, i) => i + 1).map((num) => {
                    const seatId = `${row}${num}`;
                    const isSelected = selectedSeats.includes(seatId);
                    const isReserved = reservedSeats.includes(seatId);
                    const isOccupied = occupiedSeats.includes(seatId);
                    const isPremium = row === 'H' || row === 'I' || row === 'J' || row === 'K';

                    let bg = '#1e293b';
                    if (isPremium) bg = '#3b0764';
                    if (isReserved) bg = '#b45309';
                    if (isOccupied) bg = '#991b1b';
                    if (isSelected) bg = '#10b981';

                    return (
                      <button
                        key={seatId}
                        onClick={() => toggleSeat(seatId)}
                        disabled={isReserved || isOccupied}
                        title={seatId}
                        style={{
                          width: '26px',
                          height: '24px',
                          borderRadius: '5px 5px 2px 2px',
                          background: bg,
                          border: isSelected ? '2px solid #6ee7b7' : '1px solid rgba(255,255,255,0.1)',
                          color: '#fff',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          cursor: isReserved || isOccupied ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {num}
                      </button>
                    );
                  })}
                </div>
                <span style={{ width: '20px', fontSize: '0.75rem', color: '#64748b', fontWeight: 700, textAlign: 'right' }}>{row}</span>
              </div>
            ))}
          </div>

          {/* Bottom Zoom Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '24px', background: '#181a29', padding: '6px 16px', borderRadius: '20px', fontSize: '0.8rem' }}>
            <button onClick={() => setZoomLevel(Math.max(0.8, zoomLevel - 0.1))} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>-</button>
            <input type="range" min="0.8" max="1.2" step="0.05" value={zoomLevel} onChange={(e) => setZoomLevel(parseFloat(e.target.value))} style={{ width: '100px', accentColor: '#e50914' }} />
            <button onClick={() => setZoomLevel(Math.min(1.2, zoomLevel + 0.1))} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>+</button>
            <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>Zoom</span>
            <button onClick={() => setZoomLevel(1)} style={{ background: 'none', border: 'none', color: '#e50914', cursor: 'pointer', fontWeight: 700, marginLeft: '8px' }}>Reset</button>
          </div>
        </div>

        {/* Right Column Sticky Booking Summary */}
        <BookingSummary bookingData={{ ...bookingData, seats: selectedSeats }} onProceed={handleProceed} />
      </div>
    </div>
  );
};

export default SeatBooking;
