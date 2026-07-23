package com.bookmyshow.booking.service.impl;

import com.bookmyshow.booking.entity.Booking;
import com.bookmyshow.booking.repository.BookingRepository;
import com.bookmyshow.booking.service.BookingService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository repo;

    public BookingServiceImpl(BookingRepository r) {
        this.repo = r;
    }

    @Override
    public Booking create(Booking b) {
        if (b.getBookingNumber() == null || b.getBookingNumber().isBlank()) {
            b.setBookingNumber("BMS-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }
        if (b.getBookingTime() == null) {
            b.setBookingTime(LocalDateTime.now());
        }
        if (b.getBookingStatus() == null) {
            b.setBookingStatus("PENDING");
        }
        if (b.getPaymentStatus() == null) {
            b.setPaymentStatus("PENDING");
        }
        return repo.save(b);
    }

    @Override
    public Booking getById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));
    }

    @Override
    public List<Booking> getAll() {
        return repo.findAll();
    }

    @Override
    public List<Booking> getByUserId(Long userId) {
        return repo.findByUserId(userId);
    }

    @Override
    public Booking confirmBooking(Long id) {
        Booking b = getById(id);
        b.setBookingStatus("CONFIRMED");
        b.setPaymentStatus("PAID");
        return repo.save(b);
    }

    @Override
    public Booking cancelBooking(Long id) {
        Booking b = getById(id);
        b.setBookingStatus("CANCELLED");
        return repo.save(b);
    }

    @Override
    public Booking getByBookingNumber(String bookingNumber) {
        return repo.findByBookingNumber(bookingNumber)
                .orElseThrow(() -> new RuntimeException("Booking not found with number: " + bookingNumber));
    }
}
