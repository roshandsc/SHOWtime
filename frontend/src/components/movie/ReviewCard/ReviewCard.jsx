import React from 'react';

export const ReviewCard = ({ review }) => {
  return (
    <div style={{ background: 'var(--color-card)', padding: '20px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-card-border)', marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>{review.author || 'Anonymous Critic'}</div>
        <div style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>★ {review.rating || 9}/10</div>
      </div>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', lineHeight: '1.5', margin: 0 }}>
        {review.comment || 'A visual masterpiece with groundbreaking visual effects and an immersive storyline.'}
      </p>
    </div>
  );
};

export default ReviewCard;
