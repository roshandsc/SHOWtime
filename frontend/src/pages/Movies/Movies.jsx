import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/layout/PageHeader/PageHeader';
import MovieGrid from '../../components/movie/MovieGrid/MovieGrid';
import Loader from '../../components/common/Loader/Loader';
import Trailer from '../../components/movie/Trailer/Trailer';
import { movieService } from '../../services/movies/movieService';

export const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('nowShowing');
  const [activeTrailer, setActiveTrailer] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await movieService.getAllMovies();
      setMovies(data);
      setLoading(false);
    };
    fetchMovies();
  }, []);

  if (loading) return <Loader fullPage message="Fetching movies catalog..." />;

  return (
    <div style={{ padding: '40px var(--container-padding, 2.5rem)' }}>
      <PageHeader title="Movies in Bengaluru" subtitle="Explore the latest blockbusters, indie gems, and upcoming releases.">
        <div style={{ display: 'flex', gap: '8px', background: 'var(--color-card)', padding: '4px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-card-border)' }}>
          <button
            onClick={() => setActiveTab('nowShowing')}
            style={{ padding: '8px 16px', borderRadius: 'var(--radius-md)', border: 'none', background: activeTab === 'nowShowing' ? 'var(--color-primary)' : 'transparent', color: '#fff', fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer' }}
          >
            Now Showing
          </button>
          <button
            onClick={() => setActiveTab('comingSoon')}
            style={{ padding: '8px 16px', borderRadius: 'var(--radius-md)', border: 'none', background: activeTab === 'comingSoon' ? 'var(--color-primary)' : 'transparent', color: '#fff', fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer' }}
          >
            Coming Soon
          </button>
        </div>
      </PageHeader>

      <MovieGrid movies={movies} title={activeTab === 'nowShowing' ? 'Now Showing Movies' : 'Coming Soon'} onPlayTrailer={(url) => setActiveTrailer(url)} />

      <Trailer isOpen={Boolean(activeTrailer)} trailerUrl={activeTrailer} onClose={() => setActiveTrailer(null)} />
    </div>
  );
};

export default Movies;
