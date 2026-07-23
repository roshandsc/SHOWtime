package com.bookmyshow.show.config;

import com.bookmyshow.show.entity.Show;
import com.bookmyshow.show.repository.ShowRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final ShowRepository repository;

    public DataSeeder(ShowRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {
        if (repository.count() == 0) {
            LocalDate today = LocalDate.now();
            List<Show> initialShows = List.of(
                Show.builder()
                    .movieId(1L)
                    .screenId(1L)
                    .showDate(today)
                    .startTime(LocalTime.of(10, 30))
                    .endTime(LocalTime.of(13, 19))
                    .price(250.0)
                    .build(),
                Show.builder()
                    .movieId(1L)
                    .screenId(1L)
                    .showDate(today)
                    .startTime(LocalTime.of(14, 30))
                    .endTime(LocalTime.of(17, 19))
                    .price(280.0)
                    .build(),
                Show.builder()
                    .movieId(1L)
                    .screenId(2L)
                    .showDate(today)
                    .startTime(LocalTime.of(18, 00))
                    .endTime(LocalTime.of(20, 49))
                    .price(350.0)
                    .build(),
                Show.builder()
                    .movieId(2L)
                    .screenId(2L)
                    .showDate(today)
                    .startTime(LocalTime.of(11, 00))
                    .endTime(LocalTime.of(13, 22))
                    .price(220.0)
                    .build(),
                Show.builder()
                    .movieId(2L)
                    .screenId(3L)
                    .showDate(today)
                    .startTime(LocalTime.of(19, 30))
                    .endTime(LocalTime.of(21, 52))
                    .price(300.0)
                    .build(),
                Show.builder()
                    .movieId(3L)
                    .screenId(4L)
                    .showDate(today)
                    .startTime(LocalTime.of(16, 00))
                    .endTime(LocalTime.of(18, 35))
                    .price(320.0)
                    .build()
            );
            repository.saveAll(initialShows);
        }
    }
}
