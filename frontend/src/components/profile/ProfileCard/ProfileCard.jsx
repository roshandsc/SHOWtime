import React from 'react';
import { useAuth } from '../../../hooks/useAuth';

export const ProfileCard = ({ onEdit }) => {
  const { user } = useAuth();

  const avatarUrl = user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80';
  const name = user?.name || 'Rohan Shetty';
  const email = user?.email || 'rohan.shetty@email.com';
  const badge = user?.badge || 'MoviePass Gold';

  return (
    <div className="glass-panel profile-card">
      <div className="avatar-wrapper">
        <img src={avatarUrl} alt={name} crossOrigin="anonymous" />
        <button className="edit-avatar-btn" onClick={onEdit} aria-label="Edit Profile">
          ✏️
        </button>
      </div>

      <h3 className="profile-name">{name}</h3>
      <div className="gold-badge">
        <span>👑</span>
        <span>{badge}</span>
      </div>
      <p className="profile-email">{email}</p>
    </div>
  );
};

export default ProfileCard;
