package ru.GreenWill.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.GreenWill.server.model.Product;

public interface ProductRepository extends JpaRepository<Product,Long> {
}
