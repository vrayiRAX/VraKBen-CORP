package ms_warehouse_location.warehouse_location.controller;

import ms_warehouse_location.warehouse_location.model.Location;
import ms_warehouse_location.warehouse_location.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/warehouse")
public class LocationController {
    @Autowired
    private LocationService service;

    @GetMapping("/find/{productId}")
    public Location find(@PathVariable Long productId) {
        return service.getProductLocation(productId);
    }

    @PostMapping("/assign")
    public Location assign(@RequestBody Location location) {
        return service.assignLocation(location);
    }
}
