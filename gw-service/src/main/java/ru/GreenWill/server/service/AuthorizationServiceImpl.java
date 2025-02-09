package ru.GreenWill.server.service;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.GreenWill.Dto.model.User.UserSingInDto;
import ru.GreenWill.Dto.model.User.UserSingUpDto;
import ru.GreenWill.server.enumarated.RoleName;
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

    @Transactional
    @Override
    public void singUp(UserSingUpDto request) {

        User user = new User();
        user.setUsername(request.username());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRole(roleService.getRoleWithName(RoleName.ROLE_USER));

        userService.save(user);

    }


    @Override
    public void singIn(UserSingInDto request) {
        var user = userService
                .userDetailsService()
                .loadUserByUsername(request.username());
        log.info("User {}", user);

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
    public void createAndSendKeyAuthForUser(String username, String email){
        int token = 100_000 + random.nextInt(900_000);
        acceptRedisService.saveAcceptedCodeAuth(Integer.toString(token),username);
        emailService.sendEmail(email,Integer.toString(token));
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

