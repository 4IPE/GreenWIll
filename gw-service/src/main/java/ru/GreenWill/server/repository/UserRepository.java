package ru.GreenWill.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.GreenWill.server.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);
}
