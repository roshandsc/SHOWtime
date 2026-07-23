import React from 'react';
import { useNavigate } from 'react-router-dom';
import { handleImageError } from '../../../utils/helpers';
import Badge from '../../common/Badge/Badge';

export const MovieCard = ({ movie, isGrid = false, onPlayTrailer }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/movie-details/${movie.id}`);
  };

  const handleBookClick = (e) => {
    e.stopPropagation();
    navigate(`/movie-details/${movie.id}`);
  };

  const handleTrailerClick = (e) => {
    e.stopPropagation();
    if (onPlayTrailer && movie.trailerUrl) {
      onPlayTrailer(movie.trailerUrl);
    }
  };

  return (
    <article
      className={`movie-card${isGrid ? ' movie-card--grid' : ''}`}
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      aria-label={`View ${movie.title}`}
    >
      <div className="movie-poster-wrap">
        <img
          src={movie.posterUrl || movie.poster}
          alt={`Poster for ${movie.title}`}
          loading="lazy"
          crossOrigin="anonymous"
          onError={handleImageError}
        />
        {movie.trending && <span className="card-badge-trending">Trending</span>}
        <div className="card-bottom-rating">
          <span style={{ color: 'var(--accent-gold)' }}>★</span>
          {movie.rating || '—'}
        </div>
        <div className="movie-card-overlay" aria-hidden="true">
          <button className="btn-card-book movie-card__quick-book" onClick={handleBookClick}>
            Book Now
          </button>
          {movie.trailerUrl && (
            <button className="btn-card-trailer movie-card__play-trailer" onClick={handleTrailerClick}>
              ▶ Trailer
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default MovieCard;
