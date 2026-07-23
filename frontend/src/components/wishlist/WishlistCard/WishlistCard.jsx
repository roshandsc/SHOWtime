import React from 'react';
import { useNavigate } from 'react-router-dom';
import { handleImageError } from '../../../utils/helpers';

export const WishlistCard = ({ movie, onRemove, onToggleFavorite }) => {
  const navigate = useNavigate();

  if (!movie) return null;

  const handleBookNow = (e) => {
    e.stopPropagation();
    navigate(`/movie-details/${movie.id}`);
  };

  const handleRemoveClick = (e) => {
    e.stopPropagation();
    if (onRemove) onRemove(movie);
  };

  const handleHeartClick = (e) => {
    e.stopPropagation();
    if (onToggleFavorite) onToggleFavorite(movie);
  };

  return (
    <div className="wishlist-card">
      <div className="wishlist-poster-wrap">
        <img
          src={movie.posterUrl || movie.poster}
          alt={movie.title}
          onError={handleImageError}
        />
        <button
          className="btn-remove-float"
          onClick={handleRemoveClick}
          aria-label={`Remove ${movie.title} from wishlist`}
          title="Remove from wishlist"
        >
          ×
        </button>
        <button
          className="btn-heart-float"
          onClick={handleHeartClick}
          aria-label="Wishlist heart icon"
        >
          ❤️
        </button>
      </div>

      <h4 className="wishlist-card-title" title={movie.title}>
        {movie.title}
      </h4>

      <div className="wishlist-card-info1">
        <span className="wishlist-card-rating">★ {movie.rating || '8.5'}</span>
        <span>•</span>
        <span>{movie.duration || '2h 30m'}</span>
      </div>

      <div className="wishlist-card-info2">
        {movie.language || 'English'} • {movie.format || '2D'}
      </div>

      <button className="btn-book-now-outline" onClick={handleBookNow}>
        Book Now
      </button>
    </div>
  );
};

export default WishlistCard;
