export const BASE_URL = import.meta.env.VITE_API_URL || 'https://showtime-backend-sajs.onrender.com';

export const API = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    REGISTER: `${BASE_URL}/auth/register`,
    PROFILE: `${BASE_URL}/auth/profile`,
    LOGOUT: `${BASE_URL}/auth/logout`,
  },
  MOVIES: {
    ALL: `${BASE_URL}/movies`,
    FEATURED: `${BASE_URL}/movies/featured`,
    TRENDING: `${BASE_URL}/movies/trending`,
    UPCOMING: `${BASE_URL}/movies/upcoming`,
    DETAIL: (id) => `${BASE_URL}/movies/${id}`,
    SEARCH: (q) => `${BASE_URL}/movies/search?q=${encodeURIComponent(q)}`,
  },
  SCREENS: {
    ALL: `${BASE_URL}/screens`,
    DETAIL: (id) => `${BASE_URL}/screens/${id}`,
  },
  SHOWS: {
    ALL: `${BASE_URL}/shows`,
    DETAIL: (id) => `${BASE_URL}/shows/${id}`,
    BY_MOVIE: (id) => `${BASE_URL}/shows/movie/${id}`,
  },
  SEATS: {
    BY_SHOW: (showId) => `${BASE_URL}/seats/show/${showId}`,
  },
  BOOKINGS: {
    CREATE: `${BASE_URL}/bookings`,
    MY: `${BASE_URL}/bookings/my`,
    DETAIL: (id) => `${BASE_URL}/bookings/${id}`,
    CANCEL: (id) => `${BASE_URL}/bookings/${id}/cancel`,
  },
  PAYMENT: {
    INITIATE: `${BASE_URL}/payment/initiate`,
    VERIFY: `${BASE_URL}/payment/verify`,
  },
};
