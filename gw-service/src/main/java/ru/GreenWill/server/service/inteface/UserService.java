/**
 * Интерфейс UserService предоставляет методы для управления пользователями.
 * Обеспечивает функциональность для сохранения и обновления данных пользователей.
 * <p>
 * Created by Daniil in 2024.
 */

package ru.GreenWill.server.service.inteface;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import ru.GreenWill.Dto.model.User.UserOutDto;
import ru.GreenWill.server.model.Role;
import ru.GreenWill.server.model.User;

public interface UserService {

    User getUserByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);


    @Transactional
    void save(User user);

    User getUserWithCookie(HttpServletRequest request);

    ResponseEntity<String> validCookies(HttpServletRequest request);
    @Transactional
    void updateUserProfile(UserOutDto userDto, HttpServletRequest request);
    @Transactional
    void updateUserRole(String username, Role role);


    boolean editPasswordRequest(String email);


    void acceptedChangePassword(String password, HttpServletRequest request, HttpServletResponse response);

    void createAndSendKeyAuthForUser(String email);

    boolean checkVerAccount(String email, String key, HttpServletResponse response);
}
