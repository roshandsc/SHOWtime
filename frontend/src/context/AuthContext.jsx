import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/auth/authService';

export const AuthContext = createContext(null);

export const DEFAULT_USER = {
  id: '1',
  name: 'Rohan Shetty',
  email: 'rohan.shetty@email.com',
  mobile: '9876543210',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80',
  badge: 'MoviePass Gold',
  tier: 'Gold',
  bookingsCount: 12,
  points: 8600,
  wishlistCount: 4,
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user_profile');
    if (saved) {
      try {
        return { ...DEFAULT_USER, ...JSON.parse(saved) };
      } catch (e) {
        return DEFAULT_USER;
      }
    }
    return DEFAULT_USER;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(localStorage.getItem('auth_token') || localStorage.getItem('user_profile'));
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user_profile', JSON.stringify(user));
    }
  }, [user]);

  const login = async (credentials) => {
    try {
      const res = await authService.login(credentials);
      const loggedUser = {
        ...DEFAULT_USER,
        email: credentials.email || DEFAULT_USER.email,
        name: credentials.email ? credentials.email.split('@')[0] : DEFAULT_USER.name,
      };
      setUser(loggedUser);
      setIsAuthenticated(true);
      localStorage.setItem('auth_token', res.token || 'demo-token');
      localStorage.setItem('user_profile', JSON.stringify(loggedUser));
      return res;
    } catch (e) {
      // Fallback for offline demo login
      setUser(DEFAULT_USER);
      setIsAuthenticated(true);
      localStorage.setItem('auth_token', 'demo-token');
      localStorage.setItem('user_profile', JSON.stringify(DEFAULT_USER));
      return { token: 'demo-token', user: DEFAULT_USER };
    }
  };

  const register = async (userData) => {
    const newUser = {
      ...DEFAULT_USER,
      name: userData.name || DEFAULT_USER.name,
      email: userData.email || DEFAULT_USER.email,
      mobile: userData.mobile || DEFAULT_USER.mobile,
    };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('auth_token', 'demo-token');
    localStorage.setItem('user_profile', JSON.stringify(newUser));
    return { token: 'demo-token', user: newUser };
  };

  const logout = async () => {
    await authService.logout();
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_profile');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
