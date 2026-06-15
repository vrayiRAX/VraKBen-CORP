package ms_order_management.order_management;

import ms_order_management.order_management.dto.OrderRequestDTO;
import ms_order_management.order_management.dto.OrderResponseDTO;
import ms_order_management.order_management.model.Order;
import ms_order_management.order_management.repository.OrderRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@Testcontainers
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Import(TestcontainersConfiguration.class)
public class OrderIntegrationTest {

    @Container
    @ServiceConnection
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15-alpine");

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private OrderRepository repository;

    @BeforeEach
    void setUp() {
        repository.deleteAll();
    }

    @Test
    void testConnectionToDatabase() {
        assertThat(postgres.isCreated()).isTrue();
        assertThat(postgres.isRunning()).isTrue();
    }

    @Test
    void shouldRetrieveOrderHistoryForUser() {
        // 1. Arrange: Insertar datos directamente en la BD de Testcontainers
        Order order1 = new Order(null, "user@test.com", "1111-1", 1L, "Product A", 2, 200.0, null, "COMPLETED");
        Order order2 = new Order(null, "user@test.com", "1111-1", 2L, "Product B", 1, 50.0, null, "FAILED - NO STOCK");
        Order order3 = new Order(null, "other@test.com", "2222-2", 3L, "Product C", 1, 100.0, null, "COMPLETED");
        
        repository.saveAll(List.of(order1, order2, order3));

        // 2. Act: Consultar el historial vía API REST (GET)
        ResponseEntity<OrderResponseDTO[]> response = restTemplate.getForEntity(
                "/api/orders/my-orders/user@test.com", OrderResponseDTO[].class
        );

        // 3. Assert: Verificar la respuesta REST
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        OrderResponseDTO[] orders = response.getBody();
        assertThat(orders).isNotNull();
        assertThat(orders).hasSize(2); // Solo debe traer los de user@test.com
        
        // Verificar contenido
        assertThat(orders[0].getUsername()).isEqualTo("user@test.com");
        assertThat(orders[1].getUsername()).isEqualTo("user@test.com");
    }
}
