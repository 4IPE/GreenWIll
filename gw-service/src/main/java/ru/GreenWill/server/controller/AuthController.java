package ru.GreenWill.server.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.GreenWill.Dto.model.User.UserSingInDto;
import ru.GreenWill.Dto.model.User.UserSingUpDto;
import ru.GreenWill.server.annotation.RateLimit;
import ru.GreenWill.server.service.inteface.AuthorizationService;

/**
 * Контроллер для аутентификации и авторизации пользователей.
 *
 * <p>Обрабатывает операции, связанные с аутентификацией:</p>
 * <ul>
 *     <li>Вход в систему</li>
 *     <li>Регистрация новых пользователей</li>
 *     <li>Выход из системы</li>
 *     <li>Верификация пользователей</li>
 * </ul>
 *
 * @author Даниил Рогозников
 * @version 1.0
 */
@RestController
@RequiredArgsConstructor
@Slf4j
public class AuthController {
    private final AuthorizationService authorizationService;
    private final AuthenticationManager authenticationManager;

    /**
     * Обрабатывает запрос на вход в систему.
     *
     * @param request  данные для входа (логин и пароль)
     * @param response HTTP-ответ для установки токена
     * @return статус операции входа
     */
    @RateLimit(10)
    @PostMapping("/login")
    public ResponseEntity<?> signIn(@RequestBody @Valid UserSingInDto request, HttpServletResponse response) {
        log.info("Отправлен запрос на вход пользователя: {}", request.username());
        System.out.println("Отправлен запрос на вход пользователя");
        authorizationService.singIn(request, response);
        return ResponseEntity.ok().body("Login success");
    }

    /**
     * Регистрирует нового пользователя в системе.
     *
     * @param userSingUpDto данные нового пользователя
     * @param response      HTTP-ответ для установки токена
     * @param request       HTTP-запрос
     * @return статус регистрации
     */
    @RateLimit(5)
    @PostMapping("/register")
    public ResponseEntity<?> signUp(@RequestBody @Valid UserSingUpDto userSingUpDto,
                                    HttpServletResponse response,
                                    HttpServletRequest request) {
        log.info("Отправлен запрос на сохранение пользователя: {}", userSingUpDto.username());
        System.out.println("Отправлен запрос на сохранение пользователя");
        authorizationService.singUp(userSingUpDto, response, request);
        return ResponseEntity.ok().body("Registry success");
    }

    /**
     * Выход пользователя из системы.
     *
     * @param response HTTP-ответ для удаления токена
     * @return статус операции выхода
     */
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        authorizationService.logout(response);
        return ResponseEntity.ok().body("Successfully logged out");
    }

    /**
     * Проверяет код верификации при входе.
     *
     * @param username имя пользователя
     * @param key      код верификации
     * @param response HTTP-ответ
     * @return статус верификации
     */
    @PostMapping("/login/verify")
    @RateLimit
    public ResponseEntity<?> checkLog(@RequestParam String username, @RequestParam String key, HttpServletResponse response) {
        try {
            authorizationService.finalizeLogin(username, key, response);
            return ResponseEntity.ok().body("Successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/create")
    @RateLimit
    public ResponseEntity<?> create(@RequestParam String username, @RequestParam String email) {
        authorizationService.createAndSendKeyAuthForUser(username, email);
        return ResponseEntity.ok().body("Successfully create");
    }

    @PostMapping("/check")
    public ResponseEntity<?> verifyReg(@RequestParam String username, @RequestParam String key, HttpServletResponse response) {
        try {
            boolean accept = authorizationService.checkVerAccount(username, key, response);
            if (accept) {
                return ResponseEntity.ok().body("Successfully");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Код не верный");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }


}
