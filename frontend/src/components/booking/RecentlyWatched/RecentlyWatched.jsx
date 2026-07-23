import React from 'react';
import { useNavigate } from 'react-router-dom';
import { handleImageError } from '../../../utils/helpers';

export const RecentlyWatched = ({ movies = [] }) => {
  const navigate = useNavigate();

  const defaultRecent = [
    { id: 1, title: 'Interstellar', rating: '9.0', posterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg' },
    { id: 2, title: 'Deadpool & Wolverine', rating: '8.6', posterUrl: 'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg' },
    { id: 27205, title: 'Oppenheimer', rating: '9.0', posterUrl: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGvhhzF1n25.jpg' },
    { id: 634649, title: 'Spider-Man NWH', rating: '8.7', posterUrl: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLwq.jpg' },
    { id: 5, title: 'Oppenheimer', rating: '8.4', posterUrl: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGvhhzF1n25.jpg' },
    { id: 475557, title: 'Joker', rating: '8.4', posterUrl: 'https://image.tmdb.org/t/p/w500/udDclSubYr1T1mPwhL9zPBK2mJu.jpg' },
    { id: 76600, title: 'Avatar 2', rating: '8.3', posterUrl: 'https://image.tmdb.org/t/p/w500/t6HIwfg5WKS0EjoZUZD5P69n7io.jpg' },
    { id: 414906, title: 'The Batman', rating: '8.1', posterUrl: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg' },
  ];

  const items = movies.length > 0 ? movies : defaultRecent;

  return (
    <div className="recently-watched-section">
      <div className="recently-header">
        <h3>Recently Watched</h3>
        <button
          onClick={() => navigate('/movies')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <span className="view-all-link">View All ➔</span>
        </button>
      </div>

      <div className="recent-carousel">
        {items.map((m) => (
          <div
            key={m.id}
            className="recent-card"
            onClick={() => navigate(`/movie-details/${m.id}`)}
          >
            <div className="recent-poster-wrap">
              <img src={m.posterUrl || m.poster} alt={m.title} onError={handleImageError} />
              <div className="recent-heart">❤️</div>
            </div>
            <div className="recent-title">{m.title}</div>
            <div className="recent-rating">★ {m.rating}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyWatched;
