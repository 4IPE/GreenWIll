/**
 * Интерфейс RoleService предоставляет методы для управления ролями пользователей.
 * Включает в себя сохранение, обновление ролей и управление ролями пользователей.
 *
 * @author Даниил
 * @version 1.0
 * @since 2024
 */

package ru.GreenWill.server.service.inteface;


import ru.GreenWill.Dto.model.RoleDto;
import ru.GreenWill.server.enumarated.RoleName;
import ru.GreenWill.server.model.Role;

public interface RoleService {


    void saveRole(RoleDto role);


    Role getRoleWithName(RoleName name);
}
