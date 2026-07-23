package com.bookmyshow.screen.config;

import com.bookmyshow.screen.entity.Screen;
import com.bookmyshow.screen.repository.ScreenRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final ScreenRepository repository;

    public DataSeeder(ScreenRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {
        if (repository.count() == 0) {
            List<Screen> initialScreens = List.of(
                Screen.builder()
                    .name("Screen 1 (IMAX 3D)")
                    .theatreName("PVR IMAX Cybercity")
                    .location("Cyber Hub, Sector 24")
                    .totalSeats(60)
                    .build(),
                Screen.builder()
                    .name("Screen 2 (4DX)")
                    .theatreName("PVR IMAX Cybercity")
                    .location("Cyber Hub, Sector 24")
                    .totalSeats(60)
                    .build(),
                Screen.builder()
                    .name("Audi 1 (Dolby Atmos)")
                    .theatreName("INOX Worldmark")
                    .location("Aerocity, New Delhi")
                    .totalSeats(60)
                    .build(),
                Screen.builder()
                    .name("Audi 2 (LUXE)")
                    .theatreName("INOX Worldmark")
                    .location("Aerocity, New Delhi")
                    .totalSeats(60)
                    .build()
            );
            repository.saveAll(initialScreens);
        }
    }
}
