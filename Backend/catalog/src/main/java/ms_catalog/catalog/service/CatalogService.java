package ms_catalog.catalog.service;

import ms_catalog.catalog.model.ProductCatalog;
import ms_catalog.catalog.repository.CatalogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CatalogService {
    @Autowired
    private CatalogRepository repository;

    public List<ProductCatalog> getAllProducts() {
        return repository.findAll();
    }

    public ProductCatalog getProductBySku(String sku) {
        return repository.findBySku(sku)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado en catálogo"));
    }
}
