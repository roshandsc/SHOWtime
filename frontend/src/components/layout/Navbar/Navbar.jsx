import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import SearchBar from '../../common/SearchBar/SearchBar';
import { MOCK_NOTIFICATIONS } from '../../../constants/mockData';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [showNotif, setShowNotif] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const notifRef = useRef(null);
  const userRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotif(false);
      }
      if (userRef.current && !userRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/login');
  };

  const userAvatar = user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80';
  const userName = user?.name ? user.name.split(' ')[0] : 'Rohan';

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <Link to="/" className="logo" aria-label="ShowTime Home">
        <div className="logo-icon">
          <div className="logo-icon-inner"></div>
        </div>
        <span>
          Show<span className="accent">Time</span>
        </span>
      </Link>

      <nav aria-label="Main navigation">
        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink to="/theatres" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Theatres
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-bookings" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              My Bookings
            </NavLink>
          </li>
          <li>
            <NavLink to="/wishlist" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Wishlist
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <SearchBar />

        {/* Notification Bell */}
        <div className="notif-wrapper" ref={notifRef} style={{ position: 'relative' }}>
          <button
            className="icon-btn"
            aria-label="Notifications"
            onClick={() => setShowNotif(!showNotif)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
          </button>

          {showNotif && (
            <div
              className="notif-panel open"
              style={{
                position: 'absolute',
                top: 'calc(100% + 12px)',
                right: '0',
                width: '320px',
                background: 'var(--color-card)',
                border: '1px solid var(--color-card-border)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                padding: '16px',
                zIndex: 1000,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid var(--color-card-border)' }}>
                <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>Notifications</h4>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}>
                    Mark all read
                  </button>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '280px', overflowY: 'auto' }}>
                {notifications.map((n) => (
                  <div key={n.id} style={{ display: 'flex', gap: '10px', padding: '8px', borderRadius: '8px', background: n.read ? 'transparent' : 'rgba(229, 9, 20, 0.08)' }}>
                    <span style={{ fontSize: '1.2rem' }}>{n.icon}</span>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>{n.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>{n.body}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--color-primary)', marginTop: '4px' }}>{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile or Sign In Button */}
        <div className="user-menu-wrapper" ref={userRef} style={{ position: 'relative' }}>
          {isAuthenticated && user ? (
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#ffffff',
              }}
            >
              <img
                src={userAvatar}
                alt={userName}
                crossOrigin="anonymous"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '1.5px solid rgba(255,255,255,0.2)',
                }}
              />
              <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{userName}</span>
              <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>∨</span>
            </button>
          ) : (
            <Link
              to="/login"
              style={{
                background: '#e50914',
                color: '#fff',
                padding: '8px 18px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.85rem',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(229, 9, 20, 0.4)',
              }}
            >
              Sign In
            </Link>
          )}

          {showUserMenu && isAuthenticated && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 12px)',
                right: '0',
                width: '200px',
                background: 'var(--color-card)',
                border: '1px solid var(--color-card-border)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                padding: '8px 0',
                zIndex: 1000,
              }}
            >
              <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--color-card-border)' }}>
                <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>{user?.name || 'Rohan Shetty'}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{user?.email || 'rohan.shetty@email.com'}</div>
              </div>
              <Link to="/profile" onClick={() => setShowUserMenu(false)} style={{ display: 'block', padding: '10px 16px', color: '#fff', fontSize: '0.88rem', textDecoration: 'none' }}>
                Profile Settings
              </Link>
              <Link to="/my-bookings" onClick={() => setShowUserMenu(false)} style={{ display: 'block', padding: '10px 16px', color: '#fff', fontSize: '0.88rem', textDecoration: 'none' }}>
                My Bookings
              </Link>
              <Link to="/wishlist" onClick={() => setShowUserMenu(false)} style={{ display: 'block', padding: '10px 16px', color: '#fff', fontSize: '0.88rem', textDecoration: 'none' }}>
                Wishlist
              </Link>
              <button
                onClick={handleLogout}
                style={{ width: '100%', textAlign: 'left', padding: '10px 16px', color: 'var(--color-primary)', background: 'none', border: 'none', fontSize: '0.88rem', cursor: 'pointer', fontWeight: 600, borderTop: '1px solid var(--color-card-border)' }}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
