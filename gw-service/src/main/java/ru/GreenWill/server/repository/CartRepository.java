package ru.GreenWill.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.GreenWill.server.model.Cart;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUser_IdAndIsActiveTrue(Long id);
    Optional<Cart> findByUser_Id(Long id);
    List<Cart> findByUser_IdAndIsActiveFalse(Long id);
}
