package ms_supplier_procurement.supplier_procurement.controller;

import ms_supplier_procurement.supplier_procurement.dto.SupplierOrderResponseDTO;
import ms_supplier_procurement.supplier_procurement.model.SupplierOrder;
import ms_supplier_procurement.supplier_procurement.service.ProcurementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/procurement")
public class ProcurementController {
    @Autowired
    private ProcurementService service;

    /**
     * Mecánico crea una solicitud de material al proveedor.
     * Recibe entidad directa (Request), retorna DTO (Response).
     */
    @PostMapping("/order")
    public SupplierOrderResponseDTO placeOrder(@RequestBody SupplierOrder order) {
        return toDTO(service.createPurchaseOrder(order));
    }

    /**
     * Admin actualiza el estado de una solicitud (APPROVED / REJECTED).
     */
    @PutMapping("/status/{id}")
    public SupplierOrderResponseDTO updateStatus(@PathVariable Long id, @RequestParam String status) {
        return toDTO(service.updateOrderStatus(id, status));
    }

    /**
     * Admin obtiene todas las solicitudes registradas.
     */
    @GetMapping("/all")
    public List<SupplierOrderResponseDTO> getAllOrders() {
        return service.getAllOrders()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Conversión Entity → DTO.
     * El profe puede pedir: "¿dónde conviertes Entity a DTO?" → Aquí.
     */
    private SupplierOrderResponseDTO toDTO(SupplierOrder order) {
        return new SupplierOrderResponseDTO(
                order.getId(),
                order.getProductSku(),
                order.getQuantity(),
                order.getStatus(),
                order.getOrderDate()
        );
    }
}
