package ru.GreenWill.server.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.GreenWill.Dto.model.User.UserOutDto;
import ru.GreenWill.server.mapper.UserMapper;
import ru.GreenWill.server.model.User;
import ru.GreenWill.server.service.inteface.RoleService;
import ru.GreenWill.server.service.inteface.UserService;


@RestController
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;
    private final UserMapper userMapper;
    private final RoleService roleService;

    @GetMapping("/user/get")
    public ResponseEntity<?> getUserFromUsername(@RequestParam String username) {

        return ResponseEntity.ok(userMapper.toUserEmail(userService.getUserByUsername(username)));
    }

    @GetMapping("/user/status")
    public ResponseEntity<?> getUserStatus(HttpServletRequest request) {
        return userService.validCookies(request);
    }

    @GetMapping("/user/profile")
    public ResponseEntity<UserOutDto> getUserProfile(HttpServletRequest request) {
        User user = userService.getUserWithCookie(request);
        return ResponseEntity.ok(userMapper.toUserOutDto(user));
    }

    @PostMapping("/user/profile")
    public ResponseEntity<?> updateUserProfile(@RequestBody UserOutDto userDto, HttpServletRequest request) {
        userService.updateUserProfile(userDto, request);
        return ResponseEntity.ok("Профиль успешно обновлен.");
    }

    @GetMapping("/user/check")
    public ResponseEntity<?> checkUsername(@RequestParam String username) {
        log.info(username);
        return ResponseEntity.ok(userService.existsByUsername(username));
    }

    @GetMapping("/user/check-email")
    public ResponseEntity<?> checkEmail(@RequestParam String email) {
        log.info(email);
        return ResponseEntity.ok(userService.existsByEmail(email));
    }

    @GetMapping("/user/check-phone")
    public ResponseEntity<?> checkPhone(@RequestParam String phone) {
        log.info(phone);
        return ResponseEntity.ok(userService.existsByPhone(phone));
    }

    @GetMapping("/admin/edit/role")
    public ResponseEntity<?> editRoleUser(@RequestParam String username, @RequestParam String roleName) {
        roleService.updateRoleWithUser(username, roleName);
        return ResponseEntity.ok().body("Success");
    }

    @GetMapping("/req/password")
    public ResponseEntity<?> editPasswordRequest(@RequestParam String email) {
        boolean res = userService.editPasswordRequest(email);
        if (!res) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Пользователя с таким email не существует");
        }
        return ResponseEntity.ok().body("Success");
    }

    @GetMapping("/edit/accepted")
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
    public ResponseEntity<?> changePassword(@RequestParam String password, HttpServletRequest request, HttpServletResponse response) {
        userService.acceptedChangePassword(password, request, response);

        return ResponseEntity.ok().body("Success");
    }

}
