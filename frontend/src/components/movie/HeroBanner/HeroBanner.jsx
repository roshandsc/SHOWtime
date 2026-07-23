import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_MOVIES } from '../../../constants/mockData';

export const HeroBanner = ({ movie, movies, onPlayTrailer }) => {
  const navigate = useNavigate();

  // Normalize movie list to slide through
  const movieList = Array.isArray(movies) && movies.length > 0
    ? movies
    : (movie ? [movie] : MOCK_MOVIES);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    if (currentIndex >= movieList.length) {
      setCurrentIndex(0);
    }
  }, [movieList, currentIndex]);

  // Auto-play slideshow every 5 seconds
  useEffect(() => {
    if (movieList.length <= 1) return;

    timerRef.current = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % movieList.length);
        setFade(true);
      }, 250);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [movieList.length, currentIndex]);

  const handleDotClick = (index) => {
    if (index === currentIndex) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setFade(false);
    setTimeout(() => {
      setCurrentIndex(index);
      setFade(true);
    }, 200);
  };

  const currentMovie = movieList[currentIndex] || movieList[0];
  if (!currentMovie) return null;

  const isKalki = currentMovie.title && currentMovie.title.toLowerCase().includes('kalki');
  const genresText = Array.isArray(currentMovie.genre)
    ? currentMovie.genre.join(' • ')
    : (currentMovie.genre || 'Action • Sci-Fi • Adventure');

  return (
    <section
      className="hero-container"
      id="heroSection"
      aria-label="Featured movie"
      style={{
        position: 'relative',
        height: '520px',
        width: '100%',
        overflow: 'hidden',
        background: '#0b0c10',
        marginBottom: '2.75rem',
      }}
    >
      {/* Background Image with Fade Transition */}
      <div
        className="hero-bg"
        style={{
          backgroundImage: `url(${currentMovie.backdropUrl || currentMovie.posterUrl || 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&q=80'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          opacity: fade ? 1 : 0.3,
          transition: 'opacity 0.4s ease-in-out',
        }}
      ></div>

      {/* Ambient Gradients for Contrast & Legibility */}
      <div
        className="hero-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, #0b0c10 0%, rgba(11,12,16,0.85) 40%, rgba(11,12,16,0.2) 70%, transparent 100%), linear-gradient(to top, #0b0c10 0%, transparent 35%)',
        }}
      ></div>

      {/* Hero Left Content Block (Title, Metadata, Synopsis, Buttons) */}
      <div
        className="hero-content"
        style={{
          position: 'absolute',
          bottom: '3.5rem',
          left: '2.5rem',
          maxWidth: '540px',
          zIndex: 10,
          opacity: fade ? 1 : 0.4,
          transition: 'opacity 0.3s ease-in-out',
        }}
      >
        {/* Title / Logo */}
        {isKalki ? (
          <div style={{ marginBottom: '0.9rem' }}>
            <div
              style={{
                fontFamily: 'serif, system-ui',
                fontSize: '3.25rem',
                fontWeight: 900,
                letterSpacing: '14px',
                background: 'linear-gradient(180deg, #fff7d6 0%, #e5a93c 50%, #8f5c10 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textTransform: 'uppercase',
                lineHeight: 1,
                filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.8))',
              }}
            >
              KALKI
            </div>
            <div
              style={{
                fontSize: '0.85rem',
                letterSpacing: '10px',
                color: '#d4af37',
                fontWeight: 800,
                marginTop: '4px',
                textTransform: 'uppercase',
              }}
            >
              2 8 9 8 - A . D
            </div>
          </div>
        ) : (
          <h1
            className="hero-title-logo"
            style={{
              fontSize: '3.25rem',
              fontWeight: 900,
              color: '#fff',
              lineHeight: '1.05',
              letterSpacing: '3px',
              margin: '0 0 0.9rem',
              textShadow: '0 4px 30px rgba(0,0,0,0.9)',
            }}
          >
            {currentMovie.title}
          </h1>
        )}

        {/* Metadata Row */}
        <div
          className="hero-meta-row"
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.6rem',
            fontSize: '0.88rem',
            color: '#94a3b8',
            marginBottom: '0.85rem',
          }}
        >
          <span>{genresText}</span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span>{currentMovie.duration || '2h 30m'}</span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span
            className="hero-meta-badge"
            style={{
              background: 'rgba(255,255,255,0.12)',
              padding: '0.15rem 0.5rem',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: 600,
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff',
            }}
          >
            {currentMovie.ageRating || 'UA 13+'}
          </span>
        </div>

        {/* Description */}
        <p
          className="hero-desc"
          style={{
            fontSize: '0.93rem',
            color: '#c0c8dc',
            lineHeight: '1.65',
            marginBottom: '1.75rem',
            textShadow: '0 2px 12px rgba(0,0,0,0.9)',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {currentMovie.description || 'A glimpse into the future of 2898 AD. When darkness threatens to consume the world, a savior rises.'}
        </p>

        {/* Hero Action Buttons */}
        <div className="hero-buttons" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            className="btn-book"
            onClick={() => navigate(`/movie-details/${currentMovie.id}`)}
            style={{
              background: '#e50914',
              color: '#fff',
              border: 'none',
              padding: '0.72rem 2rem',
              borderRadius: '9999px',
              fontWeight: 700,
              fontSize: '0.92rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(229,9,20,0.45)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 28px rgba(229,9,20,0.55)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(229,9,20,0.45)';
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 4v8h16V8H4zm4 2h8v4H8v-4z" />
            </svg>
            Book Tickets
          </button>

          <button
            className="btn-trailer-hero"
            onClick={() => onPlayTrailer && onPlayTrailer(currentMovie.trailerUrl || 'https://www.youtube.com/embed/YoHD9XEInc0')}
            style={{
              background: 'rgba(255,255,255,0.1)',
              color: '#fff',
              border: '1.5px solid rgba(255,255,255,0.3)',
              padding: '0.72rem 1.7rem',
              borderRadius: '9999px',
              fontWeight: 600,
              fontSize: '0.92rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.borderColor = '#fff';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span style={{ fontSize: '0.85rem' }}>▶</span> Watch Trailer
          </button>
        </div>
      </div>

      {/* Glass Rating Box (Pinned Top-Right) */}
      <div
        className="hero-rating-box"
        style={{
          position: 'absolute',
          top: '3rem',
          right: '2.5rem',
          background: 'rgba(16,18,28,0.78)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '14px',
          padding: '1.2rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.9rem',
          zIndex: 10,
          minWidth: '175px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
        }}
      >
        <div className="rating-item" style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
          <span style={{ fontSize: '1.3rem', color: '#fbbf24' }}>★</span>
          <div>
            <div className="rating-val" style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>
              {currentMovie.rating || 8.7}<sub style={{ fontSize: '0.7rem', fontWeight: 400, color: '#94a3b8' }}>/10</sub>
            </div>
            <div className="rating-sub" style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '2px' }}>IMDb</div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', margin: '0 -1.5rem' }}></div>

        <div className="rating-item" style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
          <span style={{ fontSize: '1.25rem' }}>🍅</span>
          <div>
            <div className="rating-val" style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>
              {currentMovie.tomatometer || '92%'}
            </div>
            <div className="rating-sub" style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '2px' }}>Tomatometer</div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', margin: '0 -1.5rem' }}></div>

        <div className="rating-item" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ color: '#e50914', fontSize: '0.9rem' }}>▶</span>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff' }}>Trending Now</div>
        </div>
      </div>

      {/* Slider Dots (Pinned Bottom-Right) */}
      <div
        className="hero-dots"
        style={{
          position: 'absolute',
          bottom: '1.75rem',
          right: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          zIndex: 10,
        }}
      >
        {movieList.map((m, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={m.id || idx}
              onClick={() => handleDotClick(idx)}
              className={`hero-dot${isActive ? ' active' : ''}`}
              aria-label={`Slide ${idx + 1}`}
              style={{
                width: isActive ? '24px' : '8px',
                height: '8px',
                borderRadius: isActive ? '4px' : '50%',
                background: isActive ? '#e50914' : 'rgba(255,255,255,0.3)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.3s ease',
              }}
            />
          );
        })}
      </div>
    </section>
  );
};

export default HeroBanner;
