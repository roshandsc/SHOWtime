import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import BookingSummary from '../../components/booking/BookingSummary/BookingSummary';
import CouponCard from '../../components/booking/CouponCard/CouponCard';
import PaymentMethods from '../../components/booking/PaymentMethods/PaymentMethods';
import Loader from '../../components/common/Loader/Loader';
import { movieService } from '../../services/movies/movieService';
import { bookingService } from '../../services/booking/bookingService';
import { useToast } from '../../hooks/useToast';
import { useBooking } from '../../hooks/useBooking';

export const Payment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { bookingData, clearBooking } = useBooking();

  const movieId = searchParams.get('movieId') || '1';
  const seatsParam = searchParams.get('seats') ? searchParams.get('seats').split(',') : bookingData.seats || ['C5', 'C6'];
  const timeParam = searchParams.get('time') || bookingData.showTime || '07:30 PM';
  const theatreParam = searchParams.get('theatre') || bookingData.theatreName || 'PVR Orion Mall';
  const dateParam = searchParams.get('date') || bookingData.showDate || 'Today';

  const [movie, setMovie] = useState(bookingData.movie);
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(!bookingData.movie);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    const loadMovie = async () => {
      const data = await movieService.getMovieById(movieId);
      setMovie(data);
      setLoading(false);
    };
    if (!movie) loadMovie();
  }, [movieId, movie]);

  const handleApplyCoupon = (couponObj) => {
    setDiscount(couponObj.discount);
  };

  const handlePay = async (paymentDetails) => {
    setPaying(true);
    try {
      const res = await bookingService.createBooking({
        movieId,
        movieTitle: movie?.title || 'Movie Title',
        posterUrl: movie?.posterUrl || movie?.poster,
        theatreName: theatreParam,
        showDate: dateParam,
        showTime: timeParam,
        seats: seatsParam,
        paymentDetails,
        discount,
      });

      toast.success('Payment successful! Generating ticket...');
      setTimeout(() => {
        clearBooking();
        navigate(`/booking-confirmation?bookingId=${res.id}`);
      }, 1200);
    } catch (e) {
      toast.error('Payment processing failed. Please try again.');
      setPaying(false);
    }
  };

  if (loading) return <Loader fullPage message="Preparing checkout..." />;

  return (
    <div style={{ padding: '40px var(--container-padding, 2.5rem)' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '24px' }}>Checkout & Payment</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '32px', alignItems: 'start' }}>
        <div>
          <CouponCard onApplyCoupon={handleApplyCoupon} />
          <PaymentMethods onPay={handlePay} loading={paying} />
        </div>

        <BookingSummary
          movie={movie}
          theatreName={theatreParam}
          showDate={dateParam}
          showTime={timeParam}
          selectedSeats={seatsParam}
          discount={discount}
        />
      </div>
    </div>
  );
};

export default Payment;
