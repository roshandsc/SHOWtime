package com.bookmyshow.show.service.impl;

import com.bookmyshow.show.entity.Show;
import com.bookmyshow.show.repository.ShowRepository;
import com.bookmyshow.show.service.ShowService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ShowServiceImpl implements ShowService {

    private final ShowRepository repo;

    public ShowServiceImpl(ShowRepository r) {
        this.repo = r;
    }

    @Override
    public Show create(Show s) {
        return repo.save(s);
    }

    @Override
    public Show getById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Show not found with id: " + id));
    }

    @Override
    public List<Show> getAll() {
        return repo.findAll();
    }

    @Override
    public List<Show> getByMovieId(Long movieId) {
        return repo.findByMovieId(movieId);
    }

    @Override
    public List<Show> getByDate(LocalDate date) {
        return repo.findByShowDate(date != null ? date : LocalDate.now());
    }

    @Override
    public List<Show> getByTheatreId(Long theatreId) {
        return repo.findByScreenId(theatreId);
    }
}
