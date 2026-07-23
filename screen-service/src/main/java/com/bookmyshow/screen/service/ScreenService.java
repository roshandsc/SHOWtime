package com.bookmyshow.screen.service;

import com.bookmyshow.screen.entity.Screen;
import java.util.List;

public interface ScreenService {
    Screen create(Screen s);
    List<Screen> getAll();
    Screen getById(Long id);
    List<String> getTheatres();
}
