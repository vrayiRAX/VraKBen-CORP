package ms_order_management.order_management.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerRut;
    private Long productId;
    private Integer quantity;
    private Double totalAmount;
    private LocalDateTime orderDate;
    private String status; // PENDING, COMPLETED, FAILED
}