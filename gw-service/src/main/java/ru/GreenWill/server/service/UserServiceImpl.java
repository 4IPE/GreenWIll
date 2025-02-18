package ru.GreenWill.server.service;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.GreenWill.Dto.model.User.UserDto;
import ru.GreenWill.Dto.model.User.UserOutDto;
import ru.GreenWill.server.exception.ResourceNotFoundException;
import ru.GreenWill.server.mapper.LocationMapper;
import ru.GreenWill.server.mapper.UserMapper;
import ru.GreenWill.server.model.Role;
import ru.GreenWill.server.model.User;
import ru.GreenWill.server.repository.LocationRepository;
import ru.GreenWill.server.repository.UserRepository;
import ru.GreenWill.server.security.jwt.JwtTokenProvider;
import ru.GreenWill.server.service.inteface.UserService;

import java.security.SecureRandom;


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
    private final EmailService emailService;
    private static final SecureRandom random = new SecureRandom();
    private final AcceptRedisService acceptRedisService;
    private final PasswordEncoder passwordEncoder;
    private final LocationRepository locationRepository;


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
        boolean res = userRepository.existsByPhone("+" + phone);
        return userRepository.existsByPhone("+" + phone);
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
        String username = jwtTokenProvider.getVal(token);
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
        if (userDto.address() != null) {
            var location = locationMapper.toLocation(userDto.address());
            var existingLocation = locationRepository.findByStreetIgnoreCaseAndHouseIgnoreCaseAndCityIgnoreCase(
                    location.getStreet(),
                    location.getHouse(),
                    location.getCity()
            );

            user.setAddress(existingLocation.orElse(location));
        }
        userRepository.save(user);
    }

    @Override
    public void updateUserRole(String username, Role role) {
        User user = getUserByUsername(username);
        user.setRole(role);
        userRepository.save(user);
    }


    @Override
    public boolean editPasswordRequest(String email) {
        boolean res = existsByEmail(email);
        if (!res) {
            return res;
        }
        createAndSendKeyAuthForUser(email);
        return res;
    }

    @Override
    public void acceptedChangePassword(String password, HttpServletRequest request, HttpServletResponse response) {
        var token = jwtTokenProvider.resolveTokenForSmallVal(request);
        if (!jwtTokenProvider.validateToken(token)) {
            clearCookie(response);
            throw new RuntimeException("Invalid token");
        }
        String email = jwtTokenProvider.getVal(token);
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("Пользователь с таким email не был найден"));
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
        clearCookie(response);
    }

    @Override
    public void createAndSendKeyAuthForUser(String email) {
        int token = 100_000 + random.nextInt(900_000);
        acceptRedisService.saveAcceptedCodeAuth(Integer.toString(token), email);
        emailService.sendEmail(email, Integer.toString(token));
    }

    @Override
    public boolean checkVerAccount(String email, String key, HttpServletResponse response) {
        boolean res = acceptRedisService.isAcceptedKeyValid(key, email);
        if (res) {
            createJwtCookieForChangePassword(email, response);
        }
        return res;
    }

    private void createJwtCookieForChangePassword(String email, HttpServletResponse response) {
        String jwt = jwtTokenProvider.createTokenWithChangePassword(email);
        Cookie cookie = new Cookie("small", jwt);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(600);
        cookie.setSecure(false);
//      cookie.setSecure(true); при настройке HTTPS
        response.addCookie(cookie);
        log.info("Created cookie with token: {}", jwt);
    }

    private void clearCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie("small", null);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
//      cookie.setSecure(true); при настройке HTTPS
        response.addCookie(cookie);
    }
}
