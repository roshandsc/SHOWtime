import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { movieService } from '../../../services/movies/movieService';
import { useDebounce } from '../../../hooks/useDebounce';
import { handleImageError } from '../../../utils/helpers';

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 250);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  useEffect(() => {
    const search = async () => {
      if (debouncedQuery.trim().length >= 2) {
        const matches = await movieService.searchMovies(debouncedQuery);
        setResults(matches);
        setIsOpen(true);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    };
    search();
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (id) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/movie-details/${id}`);
  };

  return (
    <div className="search-box" ref={wrapperRef} style={{ position: 'relative' }}>
      <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <input
        type="text"
        className="search-input"
        placeholder="Search movies, theatres..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
        autoComplete="off"
      />
      {isOpen && (
        <div className="search-dropdown open" style={{ display: 'block' }}>
          {results.length > 0 ? (
            results.map((m) => (
              <div
                key={m.id}
                className="search-result-item"
                onClick={() => handleSelect(m.id)}
                style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', cursor: 'pointer' }}
              >
                <img
                  src={m.posterUrl || m.poster}
                  alt={m.title}
                  onError={handleImageError}
                  style={{ width: '36px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                />
                <div>
                  <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.9rem' }}>{m.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    {Array.isArray(m.genre) ? m.genre.join(', ') : m.genre || 'Movie'}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ padding: '12px 16px', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
              No matching movies found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
