package ms_catalog.catalog.service;

import ms_catalog.catalog.model.ProductCatalog;
import ms_catalog.catalog.repository.CatalogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

/**
 * Servicio que gestiona el catálogo de productos VraKBen.
 * Incluye operaciones CRUD y la subida de imágenes al almacenamiento local.
 */
@Service
public class CatalogService {

    @Autowired
    private CatalogRepository repository;

    /**
     * Directorio base donde se guardan las imágenes de los productos.
     * Se puede sobreescribir con la variable de entorno CATALOG_UPLOAD_DIR.
     */
    @Value("${catalog.upload.dir:uploads/images}")
    private String uploadDir;

    /**
     * URL base del servidor para construir la URL pública de la imagen.
     */
    @Value("${catalog.server.url:http://localhost:8084}")
    private String serverUrl;

    public List<ProductCatalog> getAllProducts() {
        return repository.findAll();
    }

    public ProductCatalog getProductBySku(String sku) {
        return repository.findBySku(sku).orElse(null);
    }

    public ProductCatalog saveProduct(ProductCatalog product) {
        return repository.save(product);
    }

    /**
     * Sube una imagen para un producto identificado por su SKU.
     * Guarda el archivo en el sistema de archivos local y actualiza el campo imageUrl en la BD.
     *
     * @param sku       El SKU del producto al que pertenece la imagen.
     * @param imageFile El archivo de imagen enviado como multipart/form-data.
     * @return El producto actualizado con la nueva URL de imagen.
     * @throws RuntimeException si el producto no existe o falla la escritura del archivo.
     */
    public ProductCatalog uploadImage(String sku, MultipartFile imageFile) throws IOException {
        ProductCatalog product = repository.findBySku(sku)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con SKU: " + sku));

        // Crear directorio si no existe
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generar nombre único para el archivo
        String originalFilename = imageFile.getOriginalFilename();
        String extension = (originalFilename != null && originalFilename.contains("."))
                ? originalFilename.substring(originalFilename.lastIndexOf('.'))
                : ".jpg";
        String newFilename = "product-" + sku + "-" + UUID.randomUUID().toString().substring(0, 8) + extension;

        // Guardar archivo en disco
        Path filePath = uploadPath.resolve(newFilename);
        Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // Actualizar la URL en la BD
        String imageUrl = serverUrl + "/images/" + newFilename;
        product.setImageUrl(imageUrl);
        return repository.save(product);
    }
}