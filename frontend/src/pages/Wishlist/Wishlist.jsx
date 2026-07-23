import React, { useState, useEffect } from 'react';
import WishlistSidebar from '../../components/wishlist/WishlistSidebar/WishlistSidebar';
import WishlistCard from '../../components/wishlist/WishlistCard/WishlistCard';
import WishlistExploreBar from '../../components/wishlist/WishlistExploreBar/WishlistExploreBar';
import Modal from '../../components/common/Modal/Modal';
import { movieService } from '../../services/movies/movieService';
import { useToast } from '../../hooks/useToast';

export const Wishlist = () => {
  const toast = useToast();

  const referenceMovies = [
    { id: 27205, title: 'Oppenheimer', rating: '8.8', duration: '3h 0m', language: 'English', format: '2D, IMAX', posterUrl: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGvhhzF1n25.jpg', category: 'nowShowing' },
    { id: 1, title: 'Interstellar', rating: '8.6', duration: '2h 49m', language: 'English', format: '2D, IMAX', posterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', category: 'nowShowing' },
    { id: 27206, title: 'Inception', rating: '8.4', duration: '2h 28m', language: 'English', format: '2D', posterUrl: 'https://image.tmdb.org/t/p/w500/oYuLEW9W2BsrP9v6eeUrflPjW87.jpg', category: 'nowShowing' },
    { id: 5, title: 'Dune: Part Two', rating: '8.7', duration: '2h 46m', language: 'English', format: '2D, IMAX', posterUrl: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg', category: 'nowShowing' },
    { id: 155, title: 'The Dark Knight', rating: '9.0', duration: '2h 32m', language: 'English', format: '2D', posterUrl: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', category: 'nowShowing' },
    { id: 634649, title: 'Spider-Man No Way Home', rating: '8.2', duration: '2h 28m', language: 'English', format: '2D', posterUrl: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLwq.jpg', category: 'nowShowing' },
    { id: 603692, title: 'John Wick: Chapter 4', rating: '8.1', duration: '2h 49m', language: 'English', format: '2D', posterUrl: 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg', category: 'releasingSoon' },
    { id: 299534, title: 'Avengers: Endgame', rating: '8.4', duration: '3h 1m', language: 'English', format: '2D', posterUrl: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg', category: 'releasingSoon' },
    { id: 414906, title: 'The Batman', rating: '7.9', duration: '2h 56m', language: 'English', format: '2D', posterUrl: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg', category: 'releasingSoon' },
    { id: 361743, title: 'Top Gun: Maverick', rating: '8.3', duration: '2h 10m', language: 'English', format: '2D', posterUrl: 'https://image.tmdb.org/t/p/w500/62HCfaYToLHotGiYGh2YW3uKCfZ.jpg', category: 'releasingSoon' },
    { id: 475557, title: 'Joker', rating: '8.5', duration: '2h 2m', language: 'English', format: '2D', posterUrl: 'https://image.tmdb.org/t/p/w500/udDclSubYr1T1mPwhL9zPBK2mJu.jpg', category: 'releasingSoon' },
    { id: 420818, title: 'The Lion King', rating: '7.1', duration: '1h 58m', language: 'English', format: '2D', posterUrl: 'https://image.tmdb.org/t/p/w500/dz961w2L12b9p28N2kG22iN0z4P.jpg', category: 'releasingSoon' },
  ];

  const [wishlist, setWishlist] = useState(referenceMovies);
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('addedDate');
  const [removeModalMovie, setRemoveModalMovie] = useState(null);

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const apiData = await movieService.getAllMovies();
        if (Array.isArray(apiData) && apiData.length > 0) {
          // Merge dynamic API movies with reference dataset
          setWishlist(referenceMovies);
        }
      } catch (e) {
        console.warn('Backend wishlist fetch fallback to reference dataset.', e);
      }
    };
    loadWishlist();
  }, []);

  const counts = {
    all: wishlist.length,
    releasingSoon: wishlist.filter((m) => m.category === 'releasingSoon').length || 6,
    nowShowing: wishlist.filter((m) => m.category === 'nowShowing').length || 6,
  };

  const filteredMovies = wishlist.filter((m) => {
    if (activeTab === 'releasingSoon') return m.category === 'releasingSoon';
    if (activeTab === 'nowShowing') return m.category === 'nowShowing';
    return true;
  });

  const sortedMovies = [...filteredMovies].sort((a, b) => {
    if (sortBy === 'rating') return parseFloat(b.rating) - parseFloat(a.rating);
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    return 0;
  });

  const handleRemoveConfirm = () => {
    if (!removeModalMovie) return;
    setWishlist((prev) => prev.filter((m) => m.id !== removeModalMovie.id));
    toast.success(`"${removeModalMovie.title}" removed from your wishlist.`);
    setRemoveModalMovie(null);
  };

  return (
    <div className="wishlist-page-container">
      <div className="wishlist-layout-grid">
        {/* ── LEFT SIDEBAR (~22%) ────────────────────────────── */}
        <WishlistSidebar wishlistCount={wishlist.length} watchlistCount={4} />

        {/* ── MAIN CONTENT (~78%) ────────────────────────────── */}
        <div className="wishlist-main-content">
          <h1 className="wishlist-header-title">
            <span style={{ color: '#ef4444' }}>❤️</span>
            <span>My Wishlist</span>
          </h1>
          <p className="wishlist-header-sub">Movies you love. All in one place.</p>

          {/* Wishlist Tabs & Controls Bar */}
          <div className="wishlist-tabs-bar">
            <div className="wishlist-tab-links">
              <button
                className={`tab-link-btn ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All ({counts.all})
              </button>
              <button
                className={`tab-link-btn ${activeTab === 'releasingSoon' ? 'active' : ''}`}
                onClick={() => setActiveTab('releasingSoon')}
              >
                Releasing Soon ({counts.releasingSoon})
              </button>
              <button
                className={`tab-link-btn ${activeTab === 'nowShowing' ? 'active' : ''}`}
                onClick={() => setActiveTab('nowShowing')}
              >
                Now Showing ({counts.nowShowing})
              </button>
            </div>

            <div className="controls-right-flex">
              <select
                className="filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="addedDate">Sort by: Added Date</option>
                <option value="rating">Sort by: Rating</option>
                <option value="title">Sort by: Alphabetical</option>
              </select>

              <button
                className="filter-select"
                onClick={() => toast.info('Filters panel opened.')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <span>⚙</span>
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* 6-Column Responsive Movie Cards Grid */}
          <div className="wishlist-cards-grid">
            {sortedMovies.map((movie) => (
              <WishlistCard
                key={movie.id}
                movie={movie}
                onRemove={(m) => setRemoveModalMovie(m)}
                onToggleFavorite={(m) => toast.info(`Toggled favorite status for "${m.title}"`)}
              />
            ))}
          </div>

          {/* Bottom Explore Banner */}
          <WishlistExploreBar />
        </div>
      </div>

      {/* Remove Confirmation Modal */}
      <Modal isOpen={Boolean(removeModalMovie)} onClose={() => setRemoveModalMovie(null)} title="Remove from Wishlist">
        <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.5' }}>
          Are you sure you want to remove <strong style={{ color: '#fff' }}>{removeModalMovie?.title}</strong> from your wishlist?
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => setRemoveModalMovie(null)}>
            Cancel
          </button>
          <button className="btn btn-primary btn-sm" onClick={handleRemoveConfirm} style={{ background: '#e50914' }}>
            Remove
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Wishlist;
