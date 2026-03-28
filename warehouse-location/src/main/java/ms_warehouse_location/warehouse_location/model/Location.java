package ms_warehouse_location.warehouse_location.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "warehouse_locations")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long productId;
    private String aisle;
    private Integer shelf;
    private String level;
    private String warehouseSection;
}
