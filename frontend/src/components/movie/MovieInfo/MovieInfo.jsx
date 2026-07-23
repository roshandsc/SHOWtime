import React from 'react';
import { handleImageError } from '../../../utils/helpers';
import Badge from '../../common/Badge/Badge';

export const MovieInfo = ({ movie, onBookClick, onPlayTrailer, isWishlisted, onToggleWishlist }) => {
  if (!movie) return null;

  const genres = Array.isArray(movie.genre) ? movie.genre : [movie.genre || 'Action'];

  return (
    <div className="movie-details-hero" style={{ position: 'relative', borderRadius: 'var(--radius-2xl)', overflow: 'hidden', padding: '40px', background: 'var(--color-card)', border: '1px solid var(--color-card-border)', display: 'flex', gap: '36px', flexWrap: 'wrap' }}>
      <div
        className="details-bg"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${movie.backdropUrl || movie.posterUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15,
          filter: 'blur(10px)',
        }}
      ></div>

      <div style={{ position: 'relative', zIndex: 2, flexShrink: 0 }}>
        <img
          src={movie.posterUrl || movie.poster}
          alt={movie.title}
          onError={handleImageError}
          style={{ width: '220px', borderRadius: 'var(--radius-xl)', boxShadow: '0 12px 30px rgba(0,0,0,0.6)' }}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 2, flex: 1, minWidth: '280px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff', margin: 0 }}>{movie.title}</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '12px 0 16px', flexWrap: 'wrap' }}>
          <span style={{ background: 'var(--color-primary)', color: '#fff', fontWeight: 800, padding: '4px 10px', borderRadius: '6px', fontSize: '0.9rem' }}>
            ★ {movie.rating || '8.5'} / 10
          </span>
          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>•</span>
          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{movie.duration || '2h 30m'}</span>
          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>•</span>
          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{movie.ageRating || 'UA 13+'}</span>
          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>•</span>
          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{movie.language || 'English'}</span>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {genres.map((g) => (
            <Badge key={g} genre={g}>{g}</Badge>
          ))}
        </div>

        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px', maxWidth: '700px' }}>
          {movie.description}
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <button className="btn btn-primary btn-md" onClick={onBookClick}>
            Book Tickets
          </button>
          {movie.trailerUrl && (
            <button className="btn btn-outline btn-md" onClick={() => onPlayTrailer(movie.trailerUrl)}>
              ▶ Trailer
            </button>
          )}
          <button className="btn btn-ghost btn-md" onClick={onToggleWishlist} style={{ color: isWishlisted ? 'var(--color-primary)' : '#fff' }}>
            {isWishlisted ? '❤️ In Wishlist' : '🤍 Add to Wishlist'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
