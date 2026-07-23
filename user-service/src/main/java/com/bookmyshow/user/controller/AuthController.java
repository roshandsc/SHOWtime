package com.bookmyshow.user.controller;

import com.bookmyshow.user.dto.ChangePasswordRequest;
import com.bookmyshow.user.dto.LoginRequest;
import com.bookmyshow.user.dto.RegisterRequest;
import com.bookmyshow.user.dto.UpdateProfileRequest;
import com.bookmyshow.user.entity.User;
import com.bookmyshow.user.security.JwtUtil;
import com.bookmyshow.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping
public class AuthController {

    private final UserService service;
    private final JwtUtil jwtUtil;

    public AuthController(UserService s, JwtUtil jwtUtil) {
        this.service = s;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/auth/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest r) {
        try {
            User created = service.register(r);
            return ResponseEntity.ok(created);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(409).body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "Registration failed. Please try again."));
        }
    }

    @PostMapping("/auth/login")
    public ResponseEntity<Map<String, String>> login(@Valid @RequestBody LoginRequest r) {
        try {
            return ResponseEntity.ok(service.login(r));
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(Map.of("message", e.getMessage()));
        }
    }

    private String getEmailFromRequest(HttpServletRequest request) {
        String headerEmail = request.getHeader("X-User-Email");
        if (headerEmail != null && !headerEmail.isBlank()) {
            return headerEmail;
        }
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return jwtUtil.extractEmail(authHeader.substring(7));
        }
        throw new RuntimeException("Unauthorized request");
    }

    @GetMapping({"/auth/profile", "/users/me"})
    public ResponseEntity<?> getProfile(HttpServletRequest request) {
        try {
            String email = getEmailFromRequest(request);
            User u = service.getProfile(email);
            return ResponseEntity.ok(u);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping({"/auth/profile/update", "/users/me"})
    public ResponseEntity<?> updateProfile(@Valid @RequestBody UpdateProfileRequest req, HttpServletRequest request) {
        try {
            String email = getEmailFromRequest(request);
            User updated = service.updateProfile(email, req);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping({"/auth/change-password", "/users/me/password"})
    public ResponseEntity<?> changePassword(@Valid @RequestBody ChangePasswordRequest req, HttpServletRequest request) {
        try {
            String email = getEmailFromRequest(request);
            service.changePassword(email, req);
            return ResponseEntity.ok(Map.of("message", "Password changed successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/auth/validate")
    public ResponseEntity<?> validateToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            boolean valid = jwtUtil.validateToken(authHeader.substring(7));
            if (valid) {
                return ResponseEntity.ok(Map.of("valid", true));
            }
        }
        return ResponseEntity.status(401).body(Map.of("valid", false));
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        try {
            User u = service.getById(id);
            return ResponseEntity.ok(u);
        } catch (Exception e) {
            return ResponseEntity.status(404).body(Map.of("message", "User not found"));
        }
    }
}
