package ru.GreenWill.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.GreenWill.server.model.Cart;

public interface CartRepository extends JpaRepository<Cart,Long> {
}
