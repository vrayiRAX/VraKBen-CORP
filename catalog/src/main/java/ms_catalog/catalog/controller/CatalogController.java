package ms_catalog.catalog.controller;

import ms_catalog.catalog.model.ProductCatalog;
import ms_catalog.catalog.service.CatalogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/catalog")
public class CatalogController {
    @Autowired
    private CatalogService service;

    @GetMapping("/all")
    public List<ProductCatalog> listAll() {
        return service.getAllProducts();
    }

    @GetMapping("/{sku}")
    public ProductCatalog getBySku(@PathVariable String sku) {
        return service.getProductBySku(sku);
    }
}