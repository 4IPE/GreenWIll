package ru.GreenWill.server.model;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.GreenWill.server.repository.ProductRepository;

import java.util.List;

@Component
public class DataInitializer {

    private final ProductRepository productRepository;

    @Autowired
    public DataInitializer(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @PostConstruct
    public void init() {
        // Проверяем, если таблица пустая
        if (productRepository.count() == 0) {
            // Создаем дефолтные продукты
            List<Product> defaultProducts = List.of(
                    new Product(null, "Greek Salad", "Свежий греческий салат с оливками, помидорами и сыром фета.", 899, 150, "Салаты", "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"),
                    new Product(null, "Grilled Chicken Plate", "Куриная грудка на гриле с овощами и гарниром.", 1299, 400, "Основные блюда", "https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?auto=compress&cs=tinysrgb&w=800"),
                    new Product(null, "Fruit Smoothie", "Фруктовый смузи, богатый витаминами и антиоксидантами.", 499, 200, "Смузи", "https://media.istockphoto.com/id/527673038/ru/фото/свежей-смешанный-фруктовый-смузи.jpg?b=1&s=612x612&w=0&k=20&c=zjzae1LifliWAEGhdukzgt14z93uj1AUoiycs03e72U=")
                    // Добавьте больше продуктов по необходимости
            );

            // Сохраняем дефолтные продукты в базе
            productRepository.saveAll(defaultProducts);
            System.out.println("База данных инициализирована дефолтными продуктами.");
        } else {
            System.out.println("Продукты уже существуют в базе данных. Инициализация не требуется.");
        }
    }
}
