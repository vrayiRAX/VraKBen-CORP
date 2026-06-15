package ms_order_management.order_management.service;

import ms_order_management.order_management.client.StockClient;
import ms_order_management.order_management.model.Order;
import ms_order_management.order_management.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Servicio que gestiona la lógica de negocio para las órdenes de compra.
 * Coordina con ms-stock-engine (vía Feign) para descontar el inventario al confirmar un pago.
 */
@Service
public class OrderService {

    @Autowired
    private OrderRepository repository;

    @Autowired
    private StockClient stockClient;

    /**
     * Procesa una orden de compra. Descuenta el stock vía Feign al ms-stock-engine.
     * Si hay suficiente stock, la orden queda COMPLETED. Si no, FAILED - NO STOCK.
     *
     * @param order La orden a procesar.
     * @return La orden persistida con su estado final.
     */
    public Order placeOrder(Order order) {
        try {
            // Descontar stock mediante Feign Client (microservicio a microservicio)
            stockClient.reduceStock(order.getProductId(), order.getQuantity());
            // Si no lanza excepción, hay stock suficiente → completar la orden
            order.setOrderDate(LocalDateTime.now());
            order.setStatus("COMPLETED");
            return repository.save(order);
        } catch (Exception e) {
            // Sin stock o error de comunicación → marcar como fallida pero guardar registro
            order.setOrderDate(LocalDateTime.now());
            order.setStatus("FAILED - NO STOCK");
            return repository.save(order);
        }
    }

    /**
     * Obtiene todas las órdenes de un usuario ordenadas de más reciente a más antigua.
     *
     * @param username El nombre de usuario (email/login).
     * @return Lista de órdenes del usuario.
     */
    public List<Order> getOrdersByUser(String username) {
        return repository.findByUsernameOrderByOrderDateDesc(username);
    }
}
