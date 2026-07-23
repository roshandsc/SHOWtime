import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-light)',
        padding: '2.5rem 2.5rem',
        background: '#080910',
        marginTop: '5rem',
        color: 'var(--text-muted)',
        fontSize: '0.85rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#fff',
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: '1.2rem',
        }}
      >
        <div className="logo-icon" style={{ width: '22px', height: '22px' }}>
          <div className="logo-icon-inner" style={{ width: '8px', height: '8px' }}></div>
        </div>
        <span>
          Show<span style={{ color: 'var(--primary)' }}>Time</span>
        </span>
      </div>
      <div>© 2026 ShowTime. All rights reserved. Premium Ticket Booking Experience.</div>
    </footer>
  );
};

export default Footer;
