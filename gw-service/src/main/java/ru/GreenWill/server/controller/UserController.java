package ru.GreenWill.server.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.GreenWill.Dto.model.User.UserOutDto;
import ru.GreenWill.server.mapper.UserMapper;
import ru.GreenWill.server.model.User;
import ru.GreenWill.server.service.inteface.UserService;

import java.util.Map;


@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Slf4j
public class UserController {
    private final UserService userService;
    private final UserMapper userMapper;

    @GetMapping("/get")
    public ResponseEntity<?> getUserFromToken(HttpServletRequest request) {

        return ResponseEntity.ok(userMapper.toUserOutDto(userService.getUserWithCookie(request)));
    }

    @GetMapping("/status")
    public ResponseEntity<?> getUserStatus(HttpServletRequest request) {
        return userService.validCookies(request);
    }

    @GetMapping("/profile")
    public ResponseEntity<UserOutDto> getUserProfile(HttpServletRequest request) {
        User user = userService.getUserWithCookie(request);
        return ResponseEntity.ok(userMapper.toUserOutDto(user));
    }

    @PostMapping("/profile")
    public ResponseEntity<?> updateUserProfile(@RequestBody UserOutDto userDto, HttpServletRequest request) {
        userService.updateUserProfile(userDto, request);
        return ResponseEntity.ok("Профиль успешно обновлен.");
    }

}
