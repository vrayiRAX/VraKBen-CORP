package ms_vehicle_history.vehicle_history.controller;

import ms_vehicle_history.vehicle_history.model.VehicleHistory;
import ms_vehicle_history.vehicle_history.service.VehicleHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/history")
public class VehicleHistoryController {
    @Autowired
    private VehicleHistoryService service;

    @PostMapping("/add")
    public VehicleHistory createEntry(@RequestBody VehicleHistory entry) {
        return service.addEntry(entry);
    }

    @GetMapping("/{vin}")
    public List<VehicleHistory> getHistory(@PathVariable String vin) {
        return service.getFullHistory(vin);
    }
}
