/**
 * Интерфейс UserService предоставляет методы для управления пользователями.
 * Обеспечивает функциональность для сохранения и обновления данных пользователей.
 * <p>
 * Created by Daniil in 2024.
 */

package ru.GreenWill.server.service.inteface;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import ru.GreenWill.Dto.model.User.UserOutDto;
import ru.GreenWill.server.model.User;

public interface UserService {

    User getUserByUsername(String username);

    UserDetailsService userDetailsService();

    @Transactional
    void save(User user);

    User getUserWithCookie(HttpServletRequest request);

    ResponseEntity<String> validCookies(HttpServletRequest request);

    void updateUserProfile(UserOutDto userDto, HttpServletRequest request);
}
