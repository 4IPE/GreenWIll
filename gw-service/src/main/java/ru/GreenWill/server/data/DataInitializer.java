package ru.GreenWill.server.data;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.GreenWill.server.enumarated.RoleName;
import ru.GreenWill.server.model.Product;
import ru.GreenWill.server.model.Role;
import ru.GreenWill.server.model.User;
import ru.GreenWill.server.repository.ProductRepository;
import ru.GreenWill.server.repository.RoleRepository;
import ru.GreenWill.server.repository.UserRepository;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer {

    private final ProductRepository productRepository;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;


    @PostConstruct
    public void init() {
        if (roleRepository.count() == 0) {
            Role admin = new Role();
            Role user = new Role();
            Role cook = new Role();
            Role courier = new Role();
            admin.setRole(RoleName.ROLE_ADMIN);
            user.setRole(RoleName.ROLE_USER);
            cook.setRole(RoleName.ROLE_COOK);
            courier.setRole(RoleName.ROLE_COURIER);
            List<Role> defaultRole = List.of(admin, user,cook,courier);

            roleRepository.saveAll(defaultRole);
            System.out.println("База данных инициализирована дефолтными ролями.");
        } else {
            System.out.println("Роли уже существуют в базе данных. Инициализация не требуется.");
        }
    }
}
