import React from 'react';
import Seat from '../Seat/Seat';

export const SeatMap = ({ selectedSeats = [], onToggleSeat }) => {
  const rows = [
    { name: 'Royal Recliner (₹450)', price: 450, letters: ['A', 'B'] },
    { name: 'Club (₹280)', price: 280, letters: ['C', 'D', 'E'] },
    { name: 'Executive (₹200)', price: 200, letters: ['F', 'G', 'H'] },
  ];

  const bookedSeats = ['A3', 'A4', 'C7', 'C8', 'D5', 'F2', 'F3'];

  return (
    <div className="seat-map-container" style={{ background: 'var(--color-card)', padding: '32px', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--color-card-border)' }}>
      {/* Screen Visualization */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div
          style={{
            height: '8px',
            background: 'linear-gradient(90deg, transparent, var(--color-primary), transparent)',
            borderRadius: '50%',
            marginBottom: '10px',
            boxShadow: '0 4px 20px var(--color-primary)',
          }}
        ></div>
        <div style={{ fontSize: '0.75rem', letterSpacing: '3px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
          SCREEN THIS WAY
        </div>
      </div>

      {/* Tiers & Grid */}
      {rows.map((tier) => (
        <div key={tier.name} style={{ marginBottom: '28px' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '4px' }}>
            {tier.name}
          </div>
          {tier.letters.map((rowLetter) => (
            <div key={rowLetter} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ width: '20px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>{rowLetter}</span>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                  const seatId = `${rowLetter}${num}`;
                  const isBooked = bookedSeats.includes(seatId);
                  const isSelected = selectedSeats.includes(seatId);
                  const status = isSelected ? 'selected' : isBooked ? 'booked' : 'available';

                  return (
                    <React.Fragment key={seatId}>
                      {num === 6 && <div style={{ width: '20px' }}></div>}
                      <Seat
                        id={seatId}
                        label={`${num}`}
                        price={tier.price}
                        status={status}
                        onSelect={() => onToggleSeat(seatId)}
                      />
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* Legend */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '36px', paddingTop: '20px', borderTop: '1px solid var(--color-card-border)', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: 'rgba(255,255,255,0.08)', border: '1px solid var(--color-card-border)' }}></div>
          Available
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: '#10b981' }}></div>
          Selected
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: '#374151' }}></div>
          Booked
        </div>
      </div>
    </div>
  );
};

export default SeatMap;
