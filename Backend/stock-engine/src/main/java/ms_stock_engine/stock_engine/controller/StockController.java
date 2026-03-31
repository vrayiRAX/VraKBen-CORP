package ms_stock_engine.stock_engine.controller;

import ms_stock_engine.stock_engine.model.Product;
import ms_stock_engine.stock_engine.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stock")
public class StockController {

    @Autowired
    private StockService stockService;

    @PostMapping("/reduce/{id}")
    public ResponseEntity<?> reduce(@PathVariable Long id, @RequestParam Integer quantity) {
        try {
            Product updatedProduct = stockService.reduceStock(id, quantity);
            return ResponseEntity.ok(updatedProduct);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Endpoint para que Actuator y Eureka vean que está vivito
    @GetMapping("/status")
    public String status() {
        return "Stock Engine is UP";
    }
}
