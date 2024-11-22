/**
 * Интерфейс UserService предоставляет методы для управления пользователями.
 * Обеспечивает функциональность для сохранения и обновления данных пользователей.
 *
 * Created by Daniil in 2024.
 */

package ru.GreenWill.server.service;


import ru.GreenWill.Dto.model.User.UserDto;
import ru.GreenWill.Dto.model.User.UserOutDto;

public interface UserService {

    /**
     * Сохраняет нового пользователя.
     *
     * @param object данные пользователя в виде DTO
     * @return сохранённый пользователь в виде DTO
     */
    UserOutDto saveUser(UserDto object);

    /**
     * Обновляет данные существующего пользователя.
     *
     * @param object данные пользователя в виде DTO
     */
    void updateUser(UserDto object);
}
