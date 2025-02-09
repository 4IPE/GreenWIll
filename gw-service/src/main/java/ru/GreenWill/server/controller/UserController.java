package ru.GreenWill.server.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.GreenWill.Dto.model.User.UserOutDto;
import ru.GreenWill.server.mapper.UserMapper;
import ru.GreenWill.server.model.User;
import ru.GreenWill.server.service.inteface.RoleService;
import ru.GreenWill.server.service.inteface.UserService;

import java.util.Map;


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
    public ResponseEntity<?> editRoleUser(@RequestParam String username,@RequestParam String roleName) {
        roleService.updateRoleWithUser(username,roleName);
        return ResponseEntity.ok().body("Success");
    }

}
