package com.bookmyshow.booking.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bookingNumber;
    private Long userId;
    private Long movieId;
    private Long showId;
    private String seatIds;
    private BigDecimal amount;
    private LocalDateTime bookingTime;
    private String paymentStatus;
    private String bookingStatus;

    public Booking() {}

    public Booking(Long id, String bookingNumber, Long userId, Long movieId, Long showId, String seatIds, BigDecimal amount, LocalDateTime bookingTime, String paymentStatus, String bookingStatus) {
        this.id = id;
        this.bookingNumber = bookingNumber;
        this.userId = userId;
        this.movieId = movieId;
        this.showId = showId;
        this.seatIds = seatIds;
        this.amount = amount;
        this.bookingTime = bookingTime;
        this.paymentStatus = paymentStatus;
        this.bookingStatus = bookingStatus;
    }

    public static BookingBuilder builder() {
        return new BookingBuilder();
    }

    public static class BookingBuilder {
        private Long id;
        private String bookingNumber;
        private Long userId;
        private Long movieId;
        private Long showId;
        private String seatIds;
        private BigDecimal amount;
        private LocalDateTime bookingTime;
        private String paymentStatus;
        private String bookingStatus;

        public BookingBuilder id(Long id) { this.id = id; return this; }
        public BookingBuilder bookingNumber(String bookingNumber) { this.bookingNumber = bookingNumber; return this; }
        public BookingBuilder userId(Long userId) { this.userId = userId; return this; }
        public BookingBuilder movieId(Long movieId) { this.movieId = movieId; return this; }
        public BookingBuilder showId(Long showId) { this.showId = showId; return this; }
        public BookingBuilder seatIds(String seatIds) { this.seatIds = seatIds; return this; }
        public BookingBuilder amount(BigDecimal amount) { this.amount = amount; return this; }
        public BookingBuilder bookingTime(LocalDateTime bookingTime) { this.bookingTime = bookingTime; return this; }
        public BookingBuilder paymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; return this; }
        public BookingBuilder bookingStatus(String bookingStatus) { this.bookingStatus = bookingStatus; return this; }

        public Booking build() {
            return new Booking(id, bookingNumber, userId, movieId, showId, seatIds, amount, bookingTime, paymentStatus, bookingStatus);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getBookingNumber() { return bookingNumber; }
    public void setBookingNumber(String bookingNumber) { this.bookingNumber = bookingNumber; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public Long getMovieId() { return movieId; }
    public void setMovieId(Long movieId) { this.movieId = movieId; }
    public Long getShowId() { return showId; }
    public void setShowId(Long showId) { this.showId = showId; }
    public String getSeatIds() { return seatIds; }
    public void setSeatIds(String seatIds) { this.seatIds = seatIds; }
    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
    public LocalDateTime getBookingTime() { return bookingTime; }
    public void setBookingTime(LocalDateTime bookingTime) { this.bookingTime = bookingTime; }
    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }
    public String getBookingStatus() { return bookingStatus; }
    public void setBookingStatus(String bookingStatus) { this.bookingStatus = bookingStatus; }
}
