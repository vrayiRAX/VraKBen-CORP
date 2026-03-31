package ms_resource_planner.resource_planner.controller;

import ms_resource_planner.resource_planner.model.Technician;
import ms_resource_planner.resource_planner.service.PlannerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/planner")
public class PlannerController {

    @Autowired
    private PlannerService service;

    @GetMapping("/available")
    public List<Technician> listAvailable(@RequestParam String specialty) {
        return service.getAvailableTechnicians(specialty);
    }

    @PutMapping("/status/{id}")
    public Technician changeStatus(@PathVariable Long id, @RequestParam Boolean available) {
        return service.updateStatus(id, available);
    }
}
