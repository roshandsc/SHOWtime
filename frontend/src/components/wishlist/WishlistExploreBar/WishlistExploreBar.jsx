import React from 'react';
import { useNavigate } from 'react-router-dom';

export const WishlistExploreBar = () => {
  const navigate = useNavigate();

  return (
    <div className="wishlist-explore-banner">
      <div className="explore-left-flex">
        <div className="heart-outline-box">
          ♡
        </div>
        <div>
          <h3 className="explore-title">Can't find a movie?</h3>
          <p className="explore-sub">Search any movie and add it to your wishlist.</p>
        </div>
      </div>

      <button className="btn-explore-movies" onClick={() => navigate('/movies')}>
        <span>Explore Movies</span>
        <span>›</span>
      </button>
    </div>
  );
};

export default WishlistExploreBar;
