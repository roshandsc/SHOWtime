import React from 'react';

export const StatsCard = ({ bookingsCount = 12, points = 8600, wishlistCount = 4 }) => {
  return (
    <div className="stats-grid">
      <div className="stat-item">
        <div className="stat-num">{bookingsCount}</div>
        <div className="stat-label">Bookings</div>
      </div>
      <div className="stat-item">
        <div className="stat-num">{points}</div>
        <div className="stat-label">Points</div>
      </div>
      <div className="stat-item">
        <div className="stat-num">{wishlistCount}</div>
        <div className="stat-label">Wishlist</div>
      </div>
    </div>
  );
};

export default StatsCard;
