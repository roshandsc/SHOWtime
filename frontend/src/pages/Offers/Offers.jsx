import React from 'react';
import PageHeader from '../../components/layout/PageHeader/PageHeader';
import { MOCK_OFFERS } from '../../constants/mockData';
import { useToast } from '../../hooks/useToast';

export const Offers = () => {
  const toast = useToast();

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    toast.success(`Promo code ${code} copied to clipboard!`);
  };

  return (
    <div style={{ padding: '40px var(--container-padding, 2.5rem)' }}>
      <PageHeader title="Exclusive Offers & Promo Codes" subtitle="Save big on movie tickets, food & beverages with our top bank & card discounts." />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px', marginTop: '24px' }}>
        {MOCK_OFFERS.map((offer) => (
          <div
            key={offer.id}
            style={{
              background: 'var(--color-card)',
              padding: '28px',
              borderRadius: 'var(--radius-2xl)',
              border: '1px solid var(--color-card-border)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', top: '-10px', right: '-10px', background: 'var(--color-primary)', color: '#fff', padding: '16px 28px', transform: 'rotate(12deg)', fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase' }}>
              OFFER
            </div>

            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
                VALID TILL {offer.validTill}
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', margin: '0 0 10px' }}>{offer.title}</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', lineHeight: '1.5', marginBottom: '24px' }}>{offer.desc}</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '10px 16px', borderRadius: 'var(--radius-lg)', border: '1px border-dashed var(--color-card-border)' }}>
              <span style={{ fontFamily: 'monospace', fontWeight: 900, fontSize: '1.1rem', color: 'var(--color-primary)', letterSpacing: '1px' }}>{offer.code}</span>
              <button
                onClick={() => handleCopyCode(offer.code)}
                style={{ background: 'none', border: 'none', color: '#fff', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}
              >
                📋 Copy Code
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
