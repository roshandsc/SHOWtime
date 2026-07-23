import React from 'react';

export const SidebarNav = ({ activeItem = 'bookings', onItemSelect }) => {
  const menu = [
    { id: 'bookings', label: 'My Bookings', icon: '🎟️' },
    { id: 'settings', label: 'Profile Settings', icon: '👤' },
    { id: 'payment', label: 'Payment Methods', icon: '💳' },
    { id: 'rewards', label: 'Offers & Rewards', icon: '⚙️' },
    { id: 'notifs', label: 'Notifications', icon: '🔔' },
    { id: 'help', label: 'Help & Support', icon: '❓' },
    { id: 'logout', label: 'Logout', icon: '🚪' },
  ];

  return (
    <div className="sidebar-menu">
      {menu.map((item) => (
        <button
          key={item.id}
          onClick={() => onItemSelect && onItemSelect(item.id)}
          className={`sidebar-item ${activeItem === item.id ? 'active' : ''}`}
        >
          <span style={{ fontSize: '1rem' }}>{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default SidebarNav;
