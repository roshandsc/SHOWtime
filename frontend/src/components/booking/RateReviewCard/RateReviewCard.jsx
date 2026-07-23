import React, { useState } from 'react';
import { useToast } from '../../../hooks/useToast';

export const RateReviewCard = ({ onRateSubmitted }) => {
  const [rating, setRating] = useState(5);
  const toast = useToast();

  const handleRate = () => {
    toast.success('Thank you for rating! 200 reward points added to your account.');
    if (onRateSubmitted) onRateSubmitted(rating);
  };

  return (
    <div className="review-reward-card">
      <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff', margin: '0 0 4px' }}>
        Loved your experience?
      </h4>
      <p style={{ fontSize: '0.78rem', color: '#93c5fd', margin: '0 0 12px', maxWidth: '180px', lineHeight: '1.3' }}>
        Rate your movie and earn 200 reward points!
      </p>

      {/* Interactive Rating Stars */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            style={{
              background: 'none',
              border: 'none',
              color: star <= rating ? '#fbbf24' : '#475569',
              fontSize: '1.2rem',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            ★
          </button>
        ))}
      </div>

      <button
        className="btn-card-action-dark"
        onClick={handleRate}
        style={{ background: 'rgba(59, 130, 246, 0.2)', borderColor: 'rgba(59, 130, 246, 0.4)', color: '#60a5fa', fontWeight: 800, padding: '6px 16px' }}
      >
        Rate Now
      </button>
    </div>
  );
};

export default RateReviewCard;
