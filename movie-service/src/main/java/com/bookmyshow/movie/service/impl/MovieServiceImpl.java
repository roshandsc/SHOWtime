package com.bookmyshow.movie.service.impl;

import com.bookmyshow.movie.entity.Movie;
import com.bookmyshow.movie.repository.MovieRepository;
import com.bookmyshow.movie.service.MovieService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class MovieServiceImpl implements MovieService {
    private final MovieRepository repo;

    public MovieServiceImpl(MovieRepository r) {
        this.repo = r;
    }

    @Override
    public Movie create(Movie m) {
        return repo.save(m);
    }

    @Override
    public Movie update(Long id, Movie m) {
        Movie existing = getById(id);
        existing.setTitle(m.getTitle());
        existing.setGenre(m.getGenre());
        existing.setLanguage(m.getLanguage());
        existing.setDuration(m.getDuration());
        existing.setDescription(m.getDescription());
        existing.setPoster(m.getPoster());
        existing.setBannerUrl(m.getBannerUrl());
        existing.setRating(m.getRating());
        existing.setReleaseDate(m.getReleaseDate());
        existing.setFeatured(m.isFeatured());
        existing.setTrending(m.isTrending());
        return repo.save(existing);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }

    @Override
    public Movie getById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Movie not found with id: " + id));
    }

    @Override
    public List<Movie> getAll() {
        return repo.findAll();
    }

    @Override
    public List<Movie> getFeatured() {
        List<Movie> list = repo.findByFeaturedTrue();
        return list.isEmpty() ? repo.findAll() : list;
    }

    @Override
    public List<Movie> getTrending() {
        List<Movie> list = repo.findByTrendingTrue();
        return list.isEmpty() ? repo.findAll() : list;
    }

    @Override
    public List<Movie> getUpcoming() {
        List<Movie> list = repo.findByReleaseDateAfter(LocalDate.now());
        return list.isEmpty() ? repo.findAll() : list;
    }

    @Override
    public List<Movie> getPopular() {
        List<Movie> list = repo.findByRatingGreaterThanEqual(8.0);
        return list.isEmpty() ? repo.findAll() : list;
    }

    @Override
    public List<Movie> search(String query) {
        if (query == null || query.isBlank()) {
            return getAll();
        }
        return repo.findByTitleContainingIgnoreCaseOrGenreContainingIgnoreCaseOrLanguageContainingIgnoreCase(query, query, query);
    }

    @Override
    public List<Movie> getByGenre(String genre) {
        return repo.findByGenreContainingIgnoreCase(genre);
    }

    @Override
    public List<Movie> getByLanguage(String language) {
        return repo.findByLanguageIgnoreCase(language);
    }
}
