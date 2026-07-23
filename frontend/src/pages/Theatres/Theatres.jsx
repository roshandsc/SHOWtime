import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Theatres = () => {
  const navigate = useNavigate();

  const [radius, setRadius] = useState('2 km');
  const [sortBy, setSortBy] = useState('recommended');
  const [amenities, setAmenities] = useState({
    imax: true,
    fourDx: false,
    threeD: true,
    dolby: false,
    recliners: false,
    food: true,
    parking: true,
  });

  const theatreList = [
    {
      id: 1,
      name: 'PVR Orion Mall, Rajajinagar',
      rating: '4.6',
      reviews: '12.4K',
      distance: '2.1 km',
      address: 'Orion Mall, Dr. Rajkumar Road, Rajajinagar, Bangalore',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&q=80',
      amenitiesList: ['IMAX', '3D', 'Dolby Atmos', 'Recliner Seats', 'Parking', 'Food & Beverages'],
      shows: ['10:30 AM', '01:30 PM', '04:30 PM'],
      extraShows: '+6',
    },
    {
      id: 2,
      name: 'INOX Mantri Square Mall',
      rating: '4.5',
      reviews: '8.7K',
      distance: '3.3 km',
      address: 'Mantri Square Mall, Sampige Road, Malleshwaram, Bangalore',
      image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=500&q=80',
      amenitiesList: ['IMAX', '3D', 'Dolby Atmos', 'Recliner Seats', 'Parking', 'Food & Beverages'],
      shows: ['11:00 AM', '02:00 PM', '05:00 PM'],
      extraShows: '+5',
    },
    {
      id: 3,
      name: 'Cinépolis ETA Mall',
      rating: '4.4',
      reviews: '6.2K',
      distance: '4.2 km',
      address: 'ETA Mall, Magadi Main Road, Nagarabhavi, Bangalore',
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&q=80',
      amenitiesList: ['3D', 'Dolby Atmos', 'Recliner Seats', 'Parking', 'Food & Beverages'],
      shows: ['10:15 AM', '01:15 PM', '04:15 PM'],
      extraShows: '+4',
    },
    {
      id: 4,
      name: 'PVR Phoenix Marketcity',
      rating: '4.7',
      reviews: '15.6K',
      distance: '6.0 km',
      address: 'Phoenix Marketcity, Whitefield Main Road, Bangalore',
      image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&q=80',
      amenitiesList: ['IMAX', '4DX', '3D', 'Dolby Atmos', 'Recliner Seats', 'Parking', 'Food & Beverages'],
      shows: ['10:45 AM', '01:45 PM', '04:45 PM'],
      extraShows: '+7',
    },
  ];

  const handleClearAll = () => {
    setRadius('2 km');
    setSortBy('recommended');
    setAmenities({
      imax: false,
      fourDx: false,
      threeD: false,
      dolby: false,
      recliners: false,
      food: false,
      parking: false,
    });
  };

  const handleBookTickets = (theatreName, showTime) => {
    navigate(`/seat-booking?theatre=${encodeURIComponent(theatreName)}&time=${encodeURIComponent(showTime)}`);
  };

  return (
    <div style={{ background: '#08090d', minHeight: '100vh', padding: '32px 48px 64px', color: '#fff' }}>
      
      {/* Top Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fff', margin: '0 0 6px', letterSpacing: '-0.5px' }}>
            Theatres
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>
            Discover top cinema halls, formats, and showtimes near you
          </p>
        </div>

        <div style={{ background: '#11121a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: '#e2e8f0' }}>
          <span style={{ color: '#e50914', fontSize: '1rem' }}>📍</span>
          <span style={{ fontWeight: 600 }}>Bangalore, Karnataka</span>
        </div>
      </div>

      {/* Main 2-Column Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '270px 1fr', gap: '28px', alignItems: 'start' }}>
        
        {/* Left Filter Sidebar */}
        <aside style={{ background: '#11121a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
          
          {/* Filter Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '14px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>⚙️</span> Filters
            </h3>
            <button
              onClick={handleClearAll}
              style={{ background: 'none', border: 'none', color: '#e50914', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', padding: 0 }}
            >
              Clear All
            </button>
          </div>

          {/* Location & Radius */}
          <div style={{ paddingBottom: '18px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '8px', fontWeight: 700 }}>
              Location
            </label>
            <div style={{ background: '#181a29', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 14px', fontSize: '0.84rem', color: '#e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span>Bangalore, KA</span>
              <span style={{ fontSize: '0.85rem' }}>📍</span>
            </div>

            <label style={{ display: 'block', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '8px', fontWeight: 600 }}>
              Distance Radius
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {['2 km', '5 km', '10 km', '20 km'].map((r) => (
                <button
                  key={r}
                  onClick={() => setRadius(r)}
                  style={{
                    padding: '8px 0',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: radius === r ? '#e50914' : '#181a29',
                    color: '#fff',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: radius === r ? '0 4px 12px rgba(229,9,20,0.35)' : 'none',
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Formats & Amenities Checkboxes */}
          <div style={{ paddingBottom: '18px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#fff', marginBottom: '12px', fontWeight: 800 }}>
              Formats & Amenities
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem', color: '#cbd5e1' }}>
              {[
                { key: 'imax', label: 'IMAX' },
                { key: 'fourDx', label: '4DX' },
                { key: 'threeD', label: '3D' },
                { key: 'dolby', label: 'Dolby Atmos' },
                { key: 'recliners', label: 'Recliner Seats' },
                { key: 'food', label: 'Food & Beverages' },
                { key: 'parking', label: 'Parking Available' },
              ].map((item) => (
                <label key={item.key} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none' }}>
                  <input
                    type="checkbox"
                    checked={amenities[item.key]}
                    onChange={(e) => setAmenities({ ...amenities, [item.key]: e.target.checked })}
                    style={{ accentColor: '#e50914', width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sort By Radios */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#fff', marginBottom: '12px', fontWeight: 800 }}>
              Sort By
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem', color: '#cbd5e1' }}>
              {[
                { id: 'recommended', label: 'Recommended' },
                { id: 'nearest', label: 'Nearest First' },
                { id: 'highest', label: 'Highest Rated' },
                { id: 'alphabetical', label: 'Name (A - Z)' },
              ].map((s) => (
                <label key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none' }}>
                  <input
                    type="radio"
                    name="sortBy"
                    checked={sortBy === s.id}
                    onChange={() => setSortBy(s.id)}
                    style={{ accentColor: '#e50914', width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  <span>{s.label}</span>
                </label>
              ))}
            </div>
          </div>

        </aside>

        {/* Right Theatre Listing Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Top Bar above list: Result Count + Sort Selector */}
          <div
            style={{
              background: '#11121a',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              padding: '14px 20px',
              display: 'flex',
              justify: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '0.88rem', color: '#94a3b8', fontWeight: 600 }}>
              Showing <span style={{ color: '#fff', fontWeight: 800 }}>{theatreList.length} Theatres</span> near Bangalore ({radius})
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.82rem', color: '#94a3b8' }}>
              <span style={{ fontWeight: 600 }}>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  background: '#181a29',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#fff',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                <option value="recommended">Recommended</option>
                <option value="nearest">Nearest First</option>
                <option value="highest">Highest Rated</option>
                <option value="alphabetical">Name (A - Z)</option>
              </select>
            </div>
          </div>

          {/* Theatre Cards Grid */}
          {theatreList.map((t) => (
            <div
              key={t.id}
              style={{
                background: '#11121a',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px',
                padding: '20px',
                display: 'grid',
                gridTemplateColumns: '210px 1fr',
                gap: '22px',
                alignItems: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
              }}
            >
              {/* Image */}
              <img
                src={t.image}
                alt={t.name}
                style={{ width: '100%', height: '145px', borderRadius: '14px', objectFit: 'cover' }}
              />

              {/* Info Column */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {t.name}
                        <span style={{ color: '#fbbf24', fontSize: '0.85rem', fontWeight: 700 }}>
                          ★ {t.rating} <span style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 400 }}>({t.reviews})</span>
                        </span>
                      </h3>
                      <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '0 0 10px', lineHeight: '1.4' }}>{t.address}</p>
                    </div>
                    <span style={{ fontSize: '0.82rem', color: '#e2e8f0', background: 'rgba(255,255,255,0.06)', padding: '4px 10px', borderRadius: '6px', fontWeight: 700 }}>
                      {t.distance}
                    </span>
                  </div>

                  {/* Amenities Badges */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
                    {t.amenitiesList.map((a) => (
                      <span key={a} style={{ fontSize: '0.7rem', color: '#cbd5e1', background: '#181a29', border: '1px solid rgba(255,255,255,0.08)', padding: '3px 9px', borderRadius: '6px', fontWeight: 600 }}>
                        {a}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Shows & Book Button Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px' }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b', marginBottom: '6px', fontWeight: 600 }}>Available Shows</div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {t.shows.map((s) => (
                        <span key={s} style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#10b981', padding: '4px 10px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700 }}>
                          {s}
                        </span>
                      ))}
                      <span style={{ background: '#181a29', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 700 }}>
                        {t.extraShows}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBookTickets(t.name, t.shows[0])}
                    style={{
                      background: '#e50914',
                      color: '#fff',
                      border: 'none',
                      padding: '10px 22px',
                      borderRadius: '10px',
                      fontWeight: 800,
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(229,9,20,0.4)',
                      transition: 'transform 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
                  >
                    Book Tickets
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Theatres;
