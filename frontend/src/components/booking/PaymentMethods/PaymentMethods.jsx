import React, { useState } from 'react';
import Input from '../../common/Input/Input';

export const PaymentMethods = ({ onPay, loading = false }) => {
  const [activeTab, setActiveTab] = useState('card');
  const [cardInfo, setCardInfo] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [upiId, setUpiId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onPay && onPay({ method: activeTab, details: activeTab === 'card' ? cardInfo : { upiId } });
  };

  return (
    <div style={{ background: 'var(--color-card)', padding: '28px', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--color-card-border)' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '20px' }}>Select Payment Method</h3>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', background: 'rgba(255,255,255,0.03)', padding: '4px', borderRadius: 'var(--radius-lg)' }}>
        {[
          { id: 'card', label: '💳 Credit/Debit Card' },
          { id: 'upi', label: '📱 UPI / QR' },
          { id: 'netbanking', label: '🏦 Net Banking' },
          { id: 'wallet', label: '👛 Wallets' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: activeTab === tab.id ? 'var(--color-primary)' : 'transparent',
              color: '#fff',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {activeTab === 'card' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <Input
              label="Card Number"
              placeholder="4532 •••• •••• 8923"
              value={cardInfo.number}
              onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
              required
            />
            <Input
              label="Cardholder Name"
              placeholder="Name on card"
              value={cardInfo.name}
              onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })}
              required
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Input
                label="Expiry Date"
                placeholder="MM/YY"
                value={cardInfo.expiry}
                onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                required
              />
              <Input
                label="CVV"
                type="password"
                placeholder="•••"
                value={cardInfo.cvv}
                onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                required
              />
            </div>
          </div>
        )}

        {activeTab === 'upi' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Input
              label="UPI ID"
              placeholder="username@okaxis / mobile@paytm"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              required
            />
            <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--color-card-border)' }}>
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=pay-showtime-booking" alt="UPI QR Code" style={{ borderRadius: '8px', margin: '0 auto' }} />
              <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>Scan with GPay, PhonePe, or Paytm</p>
            </div>
          </div>
        )}

        {(activeTab === 'netbanking' || activeTab === 'wallet') && (
          <div style={{ padding: '24px', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            Redirecting to secure bank gateway upon clicking Pay Now.
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary btn-md"
          style={{ width: '100%', marginTop: '24px', padding: '14px', fontSize: '1rem', fontWeight: 800 }}
        >
          {loading ? 'Processing Payment...' : '🔒 Pay & Confirm Booking'}
        </button>
      </form>
    </div>
  );
};

export default PaymentMethods;
