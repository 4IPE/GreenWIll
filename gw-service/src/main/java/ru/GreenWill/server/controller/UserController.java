package ru.GreenWill.server.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.GreenWill.server.model.User;
import ru.GreenWill.server.service.UserService;

import java.util.Map;


@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Slf4j
public class UserController {
    private final UserService userService;

    @GetMapping("/get")
    public ResponseEntity<?> getUserFromToken(@RequestParam("token") String token) {

         User user= userService.getUserName(token);
        // Возвращаем данные пользователя
        return ResponseEntity.ok(Map.of(
                "name", user.getUsername()
        ));
    }
}
