package ms_supplier_procurement.supplier_procurement.service;

import ms_supplier_procurement.supplier_procurement.model.SupplierOrder;
import ms_supplier_procurement.supplier_procurement.repository.ProcurementRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class ProcurementServiceTest {

    @Mock
    private ProcurementRepository repository;

    @InjectMocks
    private ProcurementService procurementService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    // ─── Happy Path: crear orden ──────────────────────────────────────────────

    @Test
    void testCreatePurchaseOrder_SetsStatusPendingAndDate() {
        // Arrange
        SupplierOrder input = new SupplierOrder();
        input.setProductSku("SKU-001");
        input.setQuantity(5);

        SupplierOrder saved = new SupplierOrder();
        saved.setId(1L);
        saved.setProductSku("SKU-001");
        saved.setQuantity(5);
        saved.setStatus("PENDING");
        saved.setOrderDate(LocalDateTime.now());

        when(repository.save(any(SupplierOrder.class))).thenReturn(saved);

        // Act
        SupplierOrder result = procurementService.createPurchaseOrder(input);

        // Assert
        assertNotNull(result);
        assertEquals("PENDING", result.getStatus());
        assertEquals("SKU-001", result.getProductSku());
        assertEquals(5, result.getQuantity());
        verify(repository, times(1)).save(any(SupplierOrder.class));
    }

    // ─── Happy Path: actualizar estado a APPROVED ────────────────────────────

    @Test
    void testUpdateOrderStatus_Approved() {
        // Arrange
        SupplierOrder existing = new SupplierOrder();
        existing.setId(1L);
        existing.setStatus("PENDING");

        SupplierOrder updated = new SupplierOrder();
        updated.setId(1L);
        updated.setStatus("APPROVED");

        when(repository.findById(1L)).thenReturn(Optional.of(existing));
        when(repository.save(existing)).thenReturn(updated);

        // Act
        SupplierOrder result = procurementService.updateOrderStatus(1L, "APPROVED");

        // Assert
        assertEquals("APPROVED", result.getStatus());
        verify(repository, times(1)).findById(1L);
        verify(repository, times(1)).save(existing);
    }

    // ─── Happy Path: actualizar estado a REJECTED ────────────────────────────

    @Test
    void testUpdateOrderStatus_Rejected() {
        // Arrange
        SupplierOrder existing = new SupplierOrder();
        existing.setId(2L);
        existing.setStatus("PENDING");

        SupplierOrder updated = new SupplierOrder();
        updated.setId(2L);
        updated.setStatus("REJECTED");

        when(repository.findById(2L)).thenReturn(Optional.of(existing));
        when(repository.save(existing)).thenReturn(updated);

        // Act
        SupplierOrder result = procurementService.updateOrderStatus(2L, "REJECTED");

        // Assert
        assertEquals("REJECTED", result.getStatus());
        verify(repository, times(1)).findById(2L);
    }

    // ─── Error Path: orden no encontrada ─────────────────────────────────────

    @Test
    void testUpdateOrderStatus_NotFound_ThrowsException() {
        // Arrange
        when(repository.findById(99L)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            procurementService.updateOrderStatus(99L, "APPROVED");
        });

        assertEquals("Orden de compra no encontrada", exception.getMessage());
        verify(repository, times(1)).findById(99L);
        verify(repository, never()).save(any());
    }

    // ─── Happy Path: listar todas las órdenes ────────────────────────────────

    @Test
    void testGetAllOrders_ReturnsList() {
        // Arrange
        SupplierOrder o1 = new SupplierOrder();
        o1.setId(1L); o1.setProductSku("SKU-A"); o1.setStatus("PENDING");

        SupplierOrder o2 = new SupplierOrder();
        o2.setId(2L); o2.setProductSku("SKU-B"); o2.setStatus("APPROVED");

        when(repository.findAll()).thenReturn(Arrays.asList(o1, o2));

        // Act
        List<SupplierOrder> result = procurementService.getAllOrders();

        // Assert
        assertEquals(2, result.size());
        assertEquals("SKU-A", result.get(0).getProductSku());
        assertEquals("APPROVED", result.get(1).getStatus());
        verify(repository, times(1)).findAll();
    }
}
