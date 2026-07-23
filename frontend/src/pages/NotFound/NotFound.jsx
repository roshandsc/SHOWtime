import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 24px' }}>
      <div style={{ fontSize: '6rem', fontWeight: 900, color: 'var(--color-primary)', lineHeight: 1 }}>404</div>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', margin: '16px 0 8px' }}>Page Not Found</h1>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', maxWidth: '440px', marginBottom: '28px' }}>
        The page you are looking for doesn't exist or has been moved. Let's get you back to the movies!
      </p>
      <Link to="/" className="btn btn-primary btn-md">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
