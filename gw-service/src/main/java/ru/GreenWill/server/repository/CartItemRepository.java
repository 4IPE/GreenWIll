package ru.GreenWill.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.GreenWill.server.model.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    CartItem findByCart_IdAndProduct_Id(Long cartId, Long productId);
    void deleteByCart_IdAndProduct_Id(Long cartId, Long productId);
    void deleteByCart_Id(Long cartId);
}
