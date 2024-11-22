package ru.GreenWill.server.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.GreenWill.Dto.model.User.UserDto;
import ru.GreenWill.Dto.model.User.UserOutDto;

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
    @Override
    public UserOutDto saveUser(UserDto object) {
        return null;
    }

    @Override
    public void updateUser(UserDto object) {

    }
}
