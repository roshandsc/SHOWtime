package com.bookmyshow.show.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "shows")
public class Show {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long movieId;
    private Long screenId;
    private LocalDate showDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private double price;

    public Show() {}

    public Show(Long id, Long movieId, Long screenId, LocalDate showDate, LocalTime startTime, LocalTime endTime, double price) {
        this.id = id;
        this.movieId = movieId;
        this.screenId = screenId;
        this.showDate = showDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.price = price;
    }

    public static ShowBuilder builder() {
        return new ShowBuilder();
    }

    public static class ShowBuilder {
        private Long id;
        private Long movieId;
        private Long screenId;
        private LocalDate showDate;
        private LocalTime startTime;
        private LocalTime endTime;
        private double price;

        public ShowBuilder id(Long id) { this.id = id; return this; }
        public ShowBuilder movieId(Long movieId) { this.movieId = movieId; return this; }
        public ShowBuilder screenId(Long screenId) { this.screenId = screenId; return this; }
        public ShowBuilder showDate(LocalDate showDate) { this.showDate = showDate; return this; }
        public ShowBuilder startTime(LocalTime startTime) { this.startTime = startTime; return this; }
        public ShowBuilder endTime(LocalTime endTime) { this.endTime = endTime; return this; }
        public ShowBuilder price(double price) { this.price = price; return this; }

        public Show build() {
            return new Show(id, movieId, screenId, showDate, startTime, endTime, price);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getMovieId() { return movieId; }
    public void setMovieId(Long movieId) { this.movieId = movieId; }
    public Long getScreenId() { return screenId; }
    public void setScreenId(Long screenId) { this.screenId = screenId; }
    public LocalDate getShowDate() { return showDate; }
    public void setShowDate(LocalDate showDate) { this.showDate = showDate; }
    public LocalTime getStartTime() { return startTime; }
    public void setStartTime(LocalTime startTime) { this.startTime = startTime; }
    public LocalTime getEndTime() { return endTime; }
    public void setEndTime(LocalTime endTime) { this.endTime = endTime; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
}
