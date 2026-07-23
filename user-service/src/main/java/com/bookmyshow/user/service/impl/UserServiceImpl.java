package com.bookmyshow.user.service.impl;

import com.bookmyshow.user.dto.ChangePasswordRequest;
import com.bookmyshow.user.dto.LoginRequest;
import com.bookmyshow.user.dto.RegisterRequest;
import com.bookmyshow.user.dto.UpdateProfileRequest;
import com.bookmyshow.user.entity.User;
import com.bookmyshow.user.repository.UserRepository;
import com.bookmyshow.user.security.JwtUtil;
import com.bookmyshow.user.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository repo;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public UserServiceImpl(UserRepository r, PasswordEncoder e, JwtUtil jwtUtil) {
        this.repo = r;
        this.encoder = e;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public User register(RegisterRequest r) {
        repo.findByEmail(r.getEmail()).ifPresent(existing -> {
            throw new IllegalStateException("An account with this email already exists");
        });

        User u = new User();
        u.setName(r.getName());
        u.setEmail(r.getEmail());
        u.setMobile(r.getMobile());
        u.setPassword(encoder.encode(r.getPassword()));
        u.setCreatedAt(LocalDateTime.now());

        return repo.save(u);
    }

    @Override
    public Map<String, String> login(LoginRequest r) {
        User u = repo.findByEmail(r.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!encoder.matches(r.getPassword(), u.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(u.getId(), u.getEmail());

        return Map.of(
                "token", token,
                "id", String.valueOf(u.getId()),
                "name", u.getName(),
                "email", u.getEmail(),
                "mobile", u.getMobile() == null ? "" : u.getMobile()
        );
    }

    @Override
    public User getProfile(String email) {
        return repo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public User updateProfile(String email, UpdateProfileRequest request) {
        User u = getProfile(email);
        u.setName(request.getName());
        if (request.getMobile() != null) {
            u.setMobile(request.getMobile());
        }
        return repo.save(u);
    }

    @Override
    public void changePassword(String email, ChangePasswordRequest request) {
        User u = getProfile(email);
        if (!encoder.matches(request.getOldPassword(), u.getPassword())) {
            throw new RuntimeException("Current password does not match");
        }
        u.setPassword(encoder.encode(request.getNewPassword()));
        repo.save(u);
    }

    @Override
    public boolean validateToken(String token) {
        return jwtUtil.validateToken(token);
    }

    @Override
    public User getById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
