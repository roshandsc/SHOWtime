package com.bookmyshow.movie.controller;

import com.bookmyshow.movie.entity.Movie;
import com.bookmyshow.movie.service.MovieService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movies")
@CrossOrigin(origins = "*")
public class MovieController {

    private final MovieService service;

    public MovieController(MovieService s) {
        this.service = s;
    }

    @GetMapping
    public ResponseEntity<List<Movie>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movie> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping("/featured")
    public ResponseEntity<List<Movie>> getFeatured() {
        return ResponseEntity.ok(service.getFeatured());
    }

    @GetMapping("/trending")
    public ResponseEntity<List<Movie>> getTrending() {
        return ResponseEntity.ok(service.getTrending());
    }

    @GetMapping("/upcoming")
    public ResponseEntity<List<Movie>> getUpcoming() {
        return ResponseEntity.ok(service.getUpcoming());
    }

    @GetMapping("/popular")
    public ResponseEntity<List<Movie>> getPopular() {
        return ResponseEntity.ok(service.getPopular());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Movie>> search(@RequestParam(value = "query", required = false) String query,
                                               @RequestParam(value = "q", required = false) String q) {
        String searchQuery = query != null ? query : (q != null ? q : "");
        return ResponseEntity.ok(service.search(searchQuery));
    }

    @GetMapping("/genre/{genre}")
    public ResponseEntity<List<Movie>> getByGenre(@PathVariable String genre) {
        return ResponseEntity.ok(service.getByGenre(genre));
    }

    @GetMapping("/language/{language}")
    public ResponseEntity<List<Movie>> getByLanguage(@PathVariable String language) {
        return ResponseEntity.ok(service.getByLanguage(language));
    }

    @PostMapping
    public ResponseEntity<Movie> create(@RequestBody Movie m) {
        return ResponseEntity.ok(service.create(m));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Movie> update(@PathVariable Long id, @RequestBody Movie m) {
        return ResponseEntity.ok(service.update(id, m));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
