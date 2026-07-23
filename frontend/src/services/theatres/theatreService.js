import { API } from '../../constants/apiEndpoints';
import { DEFAULT_THEATRES } from '../../constants/mockData';
import { ApiClient } from '../api/apiClient';

export const theatreService = {
  async getAllTheatres() {
    try {
      const data = await ApiClient.get(API.SCREENS.ALL);
      if (Array.isArray(data) && data.length > 0) return data;
    } catch (e) {
      console.warn('Screens API offline. Using DEFAULT_THEATRES dataset.', e);
    }
    return DEFAULT_THEATRES;
  },

  async getShowsByMovie(movieId) {
    try {
      const data = await ApiClient.get(API.SHOWS.BY_MOVIE(movieId));
      if (Array.isArray(data) && data.length > 0) return data;
    } catch (e) {
      console.warn(`Shows API failed for movie id=${movieId}. Returning default showtimes.`, e);
    }
    return DEFAULT_THEATRES.map((t) => ({
      ...t,
      showtimes: [
        { time: '10:30 AM', format: '2D', status: 'available' },
        { time: '01:45 PM', format: '3D', status: 'filling' },
        { time: '05:00 PM', format: 'IMAX 2D', status: 'full' },
        { time: '08:30 PM', format: '4DX', status: 'available' },
      ],
    }));
  },
};
