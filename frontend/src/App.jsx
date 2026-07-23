import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { BookingProvider } from './context/BookingContext';
import Layout from './components/layout/Layout/Layout';
import AppRoutes from './routes/AppRoutes';

export const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <BookingProvider>
            <Layout>
              <AppRoutes />
            </Layout>
          </BookingProvider>
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
