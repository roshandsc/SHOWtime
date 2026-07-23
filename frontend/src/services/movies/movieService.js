import { API } from '../../constants/apiEndpoints';
import { MOCK_MOVIES } from '../../constants/mockData';
import { ApiClient } from '../api/apiClient';

export const movieService = {
  async getAllMovies() {
    try {
      const data = await ApiClient.get(API.MOVIES.ALL);
      if (Array.isArray(data) && data.length > 0) return data;
    } catch (e) {
      console.warn('API Gateway offline. Using MOCK_MOVIES dataset.', e);
    }
    return MOCK_MOVIES;
  },

  async getFeaturedMovie() {
    try {
      const data = await ApiClient.get(API.MOVIES.FEATURED);
      if (data && data.id) return data;
    } catch (e) {
      console.warn('API Gateway offline. Using featured MOCK_MOVIE.', e);
    }
    return MOCK_MOVIES.find((m) => m.featured) || MOCK_MOVIES[0];
  },

  async getTrendingMovies() {
    try {
      const data = await ApiClient.get(API.MOVIES.TRENDING);
      if (Array.isArray(data) && data.length > 0) return data;
    } catch (e) {
      console.warn('API Gateway offline. Using trending MOCK_MOVIES.', e);
    }
    return MOCK_MOVIES.filter((m) => m.trending);
  },

  async getMovieById(id) {
    if (!id) return MOCK_MOVIES[0];
    try {
      const data = await ApiClient.get(API.MOVIES.DETAIL(id));
      if (data && data.id) return data;
    } catch (e) {
      console.warn(`Movie detail API failed for id=${id}. Looking up in MOCK_MOVIES.`, e);
    }
    return MOCK_MOVIES.find((m) => String(m.id) === String(id)) || MOCK_MOVIES[0];
  },

  async searchMovies(query) {
    if (!query) return [];
    try {
      const data = await ApiClient.get(API.MOVIES.SEARCH(query));
      if (Array.isArray(data)) return data;
    } catch (e) {
      console.warn('Search API failed. Filtering MOCK_MOVIES.', e);
    }
    const q = query.toLowerCase();
    return MOCK_MOVIES.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        (Array.isArray(m.genre) ? m.genre.some((g) => g.toLowerCase().includes(q)) : false)
    );
  },
};
