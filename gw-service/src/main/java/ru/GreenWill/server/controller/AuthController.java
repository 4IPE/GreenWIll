package ru.GreenWill.server.controller;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.GreenWill.Dto.model.User.UserSingInDto;
import ru.GreenWill.Dto.model.User.UserSingUpDto;
import ru.GreenWill.server.service.inteface.AuthorizationService;


@RestController
@RequiredArgsConstructor
@Slf4j
public class AuthController {
    private final AuthorizationService authorizationService;

    @PostMapping("/login")
    public ResponseEntity<?> signIn(@RequestBody @Valid UserSingInDto request, HttpServletResponse response) {
        log.info("Отправлен запрос на вход пользователя: {}", request.username());
        System.out.println("Отправлен запрос на вход пользователя");
        authorizationService.singIn(request);
        return ResponseEntity.ok().body("Login success");
    }

    @PostMapping("/register")
    public ResponseEntity<?> signUp(@RequestBody @Valid UserSingUpDto request) {
        log.info("Отправлен запрос на сохранение пользователя: {}", request.username());
        System.out.println("Отправлен запрос на сохранение пользователя");
        authorizationService.singUp(request);
        return ResponseEntity.ok().body("Registry success");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        authorizationService.logout(response);
        return ResponseEntity.ok().body("Successfully logged out");
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestParam String username,@RequestParam String email) {
        authorizationService.createAndSendKeyAuthForUser(username,email);
        return ResponseEntity.ok().body("Successfully create");
    }

    @PostMapping("/check")
    public ResponseEntity<?> check(@RequestParam String username,@RequestParam String key,HttpServletResponse response) {
       try {
            boolean accept = authorizationService.checkVerAccount(username,key,response);
            if (accept) {
                return ResponseEntity.ok().body("Successfully");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Код не верный");
            }
        }catch (Exception e){
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
       }
    }

}
