package ms_resource_planner.resource_planner.repository;

import ms_resource_planner.resource_planner.model.Technician;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TechnicianRepository extends JpaRepository<Technician, Long> {
    // Buscar mecánicos libres por especialidad
    List<Technician> findBySpecialtyAndIsAvailableTrue(String specialty);
}
