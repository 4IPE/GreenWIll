package ru.GreenWill.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ru.GreenWill.server.model.Product;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT DISTINCT p.category FROM Product p WHERE p.category IS NOT NULL AND p.category <> '' ORDER BY p.category")
    List<String> findDistinctCategories();
}
