package ru.GreenWill.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.GreenWill.server.enumarated.RoleName;
import ru.GreenWill.server.model.Role;

import java.util.Optional;


public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByRole(RoleName name);
}
