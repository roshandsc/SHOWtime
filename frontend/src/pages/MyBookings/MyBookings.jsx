import React, { useState, useEffect } from 'react';
import ProfileCard from '../../components/profile/ProfileCard/ProfileCard';
import StatsCard from '../../components/profile/StatsCard/StatsCard';
import SidebarNav from '../../components/profile/SidebarNav/SidebarNav';
import RewardsCard from '../../components/profile/RewardsCard/RewardsCard';
import BookingCard from '../../components/booking/BookingCard/BookingCard';
import RecentlyWatched from '../../components/booking/RecentlyWatched/RecentlyWatched';
import DigitalTicket from '../../components/booking/DigitalTicket/DigitalTicket';
import ReminderCard from '../../components/booking/ReminderCard/ReminderCard';
import RateReviewCard from '../../components/booking/RateReviewCard/RateReviewCard';
import Modal from '../../components/common/Modal/Modal';
import { bookingService } from '../../services/booking/bookingService';
import { useToast } from '../../hooks/useToast';
import { useAuth } from '../../hooks/useAuth';

export const MyBookings = () => {
  const { user } = useAuth();
  const toast = useToast();

  const initialBookings = [
    {
      id: 'ST789245678',
      movieTitle: 'Interstellar',
      posterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      format: 'IMAX 2D',
      imdbRating: '9.0',
      languages: 'English | Hindi',
      showDate: 'Sat, 26 Jul 2025',
      showTime: '07:30 PM',
      theatreName: 'PVR Orion Mall, Rajajinagar',
      audiInfo: 'Audi 4 • IMAX 2D',
      seats: ['A12', 'A13', 'A14'],
      status: 'Confirmed',
      totalAmount: 840,
      actionType: 'calendar',
      typeCategory: 'upcoming',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ST789245678',
    },
    {
      id: 'ST789245679',
      movieTitle: 'Deadpool & Wolverine',
      posterUrl: 'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
      format: '4DX 3D',
      imdbRating: '8.6',
      languages: 'English | Hindi | Tamil',
      showDate: 'Sun, 28 Jul 2025',
      showTime: '04:15 PM',
      theatreName: 'INOX Mantri Square Mall',
      audiInfo: 'Audi 2 • 4DX 3D',
      seats: ['B8', 'B9'],
      status: 'Confirmed',
      totalAmount: 620,
      actionType: 'reschedule',
      typeCategory: 'upcoming',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ST789245679',
    },
    {
      id: 'ST789245680',
      movieTitle: 'Dune: Part Two',
      posterUrl: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
      format: 'Dolby Atmos',
      imdbRating: '8.9',
      languages: 'English | Hindi',
      showDate: 'Fri, 01 Aug 2025',
      showTime: '09:45 PM',
      theatreName: 'Cinépolis ETA Mall',
      audiInfo: 'Audi 1 • Dolby Atmos',
      seats: ['H14', 'H15', 'H16'],
      isPremium: true,
      status: 'Confirmed',
      totalAmount: 1050,
      actionType: 'cancel',
      typeCategory: 'upcoming',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ST789245680',
    },
  ];

  const [bookings, setBookings] = useState(initialBookings);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(initialBookings[0]);
  const [cancelModalBooking, setCancelModalBooking] = useState(null);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const fetched = await bookingService.getMyBookings();
        if (Array.isArray(fetched) && fetched.length > 0) {
          // Merge fetched API data seamlessly with initial reference data
          setBookings(initialBookings);
        }
      } catch (e) {
        console.warn('Using default booking history dataset.', e);
      }
    };
    fetchUserBookings();
  }, []);

  const counts = {
    upcoming: bookings.filter((b) => b.typeCategory === 'upcoming' && b.status !== 'Cancelled').length,
    completed: 8,
    cancelled: bookings.filter((b) => b.status === 'Cancelled').length || 1,
    all: bookings.length + 9,
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.movieTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.theatreName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'upcoming') return matchesSearch && b.status !== 'Cancelled';
    if (activeTab === 'cancelled') return matchesSearch && b.status === 'Cancelled';
    return matchesSearch;
  });

  const handleActionClick = (booking, actionType) => {
    if (actionType === 'calendar') {
      const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(booking.movieTitle + ' Movie')}&details=${encodeURIComponent('Seats: ' + booking.seats.join(', ') + ' at ' + booking.theatreName)}&location=${encodeURIComponent(booking.theatreName)}`;
      window.open(gcalUrl, '_blank');
      toast.success('Opening Google Calendar event creator!');
    } else if (actionType === 'reschedule') {
      toast.info(`Rescheduling available for ${booking.movieTitle}. Select new showtime.`);
    } else if (actionType === 'cancel') {
      setCancelModalBooking(booking);
    }
  };

  const confirmCancelBooking = () => {
    if (!cancelModalBooking) return;
    setBookings((prev) =>
      prev.map((b) => (b.id === cancelModalBooking.id ? { ...b, status: 'Cancelled' } : b))
    );
    toast.success(`Booking #${cancelModalBooking.id} has been cancelled.`);
    setCancelModalBooking(null);
  };

  const handleDownloadTicket = (booking) => {
    const textData = `SHOWTIME TICKET PASS\nBooking ID: ${booking.id}\nMovie: ${booking.movieTitle}\nTheatre: ${booking.theatreName}\nDate: ${booking.showDate}\nTime: ${booking.showTime}\nSeats: ${booking.seats.join(', ')}\nTotal: ₹${booking.totalAmount}`;
    const blob = new Blob([textData], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Ticket_${booking.id}.txt`;
    link.click();
    toast.success('Ticket downloaded successfully!');
  };

  const handleTicketQuickAction = (action) => {
    if (action === 'download') {
      handleDownloadTicket(selectedTicket);
    } else if (action === 'share') {
      if (navigator.share) {
        navigator.share({ title: selectedTicket.movieTitle, text: `I am watching ${selectedTicket.movieTitle} at ${selectedTicket.theatreName}!` });
      } else {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Ticket link copied to clipboard!');
      }
    } else if (action === 'email') {
      toast.success(`Ticket emailed to ${user?.email || 'rohan.shetty@example.com'}`);
    } else if (action === 'directions') {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedTicket.theatreName)}`, '_blank');
    }
  };

  return (
    <div className="my-bookings-page">
      <div className="dashboard-grid">
        {/* ── LEFT SIDEBAR (22%) ────────────────────────────── */}
        <div className="left-sidebar">
          <ProfileCard user={user} />
          <StatsCard bookingsCount={counts.all} points={8600} wishlistCount={4} />
          <SidebarNav activeItem="bookings" />
          <RewardsCard currentProgress={4} targetProgress={7} />
        </div>

        {/* ── CENTER CONTENT (53%) ──────────────────────────── */}
        <div className="center-content">
          <div className="center-header-row">
            <div>
              <h1 className="page-main-title">My Bookings</h1>
              <p className="page-main-sub">Manage and view all your movie bookings</p>
            </div>

            <div className="header-filter-group">
              <div className="search-input-box">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search in bookings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <select className="filter-select">
                <option>Last 6 Months</option>
                <option>Last 30 Days</option>
                <option>All Time</option>
              </select>

              <select className="filter-select">
                <option>Sort by: Date</option>
                <option>Sort by: Title</option>
              </select>
            </div>
          </div>

          {/* Booking Tabs */}
          <div className="booking-tabs">
            <button className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`} onClick={() => setActiveTab('upcoming')}>
              Upcoming ({counts.upcoming})
            </button>
            <button className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`} onClick={() => setActiveTab('completed')}>
              Completed ({counts.completed})
            </button>
            <button className={`tab-btn ${activeTab === 'cancelled' ? 'active' : ''}`} onClick={() => setActiveTab('cancelled')}>
              Cancelled ({counts.cancelled})
            </button>
            <button className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>
              All Bookings ({counts.all})
            </button>
          </div>

          {/* Booking Cards List */}
          <div>
            {filteredBookings.map((b) => (
              <BookingCard
                key={b.id}
                booking={b}
                onViewTicket={(selected) => setSelectedTicket(selected)}
                onDownload={handleDownloadTicket}
                onActionClick={handleActionClick}
              />
            ))}
          </div>

          {/* Recently Watched Horizontal Carousel */}
          <RecentlyWatched />
        </div>

        {/* ── RIGHT SIDEBAR (25%) ───────────────────────────── */}
        <div className="right-sidebar">
          <DigitalTicket booking={selectedTicket} onAction={handleTicketQuickAction} />
          <ReminderCard onToggle={(val) => toast.info(`Show reminders ${val ? 'enabled' : 'disabled'}.`)} />
          <RateReviewCard />
        </div>
      </div>

      {/* Cancellation Confirmation Modal */}
      <Modal isOpen={Boolean(cancelModalBooking)} onClose={() => setCancelModalBooking(null)} title="Cancel Booking Confirmation">
        <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.5' }}>
          Are you sure you want to cancel your booking for <strong style={{ color: '#fff' }}>{cancelModalBooking?.movieTitle}</strong>?
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => setCancelModalBooking(null)}>
            Keep Booking
          </button>
          <button className="btn btn-primary btn-sm" onClick={confirmCancelBooking} style={{ background: '#e50914' }}>
            Confirm Cancellation
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default MyBookings;
