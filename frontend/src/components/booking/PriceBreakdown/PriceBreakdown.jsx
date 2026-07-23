import React from 'react';
import { formatCurrency } from '../../../utils/formatters';

export const PriceBreakdown = ({ seats = [], discount = 0 }) => {
  const calculateBasePrice = () => {
    let sum = 0;
    seats.forEach((s) => {
      const row = s[0];
      if (['A', 'B'].includes(row)) sum += 450;
      else if (['C', 'D', 'E'].includes(row)) sum += 280;
      else sum += 200;
    });
    return sum;
  };

  const basePrice = calculateBasePrice();
  const convFee = seats.length ? 30 * seats.length : 0;
  const gst = seats.length ? Math.round(convFee * 0.18) : 0;
  const grandTotal = Math.max(0, basePrice + convFee + gst - discount);

  return (
    <div className="price-breakdown" style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)' }}>
        <span>Ticket Base Price ({seats.length} seats)</span>
        <span style={{ color: '#fff', fontWeight: 600 }}>{formatCurrency(basePrice)}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)' }}>
        <span>Convenience Fee</span>
        <span style={{ color: '#fff', fontWeight: 600 }}>{formatCurrency(convFee)}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)' }}>
        <span>Integrated GST (18%)</span>
        <span style={{ color: '#fff', fontWeight: 600 }}>{formatCurrency(gst)}</span>
      </div>

      {discount > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981', fontWeight: 600 }}>
          <span>Promo Discount</span>
          <span>-{formatCurrency(discount)}</span>
        </div>
      )}

      <div style={{ borderTop: '1px dashed var(--color-card-border)', paddingTop: '12px', marginTop: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 800, fontSize: '1rem', color: '#fff' }}>Amount Payable</span>
        <span style={{ fontWeight: 900, fontSize: '1.3rem', color: 'var(--color-primary)' }}>{formatCurrency(grandTotal)}</span>
      </div>
    </div>
  );
};

export default PriceBreakdown;
