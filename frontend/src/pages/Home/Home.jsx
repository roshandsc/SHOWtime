import React, { useState, useEffect } from 'react';
import HeroBanner from '../../components/movie/HeroBanner/HeroBanner';
import MovieCard from '../../components/movie/MovieCard/MovieCard';
import Trailer from '../../components/movie/Trailer/Trailer';
import Loader from '../../components/common/Loader/Loader';
import { movieService } from '../../services/movies/movieService';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeGenre, setActiveGenre] = useState('All');
  const [activeTrailer, setActiveTrailer] = useState(null);

  const navigate = useNavigate();
  const genres = ['All', 'Action', 'Comedy', 'Drama', 'Horror', 'Thriller', 'Romance', 'Sci-Fi', 'Animation'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [feat, trend, all] = await Promise.all([
          movieService.getFeaturedMovie(),
          movieService.getTrendingMovies(),
          movieService.getAllMovies(),
        ]);
        setFeaturedMovie(feat);
        setTrendingMovies(trend);
        setAllMovies(all);
      } catch (err) {
        console.error('Error fetching home data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loader fullPage message="Loading latest blockbusters..." />;
  }

  const filteredMovies = allMovies.filter((m) => {
    if (activeGenre === 'All') return true;
    if (Array.isArray(m.genre)) return m.genre.includes(activeGenre);
    if (typeof m.genre === 'string') return m.genre.includes(activeGenre);
    return false;
  });

  return (
    <div className="page-home" style={{ paddingBottom: '60px' }}>
      <HeroBanner movie={featuredMovie} movies={allMovies.length > 0 ? allMovies : trendingMovies} onPlayTrailer={(url) => setActiveTrailer(url)} />

      {/* Trending Now Section */}
      <section style={{ marginTop: '40px', padding: '0 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '4px', height: '22px', background: '#e50914', borderRadius: '2px' }}></div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', margin: 0 }}>Trending Now</h2>
          </div>
          <button onClick={() => navigate('/movies')} style={{ background: 'none', border: 'none', color: '#e50914', fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer' }}>
            View All ➔
          </button>
        </div>

        <div style={{ display: 'flex', gap: '18px', overflowX: 'auto', paddingBottom: '12px' }}>
          {trendingMovies.map((movie) => (
            <div key={movie.id} style={{ minWidth: '170px', width: '170px' }}>
              <MovieCard movie={movie} onPlayTrailer={(url) => setActiveTrailer(url)} />
            </div>
          ))}
        </div>
      </section>

      {/* Now Showing Section */}
      <section style={{ marginTop: '48px', padding: '0 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '4px', height: '22px', background: '#e50914', borderRadius: '2px' }}></div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', margin: 0 }}>Now Showing</h2>
          </div>

          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => setActiveGenre(g)}
                style={{
                  padding: '6px 16px',
                  borderRadius: '20px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: activeGenre === g ? '#e50914' : '#141622',
                  color: '#fff',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: activeGenre === g ? '0 4px 12px rgba(229,9,20,0.35)' : 'none',
                }}
              >
                {g}
              </button>
            ))}
          </div>

          <button onClick={() => navigate('/movies')} style={{ background: 'none', border: 'none', color: '#e50914', fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer' }}>
            View All ➔
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '20px' }}>
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} isGrid={true} onPlayTrailer={(url) => setActiveTrailer(url)} />
          ))}
        </div>
      </section>

      <Trailer isOpen={Boolean(activeTrailer)} trailerUrl={activeTrailer} onClose={() => setActiveTrailer(null)} />
    </div>
  );
};

export default Home;
