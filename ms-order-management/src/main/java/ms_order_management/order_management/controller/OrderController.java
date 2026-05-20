package ms_order_management.order_management.controller;

import ms_order_management.order_management.model.Order;
import ms_order_management.order_management.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import ms_order_management.order_management.dto.OrderRequestDTO;
import ms_order_management.order_management.dto.OrderResponseDTO;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderService service;

    @PostMapping("/create")
    public OrderResponseDTO create(@RequestBody OrderRequestDTO request) {
        Order order = new Order();
        order.setCustomerRut(request.getCustomerRut());
        order.setProductId(request.getProductId());
        order.setQuantity(request.getQuantity());
        order.setTotalAmount(request.getTotalAmount());
        
        Order savedOrder = service.placeOrder(order);
        return convertToDTO(savedOrder);
    }
    
    private OrderResponseDTO convertToDTO(Order order) {
        return new OrderResponseDTO(
                order.getId(),
                order.getCustomerRut(),
                order.getProductId(),
                order.getQuantity(),
                order.getTotalAmount(),
                order.getOrderDate(),
                order.getStatus()
        );
    }
}