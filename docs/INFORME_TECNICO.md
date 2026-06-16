# 📚 VraKBen-CORP — Documento Técnico Completo

> **Uso:** Referencia técnica del proyecto. Base para el informe PDF de evaluación.
> Última actualización: 2026-06-16

---

## 📋 Tabla de Contenidos

1. [Contexto del Caso](#contexto-del-caso)
2. [Arquitectura General](#arquitectura-general)
3. [Requisitos del Sistema](#requisitos-del-sistema)
4. [Microservicios y Endpoints](#microservicios-y-endpoints)
5. [Patrones de Diseño](#patrones-de-diseño)
6. [Frontend — React](#frontend--react)
7. [Testing](#testing)
8. [Base de Datos](#base-de-datos)
9. [Docker y Orquestación](#docker-y-orquestación)
10. [Git Flow y Control de Versiones](#git-flow-y-control-de-versiones)
11. [Bugs y Soluciones](#bugs-y-soluciones)
12. [Roadmap](#roadmap)
13. [Conclusión](#conclusión)

---

## 1. Contexto del Caso

La automotriz **VraKBen** opera con herramientas descentralizadas (planillas Excel, software desactualizado) que generan cuatro problemas críticos:

| Problema | Descripción | Impacto |
|---|---|---|
| 👻 **Inventario Fantasma** | El taller retira materiales sin descontarlos en tiempo real | Quiebres de stock, ventas online de productos inexistentes |
| 📅 **Caos de Agendamiento** | Los repuestos no se apartan para las citas programadas | Clientes esperan, mecánicos sin material disponible |
| 🧩 **Falta de Trazabilidad** | Ventas y taller manejan la info del cliente por separado | Mala experiencia, errores de facturación |
| 💥 **Cuello de Botella** | Sistema monolítico colapsa bajo picos de tráfico | Todo el negocio se ve afectado simultáneamente |

**Solución propuesta:** Migrar a una arquitectura de microservicios que separa responsabilidades en módulos independientes y escalables, donde un pico en la tienda online **no afecta** al sistema del taller.

---

## 2. Arquitectura General

```
┌────────────────────────────────────────────────────────┐
│              FRONTEND — React 18 + Vite                │
│                   http://localhost:5173                │
│         Axios → apiClient → baseURL: :8080             │
└───────────────────────┬────────────────────────────────┘
                        │ HTTP (Authorization: Bearer JWT)
                        ▼
┌────────────────────────────────────────────────────────┐
│           API GATEWAY / BFF — Puerto :8080             │
│   Spring Boot 3.4.0 + Spring Cloud Gateway 2024.0.0   │
│                                                        │
│  [JwtAuthFilter] → valida token en rutas protegidas   │
│  [CorsConfig]    → CORS global (localhost:5173)        │
│  [RouteConfig]   → lb:// vía Eureka Service Discovery │
└──┬────┬────┬────┬────┬────┬────┬────┬────┬────────────┘
   │    │    │    │    │    │    │    │    │
   ▼    ▼    ▼    ▼    ▼    ▼    ▼    ▼    ▼
 auth catalog cart stock proc appt hist jobs orders
:8083 :8084                :8088

┌────────────────────────────────────────────────────────┐
│            EUREKA SERVER — Puerto :8761                │
│        Service Discovery (Netflix Eureka)              │
│   Todos los microservicios se registran aquí           │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│            PostgreSQL 15 — Puerto :5432                │
│     Base de datos: vrakben_db (compartida)             │
│     JPA ddl-auto: update (tablas automáticas)          │
└────────────────────────────────────────────────────────┘
```

### Principios de la Arquitectura

| Principio | Implementación |
|---|---|
| **Punto único de entrada** | Todo el frontend habla solo con el Gateway `:8080` |
| **Seguridad centralizada** | JWT validado en el Gateway, no en cada microservicio |
| **Service Discovery** | Eureka resuelve `lb://ms-auth-server` → IP:Puerto dinámico |
| **CORS global** | `CorsConfig.java` en el BFF, sin `@CrossOrigin` en microservicios |
| **DTO pattern** | Ningún controlador expone entidades JPA directamente |

---

## 3. Requisitos del Sistema

### Requisitos Funcionales (RF)

| ID | Requisito | Actor | Microservicio |
|---|---|---|---|
| RF-01 | El sistema debe permitir el login con usuario y contraseña | Todos | ms-auth-server |
| RF-02 | El sistema debe permitir el registro de nuevos usuarios | Todos | ms-auth-server |
| RF-03 | El sistema debe mostrar el catálogo de repuestos con imagen y precio | CLIENTE | ms-catalog |
| RF-04 | El sistema debe permitir agregar productos al carrito | CLIENTE | ms-shopping-cart |
| RF-05 | El sistema debe permitir agendar citas en el taller | CLIENTE | ms-appointment-scheduler |
| RF-06 | El sistema debe mostrar el perfil del usuario con sus vehículos | Todos | ms-auth-server / localStorage |
| RF-07 | El sistema debe mostrar órdenes de trabajo al mecánico | MECANICO | ms-job-orders |
| RF-08 | El mecánico debe poder solicitar materiales al proveedor | MECANICO | ms-supplier-procurement |
| RF-09 | El admin debe poder aprobar o rechazar solicitudes de material | ADMIN | ms-supplier-procurement |
| RF-10 | El admin debe poder gestionar el catálogo de repuestos | ADMIN | ms-catalog |
| RF-11 | El admin debe poder buscar y gestionar usuarios | ADMIN | ms-auth-server |
| RF-12 | El admin debe ver métricas del negocio con gráficas | ADMIN | ms-catalog (datos reales) |
| RF-13 | Las rutas deben estar protegidas por rol de usuario | Sistema | API Gateway / ProtectedRoute |

### Requisitos No Funcionales (RNF)

| ID | Requisito | Categoría | Valor Esperado |
|---|---|---|---|
| RNF-01 | El sistema debe autenticar sin almacenar contraseñas en texto plano | Seguridad | BCryptPasswordEncoder |
| RNF-02 | Los tokens JWT deben validarse antes de enrutar cualquier petición protegida | Seguridad | Filtro en API Gateway |
| RNF-03 | El sistema debe ser escalable horizontalmente por microservicio | Escalabilidad | Independencia de contenedores |
| RNF-04 | Si un microservicio falla, los demás no deben verse afectados | Disponibilidad | Aislamiento Docker |
| RNF-05 | El tiempo de respuesta del catálogo no debe superar 2 segundos | Rendimiento | Caché Redis + JPA |
| RNF-06 | El código debe tener tests unitarios con 0 fallos | Calidad | JUnit 5 + Mockito + JaCoCo |
| RNF-07 | Cada controlador debe usar DTOs, no entidades JPA directas | Mantenibilidad | DTO Pattern |
| RNF-08 | Todo el sistema debe poder levantarse con un solo comando Docker | Despliegue | `docker-compose up --build -d` |
| RNF-09 | El frontend debe tener cobertura de pruebas en la lógica de negocio | Calidad | Vitest + React Testing Library |
| RNF-10 | Las notificaciones de órdenes no deben bloquear el hilo principal | Rendimiento | RabbitMQ Asíncrono |

---

## 4. Microservicios y Endpoints

### ms-auth-server (`:8083`)
**Responsabilidad:** Autenticación, registro y gestión de usuarios.

| Método | Endpoint | Body / Params | Respuesta | Auth |
|---|---|---|---|---|
| `POST` | `/api/auth/login` | `{username, password}` | `{token, username, roles, name}` | ❌ |
| `POST` | `/api/auth/register` | `{username, password, roles}` | `200 OK` / `409 Conflict` | ❌ |
| `GET` | `/api/auth/users/{username}` | — | Datos del usuario | ✅ |

### ms-catalog (`:8084`)
**Responsabilidad:** CRUD del catálogo de repuestos y almacenamiento estático de imágenes locales.

| Método | Endpoint | Body | Respuesta | Auth |
|---|---|---|---|---|
| `GET` | `/api/catalog/all` | — | `List<ProductCatalogDTO>` | ✅ |
| `POST` | `/api/catalog/upload/{sku}`| `MultipartFile` | `ProductCatalogDTO` actualizado | ✅ (ADMIN) |
| `GET` | `/api/catalog/{sku}` | — | `ProductCatalog` | ✅ |
| `POST` | `/api/catalog/create` | `{sku, name, brand, category, description, price, imageUrl}` | Producto creado | ✅ |

### ms-supplier-procurement (`:8088`)
**Responsabilidad:** Flujo de solicitudes de material mecánico → proveedor → admin.

| Método | Endpoint | Body / Params | Respuesta | Auth |
|---|---|---|---|---|
| `POST` | `/api/procurement/order` | `{productSku, quantity}` | `SupplierOrderResponseDTO` | ✅ |
| `GET` | `/api/procurement/all` | — | `List<SupplierOrderResponseDTO>` | ✅ |
| `PUT` | `/api/procurement/status/{id}` | `?status=APPROVED\|REJECTED` | `SupplierOrderResponseDTO` | ✅ |

**Estados:** `PENDING` → `APPROVED` / `REJECTED`

### Otros Microservicios

| Servicio | Ruta Gateway | Estado |
|---|---|---|
| ms-shopping-cart | `/api/cart/**` | Estructura preparada |
| ms-stock-engine | `/api/stock/**` | Estructura preparada |
| ms-job-orders | `/api/jobs/**` | Estructura preparada |
| ms-appointment-scheduler | `/api/appointments/**` | Estructura preparada |
| ms-vehicle-history | `/api/history/**` | Estructura preparada |
| ms-order-management | `/api/orders/**` | Estructura preparada |

---

## 5. Patrones de Diseño

### Patrón 1: API Gateway / BFF (Backend For Frontend)

**Descripción:** Un único punto de entrada centraliza la seguridad, el enrutamiento y el CORS para todo el sistema.

**Implementación en el proyecto:**
```java
// JwtAuthenticationGatewayFilterFactory.java
// Filtro personalizado que valida el token antes de enrutar
public GatewayFilter apply(Config config) {
    return (exchange, chain) -> {
        String token = exchange.getRequest()
            .getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        if (token == null || !jwtUtil.isTokenValid(token.replace("Bearer ", ""))) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }
        return chain.filter(exchange);
    };
}
```

**Beneficio:** El frontend nunca habla directamente con los microservicios. La seguridad está en un solo lugar.

---

### Patrón 2: Service Registry (Eureka)

**Descripción:** Los microservicios se registran automáticamente en Eureka al arrancar. El Gateway los descubre por nombre lógico sin necesitar IPs fijas.

**Implementación en el proyecto:**
```yaml
# bff/src/main/resources/application.yml
routes:
  - id: auth-server-route
    uri: lb://ms-auth-server      # lb:// = Load Balanced via Eureka
    predicates:
      - Path=/api/auth/**
  - id: catalog-route
    uri: lb://ms-catalog
    predicates:
      - Path=/api/catalog/**
```

**Beneficio:** Si hay múltiples instancias del mismo servicio, Eureka balancea automáticamente. Si una instancia cae, se elimina del registro.

---

### Patrón 3: Data Transfer Object (DTO)

**Descripción:** Los controladores nunca exponen la entidad JPA directamente. Se crea un DTO específico para la respuesta de la API.

**Implementación en el proyecto:**
```java
// ProcurementController.java
@GetMapping("/all")
public List<SupplierOrderResponseDTO> getAllOrders() {
    return service.getAllOrders()
            .stream()
            .map(this::toDTO)      // ← Conversión Entity → DTO
            .collect(Collectors.toList());
}

// Conversión explícita Entity → DTO
private SupplierOrderResponseDTO toDTO(SupplierOrder order) {
    return new SupplierOrderResponseDTO(
        order.getId(), order.getProductSku(),
        order.getQuantity(), order.getStatus(), order.getOrderDate()
    );
}
```

**Beneficio:** La API no expone campos internos de la BD (como claves foráneas, campos de auditoría, relaciones lazy). Desacopla la API del modelo de datos interno.

---

### Patrón 4: Repository Pattern

**Descripción:** La capa de acceso a datos queda encapsulada detrás de una interfaz Repository, separando completamente la lógica de negocio del ORM.

**Cadena de dependencias:**
```
Controller → Service → Repository → Entity (JPA) → PostgreSQL
```

```java
// CatalogService.java
@Service
public class CatalogService {
    @Autowired
    private CatalogRepository repository; // ← Solo conoce la interfaz

    public ProductCatalog getProductBySku(String sku) {
        return repository.findBySku(sku)
            .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }
}
```

---

## 6. Frontend — React

### Comunicación con el Backend

Todo pasa por `apiClient.js` (baseURL: `http://localhost:8080`):

```js
// services/apiClient.js
const apiClient = axios.create({ baseURL: 'http://localhost:8080' });

// REQUEST: inyecta JWT automáticamente
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    return config;
});

// RESPONSE: maneja sesión expirada
apiClient.interceptors.response.use(
    res => res,
    error => {
        if (error.response?.status === 401) {
            localStorage.clear();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);
```

### Protección de Rutas por Rol

```jsx
// App.jsx — ejemplo de rutas protegidas
<Route path="/admin/metricas" element={
    <ProtectedRoute allowedRoles={['ADMIN']}>
        <Metricas />
    </ProtectedRoute>
} />
<Route path="/mecanico/dashboard" element={
    <ProtectedRoute allowedRoles={['MECANICO']}>
        <DashMec />
    </ProtectedRoute>
} />
```

### Rutas de la Aplicación

| Ruta | Componente | Roles |
|---|---|---|
| `/` | Home | Público |
| `/tienda` | Catalogo | Público |
| `/login` / `/register` | Login / Register | Público |
| `/carrito` | Carrito | CLIENTE, ADMIN |
| `/perfil` | Perfil | Todos |
| `/agendar` | Agendar | CLIENTE |
| `/mecanico/dashboard` | DashMec | MECANICO |
| `/mecanico/inventario` | InvMec | MECANICO |
| `/mecanico/solicitud` | Solicitud | MECANICO |
| `/admin/metricas` | Metricas | ADMIN |
| `/admin/inventario` | GestInv | ADMIN |
| `/admin/usuarios` | GestUser | ADMIN |
| `/admin/solicitudes` | GestSolicitudes | ADMIN |

---

## 7. Testing

### Estrategia de Testing

Se implementan **dos capas de testing**: tests **unitarios** (JUnit 5 + Mockito, sin BD real) y tests de **integración** (Testcontainers + PostgreSQL 15 efímero, compatibles con Spring Boot 4.x).

### Tests Unitarios (JUnit 5 + Mockito)

| Microservicio | Clase | Tests | Casos |
|---|---|---|---|
| ms-auth-server | `AuthServiceTest` | 4 | Login OK, Login incorrecto, Registro OK, Usuario ya existe |
| ms-catalog | `CatalogServiceTest` | 4 | Listar todo, Buscar SKU OK, SKU no encontrado, Guardar |
| ms-supplier-procurement | `ProcurementServiceTest` | 4 | Crear orden, Aprobar, Rechazar (No encontrada), Listar |
| ms-stock | `StockServiceTest` | 3 | Reducir stock OK, Producto no encontrado, Stock insuficiente |
| ms-order-management | `OrderServiceTest` | 2 | Orden exitosa (stock OK), Orden fallida (Sin stock) |
| ms-job-orders | `JobOrderServiceTest` | 3 | Crear orden (IN_PROGRESS), Completar orden OK, Orden no encontrada |
| ms-vehicle-history | `VehicleHistoryServiceTest` | 2 | Agregar entrada al historial, Obtener historial completo |
| ms-appointment-scheduler | `AppointmentServiceTest` | 3 | Agendar con descuento de stock, Agendar sin descuento, Rechazo por falta de stock |
| ms-shopping-cart | `CartServiceTest` | 2 | (Pruebas unitarias de manipulación de carrito) |
| **TOTAL unitarios** | | **27** | ✅ **0 fallos en validación de DTOs y lógica** |

### Tests de Integración (Testcontainers + PostgreSQL real)

Se usan `@Testcontainers` + `@SpringBootTest(webEnvironment=NONE)` con `@ServiceConnection` para inyectar automáticamente el datasource del contenedor PostgreSQL efímero.

| Microservicio | Clase | Tests | Qué valida |
|---|---|---|---|
| ms-catalog | `CatalogRepositoryIntegrationTest` | 2 | Persistir producto + `findBySku` en PostgreSQL 15 real |
| ms-order-management | `OrderRepositoryIntegrationTest` | 2 | Persistir órdenes + `findByUsernameOrderByOrderDateDesc` con filtro multi-usuario |
| **TOTAL integración** | | **4** | ✅ Capa de datos validada con BD real efímera |

### Tests Frontend (Vitest + React Testing Library)

Para cumplir con las métricas de calidad en el lado cliente, se implementaron pruebas usando **Vitest**.

| Componente/Servicio | Tests | Qué valida | Cobertura |
|---|---|---|---|
| `authService` | 4 | Login y registro HTTP | 100% |
| `catalogoService` | 6 | Endpoints del catálogo y subida multipart | 100% |
| `carritoService` | 5 | Operaciones CRUD del carrito | 100% |
| `Catalogo.jsx` | 6 | UI rendering, empty state, añadir producto | 86% |
| `Login.jsx` | 8 | Inputs, loaders, manejo de error 401 | 54% |
| **TOTAL** | **29** | ✅ Lógica frontend crítica asegurada | |

### Cobertura de Código (JaCoCo)

Todos los microservicios generan un reporte de cobertura en cada build gracias al plugin de **JaCoCo**. La meta es mantener los servicios core por encima del 80% en sus paquetes de lógica (`/service`). Reporte disponible en `target/site/jacoco/index.html`.

### Ejemplo de Test (Happy Path + Error Path)

```java
// ProcurementServiceTest.java
@Test
void testUpdateOrderStatus_Approved() {           // Happy Path
    SupplierOrder existing = new SupplierOrder();
    existing.setId(1L); existing.setStatus("PENDING");
    when(repository.findById(1L)).thenReturn(Optional.of(existing));
    when(repository.save(existing)).thenReturn(existing);

    SupplierOrder result = procurementService.updateOrderStatus(1L, "APPROVED");
    assertEquals("APPROVED", result.getStatus());
}

@Test
void testUpdateOrderStatus_NotFound_ThrowsException() {   // Error Path
    when(repository.findById(99L)).thenReturn(Optional.empty());

    RuntimeException ex = assertThrows(RuntimeException.class,
        () -> procurementService.updateOrderStatus(99L, "APPROVED"));
    assertEquals("Orden de compra no encontrada", ex.getMessage());
    verify(repository, never()).save(any());
}
```

### Ejecutar los Tests

```bash
# Tests unitarios (corren en Docker build automáticamente)
docker-compose build ms-catalog
# Buscar: "[INFO] Tests run: 4, Failures: 0, Errors: 0, Skipped: 0"

# Tests de integración (requiere Docker Desktop corriendo localmente)
./mvnw test -Dtest=CatalogRepositoryIntegrationTest   # en ms-catalog/
./mvnw test -Dtest=OrderRepositoryIntegrationTest     # en ms-order-management/
```

---

## 8. Base de Datos

**Motor:** PostgreSQL 15 — Un servidor compartido para todos los microservicios.

| Parámetro | Valor |
|---|---|
| Host (Docker interno) | `vrakben-db` |
| Host (acceso local) | `localhost` |
| Puerto | `5432` |
| Usuario | `user_vrakben` |
| Contraseña | `password_vrakben` |
| Base de datos | `vrakben_db` |

### Tablas por Microservicio

| Tabla | Microservicio | Campos principales |
|---|---|---|
| `users` | ms-auth-server | id, username, password (hash), roles, name |
| `product_catalog` | ms-catalog | id, sku, name, brand, category, price, imageUrl |
| `supplier_orders` | ms-supplier-procurement | id, productSku, quantity, status, orderDate |
| `shopping_cart_items` | ms-shopping-cart | id, customerRut, productSku, quantity |

Cada microservicio usa `spring.jpa.hibernate.ddl-auto=update` → las tablas se crean automáticamente al arrancar.

### Acceso a la BD desde Docker

```bash
# Acceder a la consola psql dentro del contenedor
docker-compose exec vrakben-db psql -U user_vrakben -d vrakben_db

# Consultas útiles
\dt                         -- listar todas las tablas
SELECT * FROM users;        -- ver usuarios registrados
SELECT * FROM product_catalog LIMIT 5;
```

---

## 9. Docker y Orquestación

### Stack de Contenedores

| Contenedor | Imagen / Build | Puerto | Depende de |
|---|---|---|---|
| `vrakben-db` | `postgres:15` | 5432 | — |
| `eureka-server` | `./eureka-server` | 8761 | — |
| `api-gateway` | `./bff` | 8080 | eureka-server |
| `auth-server` | `./ms-auth-server` | 8083 | vrakben-db, eureka |
| `ms-catalog` | `./ms-catalog` | 8084 | vrakben-db, eureka |
| `ms-supplier-procurement` | `./ms-supplier-procurement` | 8088 | vrakben-db, eureka |
| `ms-shopping-cart` | `./ms-shopping-cart` | — | vrakben-db, eureka |
| `ms-stock-engine` | `./ms-stock` | — | vrakben-db, eureka |
| `ms-job-orders` | `./ms-job-orders` | — | vrakben-db, eureka |
| `ms-appointment-scheduler` | `./ms-appointment-scheduler` | — | vrakben-db, eureka |
| `ms-vehicle-history` | `./ms-vehicle-history` | — | vrakben-db, eureka |
| `ms-order-management` | `./ms-order-management` | — | vrakben-db, eureka, vrakben-rabbitmq |
| `vrakben-redis` | `redis:7-alpine` | 6380 | — |
| `vrakben-rabbitmq`| `rabbitmq:3-management`| 5672, 15672| — |

**Red:** `vrakben-net` (bridge) — todos los contenedores se comunican por nombre de servicio.
**Volumen:** `vrakben-db-data` — persiste la BD entre reinicios.

### Comandos Docker

```bash
# Levantar todo
docker-compose up --build -d

# Ver estado
docker-compose ps

# Logs de un servicio
docker-compose logs -f api-gateway

# Reconstruir un servicio específico
docker-compose build auth-server && docker-compose up -d auth-server

# Reconstruir sin caché
docker-compose build --no-cache

# Parar todo
docker-compose down

# Parar y borrar BD (⚠️ destructivo)
docker-compose down -v
```

### Estructura del Dockerfile (cada microservicio)

```dockerfile
# Etapa 1: Compilación con Maven (incluye tests)
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package          # Sin -DskipTests → corre los tests

# Etapa 2: Ejecución liviana
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
```

---

## 10. Git Flow y Control de Versiones

### Ramas del Repositorio

| Rama | Propósito | Estado |
|---|---|---|
| `main` | Código estable | ✅ Activo |
| `feature/ev3-jwt-security`           | Auditoría EV3: Robustecimiento de JWT (Clave 256bits, expiración corta) | ✅ Mergeado   |
| `feature/ev3-testing`                | Auditoría EV3: Cobertura de Tests al 90%                                | ✅ Mergeado   |
| `feature/ev3-mechanic-integration`   | EV3 Final: Dashboard mecánico con datos reales (job-orders + stock)     | ✅ Mergeado   |
| `feature/ev3-user-profile`           | EV3 Final: Perfil cliente conectado con Auth y Vehicle History          | ✅ Mergeado   |
| `feature/ev3-payment-flow`           | Flujo de pago completo con Feign Client + historial de órdenes          | ✅ Mergeado   |
| `feature/ev3-image-upload`           | Subida real de imágenes en ms-catalog (multipart + almacenamiento local) | ✅ Mergeado   |
| `feature/ev3-integration-tests-v2`   | Tests de integración con Testcontainers (SB4 compatible)                | ✅ Mergeado   |
| `feature/ev3-jacoco`                 | Reportes de cobertura JaCoCo + Caché con Redis en Catálogo              | ✅ Mergeado   |
| `feature/ev3-vitest-frontend`        | Integración de Vitest y 29 tests para React con cobertura en servicios  | ✅ Mergeado   |
| `feature/ev3-rabbitmq`               | Mensajería asíncrona con RabbitMQ en órdenes de compra                  | ✅ Mergeado   |
| `feature/conflict-demo` | Demostración de conflicto Git | ✅ Resuelto |

> [!NOTE]
> Se ha creado la guía `.github/GITHUB_FLOW_GUIDE.md` como estándar oficial del equipo para creación de ramas y Pull Requests, asegurando que `main` siempre esté en estado desplegable.

### Flujo de Trabajo (GitHub Flow)

```
main
 │
 ├─── feature/frontend-improvements ──► PR #N ──► merge → main
 │
 ├─── feature/testing-and-dtos ──────► PR #N ──► merge → main
 │
 └─── feature/readme-update ─────────► PR #N ──► merge → main
```

### Evidencia de Conflicto Git Resuelto

Se provocó deliberadamente un conflicto en `README.md` entre `feature/conflict-demo` y `feature/frontend-improvements`, modificando la misma línea de descripción con textos distintos:

```
<<<<<<< HEAD
Sistema de gestión integral para taller mecánico, implementado con
Spring Boot y arquitectura orientada a microservicios en Docker.
=======
Sistema de gestión integral para taller mecánico, enfocado en
eficiencia operacional y experiencia del cliente.
>>>>>>> feature/conflict-demo
```

**Resolución:** Se combinaron ambas descripciones en una sola línea y se realizó el commit de merge:
`Merge branch 'feature/conflict-demo' into feature/frontend-improvements (resolved conflict in README)`

---

## 11. Bugs y Soluciones

| Bug | Causa Raíz | Solución |
|---|---|---|
| API Gateway 404 en todas las rutas | Spring Boot 4.0.3 incompatible con `spring-cloud-starter-gateway` | Bajado BFF a Spring Boot 3.4.0 + Spring Cloud 2024.0.0 |
| Microservicios no resolvían | URIs usaban `http://auth-server:8083` en vez de nombre Eureka | Cambiado a `lb://ms-auth-server` |
| No se podía crear productos | Frontend enviaba campo `stock` que ms-catalog no acepta | Removido del payload del formulario |
| Foto de perfil compartida entre usuarios | `localStorage` sin clave diferenciada por usuario | Clave: `profile_pic_{username}` |
| Tests fallaban en Docker build | `contextLoads` intentaba Docker-in-Docker | `@Disabled` en `*ApplicationTests.java` y usar tests unitarios aislados |
| Procurement exponía entidad JPA | Faltaba DTO de respuesta | Creado `SupplierOrderResponseDTO` + `toDTO()` |
| `containsKey()` en `HttpHeaders` | API cambiada en Spring Boot 3+ | `.getFirst(HttpHeaders.AUTHORIZATION)` |
| Conflicto de nombres en Eureka | Valores duplicados en `.properties` y `.yml` | Se unificaron nombres en `.yml` eliminando el prefijo `ms-` |
| Rutas Gateway rotas (jobs/orders) | Desincronización con Controladores y rutas faltantes | Corregido path `/api/job-orders/**` y agregado `/api/orders/**` |
| Puerto incorrecto (Procurement) | `docker-compose.yml` mapeaba al 8080 internamente | Actualizado mapeo interno al `8092` |

---

## 12. Roadmap — Próximos Pasos

| Prioridad | Tarea | Microservicio | Estado |
|---|---|---|---|
| 🔴 Alta | Conectar panel mecánico a datos reales | ms-job-orders, ms-stock-engine | ✅ Completado |
| 🔴 Alta | Persistencia real del perfil de usuario | ms-auth-server | ✅ Completado |
| 🔴 Alta | Historial de vehículos en perfil del cliente | ms-vehicle-history | ✅ Completado |
| 🔴 Alta | Flujo de pago completo con descuento de stock (Feign) | ms-order-management, ms-stock | ✅ Completado |
| 🔴 Alta | Subida real de imágenes de productos (multipart) | ms-catalog | ✅ Completado |
| 🔴 Alta | Tests de integración con Testcontainers | ms-catalog, ms-order-management | ✅ Completado |
| 🔴 Alta | Testing Frontend con Vitest (29 tests) | frontend | ✅ Completado |
| 🔴 Alta | Mensajería asíncrona con RabbitMQ | ms-order-management | ✅ Completado |
| 🔴 Alta | Caché con Redis en el catálogo | ms-catalog | ✅ Completado |
| 🟠 Media | Proceso de pago (Transbank WebPay Plus) | ms-order-management | 🔄 Pendiente |
| 🟡 Baja | Seguridad por rol en el Gateway (no solo por token) | bff | ✅ Completado (RBAC stock/procurement) |
| 🟡 Baja | Documentación Swagger en todos los microservicios | Todos | 🔄 En progreso (catalog, orders) |

---

## 13. Conclusión

VraKBen-CORP representa una solución de software empresarial completa que aborda los problemas operativos reales de la automotriz mediante una arquitectura de microservicios moderna y escalable.

**Logros técnicos del proyecto:**

- ✅ **Arquitectura de microservicios real** con 11 servicios independientes orquestados en Docker
- ✅ **API Gateway / BFF** con validación JWT centralizada, CORS global y RBAC por ruta
- ✅ **Service Discovery** dinámico vía Netflix Eureka
- ✅ **Frontend React moderno** con roles, rutas protegidas e interceptores JWT
- ✅ **27 tests unitarios** (JUnit 5 + Mockito) + **4 tests de integración** (Testcontainers) con 0 fallos
- ✅ **DTOs** en todos los controladores (nunca se expone la entidad JPA)
- ✅ **Git Flow** con múltiples PRs, branches y resolución de conflictos documentada
- ✅ **Documentación completa** (READMEs por microservicio, diagramas UML PlantUML, Swagger en ms-catalog y ms-orders)
- ✅ **Feign Client** inter-microservicio: `ms-order-management` → `ms-stock-engine` en tiempo real
- ✅ **Subida real de imágenes** con multipart upload, almacenamiento en disco y servicio de recursos estáticos
- ✅ **Caché en Memoria** con Redis para acelerar la carga del catálogo
- ✅ **Mensajería Asíncrona** con RabbitMQ para orquestar eventos de negocio
- ✅ **Calidad Asegurada** con reportes JaCoCo en backend y Vitest en frontend

**El sistema está en producción local** y puede levantarse con un solo comando:
```bash
docker-compose up --build -d && cd frontend && npm run dev
```

---

*VraKBen-CORP — Proyecto Semestral — Arquitectura de Software — 2025*
*Equipo: Vicente Placencia · Ian Badilla*
