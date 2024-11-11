package ru.GreenWill.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.GreenWill.server.model.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem,Long> {
}
