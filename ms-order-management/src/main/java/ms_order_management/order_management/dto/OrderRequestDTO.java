package ms_order_management.order_management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequestDTO {
    private String customerRut;
    private Long productId;
    private Integer quantity;
    private Double totalAmount;
}
