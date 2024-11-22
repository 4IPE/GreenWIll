package ru.GreenWill.server.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.GreenWill.Dto.model.RoleDto;
import ru.GreenWill.Dto.model.User.UserDto;
import ru.GreenWill.Dto.model.User.UserOutDto;


/**
 * Сервисный класс для управления ролями.
 *
 * @see ru.GreenWill.server.service.RoleService
 * @see ru.GreenWill.Dto.model.RoleDto
 * @see UserDto
 * @see UserOutDto
 */

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {
    @Override
    public void saveRole(RoleDto role) {

    }

    @Override
    public void updRole(RoleDto role) {

    }

    @Override
    public UserOutDto updRolesUser(RoleDto role, UserDto userDto) {
        return null;
    }
}
