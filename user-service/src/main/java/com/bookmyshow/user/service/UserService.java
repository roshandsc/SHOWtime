package com.bookmyshow.user.service;

import com.bookmyshow.user.dto.ChangePasswordRequest;
import com.bookmyshow.user.dto.LoginRequest;
import com.bookmyshow.user.dto.RegisterRequest;
import com.bookmyshow.user.dto.UpdateProfileRequest;
import com.bookmyshow.user.entity.User;

import java.util.Map;

public interface UserService {
    User register(RegisterRequest r);
    Map<String, String> login(LoginRequest r);
    User getProfile(String email);
    User updateProfile(String email, UpdateProfileRequest request);
    void changePassword(String email, ChangePasswordRequest request);
    boolean validateToken(String token);
    User getById(Long id);
}
