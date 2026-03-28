package ms_catalog.catalog.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "catalog_products")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class ProductCatalog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String sku;
    private String name;
    private String brand;
    private String category;
    @Column(length = 500)
    private String description;
    private Double price;
}