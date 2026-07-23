import React from 'react';
import { GENRE_COLOR } from '../../../constants/genreColors';

export const Badge = ({ children, variant = 'genre', genre, className = '' }) => {
  let style = {};

  if (variant === 'genre' && genre && GENRE_COLOR[genre]) {
    style = {
      backgroundColor: `${GENRE_COLOR[genre]}20`,
      color: GENRE_COLOR[genre],
      border: `1px solid ${GENRE_COLOR[genre]}40`,
    };
  }

  return (
    <span className={`badge badge--${variant} ${className}`} style={style}>
      {children}
    </span>
  );
};

export default Badge;
