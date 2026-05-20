package ms_catalog.catalog.controller;

import ms_catalog.catalog.model.ProductCatalog;
import ms_catalog.catalog.service.CatalogService;
import ms_catalog.catalog.dto.ProductCatalogDTO;
import ms_catalog.catalog.dto.ProductCatalogRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/catalog")
public class CatalogController {
    @Autowired
    private CatalogService service;

    @GetMapping("/all")
    public List<ProductCatalogDTO> listAll() {
        return service.getAllProducts().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{sku}")
    public ProductCatalogDTO getBySku(@PathVariable String sku) {
        ProductCatalog product = service.getProductBySku(sku);
        if (product != null) {
            return convertToDTO(product);
        }
        return null;
    }

    @PostMapping("/create")
    public ProductCatalogDTO create(@RequestBody ProductCatalogRequestDTO request) {
        ProductCatalog product = new ProductCatalog();
        product.setSku(request.getSku());
        product.setName(request.getName());
        product.setBrand(request.getBrand());
        product.setCategory(request.getCategory());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setImageUrl(request.getImageUrl());
        
        ProductCatalog savedProduct = service.saveProduct(product);
        return convertToDTO(savedProduct);
    }

    private ProductCatalogDTO convertToDTO(ProductCatalog product) {
        return new ProductCatalogDTO(
                product.getId(),
                product.getSku(),
                product.getName(),
                product.getBrand(),
                product.getCategory(),
                product.getDescription(),
                product.getPrice(),
                product.getStock(),
                product.getImageUrl()
        );
    }
}
