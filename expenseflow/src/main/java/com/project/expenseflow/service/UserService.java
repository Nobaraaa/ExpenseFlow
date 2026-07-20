
package com.project.expenseflow.service;

import java.util.Optional;

//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.expenseflow.entity.User;
import com.project.expenseflow.dto.UserProfileDto;
import com.project.expenseflow.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> loginUser(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() &&
                user.get().getPassword().equals(password)) {
            return user;

        }
        return Optional.empty();
    }

    public UserProfileDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        UserProfileDto dto = new UserProfileDto();

        dto.setFullName(user.getFullName());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        return dto;
    }

    public UserProfileDto updateUser(Long id, User updatedUser) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found "));
        user.setFullName(updatedUser.getFullName());
        user.setEmail(updatedUser.getEmail());
        user.setPhone(updatedUser.getPhone());
        User savedUser = userRepository.save(user);
        UserProfileDto dto = new UserProfileDto();
        dto.setFullName(savedUser.getFullName());
        dto.setEmail(savedUser.getEmail());
        dto.setPhone(savedUser.getPhone());
        return dto;
    }
}
