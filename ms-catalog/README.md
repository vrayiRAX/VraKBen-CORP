# Microservicio de Catálogo (ms-catalog)

Este microservicio gestiona el catálogo de repuestos de VraKBen-CORP. Es un servicio independiente que se comunica con la base de datos para exponer la información de los productos.

## Endpoints Principales

- `GET /api/catalog/products`: Obtiene la lista de todos los productos disponibles en el catálogo.
- `GET /api/catalog/products/{id}`: Obtiene los detalles de un producto específico.
- `POST /api/catalog/products`: (Admin) Crea un nuevo producto en el catálogo.
- `PUT /api/catalog/products/{id}`: (Admin) Actualiza la información de un producto.
- `DELETE /api/catalog/products/{id}`: (Admin) Elimina un producto del catálogo.
