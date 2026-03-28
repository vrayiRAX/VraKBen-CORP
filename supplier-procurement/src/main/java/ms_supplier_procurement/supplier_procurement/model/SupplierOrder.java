package ms_supplier_procurement.supplier_procurement.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "supplier_orders")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class SupplierOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String supplierName;
    private Long productId;
    private Integer quantity;
    private Double totalCost;
    private LocalDateTime orderDate;
    private String status;
}