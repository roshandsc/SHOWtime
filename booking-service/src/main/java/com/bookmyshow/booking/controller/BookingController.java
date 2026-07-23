package com.bookmyshow.booking.controller;

import com.bookmyshow.booking.entity.Booking;
import com.bookmyshow.booking.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    private final BookingService service;

    public BookingController(BookingService s) {
        this.service = s;
    }

    @GetMapping
    public ResponseEntity<List<Booking>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> getByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(service.getByUserId(userId));
    }

    @GetMapping("/number/{bookingNumber}")
    public ResponseEntity<Booking> getByBookingNumber(@PathVariable String bookingNumber) {
        return ResponseEntity.ok(service.getByBookingNumber(bookingNumber));
    }

    @PostMapping
    public ResponseEntity<Booking> create(@RequestBody Booking b) {
        return ResponseEntity.ok(service.create(b));
    }

    @PostMapping("/{id}/confirm")
    public ResponseEntity<Booking> confirm(@PathVariable Long id) {
        return ResponseEntity.ok(service.confirmBooking(id));
    }

    @PutMapping("/{id}/confirm")
    public ResponseEntity<Booking> confirmPut(@PathVariable Long id) {
        return ResponseEntity.ok(service.confirmBooking(id));
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<Booking> cancel(@PathVariable Long id) {
        return ResponseEntity.ok(service.cancelBooking(id));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<Booking> cancelPut(@PathVariable Long id) {
        return ResponseEntity.ok(service.cancelBooking(id));
    }
}
