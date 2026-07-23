import React from 'react';
import { Link } from 'react-router-dom';

export const PageHeader = ({ title, subtitle, backLink, backText = 'Back', children }) => {
  return (
    <div className="page-header" style={{ marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {backLink && (
        <Link to={backLink} className="btn-back" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-muted)', fontSize: '0.88rem', textDecoration: 'none', width: 'fit-content' }}>
          ← {backText}
        </Link>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#fff', margin: 0 }}>{title}</h1>
          {subtitle && <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginTop: '6px', margin: 0 }}>{subtitle}</p>}
        </div>
        {children && <div>{children}</div>}
      </div>
    </div>
  );
};

export default PageHeader;
