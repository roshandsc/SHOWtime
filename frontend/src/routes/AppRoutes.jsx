import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Movies from '../pages/Movies/Movies';
import MovieDetails from '../pages/MovieDetails/MovieDetails';
import Theatres from '../pages/Theatres/Theatres';
import SeatBooking from '../pages/SeatBooking/SeatBooking';
import Payment from '../pages/Payment/Payment';
import BookingConfirmation from '../pages/BookingConfirmation/BookingConfirmation';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import Offers from '../pages/Offers/Offers';
import Wishlist from '../pages/Wishlist/Wishlist';
import MyBookings from '../pages/MyBookings/MyBookings';
import Profile from '../pages/Profile/Profile';
import NotFound from '../pages/NotFound/NotFound';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/movie-details/:id" element={<MovieDetails />} />
      <Route path="/theatres" element={<Theatres />} />
      <Route path="/offers" element={<Offers />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route
        path="/seat-booking"
        element={
          <ProtectedRoute>
            <SeatBooking />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking-confirmation"
        element={
          <ProtectedRoute>
            <BookingConfirmation />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-bookings"
        element={
          <ProtectedRoute>
            <MyBookings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
