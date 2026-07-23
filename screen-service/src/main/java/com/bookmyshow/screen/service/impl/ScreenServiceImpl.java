package com.bookmyshow.screen.service.impl;

import com.bookmyshow.screen.entity.Screen;
import com.bookmyshow.screen.repository.ScreenRepository;
import com.bookmyshow.screen.service.ScreenService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScreenServiceImpl implements ScreenService {
    private final ScreenRepository repo;

    public ScreenServiceImpl(ScreenRepository r) {
        this.repo = r;
    }

    @Override
    public Screen create(Screen s) {
        return repo.save(s);
    }

    @Override
    public List<Screen> getAll() {
        return repo.findAll();
    }

    @Override
    public Screen getById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Screen not found with id: " + id));
    }

    @Override
    public List<String> getTheatres() {
        return repo.findAll().stream()
                .map(Screen::getTheatreName)
                .filter(name -> name != null && !name.isBlank())
                .distinct()
                .collect(Collectors.toList());
    }
}
