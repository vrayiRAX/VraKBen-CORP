package ms_order_management.order_management.controller;

import ms_order_management.order_management.model.Order;
import ms_order_management.order_management.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderService service;

    @PostMapping("/create")
    public Order create(@RequestBody Order order) {
        return service.placeOrder(order);
    }
}