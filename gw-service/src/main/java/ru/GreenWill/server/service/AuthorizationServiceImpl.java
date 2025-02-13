package ru.GreenWill.server.service;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.GreenWill.Dto.model.User.UserSingInDto;
import ru.GreenWill.Dto.model.User.UserSingUpDto;
import ru.GreenWill.server.enumarated.RoleName;
import ru.GreenWill.server.exception.ResourceNotFoundException;
import ru.GreenWill.server.model.User;
import ru.GreenWill.server.security.jwt.JwtTokenProvider;
import ru.GreenWill.server.service.inteface.AuthorizationService;
import ru.GreenWill.server.service.inteface.RoleService;
import ru.GreenWill.server.service.inteface.UserService;

import java.security.SecureRandom;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthorizationServiceImpl implements AuthorizationService {
    private final UserService userService;
    private final JwtTokenProvider jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final RoleService roleService;
    private static final SecureRandom random = new SecureRandom();
    private final AcceptRedisService acceptRedisService;
    private final EmailService emailService;
    private final UserConsentService userConsentService;

    @Transactional
    @Override
    public void singUp(UserSingUpDto userSingUpDto, HttpServletResponse response, HttpServletRequest request) {
        if (!userSingUpDto.termsAccepted()) {
            throw new ResourceNotFoundException("Необходимо принять условия использования");
        }

        User user = new User();
        user.setUsername(userSingUpDto.username());
        user.setEmail(userSingUpDto.email());
        user.setPassword(passwordEncoder.encode(userSingUpDto.password()));
        user.setRole(roleService.getRoleWithName(RoleName.ROLE_USER));

        userService.save(user);

        userConsentService.saveUserConsent(userSingUpDto.username(), request);

        var jwt = jwtService.createToken(userSingUpDto.username());
        response.addCookie(createJwtCookie(jwt));

    }


    @Override
    public void singIn(UserSingInDto request, HttpServletResponse response) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password())
        );

        if (!authentication.isAuthenticated()) {
            throw new BadCredentialsException("Неверный логин или пароль");
        }

        User user = userService.getUserByUsername(request.username());
        createAndSendKeyAuthForUser(user.getUsername(), user.getEmail());
    }

    @Override
    public void logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("token", null);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }

    private Cookie createJwtCookie(String jwt) {
        Cookie cookie = new Cookie("token", jwt);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(10000);
        return cookie;
    }

    @Override
    public void createAndSendKeyAuthForUser(String username, String email) {
        int token = 100_000 + random.nextInt(900_000);
        acceptRedisService.saveAcceptedCodeAuth(Integer.toString(token), username);
        emailService.sendEmail(email, Integer.toString(token));
    }


    @Override
    public void finalizeLogin(String username, String key, HttpServletResponse response) {

        boolean isCodeValid = acceptRedisService.isAcceptedKeyValid(key, username);
        if (!isCodeValid) {
            throw new BadCredentialsException("Неверный код подтверждения");
        }
        var jwt = jwtService.createToken(username);
        response.addCookie(createJwtCookie(jwt));
    }

    @Override
    public boolean checkVerAccount(String username, String key, HttpServletResponse response){
        boolean accept = acceptRedisService.isAcceptedKeyValid(key,username);
        if (accept) {
            var jwt = jwtService.createToken(username);
            response.addCookie(createJwtCookie(jwt));
            return accept;
        } else {
            return accept;
        }
    }
}

