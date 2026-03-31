package ms_warehouse_location.warehouse_location.service;

import ms_warehouse_location.warehouse_location.model.Location;
import ms_warehouse_location.warehouse_location.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LocationService {
    @Autowired
    private LocationRepository repository;

    public Location getProductLocation(Long productId) {
        return repository.findByProductId(productId)
                .orElseThrow(() -> new RuntimeException("Ubicación no definida para este producto"));
    }

    public Location assignLocation(Location location) {
        return repository.save(location);
    }
}
