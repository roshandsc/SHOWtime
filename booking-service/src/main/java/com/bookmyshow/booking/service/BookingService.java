package com.bookmyshow.booking.service;

import com.bookmyshow.booking.entity.Booking;
import java.util.List;

public interface BookingService {
    Booking create(Booking b);
    Booking getById(Long id);
    List<Booking> getAll();
    List<Booking> getByUserId(Long userId);
    Booking confirmBooking(Long id);
    Booking cancelBooking(Long id);
    Booking getByBookingNumber(String bookingNumber);
}
