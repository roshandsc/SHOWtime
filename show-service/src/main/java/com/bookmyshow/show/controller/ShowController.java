package com.bookmyshow.show.controller;

import com.bookmyshow.show.entity.Show;
import com.bookmyshow.show.service.ShowService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/shows")
@CrossOrigin(origins = "*")
public class ShowController {

    private final ShowService service;

    public ShowController(ShowService s) {
        this.service = s;
    }

    @GetMapping
    public ResponseEntity<List<Show>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Show> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping("/movie/{movieId}")
    public ResponseEntity<List<Show>> getByMovie(@PathVariable Long movieId) {
        return ResponseEntity.ok(service.getByMovieId(movieId));
    }

    @GetMapping("/date")
    public ResponseEntity<List<Show>> getByDate(@RequestParam(value = "date", required = false)
                                                 @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(service.getByDate(date));
    }

    @GetMapping("/theatre/{theatreId}")
    public ResponseEntity<List<Show>> getByTheatre(@PathVariable Long theatreId) {
        return ResponseEntity.ok(service.getByTheatreId(theatreId));
    }

    @PostMapping
    public ResponseEntity<Show> create(@RequestBody Show sh) {
        return ResponseEntity.ok(service.create(sh));
    }
}
