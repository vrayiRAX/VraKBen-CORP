package ms_order_management.order_management.repository;

import ms_order_management.order_management.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    // Método útil para buscar todas las compras de un cliente específico (usando su RUT)
    List<Order> findByCustomerRut(String customerRut);
}