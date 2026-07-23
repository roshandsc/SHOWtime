package com.bookmyshow.seat.controller;

import com.bookmyshow.seat.entity.Seat;
import com.bookmyshow.seat.service.SeatService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/seats")
@CrossOrigin(origins = "*")
public class SeatController {

    private final SeatService service;

    public SeatController(SeatService s) {
        this.service = s;
    }

    @GetMapping
    public ResponseEntity<List<Seat>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Seat> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping("/show/{showId}/layout")
    public ResponseEntity<List<Seat>> getLayout(@PathVariable Long showId) {
        return ResponseEntity.ok(service.getByShowId(showId));
    }

    @GetMapping("/show/{showId}/available")
    public ResponseEntity<List<Seat>> getAvailable(@PathVariable Long showId) {
        return ResponseEntity.ok(service.getAvailableByShowId(showId));
    }

    @GetMapping("/{id}/status")
    public ResponseEntity<Map<String, String>> getStatus(@PathVariable Long id) {
        Seat s = service.getById(id);
        return ResponseEntity.ok(Map.of("status", s.getStatus()));
    }

    @PostMapping("/reserve")
    public ResponseEntity<?> reserve(@RequestBody Map<String, List<Long>> body) {
        try {
            List<Long> seatIds = body.get("seatIds");
            return ResponseEntity.ok(service.reserve(seatIds));
        } catch (RuntimeException e) {
            return ResponseEntity.status(409).body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/release")
    public ResponseEntity<?> release(@RequestBody Map<String, List<Long>> body) {
        try {
            List<Long> seatIds = body.get("seatIds");
            return ResponseEntity.ok(service.release(seatIds));
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<Seat> create(@RequestBody Seat se) {
        return ResponseEntity.ok(service.create(se));
    }
}
