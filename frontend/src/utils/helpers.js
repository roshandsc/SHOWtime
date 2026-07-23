import { FALLBACK_POSTER } from '../constants/mockData';

export const handleImageError = (e, fallback = FALLBACK_POSTER) => {
  e.target.onerror = null;
  e.target.src = fallback;
  e.target.style.objectFit = 'contain';
  e.target.style.background = '#181924';
};

export const getYouTubeEmbedUrl = (url) => {
  if (!url) return '';
  let embedUrl = url
    .replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/')
    .replace('https://youtu.be/', 'https://www.youtube.com/embed/');

  if (embedUrl.includes('/embed/') && !embedUrl.includes('?')) {
    embedUrl += '?autoplay=1&rel=0&modestbranding=1';
  } else if (embedUrl.includes('/embed/') && !embedUrl.includes('autoplay')) {
    embedUrl += '&autoplay=1&rel=0';
  }
  return embedUrl;
};
