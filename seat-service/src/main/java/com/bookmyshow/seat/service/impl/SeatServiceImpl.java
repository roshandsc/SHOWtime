package com.bookmyshow.seat.service.impl;

import com.bookmyshow.seat.entity.Seat;
import com.bookmyshow.seat.repository.SeatRepository;
import com.bookmyshow.seat.service.SeatService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SeatServiceImpl implements SeatService {
    private final SeatRepository repo;

    public SeatServiceImpl(SeatRepository r) {
        this.repo = r;
    }

    @Override
    public Seat create(Seat s) {
        return repo.save(s);
    }

    @Override
    public List<Seat> getAll() {
        return repo.findAll();
    }

    @Override
    public Seat getById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Seat not found with id: " + id));
    }

    @Override
    public List<Seat> getByShowId(Long showId) {
        List<Seat> seats = repo.findByShowId(showId);
        if (seats.isEmpty()) {
            seats = initializeSeatsForShow(showId);
        }
        return seats;
    }

    @Override
    public List<Seat> getAvailableByShowId(Long showId) {
        List<Seat> seats = getByShowId(showId);
        return seats.stream()
                .filter(s -> "AVAILABLE".equalsIgnoreCase(s.getStatus()))
                .toList();
    }

    @Override
    public List<Seat> reserve(List<Long> seatIds) {
        List<Seat> seats = repo.findByIdIn(seatIds);
        for (Seat s : seats) {
            if ("BOOKED".equalsIgnoreCase(s.getStatus())) {
                throw new RuntimeException("Seat " + s.getSeatNumber() + " is already booked");
            }
            s.setStatus("BOOKED");
        }
        return repo.saveAll(seats);
    }

    @Override
    public List<Seat> release(List<Long> seatIds) {
        List<Seat> seats = repo.findByIdIn(seatIds);
        for (Seat s : seats) {
            s.setStatus("AVAILABLE");
        }
        return repo.saveAll(seats);
    }

    private List<Seat> initializeSeatsForShow(Long showId) {
        List<Seat> newSeats = new ArrayList<>();
        char[] rows = {'A', 'B', 'C', 'D', 'E', 'F'};

        for (char r : rows) {
            String seatType = "REGULAR";
            double price = 220.0;

            if (r == 'A' || r == 'B') {
                seatType = "RECLINER";
                price = 380.0;
            } else if (r == 'C' || r == 'D') {
                seatType = "PREMIUM";
                price = 280.0;
            }

            for (int i = 1; i <= 10; i++) {
                Seat seat = Seat.builder()
                        .showId(showId)
                        .seatNumber(r + String.valueOf(i))
                        .seatType(seatType)
                        .price(price)
                        .status("AVAILABLE")
                        .build();
                newSeats.add(seat);
            }
        }
        return repo.saveAll(newSeats);
    }
}
