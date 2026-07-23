package com.bookmyshow.seat.service;

import com.bookmyshow.seat.entity.Seat;
import java.util.List;

public interface SeatService {
    Seat create(Seat s);
    List<Seat> getAll();
    Seat getById(Long id);
    List<Seat> getByShowId(Long showId);
    List<Seat> getAvailableByShowId(Long showId);
    List<Seat> reserve(List<Long> seatIds);
    List<Seat> release(List<Long> seatIds);
}
