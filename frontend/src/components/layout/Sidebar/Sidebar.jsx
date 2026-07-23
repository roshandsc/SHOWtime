import React from 'react';
import { NavLink } from 'react-router-dom';

export const Sidebar = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'profile', label: 'Personal Details', icon: '👤' },
    { id: 'bookings', label: 'Booking History', icon: '🎟️' },
    { id: 'watchlist', label: 'Watchlist', icon: '❤️' },
    { id: 'settings', label: 'Account Settings', icon: '⚙️' },
  ];

  return (
    <aside className="profile-sidebar" style={{ background: 'var(--color-card)', padding: '24px', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--color-card-border)' }}>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange && onTabChange(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-lg)',
              background: activeTab === item.id ? 'var(--color-primary)' : 'transparent',
              color: activeTab === item.id ? '#fff' : 'var(--color-text-muted)',
              border: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s ease',
            }}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
