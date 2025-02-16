package ru.GreenWill.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.GreenWill.server.model.CartItem;
import ru.GreenWill.server.model.Location;
import java.util.Optional;

public interface LocationRepository extends JpaRepository<Location, Long> {
    Optional<Location> findByStreetIgnoreCaseAndHouseIgnoreCaseAndCityIgnoreCase(
        String street,
        String house,
        String city);
}
