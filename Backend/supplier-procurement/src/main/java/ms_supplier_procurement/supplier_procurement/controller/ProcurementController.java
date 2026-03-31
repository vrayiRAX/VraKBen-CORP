package ms_supplier_procurement.supplier_procurement.controller;

import ms_supplier_procurement.supplier_procurement.model.SupplierOrder;
import ms_supplier_procurement.supplier_procurement.service.ProcurementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/procurement")
public class ProcurementController {
    @Autowired
    private ProcurementService service;

    @PostMapping("/order")
    public SupplierOrder placeOrder(@RequestBody SupplierOrder order) {
        return service.createPurchaseOrder(order);
    }

    @PutMapping("/status/{id}")
    public SupplierOrder updateStatus(@PathVariable Long id, @RequestParam String status) {
        return service.updateOrderStatus(id, status);
    }
}
