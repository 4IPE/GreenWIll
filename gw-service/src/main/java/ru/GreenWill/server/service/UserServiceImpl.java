package ru.GreenWill.server.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import ru.GreenWill.Dto.model.User.UserDto;
import ru.GreenWill.Dto.model.User.UserOutDto;
import ru.GreenWill.server.model.User;
import ru.GreenWill.server.repository.UserRepository;
import ru.GreenWill.server.security.jwt.JwtTokenProvider;

/**
 * Сервисный класс для управления пользователями.
 *
 * @see ru.GreenWill.server.service.UserService
 * @see UserDto
 * @see UserOutDto
 */
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;


    @Override
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
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
    public User getUserName(String token) {
        if (!jwtTokenProvider.validateToken(token)) {
            throw new RuntimeException("Invalid token");
        }
        String username = jwtTokenProvider.getUsername(token);
        User user = getUserByUsername(username);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        return user;
    }
}
