import React from 'react';

export const EmptyState = ({ icon = '🎬', title = 'No results found', description = 'Try adjusting your search or filters.', actionText, onAction }) => {
  return (
    <div className="empty-state" style={{ textAlign: 'center', padding: '48px 24px', background: 'var(--color-card)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-card-border)', margin: '24px 0' }}>
      <div style={{ fontSize: '3rem', marginBottom: '16px' }}>{icon}</div>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>{title}</h3>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto 20px' }}>{description}</p>
      {actionText && onAction && (
        <button onClick={onAction} className="btn btn-primary btn-md">
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
