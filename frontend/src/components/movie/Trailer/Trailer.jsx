import React from 'react';
import { getYouTubeEmbedUrl } from '../../../utils/helpers';

export const Trailer = ({ isOpen, trailerUrl, onClose }) => {
  if (!isOpen || !trailerUrl) return null;

  const embedUrl = getYouTubeEmbedUrl(trailerUrl);

  return (
    <div
      id="trailerModal"
      className="open"
      role="dialog"
      aria-modal="true"
      aria-label="Movie Trailer"
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(10px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        className="trailer-modal-inner"
        onClick={(e) => e.stopPropagation()}
        style={{ position: 'relative', width: '100%', maxWidth: '900px', aspectRatio: '16/9', background: '#000', borderRadius: '16px', overflow: 'hidden' }}
      >
        <button
          className="trailer-close"
          onClick={onClose}
          aria-label="Close trailer"
          style={{ position: 'absolute', top: '12px', right: '16px', background: 'rgba(0,0,0,0.6)', border: 'none', color: '#fff', fontSize: '1.8rem', cursor: 'pointer', zIndex: 10, borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          ×
        </button>
        <iframe
          id="trailerFrame"
          src={embedUrl}
          title="Movie Trailer"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          style={{ width: '100%', height: '100%', border: 'none' }}
        ></iframe>
      </div>
    </div>
  );
};

export default Trailer;
