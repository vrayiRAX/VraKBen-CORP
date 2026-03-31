package ms_order_management.order_management.service;

import ms_order_management.order_management.client.StockClient;
import ms_order_management.order_management.model.Order;
import ms_order_management.order_management.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class OrderService {
    @Autowired
    private OrderRepository repository;

    @Autowired
    private StockClient stockClient;

    public Order placeOrder(Order order) {
        try {
            //Descontar stock mediante Feign
            stockClient.reduceStock(order.getProductId(), order.getQuantity());
            //Si hay stock, completar la orden
            order.setOrderDate(LocalDateTime.now());
            order.setStatus("COMPLETED");
            return repository.save(order);
        } catch (Exception e) {
            order.setStatus("FAILED - NO STOCK");
            return repository.save(order);
        }
    }
}
