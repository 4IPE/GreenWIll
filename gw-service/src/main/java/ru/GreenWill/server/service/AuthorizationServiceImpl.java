package ru.GreenWill.server.service;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.GreenWill.Dto.model.User.UserSingInDto;
import ru.GreenWill.Dto.model.User.UserSingUpDto;
import ru.GreenWill.server.enumarated.RoleName;
import ru.GreenWill.server.model.User;
import ru.GreenWill.server.security.jwt.JwtTokenProvider;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthorizationServiceImpl implements AuthorizationService {
    private final UserService userService;
    private final JwtTokenProvider jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final RoleService roleService;

    /**
     * Регистрация пользователя
     *
     * @param request данные пользователя
     */
    @Transactional
    @Override
    public void singUp(UserSingUpDto request, HttpServletResponse response) {

        User user = new User();
        user.setUsername(request.username());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRoles(Set.of(roleService.getRoleWithName(RoleName.ROLE_USER)));

        userService.save(user);

        var jwt = jwtService.createToken(user.getUsername());
        Cookie cookie = new Cookie("token", jwt);
        cookie.setHttpOnly(true);
        cookie.setSecure(true); // Требует HTTPS
        cookie.setPath("/"); // Доступно на всём сайте
        cookie.setMaxAge(3600); // Время жизни в секундах
        response.addCookie(cookie);

    }

    /**
     * Аутентификация пользователя
     *
     * @param request данные пользователя
     */
    @Transactional
    @Override
    public void singIn(UserSingInDto request, HttpServletResponse response) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.username(),
                request.password()
        ));

        var user = userService
                .userDetailsService()
                .loadUserByUsername(request.username());

        var jwt = jwtService.createToken(user.getUsername());
        Cookie cookie = new Cookie("token", jwt);
        cookie.setHttpOnly(true);
        cookie.setSecure(true); // Требует HTTPS
        cookie.setPath("/"); // Доступно на всём сайте
        cookie.setMaxAge(3600); // Время жизни в секундах
        response.addCookie(cookie);

    }



}

