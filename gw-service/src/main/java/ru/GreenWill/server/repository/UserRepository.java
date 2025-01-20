package ru.GreenWill.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.GreenWill.server.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);
}
