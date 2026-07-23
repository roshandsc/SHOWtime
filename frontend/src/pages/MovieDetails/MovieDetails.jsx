import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Trailer from '../../components/movie/Trailer/Trailer';
import Loader from '../../components/common/Loader/Loader';
import { movieService } from '../../services/movies/movieService';
import { theatreService } from '../../services/theatres/theatreService';
import { handleImageError } from '../../utils/helpers';
import { useToast } from '../../hooks/useToast';
import { useBooking } from '../../hooks/useBooking';

export const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { updateBooking } = useBooking();

  const [movie, setMovie] = useState(null);
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('22 Jul');
  const [selectedTime, setSelectedTime] = useState('06:30 PM');
  const [activeTab, setActiveTab] = useState('about');
  const [activeTrailer, setActiveTrailer] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const dateTabs = [
    { dayName: 'Today', dayNum: '22', month: 'Jul' },
    { dayName: 'Wed', dayNum: '23', month: 'Jul' },
    { dayName: 'Thu', dayNum: '24', month: 'Jul' },
    { dayName: 'Fri', dayNum: '25', month: 'Jul' },
    { dayName: 'Sat', dayNum: '26', month: 'Jul' },
  ];

  const timePills = ['12:30 PM', '03:30 PM', '06:30 PM', '09:45 PM', '10:30 PM', '11:50 PM'];

  const youMightAlsoLike = [
    { id: 1, title: 'Interstellar', rating: '8.6', posterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg' },
    { id: 155, title: 'The Dark Knight', rating: '9.0', posterUrl: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg' },
    { id: 577922, title: 'Tenet', rating: '7.3', posterUrl: 'https://image.tmdb.org/t/p/w500/k68nLwhmK489FRDGlV2ZFcZgCfi.jpg' },
    { id: 1124, title: 'The Prestige', rating: '8.5', posterUrl: 'https://image.tmdb.org/t/p/w500/tRNKG42oG8xwh9xKUEoHOfTo9c2.jpg' },
    { id: 374720, title: 'Dunkirk', rating: '7.8', posterUrl: 'https://image.tmdb.org/t/p/w500/ebSnODDg9lbsMIaWg2uAbjn7TO5.jpg' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieData = await movieService.getMovieById(id || 27205);
        const theatreData = await theatreService.getShowsByMovie(id || 27205);
        setMovie(movieData);
        setTheatres(theatreData);
      } catch (e) {
        console.error('Failed to load movie details:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleBookTicketsClick = () => {
    const defaultTheatre = theatres[0]?.name || 'PVR: Orion Mall, Rajajinagar';
    updateBooking({
      movie,
      theatreName: defaultTheatre,
      showDate: selectedDate,
      showTime: selectedTime,
      seats: [],
    });
    navigate(`/seat-booking?movieId=${movie?.id || 1}&theatre=${encodeURIComponent(defaultTheatre)}&time=${encodeURIComponent(selectedTime)}&date=${encodeURIComponent(selectedDate)}`);
  };

  const handleSelectTheatreShow = (theatreName, time) => {
    updateBooking({
      movie,
      theatreName,
      showDate: selectedDate,
      showTime: time,
      seats: [],
    });
    navigate(`/seat-booking?movieId=${movie?.id || 1}&theatre=${encodeURIComponent(theatreName)}&time=${encodeURIComponent(time)}&date=${encodeURIComponent(selectedDate)}`);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.info(!isWishlisted ? 'Added to Wishlist' : 'Removed from Wishlist');
  };

  if (loading) return <Loader fullPage message="Loading movie details and showtimes..." />;

  return (
    <div style={{ padding: '24px 40px 60px', background: '#08090d', minHeight: '100vh', color: '#fff' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#9ca3af', marginBottom: '20px' }}>
        <Link to="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>Home</Link>
        <span>›</span>
        <Link to="/movies" style={{ color: '#9ca3af', textDecoration: 'none' }}>Movies</Link>
        <span>›</span>
        <span style={{ color: '#fff', fontWeight: 600 }}>{movie?.title || 'Inception'}</span>
      </div>

      {/* Top Banner Row (Hero Card + Showtimes Selector Panel) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px', marginBottom: '32px' }}>
        {/* Left Hero Card */}
        <div style={{ background: '#11121a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '18px', padding: '24px', display: 'flex', gap: '24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'relative', width: '210px', flexShrink: 0 }}>
            <img
              src={movie?.posterUrl || movie?.poster || 'https://image.tmdb.org/t/p/w500/oYuLEW9W2BsrP9v6eeUrflPjW87.jpg'}
              alt={movie?.title}
              onError={handleImageError}
              style={{ width: '100%', borderRadius: '12px', objectFit: 'cover' }}
            />
            <button
              onClick={() => setActiveTrailer(movie?.trailerUrl || 'https://www.youtube.com/embed/YoHD9XEInc0')}
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(0,0,0,0.7)', border: '2px solid #fff', color: '#fff', fontSize: '1.4rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              ▶
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff', margin: '0 0 12px' }}>
              {movie?.title || 'Inception'}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', fontSize: '0.88rem' }}>
              <span style={{ color: '#fbbf24', fontWeight: 800 }}>★ {movie?.rating || '8.8'}</span>
              <span style={{ color: '#64748b' }}>IMDb</span>
              <span>🍅 {movie?.tomatometer || '87%'}</span>
              <span style={{ border: '1px solid rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>
                {movie?.ageRating || 'PG-13'}
              </span>
            </div>

            <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '16px' }}>
              2010 • {movie?.duration || '2h 28m'} • {Array.isArray(movie?.genre) ? movie.genre.join(', ') : movie?.genre || 'Action, Sci-Fi, Thriller'} • English, Hindi, Tamil, Telugu
            </div>

            <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: '1.5', marginBottom: '16px', maxWidth: '600px' }}>
              {movie?.description || 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.'}
            </p>

            <div style={{ fontSize: '0.82rem', color: '#9ca3af', marginBottom: '6px' }}>
              <strong style={{ color: '#fff' }}>Director:</strong> Christopher Nolan
            </div>
            <div style={{ fontSize: '0.82rem', color: '#9ca3af', marginBottom: '24px' }}>
              <strong style={{ color: '#fff' }}>Cast:</strong> Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page, Tom Hardy
            </div>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button
                onClick={handleBookTicketsClick}
                style={{ background: '#e50914', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(229,9,20,0.4)' }}
              >
                🎟 Book Tickets
              </button>
              <button
                onClick={() => setActiveTrailer(movie?.trailerUrl || 'https://www.youtube.com/embed/YoHD9XEInc0')}
                style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '12px 20px', borderRadius: '10px', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                ▶ Watch Trailer
              </button>
              <button
                onClick={toggleWishlist}
                style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: isWishlisted ? '#e50914' : '#fff', padding: '12px 20px', borderRadius: '10px', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                {isWishlisted ? '❤️ In Wishlist' : '➕ Add to Wishlist'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Showtimes Picker Panel */}
        <div style={{ background: '#11121a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '18px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff', margin: '0 0 12px' }}>Select Date</h4>
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
              {dateTabs.map((d) => (
                <button
                  key={d.dayNum}
                  onClick={() => setSelectedDate(`${d.dayNum} ${d.month}`)}
                  style={{
                    flex: 1,
                    padding: '8px 10px',
                    borderRadius: '10px',
                    background: selectedDate.includes(d.dayNum) ? '#e50914' : '#1a1c2b',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#fff',
                    textAlign: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>{d.dayName}</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{d.dayNum}</div>
                  <div style={{ fontSize: '0.68rem', opacity: 0.8 }}>{d.month}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff', margin: '0 0 10px' }}>Select Show Time</h4>
            <div style={{ display: 'flex', gap: '12px', fontSize: '0.78rem', color: '#9ca3af', marginBottom: '12px' }}>
              <span>☀️ Morning</span>
              <span>🌤 Afternoon</span>
              <span style={{ color: '#e50914', fontWeight: 700 }}>🌙 Evening</span>
              <span>🌌 Night</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {timePills.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: selectedTime === t ? '#e50914' : '#141622',
                    color: '#fff',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', fontSize: '0.75rem', color: '#9ca3af', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span> Available</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }}></span> Filling Fast</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></span> Almost Full</span>
          </div>
        </div>
      </div>

      {/* Bottom Section (Tabs & Theatres List) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px', alignItems: 'start' }}>
        {/* Bottom Left Content Tabs */}
        <div>
          <div style={{ display: 'flex', gap: '24px', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '20px', paddingBottom: '8px' }}>
            <button className={`tab-link-btn ${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>About</button>
            <button className={`tab-link-btn ${activeTab === 'cast' ? 'active' : ''}`} onClick={() => setActiveTab('cast')}>Cast & Crew</button>
            <button className={`tab-link-btn ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>Reviews (1.2K)</button>
            <button className={`tab-link-btn ${activeTab === 'media' ? 'active' : ''}`} onClick={() => setActiveTab('media')}>Media</button>
          </div>

          <div style={{ background: '#11121a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '18px', padding: '24px', marginBottom: '32px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>Synopsis</h4>
            <p style={{ color: '#9ca3af', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '16px' }}>
              A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team.
            </p>
            <span style={{ color: '#e50914', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer' }}>Read More ∨</span>
          </div>

          {/* You Might Also Like Carousel */}
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>You Might Also Like</h3>
            <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
              {youMightAlsoLike.map((m) => (
                <div key={m.id} style={{ width: '110px', minWidth: '110px', cursor: 'pointer' }} onClick={() => navigate(`/movie-details/${m.id}`)}>
                  <img src={m.posterUrl} alt={m.title} style={{ width: '100%', height: '150px', borderRadius: '10px', objectFit: 'cover', marginBottom: '6px' }} />
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.title}</div>
                  <div style={{ fontSize: '0.72rem', color: '#fbbf24' }}>★ {m.rating}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Right Theatres List */}
        <div style={{ background: '#11121a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '18px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', margin: 0 }}>Theatres (12)</h4>
            <span style={{ fontSize: '0.8rem', color: '#9ca3af', cursor: 'pointer' }}>Filter ⚙</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {theatres.map((t, idx) => (
              <div key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>{t.name} <span style={{ color: '#fbbf24', fontSize: '0.8rem' }}>★ {t.rating || 4.6}</span></div>
                    <div style={{ fontSize: '0.78rem', color: t.status === 'filling' ? '#f59e0b' : t.status === 'full' ? '#ef4444' : '#10b981', marginTop: '2px' }}>{t.statusText || 'Available'}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.78rem', color: '#9ca3af' }}>{t.dist || '2.1 km'}</div>
                    <button onClick={() => handleSelectTheatreShow(t.name, selectedTime)} style={{ background: 'none', border: 'none', color: '#e50914', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', marginTop: '4px' }}>
                      Amenities ›
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button style={{ width: '100%', marginTop: '16px', background: '#181a29', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '10px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}>
            View More Theatres ∨
          </button>
        </div>
      </div>

      <Trailer isOpen={Boolean(activeTrailer)} trailerUrl={activeTrailer} onClose={() => setActiveTrailer(null)} />
    </div>
  );
};

export default MovieDetails;
