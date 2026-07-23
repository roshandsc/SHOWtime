package com.bookmyshow.movie.repository;

import com.bookmyshow.movie.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Long> {
    List<Movie> findByFeaturedTrue();
    List<Movie> findByTrendingTrue();
    List<Movie> findByGenreContainingIgnoreCase(String genre);
    List<Movie> findByLanguageIgnoreCase(String language);
    List<Movie> findByTitleContainingIgnoreCaseOrGenreContainingIgnoreCaseOrLanguageContainingIgnoreCase(String title, String genre, String language);
    List<Movie> findByRatingGreaterThanEqual(double rating);
    List<Movie> findByReleaseDateAfter(LocalDate date);
}
