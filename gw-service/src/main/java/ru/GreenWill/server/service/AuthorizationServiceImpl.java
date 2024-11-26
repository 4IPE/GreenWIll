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

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthorizationServiceImpl implements AuthorizationService {
    private final UserService userService;
    private final JwtTokenProvider jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final RoleService roleService;

    @Transactional
    @Override
    public void singUp(UserSingUpDto request, HttpServletResponse response) {

        User user = new User();
        user.setUsername(request.username());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRole(roleService.getRoleWithName(RoleName.ROLE_USER));

        userService.save(user);

        var jwt = jwtService.createToken(user.getUsername());
        response.addCookie(createJwtCookie(jwt));

    }


    @Override
    public void singIn(UserSingInDto request, HttpServletResponse response) {
        log.info("Я зашел в singIn ");
        var user = userService
                .userDetailsService()
                .loadUserByUsername(request.username());
        log.info("User {}", user);
        var jwt = jwtService.createToken(user.getUsername());
        response.addCookie(createJwtCookie(jwt));

    }

    private Cookie createJwtCookie(String jwt) {
        Cookie cookie = new Cookie("token", jwt);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(3600);
        return cookie;
    }

}

