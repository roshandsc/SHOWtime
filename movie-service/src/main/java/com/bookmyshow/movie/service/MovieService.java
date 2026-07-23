package com.bookmyshow.movie.service;

import com.bookmyshow.movie.entity.Movie;
import java.util.List;

public interface MovieService {
    Movie create(Movie m);
    Movie update(Long id, Movie m);
    void delete(Long id);
    Movie getById(Long id);
    List<Movie> getAll();
    List<Movie> getFeatured();
    List<Movie> getTrending();
    List<Movie> getUpcoming();
    List<Movie> getPopular();
    List<Movie> search(String query);
    List<Movie> getByGenre(String genre);
    List<Movie> getByLanguage(String language);
}
