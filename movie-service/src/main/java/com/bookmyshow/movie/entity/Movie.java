package com.bookmyshow.movie.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "movies")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String genre;
    private String language;
    private int duration;
    @Column(length = 2000)
    private String description;
    @Column(length = 1000)
    private String poster;
    @Column(length = 1000)
    private String bannerUrl;
    @Column(length = 1000)
    private String trailerUrl;
    private double rating;
    private LocalDate releaseDate;
    private boolean featured;
    private boolean trending;

    public Movie() {}

    public Movie(Long id, String title, String genre, String language, int duration, String description, String poster, String bannerUrl, String trailerUrl, double rating, LocalDate releaseDate, boolean featured, boolean trending) {
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.language = language;
        this.duration = duration;
        this.description = description;
        this.poster = poster;
        this.bannerUrl = bannerUrl;
        this.trailerUrl = trailerUrl;
        this.rating = rating;
        this.releaseDate = releaseDate;
        this.featured = featured;
        this.trending = trending;
    }

    public static MovieBuilder builder() {
        return new MovieBuilder();
    }

    public static class MovieBuilder {
        private Long id;
        private String title;
        private String genre;
        private String language;
        private int duration;
        private String description;
        private String poster;
        private String bannerUrl;
        private String trailerUrl;
        private double rating;
        private LocalDate releaseDate;
        private boolean featured;
        private boolean trending;

        public MovieBuilder id(Long id) { this.id = id; return this; }
        public MovieBuilder title(String title) { this.title = title; return this; }
        public MovieBuilder genre(String genre) { this.genre = genre; return this; }
        public MovieBuilder language(String language) { this.language = language; return this; }
        public MovieBuilder duration(int duration) { this.duration = duration; return this; }
        public MovieBuilder description(String description) { this.description = description; return this; }
        public MovieBuilder poster(String poster) { this.poster = poster; return this; }
        public MovieBuilder bannerUrl(String bannerUrl) { this.bannerUrl = bannerUrl; return this; }
        public MovieBuilder trailerUrl(String trailerUrl) { this.trailerUrl = trailerUrl; return this; }
        public MovieBuilder rating(double rating) { this.rating = rating; return this; }
        public MovieBuilder releaseDate(LocalDate releaseDate) { this.releaseDate = releaseDate; return this; }
        public MovieBuilder featured(boolean featured) { this.featured = featured; return this; }
        public MovieBuilder trending(boolean trending) { this.trending = trending; return this; }

        public Movie build() {
            return new Movie(id, title, genre, language, duration, description, poster, bannerUrl, trailerUrl, rating, releaseDate, featured, trending);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }
    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }
    public int getDuration() { return duration; }
    public void setDuration(int duration) { this.duration = duration; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getPoster() { return poster; }
    public void setPoster(String poster) { this.poster = poster; }
    public String getBannerUrl() { return bannerUrl; }
    public void setBannerUrl(String bannerUrl) { this.bannerUrl = bannerUrl; }
    public String getTrailerUrl() { return trailerUrl; }
    public void setTrailerUrl(String trailerUrl) { this.trailerUrl = trailerUrl; }
    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }
    public LocalDate getReleaseDate() { return releaseDate; }
    public void setReleaseDate(LocalDate releaseDate) { this.releaseDate = releaseDate; }
    public boolean isFeatured() { return featured; }
    public void setFeatured(boolean featured) { this.featured = featured; }
    public boolean isTrending() { return trending; }
    public void setTrending(boolean trending) { this.trending = trending; }
}
