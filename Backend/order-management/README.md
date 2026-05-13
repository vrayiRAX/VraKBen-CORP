# ms-order-management — Gestión de Órdenes de Venta

Microservicio que gestiona las órdenes de compra/venta de repuestos realizadas por los clientes.

## Stack
- Spring Boot + Spring Data JPA + PostgreSQL
- **Eureka Name:** `ms-order-management`
- **Ruta Gateway:** `/api/orders/**`

## Funcionalidad

Maneja el ciclo de vida de una orden de venta:
1. Cliente confirma su carrito → se crea una Order
2. Order procesa el pago (integración con pasarela de pago)
3. Order actualiza el stock de `ms-stock-engine`
4. Se genera comprobante/factura

## Integración Futura

- La vista `/pago` del frontend debe integrarse con este servicio para procesar compras.
- Ideal: integración con Transbank (WebPay) para el mercado chileno.

## Docker
```bash
docker-compose build ms-order-management
docker-compose up -d ms-order-management
```
