/**
 * Интерфейс UserService предоставляет методы для управления пользователями.
 * Обеспечивает функциональность для сохранения и обновления данных пользователей.
 * <p>
 * Created by Daniil in 2024.
 */

package ru.GreenWill.server.service;


import jakarta.transaction.Transactional;
import org.springframework.security.core.userdetails.UserDetailsService;
import ru.GreenWill.server.model.User;

public interface UserService {

    User getUserByUsername(String token);

    UserDetailsService userDetailsService();

    @Transactional
    void save(User user);

    User getUserName(String token);
}
