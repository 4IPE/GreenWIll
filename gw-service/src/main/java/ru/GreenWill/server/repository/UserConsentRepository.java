package ru.GreenWill.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.GreenWill.server.model.UserConsent;

public interface UserConsentRepository extends JpaRepository<UserConsent, Long> {

}
