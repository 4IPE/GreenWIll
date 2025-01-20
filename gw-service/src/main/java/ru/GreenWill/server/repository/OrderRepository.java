package ru.GreenWill.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.GreenWill.server.enumarated.Status;
import ru.GreenWill.server.model.Order;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser_IdAndStatusNot(Long id, Status status);
    List<Order> findByUser_IdAndStatus(Long id, Status status);
}
