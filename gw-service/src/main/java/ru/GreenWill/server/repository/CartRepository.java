package ru.GreenWill.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.GreenWill.server.model.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findByUser_Id(Long id);

    void deleteByUser_Id(Long id);
}
