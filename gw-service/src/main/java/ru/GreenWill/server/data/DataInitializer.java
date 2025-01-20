package ru.GreenWill.server.data;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.GreenWill.server.enumarated.RoleName;
import ru.GreenWill.server.model.Product;
import ru.GreenWill.server.model.Role;
import ru.GreenWill.server.repository.ProductRepository;
import ru.GreenWill.server.repository.RoleRepository;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer {

    private final ProductRepository productRepository;
    private final RoleRepository roleRepository;


    @PostConstruct
    public void init() {
        // Проверяем, если таблица пустая
        if (productRepository.count() == 0) {
            // Создаем дефолтные продукты
            List<Product> defaultProducts = List.of(
                    new Product(null, "Greek Salad", "Свежий греческий салат с оливками, помидорами и сыром фета.", 899, 150, "Салаты", "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"),
                    new Product(null, "Grilled Chicken Plate", "Куриная грудка на гриле с овощами и гарниром.", 1299, 400, "Основные блюда", "https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?auto=compress&cs=tinysrgb&w=800"),
                    new Product(null, "Fruit Smoothie", "Фруктовый смузи, богатый витаминами и антиоксидантами.", 499, 200, "Смузи", "https://media.istockphoto.com/id/527673038/ru/фото/свежей-смешанный-фруктовый-смузи.jpg?b=1&s=612x612&w=0&k=20&c=zjzae1LifliWAEGhdukzgt14z93uj1AUoiycs03e72U=")
            );
            productRepository.saveAll(defaultProducts);
            System.out.println("База данных инициализирована дефолтными продуктами.");
        } else {
            System.out.println("Продукты уже существуют в базе данных. Инициализация не требуется.");
        }
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
