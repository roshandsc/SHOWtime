import React from 'react';
import MovieCard from '../../movie/MovieCard/MovieCard';
import EmptyState from '../../common/EmptyState/EmptyState';

export const Wishlist = ({ movies = [], onRemoveFromWishlist }) => {
  if (!movies || movies.length === 0) {
    return <EmptyState icon="❤️" title="Your wishlist is empty" description="Explore movies and click 'Add to Wishlist' to save them here." />;
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '24px' }}>
      {movies.map((m) => (
        <div key={m.id} style={{ position: 'relative' }}>
          <MovieCard movie={m} isGrid={true} />
          {onRemoveFromWishlist && (
            <button
              onClick={() => onRemoveFromWishlist(m.id)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'rgba(0,0,0,0.7)',
                border: 'none',
                color: '#fff',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                cursor: 'pointer',
                zIndex: 10,
                fontSize: '1rem',
              }}
            >
              ×
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
