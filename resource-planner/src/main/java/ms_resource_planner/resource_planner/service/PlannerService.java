package ms_resource_planner.resource_planner.service;

import ms_resource_planner.resource_planner.model.Technician;
import ms_resource_planner.resource_planner.repository.TechnicianRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlannerService {
    @Autowired
    private TechnicianRepository repository;

    public List<Technician> getAvailableTechnicians(String specialty) {
        return repository.findBySpecialtyAndIsAvailableTrue(specialty);
    }

    public Technician updateStatus(Long id, Boolean available) {
        Technician tech = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Técnico no encontrado"));
        tech.setIsAvailable(available);
        return repository.save(tech);
    }
}