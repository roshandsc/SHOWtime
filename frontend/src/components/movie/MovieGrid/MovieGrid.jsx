import React, { useState } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import EmptyState from '../../common/EmptyState/EmptyState';

export const MovieGrid = ({ movies = [], onPlayTrailer, title = 'Now Showing' }) => {
  const [selectedGenre, setSelectedGenre] = useState('All');

  const genres = ['All', 'Action', 'Sci-Fi', 'Comedy', 'Drama', 'Thriller', 'Animation'];

  const filteredMovies = movies.filter((m) => {
    if (selectedGenre === 'All') return true;
    if (Array.isArray(m.genre)) return m.genre.includes(selectedGenre);
    if (typeof m.genre === 'string') return m.genre.includes(selectedGenre);
    return false;
  });

  return (
    <section className="movie-grid-section" style={{ marginTop: '48px' }}>
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', margin: 0 }}>{title}</h2>
        <div className="genre-pills" style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGenre(g)}
              className={`genre-btn ${selectedGenre === g ? 'active' : ''}`}
              style={{
                padding: '6px 16px',
                borderRadius: '20px',
                border: '1px solid var(--color-card-border)',
                background: selectedGenre === g ? 'var(--color-primary)' : 'var(--color-card)',
                color: '#fff',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {filteredMovies.length > 0 ? (
        <div className="movie-grid-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '24px' }}>
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} isGrid={true} onPlayTrailer={onPlayTrailer} />
          ))}
        </div>
      ) : (
        <EmptyState title="No movies found for this genre" description="Try selecting a different genre tab." />
      )}
    </section>
  );
};

export default MovieGrid;
