package ms_resource_planner.resource_planner.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "technicians")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Technician {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String specialty;
    private String shift;
    private Boolean isAvailable;
}
