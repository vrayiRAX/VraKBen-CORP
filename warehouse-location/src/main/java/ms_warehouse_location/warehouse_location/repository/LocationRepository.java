package ms_warehouse_location.warehouse_location.repository;

import ms_warehouse_location.warehouse_location.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface LocationRepository extends JpaRepository<Location, Long> {
    // Buscar dónde está un producto específico
    Optional<Location> findByProductId(Long productId);
}