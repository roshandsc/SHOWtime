import React, { useState } from 'react';
import { MOCK_OFFERS } from '../../../constants/mockData';
import { useToast } from '../../../hooks/useToast';

export const CouponCard = ({ onApplyCoupon }) => {
  const [code, setCode] = useState('');
  const toast = useToast();

  const handleApply = (inputCode) => {
    const targetCode = (inputCode || code).trim().toUpperCase();
    if (!targetCode) {
      toast.warning('Please enter a coupon code.');
      return;
    }
    const match = MOCK_OFFERS.find((o) => o.code === targetCode);
    if (match) {
      toast.success(`Coupon ${match.code} applied! Discount ₹${match.discount}`);
      onApplyCoupon && onApplyCoupon(match);
      setCode(match.code);
    } else {
      toast.error('Invalid or expired coupon code.');
    }
  };

  return (
    <div style={{ background: 'var(--color-card)', padding: '20px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-card-border)', marginBottom: '20px' }}>
      <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff', margin: '0 0 12px' }}>Apply Coupon / Offer</h4>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="Enter promo code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-card-border)', color: '#fff', padding: '8px 14px', borderRadius: '8px', fontSize: '0.88rem', textTransform: 'uppercase' }}
        />
        <button className="btn btn-primary btn-sm" onClick={() => handleApply(code)}>
          Apply
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {MOCK_OFFERS.map((offer) => (
          <div key={offer.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '6px', border: '1px border-dashed var(--color-card-border)' }}>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--accent-gold)', fontSize: '0.82rem' }}>{offer.code}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{offer.title}</div>
            </div>
            <button onClick={() => handleApply(offer.code)} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}>
              Use Code
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CouponCard;
