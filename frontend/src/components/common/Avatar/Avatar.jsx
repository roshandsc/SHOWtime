import React, { useState } from 'react';

export const Avatar = ({ src, alt = 'User Avatar', size = 'md', className = '' }) => {
  const [error, setError] = useState(false);
  const defaultAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80';

  return (
    <div className={`avatar-container avatar--${size} ${className}`} style={{ borderRadius: '50%', overflow: 'hidden', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <img
        src={error || !src ? defaultAvatar : src}
        alt={alt}
        className="avatar-img"
        crossOrigin="anonymous"
        onError={() => setError(true)}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  );
};

export default Avatar;
