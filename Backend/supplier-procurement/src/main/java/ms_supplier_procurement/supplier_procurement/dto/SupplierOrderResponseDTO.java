package ms_supplier_procurement.supplier_procurement.dto;

import java.time.LocalDateTime;

/**
 * DTO de respuesta para las órdenes de suministro.
 * Evita exponer la entidad JPA directamente en la API.
 */
public class SupplierOrderResponseDTO {

    private Long id;
    private String productSku;
    private Integer quantity;
    private String status;
    private LocalDateTime orderDate;

    // Constructor completo
    public SupplierOrderResponseDTO(Long id, String productSku, Integer quantity,
                                     String status, LocalDateTime orderDate) {
        this.id = id;
        this.productSku = productSku;
        this.quantity = quantity;
        this.status = status;
        this.orderDate = orderDate;
    }

    // Getters
    public Long getId() { return id; }
    public String getProductSku() { return productSku; }
    public Integer getQuantity() { return quantity; }
    public String getStatus() { return status; }
    public LocalDateTime getOrderDate() { return orderDate; }
}
