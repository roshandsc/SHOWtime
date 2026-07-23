package com.bookmyshow.screen.controller;

import com.bookmyshow.screen.entity.Screen;
import com.bookmyshow.screen.service.ScreenService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/screens")
@CrossOrigin(origins = "*")
public class ScreenController {

    private final ScreenService service;

    public ScreenController(ScreenService s) {
        this.service = s;
    }

    @GetMapping
    public ResponseEntity<List<Screen>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Screen> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping("/theatres")
    public ResponseEntity<List<String>> getTheatres() {
        return ResponseEntity.ok(service.getTheatres());
    }

    @PostMapping
    public ResponseEntity<Screen> create(@RequestBody Screen sc) {
        return ResponseEntity.ok(service.create(sc));
    }
}
