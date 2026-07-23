package com.bookmyshow.movie.config;

import com.bookmyshow.movie.entity.Movie;
import com.bookmyshow.movie.repository.MovieRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final MovieRepository repository;

    public DataSeeder(MovieRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {
        repository.deleteAll();
        List<Movie> initialMovies = List.of(
                Movie.builder()
                    .title("Kalki 2898 AD")
                    .genre("Action, Sci-Fi, Adventure")
                    .language("Telugu, Hindi, English")
                    .duration(176)
                    .description("A glimpse into the future of 2898 AD. When darkness threatens to consume the world, a savior rises.")
                    .poster("https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80")
                    .bannerUrl("https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1600&auto=format&fit=crop&q=80")
                    .trailerUrl("https://www.youtube.com/embed/k9Hw_fN1bT8")
                    .rating(8.7)
                    .releaseDate(LocalDate.of(2024, 6, 27))
                    .featured(true)
                    .trending(true)
                    .build(),
                Movie.builder()
                    .title("Deadpool & Wolverine")
                    .genre("Action, Comedy, Sci-Fi")
                    .language("English")
                    .duration(128)
                    .description("Wolverine is recovering from his injuries when he crosses paths with the loudmouth Deadpool.")
                    .poster("https://images.unsplash.com/photo-1568832359672-e36cf5d74f54?w=600&auto=format&fit=crop&q=80")
                    .bannerUrl("https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80")
                    .trailerUrl("https://www.youtube.com/embed/73_1biulkYk")
                    .rating(8.3)
                    .releaseDate(LocalDate.of(2024, 7, 26))
                    .featured(true)
                    .trending(true)
                    .build(),
                Movie.builder()
                    .title("Furiosa: A Mad Max Saga")
                    .genre("Action, Sci-Fi, Adventure")
                    .language("English")
                    .duration(148)
                    .description("The origin story of renegade warrior Furiosa before her encounter with Mad Max.")
                    .poster("https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80")
                    .bannerUrl("https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=80")
                    .trailerUrl("https://www.youtube.com/embed/XJMuhwVlca4")
                    .rating(8.1)
                    .releaseDate(LocalDate.of(2024, 5, 24))
                    .featured(false)
                    .trending(true)
                    .build(),
                Movie.builder()
                    .title("Inside Out 2")
                    .genre("Animation, Comedy, Family")
                    .language("English")
                    .duration(96)
                    .description("Follow Riley in her teenage years as new emotions enter headquarters.")
                    .poster("https://images.unsplash.com/photo-1535016120720-40c646be5580?w=600&auto=format&fit=crop&q=80")
                    .bannerUrl("https://images.unsplash.com/photo-1514539079130-25950c84af65?w=1600&auto=format&fit=crop&q=80")
                    .trailerUrl("https://www.youtube.com/embed/LEjhY15eCx0")
                    .rating(8.6)
                    .releaseDate(LocalDate.of(2024, 6, 14))
                    .featured(false)
                    .trending(true)
                    .build(),
                Movie.builder()
                    .title("Dune: Part Two")
                    .genre("Sci-Fi, Adventure, Drama")
                    .language("English")
                    .duration(166)
                    .description("Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators.")
                    .poster("https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80")
                    .bannerUrl("https://images.unsplash.com/photo-1461151304267-38535e780c79?w=1600&auto=format&fit=crop&q=80")
                    .trailerUrl("https://www.youtube.com/embed/Way9Dexny3w")
                    .rating(8.9)
                    .releaseDate(LocalDate.of(2024, 3, 1))
                    .featured(true)
                    .trending(true)
                    .build(),
                Movie.builder()
                    .title("Godzilla x Kong: The New Empire")
                    .genre("Action, Sci-Fi, Adventure")
                    .language("English")
                    .duration(115)
                    .description("Two ancient titans, Godzilla and Kong, clash in a colossal battle as humans unravel their origins.")
                    .poster("https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80")
                    .bannerUrl("https://images.unsplash.com/photo-1514539079130-25950c84af65?w=1600&auto=format&fit=crop&q=80")
                    .trailerUrl("https://www.youtube.com/embed/lV1OOlGwExM")
                    .rating(7.8)
                    .releaseDate(LocalDate.of(2024, 3, 29))
                    .featured(false)
                    .trending(true)
                    .build(),
                Movie.builder()
                    .title("Twisters")
                    .genre("Action, Thriller, Adventure")
                    .language("English")
                    .duration(122)
                    .description("An update to the 1996 film 'Twister' centered on a pair of storm chasers who risk their lives.")
                    .poster("https://images.unsplash.com/photo-1461151304267-38535e780c79?w=600&auto=format&fit=crop&q=80")
                    .bannerUrl("https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1600&auto=format&fit=crop&q=80")
                    .trailerUrl("https://www.youtube.com/embed/JduR-n26Gts")
                    .rating(7.6)
                    .releaseDate(LocalDate.of(2024, 7, 19))
                    .featured(false)
                    .trending(true)
                    .build(),
                Movie.builder()
                    .title("Kingdom of the Planet of the Apes")
                    .genre("Action, Sci-Fi, Adventure")
                    .language("English")
                    .duration(145)
                    .description("Many years after the reign of Caesar, a young ape undertakes a harrowing journey.")
                    .poster("https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&auto=format&fit=crop&q=80")
                    .bannerUrl("https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1600&auto=format&fit=crop&q=80")
                    .trailerUrl("https://www.youtube.com/embed/XtFI7SNtVpY")
                    .rating(7.9)
                    .releaseDate(LocalDate.of(2024, 5, 10))
                    .featured(false)
                    .trending(true)
                    .build()
            );
            repository.saveAll(initialMovies);
    }
}
