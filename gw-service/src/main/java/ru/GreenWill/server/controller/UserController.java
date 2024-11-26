package ru.GreenWill.server.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.GreenWill.server.model.User;
import ru.GreenWill.server.service.inteface.UserService;

import java.util.Map;


@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Slf4j
public class UserController {
    private final UserService userService;

    @GetMapping("/get")
    public ResponseEntity<?> getUserFromToken(HttpServletRequest request) {

        User user = userService.getUserName(request);
        return ResponseEntity.ok(Map.of(
                "username", user.getUsername()
        ));
    }

    @GetMapping("/status")
    public ResponseEntity<?> getUserStatus(HttpServletRequest request) {
        return userService.validCookies(request);
    }
}
