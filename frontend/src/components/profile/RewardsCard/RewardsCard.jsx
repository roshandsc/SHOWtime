import React from 'react';

export const RewardsCard = ({ currentProgress = 4, targetProgress = 7 }) => {
  return (
    <div className="rewards-card">
      <div className="rewards-icon-badge">👑</div>
      <h4 className="rewards-title">Earn more rewards!</h4>
      <p className="rewards-sub">Book 3 more movies to unlock Platinum Pass</p>

      <div className="rewards-progress-bar">
        <div
          className="rewards-progress-fill"
          style={{ width: `${(currentProgress / targetProgress) * 100}%` }}
        ></div>
      </div>
      <div className="rewards-count">
        {currentProgress}/{targetProgress}
      </div>
    </div>
  );
};

export default RewardsCard;
