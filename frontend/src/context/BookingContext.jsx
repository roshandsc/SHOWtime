import React, { createContext, useState } from 'react';

export const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({
    movie: null,
    theatre: null,
    showDate: 'Today',
    showTime: '07:30 PM',
    seats: [],
    coupon: null,
    discount: 0,
  });

  const updateBooking = (updates) => {
    setBookingData((prev) => ({ ...prev, ...updates }));
  };

  const clearBooking = () => {
    setBookingData({
      movie: null,
      theatre: null,
      showDate: 'Today',
      showTime: '07:30 PM',
      seats: [],
      coupon: null,
      discount: 0,
    });
  };

  return (
    <BookingContext.Provider value={{ bookingData, updateBooking, clearBooking }}>
      {children}
    </BookingContext.Provider>
  );
};
