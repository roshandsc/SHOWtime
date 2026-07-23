import React, { useState, useEffect } from 'react';
import PageHeader from '../../components/layout/PageHeader/PageHeader';
import Sidebar from '../../components/layout/Sidebar/Sidebar';
import ProfileCard from '../../components/profile/ProfileCard/ProfileCard';
import BookingHistory from '../../components/profile/BookingHistory/BookingHistory';
import Wishlist from '../../components/profile/Wishlist/Wishlist';
import Settings from '../../components/profile/Settings/Settings';
import Loader from '../../components/common/Loader/Loader';
import { useAuth } from '../../hooks/useAuth';
import { bookingService } from '../../services/booking/bookingService';
import { movieService } from '../../services/movies/movieService';

export const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [bookings, setBookings] = useState([]);
  const [wishlistMovies, setWishlistMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const b = await bookingService.getMyBookings();
      const m = await movieService.getAllMovies();
      setBookings(b);
      setWishlistMovies(m.slice(0, 3));
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) return <Loader fullPage message="Loading profile dashboard..." />;

  return (
    <div style={{ padding: '40px var(--container-padding, 2.5rem)' }}>
      <PageHeader title="User Profile Dashboard" subtitle="Manage your account preferences, view tickets, and update wishlist." />

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '32px', marginTop: '24px', alignItems: 'start' }}>
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

        <div>
          {activeTab === 'profile' && <ProfileCard user={user} />}
          {activeTab === 'bookings' && <BookingHistory bookings={bookings} />}
          {activeTab === 'watchlist' && <Wishlist movies={wishlistMovies} />}
          {activeTab === 'settings' && <Settings user={user} />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
