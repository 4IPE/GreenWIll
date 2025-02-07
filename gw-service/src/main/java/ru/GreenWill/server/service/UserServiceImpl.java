package ru.GreenWill.server.service;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.GreenWill.Dto.model.User.UserDto;
import ru.GreenWill.Dto.model.User.UserOutDto;
import ru.GreenWill.server.mapper.LocationMapper;
import ru.GreenWill.server.mapper.UserMapper;
import ru.GreenWill.server.model.Role;
import ru.GreenWill.server.model.User;
import ru.GreenWill.server.repository.UserRepository;
import ru.GreenWill.server.security.jwt.JwtTokenProvider;
import ru.GreenWill.server.service.inteface.UserService;

/**
 * Сервисный класс для управления пользователями.
 *
 * @see UserService
 * @see UserDto
 * @see UserOutDto
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserMapper userMapper;
    private final LocationMapper locationMapper;


    @Override
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }

    @Override
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public boolean existsByPhone(String phone) {
        log.info("+"+phone);
        boolean res = userRepository.existsByPhone("+"+phone);
        log.info("{}",res);
        return userRepository.existsByPhone("+"+phone);
    }

    @Override
    public UserDetailsService userDetailsService() {
        return this::getUserByUsername;
    }

    @Override
    public void save(User user) {
        userRepository.save(user);
    }

    @Override
    public User getUserWithCookie(HttpServletRequest request) {
        var token = jwtTokenProvider.resolveToken(request);
        if (!jwtTokenProvider.validateToken(token)) {
            throw new RuntimeException("Invalid token");
        }
        String username = jwtTokenProvider.getUsername(token);
        User user = getUserByUsername(username);
        log.info("Полученный пользователя: {}", user.toString());
        return user;
    }

    @Override
    public ResponseEntity<String> validCookies(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("token".equals(cookie.getName())) {
                    return ResponseEntity.ok("Token is present");
                }
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is not present");
    }

    @Override
    public void updateUserProfile(UserOutDto userDto, HttpServletRequest request) {
        User user = getUserWithCookie(request);
        if (userDto.email() != null) user.setEmail(userDto.email());
        if (userDto.phone() != null) user.setPhone(userDto.phone());
        if (userDto.firstName() != null) user.setFirstName(userDto.firstName());
        if (userDto.lastName() != null) user.setLastName(userDto.lastName());
        if (userDto.address() != null) user.setAddress(locationMapper.toLocation(userDto.address()));
        userRepository.save(user);
    }

    @Override
    public void updateUserRole(String username, Role role) {
        User user = getUserByUsername(username);
        user.setRole(role);
        userRepository.save(user);
    }

}
