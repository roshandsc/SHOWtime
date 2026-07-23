import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

export const WishlistSidebar = ({ activeItem = 'wishlist', wishlistCount, watchlistCount = 4, onNavigate }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const name = user?.name || 'Rohan Shetty';
  const email = user?.email || 'rohan.shetty@email.com';
  const avatar = user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80';
  const countWishlist = wishlistCount !== undefined ? wishlistCount : (user?.wishlistCount || 4);

  const menu = [
    { id: 'bookings', label: 'My Bookings', icon: '🎟️', path: '/my-bookings' },
    { id: 'wishlist', label: 'Wishlist', icon: '❤️', count: countWishlist, path: '/wishlist' },
    { id: 'watchlist', label: 'Watchlist', icon: '👁️', count: watchlistCount },
    { id: 'offers', label: 'Offers & Coupons', icon: '🏷️' },
    { id: 'profile', label: 'My Profile', icon: '👤', path: '/profile' },
    { id: 'cards', label: 'Saved Cards', icon: '💳' },
    { id: 'address', label: 'Address Book', icon: '🏠' },
    { id: 'notifs', label: 'Notification', icon: '🔔' },
    { id: 'help', label: 'Help & Support', icon: '❓' },
    { id: 'logout', label: 'Logout', icon: '🚪' },
  ];

  const handleItemClick = (item) => {
    if (item.path) {
      navigate(item.path);
    } else if (onNavigate) {
      onNavigate(item.id);
    }
  };

  return (
    <div className="wishlist-sidebar">
      {/* Profile Card */}
      <div className="glass-panel wishlist-profile-card">
        <img
          src={avatar}
          alt={name}
          className="wishlist-avatar"
          crossOrigin="anonymous"
        />
        <h3 className="wishlist-user-name">{name}</h3>
        <p className="wishlist-email">{email}</p>
        <span className="purple-premium-badge">Premium</span>
      </div>

      {/* Sidebar Navigation */}
      <div className="sidebar-menu">
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item)}
            className={`sidebar-item ${activeItem === item.id ? 'active' : ''}`}
          >
            <span style={{ fontSize: '1rem' }}>{item.icon}</span>
            <span>{item.label}</span>
            {item.count !== undefined && (
              <span className="menu-count-pill">{item.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* Cinema Seat Background Get Premium Banner */}
      <div className="cinema-premium-card">
        <div className="cinema-premium-bg"></div>
        <div>
          <h4 className="cinema-premium-title">
            <span>👑</span>
            <span>Get Premium</span>
          </h4>
          <p className="cinema-premium-sub">
            Unlock exclusive offers, early access and more!
          </p>
        </div>
        <button
          className="btn-upgrade-now"
          onClick={() => navigate('/offers')}
        >
          Upgrade Now
        </button>
      </div>
    </div>
  );
};

export default WishlistSidebar;
