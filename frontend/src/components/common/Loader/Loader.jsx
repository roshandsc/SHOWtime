import React from 'react';

export const Loader = ({ fullPage = false, message = 'Loading...' }) => {
  if (fullPage) {
    return (
      <div className="fullpage-loader" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '16px' }}>
        <div className="spinner" style={{ width: '48px', height: '48px', border: '4px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--color-primary)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>{message}</p>
      </div>
    );
  }

  return (
    <div className="spinner-inline" style={{ display: 'inline-block', width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.2)', borderTopColor: 'currentColor', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>
  );
};

export default Loader;
