package com.bookmyshow.seat.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "seats")
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long showId;
    private String seatNumber;
    private String seatType;
    private double price;
    private String status;

    public Seat() {}

    public Seat(Long id, Long showId, String seatNumber, String seatType, double price, String status) {
        this.id = id;
        this.showId = showId;
        this.seatNumber = seatNumber;
        this.seatType = seatType;
        this.price = price;
        this.status = status;
    }

    public static SeatBuilder builder() {
        return new SeatBuilder();
    }

    public static class SeatBuilder {
        private Long id;
        private Long showId;
        private String seatNumber;
        private String seatType;
        private double price;
        private String status;

        public SeatBuilder id(Long id) { this.id = id; return this; }
        public SeatBuilder showId(Long showId) { this.showId = showId; return this; }
        public SeatBuilder seatNumber(String seatNumber) { this.seatNumber = seatNumber; return this; }
        public SeatBuilder seatType(String seatType) { this.seatType = seatType; return this; }
        public SeatBuilder price(double price) { this.price = price; return this; }
        public SeatBuilder status(String status) { this.status = status; return this; }

        public Seat build() {
            return new Seat(id, showId, seatNumber, seatType, price, status);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getShowId() { return showId; }
    public void setShowId(Long showId) { this.showId = showId; }
    public String getSeatNumber() { return seatNumber; }
    public void setSeatNumber(String seatNumber) { this.seatNumber = seatNumber; }
    public String getSeatType() { return seatType; }
    public void setSeatType(String seatType) { this.seatType = seatType; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
