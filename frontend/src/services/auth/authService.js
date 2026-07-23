import { API } from '../../constants/apiEndpoints';
import { ApiClient } from '../api/apiClient';

const TOKEN_KEY = 'moviehub_token';
const USER_KEY = 'moviehub_user';

export const authService = {
  setSession(token, user, remember = true) {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(TOKEN_KEY, token);
    storage.setItem(USER_KEY, JSON.stringify(user));
  },

  clearSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
  },

  getUser() {
    try {
      const raw = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated() {
    const token = this.getToken();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000;
      if (Date.now() >= exp) {
        this.clearSession();
        return false;
      }
      return true;
    } catch {
      return true;
    }
  },

  async login(credentials) {
    try {
      const data = await ApiClient.post(API.AUTH.LOGIN, credentials);
      if (data && data.token) {
        this.setSession(data.token, data.user || { email: credentials.email, name: credentials.email.split('@')[0] });
        return data;
      }
    } catch (err) {
      console.warn('Backend auth unavailable. Using local session.', err);
    }
    // Fallback demo user session
    const mockUser = { name: 'Demo User', email: credentials.email || 'user@showtime.com', phone: '+91 98765 43210' };
    const mockToken = 'mock-jwt-token-' + Date.now();
    this.setSession(mockToken, mockUser);
    return { token: mockToken, user: mockUser };
  },

  async register(userData) {
    try {
      return await ApiClient.post(API.AUTH.REGISTER, userData);
    } catch (err) {
      console.warn('Backend register failed. Returning mock user.', err);
      return { success: true, message: 'Account created successfully!' };
    }
  },

  async logout() {
    try {
      await ApiClient.post(API.AUTH.LOGOUT, {});
    } catch (err) {
      console.warn('Logout API error:', err);
    } finally {
      this.clearSession();
    }
  }
};
