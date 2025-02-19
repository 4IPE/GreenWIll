package ru.GreenWill.server.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.GreenWill.Dto.model.User.UserOutDto;
import ru.GreenWill.server.annotation.RateLimit;
import ru.GreenWill.server.mapper.UserMapper;
import ru.GreenWill.server.model.User;
import ru.GreenWill.server.service.inteface.RoleService;
import ru.GreenWill.server.service.inteface.UserService;

/**
 * Контроллер для управления пользователями.
 *
 * <p>Обрабатывает операции с пользователями:</p>
 * <ul>
 *     <li>Получение информации о пользователе</li>
 *     <li>Обновление профиля</li>
 *     <li>Проверка существования пользователей</li>
 *     <li>Управление ролями (для администраторов)</li>
 *     <li>Восстановление пароля</li>
 * </ul>
 *
 * @author Даниил Рогозников
 * @version 1.0
 */
@RestController
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;
    private final UserMapper userMapper;
    private final RoleService roleService;

    /**
     * Получает информацию о пользователе по имени.
     *
     * @param username имя пользователя
     * @return данные пользователя
     */
    @GetMapping("/user/get")
    @RateLimit
    public ResponseEntity<?> getUserFromUsername(@RequestParam String username) {

        return ResponseEntity.ok(userMapper.toUserEmail(userService.getUserByUsername(username)));
    }

    /**
     * Проверяет статус аутентификации пользователя.
     *
     * @param request HTTP-запрос с куки
     * @return статус аутентификации
     */
    @GetMapping("/user/status")
    @RateLimit
    public ResponseEntity<?> getUserStatus(HttpServletRequest request) {
        return userService.validCookies(request);
    }

    /**
     * Получает профиль текущего пользователя.
     *
     * @param request HTTP-запрос для идентификации пользователя
     * @return данные профиля
     */
    @GetMapping("/user/profile")
    @RateLimit
    public ResponseEntity<UserOutDto> getUserProfile(HttpServletRequest request) {
        User user = userService.getUserWithCookie(request);
        return ResponseEntity.ok(userMapper.toUserOutDto(user));
    }

    /**
     * Обновляет профиль пользователя.
     *
     * @param userDto новые данные профиля
     * @param request HTTP-запрос для идентификации пользователя
     * @return статус обновления
     */
    @PostMapping("/user/profile")
    @RateLimit
    public ResponseEntity<?> updateUserProfile(@RequestBody UserOutDto userDto, HttpServletRequest request) {
        userService.updateUserProfile(userDto, request);
        return ResponseEntity.ok("Профиль успешно обновлен.");
    }

    @GetMapping("/user/check")
    @RateLimit
    public ResponseEntity<?> checkUsername(@RequestParam String username) {
        log.info(username);
        return ResponseEntity.ok(userService.existsByUsername(username));
    }

    @GetMapping("/user/check-email")
    @RateLimit
    public ResponseEntity<?> checkEmail(@RequestParam String email) {
        log.info(email);
        return ResponseEntity.ok(userService.existsByEmail(email));
    }

    @GetMapping("/user/check-phone")
    @RateLimit
    public ResponseEntity<?> checkPhone(@RequestParam String phone) {
        log.info(phone);
        return ResponseEntity.ok(userService.existsByPhone(phone));
    }

    /**
     * Изменяет роль пользователя (только для администраторов).
     *
     * @param username имя пользователя
     * @param roleName новая роль
     * @return статус изменения роли
     */
    @GetMapping("/admin/edit/role")
    @RateLimit
    public ResponseEntity<?> editRoleUser(@RequestParam String username, @RequestParam String roleName) {
        roleService.updateRoleWithUser(username, roleName);
        return ResponseEntity.ok().body("Success");
    }

    @GetMapping("/req/password")
    @RateLimit
    public ResponseEntity<?> editPasswordRequest(@RequestParam String email) {
        boolean res = userService.editPasswordRequest(email);
        if (!res) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Пользователя с таким email не существует");
        }
        return ResponseEntity.ok().body("Success");
    }

    @GetMapping("/edit/accepted")
    @RateLimit
    public ResponseEntity<?> acceptedPasswordRequest(@RequestParam String email, @RequestParam String key, HttpServletResponse response) {
        log.info("Processing verification request for email: {} with key: {}", email, key);
        boolean res = userService.checkVerAccount(email, key, response);
        if (!res) {
            log.warn("Invalid verification code for email: {}", email);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Код не верный!");
        }
        log.info("Verification successful for email: {}", email);
        return ResponseEntity.ok().body("Success");
    }

    @GetMapping("/edit/password")
    @RateLimit
    public ResponseEntity<?> changePassword(@RequestParam String password, HttpServletRequest request, HttpServletResponse response) {
        userService.acceptedChangePassword(password, request, response);

        return ResponseEntity.ok().body("Success");
    }

}
