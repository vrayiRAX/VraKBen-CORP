package ms_shopping_cart.shopping_cart.controller;

import ms_shopping_cart.shopping_cart.model.CartItem;
import ms_shopping_cart.shopping_cart.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private CartService service;

    @PostMapping("/add")
    public CartItem add(@RequestBody CartItem item) {
        return service.addToCart(item);
    }

    @GetMapping("/{rut}")
    public List<CartItem> getCart(@PathVariable String rut) {
        return service.getItemsByCustomer(rut);
    }

    @DeleteMapping("/clear/{rut}")
    public String clear(@PathVariable String rut) {
        service.clearCart(rut);
        return "Carrito de " + rut + " vaciado correctamente.";
    }
}