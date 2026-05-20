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
            return ResponseEntity.ok(convertToDTO(updatedProduct));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    private ms_stock_engine.stock_engine.dto.ProductResponseDTO convertToDTO(Product product) {
        return new ms_stock_engine.stock_engine.dto.ProductResponseDTO(
                product.getId(),
                product.getName(),
                product.getSku(),
                product.getStock(),
                product.getMinThreshold()
        );
    }

    // Endpoint para que Actuator y Eureka vean que está vivito
    @GetMapping("/status")
    public String status() {
        return "Stock Engine is UP";
    }
}
