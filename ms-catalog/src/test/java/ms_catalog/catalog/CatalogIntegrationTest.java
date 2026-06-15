package ms_catalog.catalog;

import ms_catalog.catalog.dto.ProductCatalogRequestDTO;
import ms_catalog.catalog.model.ProductCatalog;
import ms_catalog.catalog.repository.CatalogRepository;
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
public class CatalogIntegrationTest {

    @Container
    @ServiceConnection
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15-alpine");

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private CatalogRepository repository;

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
    void shouldCreateAndRetrieveProduct() {
        // 1. Arrange: Preparar el payload
        ProductCatalogRequestDTO request = new ProductCatalogRequestDTO(
                "TEST-SKU-1", "Test Product", "TestBrand", "TestCategory", 
                "Description", 99.99, 10, null
        );

        // 2. Act: POST /api/catalog/create
        ResponseEntity<ProductCatalog> createResponse = restTemplate.postForEntity(
                "/api/catalog/create", request, ProductCatalog.class
        );

        // 3. Assert: Verificar la respuesta de creación
        assertThat(createResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(createResponse.getBody()).isNotNull();
        assertThat(createResponse.getBody().getSku()).isEqualTo("TEST-SKU-1");

        // 4. Act: GET /api/catalog/{sku}
        ResponseEntity<ProductCatalog> getResponse = restTemplate.getForEntity(
                "/api/catalog/TEST-SKU-1", ProductCatalog.class
        );

        // 5. Assert: Verificar la recuperación de los datos
        assertThat(getResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(getResponse.getBody()).isNotNull();
        assertThat(getResponse.getBody().getName()).isEqualTo("Test Product");
        
        // 6. Assert: Verificar directamente en la base de datos persistida por Testcontainers
        List<ProductCatalog> inDatabase = repository.findAll();
        assertThat(inDatabase).hasSize(1);
    }
}
