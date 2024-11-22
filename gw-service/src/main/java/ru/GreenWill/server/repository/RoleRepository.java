package ru.GreenWill.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.GreenWill.server.enumarated.RoleName;
import ru.GreenWill.server.model.Role;


public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByRole(RoleName name);
}
