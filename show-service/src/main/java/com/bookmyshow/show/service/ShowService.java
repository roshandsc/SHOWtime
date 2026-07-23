package com.bookmyshow.show.service;

import com.bookmyshow.show.entity.Show;
import java.time.LocalDate;
import java.util.List;

public interface ShowService {
    Show create(Show s);
    Show getById(Long id);
    List<Show> getAll();
    List<Show> getByMovieId(Long movieId);
    List<Show> getByDate(LocalDate date);
    List<Show> getByTheatreId(Long theatreId);
}
