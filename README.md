# VraKBen-CORP 🔧

> Sistema de gestión integral para taller mecánico, implementado con Spring Boot y arquitectura orientada a microservicios en Docker. Enfocado en eficiencia operacional y experiencia del cliente.

[![Java](https://img.shields.io/badge/Java-17-orange)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4%2F4.0-brightgreen)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED)](https://docs.docker.com/compose/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791)](https://www.postgresql.org/)

---

## 📋 Tabla de Contenidos

- [¿Qué es VraKBen-CORP?](#qué-es-vrakben-corp)
- [Arquitectura General](#arquitectura-general)
- [Cómo Levantar el Proyecto](#cómo-levantar-el-proyecto)
- [Microservicios](#microservicios)
- [Frontend](#frontend)
- [Roles de Usuario](#roles-de-usuario)
- [Autenticación JWT](#autenticación-jwt)
- [Patrones de Diseño](#patrones-de-diseño)
- [Testing](#testing)
- [Base de Datos](#base-de-datos)
- [Comandos Docker Útiles](#comandos-docker-útiles)
- [Estructura del Repositorio](#estructura-del-repositorio)
- [Ramas y Git Flow](#ramas-y-git-flow)
- [Tecnologías](#tecnologías)
- [Equipo](#equipo)

---

## ¿Qué es VraKBen-CORP?

VraKBen-CORP es una plataforma web de gestión para un taller mecánico chileno. Permite a los distintos actores del taller operar de forma eficiente:

- Los **clientes** pueden explorar el catálogo de repuestos, agregarlos al carrito, agendar citas y gestionar su perfil con vehículos y patentes en formato chileno.
- Los **mecánicos** tienen su propio panel para ver órdenes de trabajo asignadas, consultar el inventario y solicitar materiales al proveedor.
- Los **administradores** tienen control total: métricas del negocio con gráficas en tiempo real, gestión del catálogo/inventario, gestión de usuarios, y revisión/aprobación de solicitudes de material.

---

## 🏗️ Arquitectura General

El sistema sigue una arquitectura de **microservicios** con un patrón **BFF (Backend For Frontend)**:

```
┌─────────────────────────────────────────────────────┐
│            BROWSER — Frontend React :5173            │
│  (Axios → apiClient → http://localhost:8080)        │
└───────────────────────┬─────────────────────────────┘
                        │ HTTP
                        ▼
┌─────────────────────────────────────────────────────┐
│         API GATEWAY / BFF  :8080                    │
│  · Validación JWT centralizada                      │
│  · CORS global                                      │
│  · Enrutamiento lb:// via Eureka                    │
└──┬──────┬──────┬──────┬──────┬──────┬──────┬───────┘
   │      │      │      │      │      │      │
   ▼      ▼      ▼      ▼      ▼      ▼      ▼
auth  catalog  cart  stock  proc.  appt.  jobs
:8083  :8084                :8088
   │      │      │      │      │      │      │
   └──────┴──────┴──────┴──────┴──────┴──────┘
                        │
                        ▼
            ┌──────────────────────┐
            │   PostgreSQL :5432   │
            └──────────────────────┘

     ┌──────────────────────┐
     │  Eureka Server :8761 │  ← Service Discovery
     └──────────────────────┘
```

### Principios Clave

- **Un solo punto de entrada:** Todo el frontend habla únicamente con el Gateway en el puerto 8080.
- **JWT centralizado:** El Gateway valida el token JWT en cada ruta protegida antes de enrutar al microservicio.
- **Service Discovery:** Los microservicios se registran automáticamente en Eureka. El Gateway los resuelve por nombre lógico (`lb://ms-auth-server`) en vez de IP:puerto.
- **CORS global:** Gestionado completamente en el Gateway. Los microservicios no usan `@CrossOrigin`.

---

## 🚀 Cómo Levantar el Proyecto

### Requisitos Previos

- **Docker Desktop** instalado y corriendo
- **Node.js 18+** y **npm**
- **Git**

> ⚠️ Maven **no** necesita estar instalado localmente. Los microservicios Java se compilan dentro de Docker.

### 1. Clonar el Repositorio

```bash
git clone https://github.com/vrayiRAX/VraKBen-CORP.git
cd VraKBen-CORP
```

### 2. Levantar el Backend (Docker)

```bash
# Primera vez — construye todas las imágenes y levanta los contenedores
# (puede tardar 5-10 min por la descarga de dependencias Maven)
docker-compose up --build -d

# Verificar que todos los servicios están corriendo
docker-compose ps
```

### 3. Levantar el Frontend

```bash
cd frontend
npm install
npm run dev
```

### 4. Acceder a la Aplicación

| Servicio             | URL                   | Descripción                         |
| -------------------- | --------------------- | ----------------------------------- |
| **App Web**          | http://localhost:5173 | Frontend React (Vite)               |
| **API Gateway**      | http://localhost:8080 | Punto único de entrada al backend   |
| **Eureka Dashboard** | http://localhost:8761 | Panel de microservicios registrados |
| Auth Server (debug)  | http://localhost:8083 | Solo para desarrollo/debug          |
| Catálogo (debug)     | http://localhost:8084 | Solo para desarrollo/debug          |
| Procurement (debug)  | http://localhost:8088 | Solo para desarrollo/debug          |

---

## 📦 Microservicios

| Servicio                   | Puerto   | Descripción                                            | Tests          |
| -------------------------- | -------- | ------------------------------------------------------ | -------------- |
| `bff` (API Gateway)        | **8080** | Punto de entrada único. Enrutamiento y validación JWT. | —              |
| `eureka-server`            | **8761** | Service Discovery (Netflix Eureka)                     | —              |
| `ms-auth-server`           | 8083     | Autenticación, usuarios y roles. Genera tokens JWT.    | ✅ 4 tests     |
| `ms-catalog`               | 8084     | Catálogo de repuestos (nombre, precio, imagen, SKU)    | ✅ 4 tests     |
| `ms-supplier-procurement`  | 8088     | Solicitudes de material de mecánicos al proveedor      | ✅ 5 tests     |
| `ms-shopping-cart`         | —        | Carrito de compras por cliente                         | 🔧 En progreso |
| `ms-stock-engine`          | —        | Stock físico de productos en bodega                    | 🔧 En progreso |
| `ms-job-orders`            | —        | Órdenes de trabajo asignadas a mecánicos               | 🔧 En progreso |
| `ms-appointment-scheduler` | —        | Agendamiento de citas de clientes                      | 🔧 En progreso |
| `ms-vehicle-history`       | —        | Historial de reparaciones por vehículo                 | 🔧 En progreso |
| `ms-order-management`      | —        | Gestión de órdenes de compra/venta                     | 🔧 En progreso |

### Rutas del Gateway

| Ruta                      | Microservicio Destino    | JWT          |
| ------------------------- | ------------------------ | ------------ |
| `POST /api/auth/login`    | ms-auth-server           | ❌ Pública   |
| `POST /api/auth/register` | ms-auth-server           | ❌ Pública   |
| `/api/catalog/**`         | ms-catalog               | ✅ Requerido |
| `/api/procurement/**`     | ms-supplier-procurement  | ✅ Requerido |
| `/api/cart/**`            | ms-shopping-cart         | ✅ Requerido |
| `/api/stock/**`           | ms-stock-engine          | ✅ Requerido |
| `/api/appointments/**`    | ms-appointment-scheduler | ✅ Requerido |
| `/api/history/**`         | ms-vehicle-history       | ✅ Requerido |
| `/api/jobs/**`            | ms-job-orders            | ✅ Requerido |

---

## 🌐 Frontend

**Stack:** React 18 · Vite · React Router v6 · Axios · Recharts · Lucide React · CSS Puro

### Rutas de la Aplicación

| Ruta                   | Componente          | Acceso                   |
| ---------------------- | ------------------- | ------------------------ |
| `/`                    | Home.jsx            | Público                  |
| `/tienda`              | Catalogo.jsx        | Público                  |
| `/login`               | Login.jsx           | Público                  |
| `/register`            | Register.jsx        | Público                  |
| `/carrito`             | Carrito.jsx         | CLIENTE, ADMIN           |
| `/pago`                | Pago.jsx            | CLIENTE                  |
| `/agendar`             | Agendar.jsx         | CLIENTE                  |
| `/perfil`              | Perfil.jsx          | CLIENTE, MECANICO, ADMIN |
| `/mecanico/dashboard`  | DashMec.jsx         | MECANICO                 |
| `/mecanico/inventario` | InvMec.jsx          | MECANICO                 |
| `/mecanico/solicitud`  | Solicitud.jsx       | MECANICO                 |
| `/admin/metricas`      | Metricas.jsx        | ADMIN                    |
| `/admin/inventario`    | GestInv.jsx         | ADMIN                    |
| `/admin/usuarios`      | GestUser.jsx        | ADMIN                    |
| `/admin/solicitudes`   | GestSolicitudes.jsx | ADMIN                    |

### Comunicación con el Backend

Toda la comunicación pasa por `apiClient.js` (baseURL: `http://localhost:8080`):

```js
// Interceptor de REQUEST — agrega JWT automáticamente
config.headers["Authorization"] = `Bearer ${token}`;

// Interceptor de RESPONSE — maneja sesión expirada
if (error.response?.status === 401) {
  localStorage.clear();
  window.location.href = "/login";
}
```

---

## 👥 Roles de Usuario

| Rol        | Descripción         | Vistas disponibles                                                         |
| ---------- | ------------------- | -------------------------------------------------------------------------- |
| `CLIENTE`  | Cliente del taller  | Home, Tienda, Carrito, Pago, Agendar, Perfil                               |
| `MECANICO` | Mecánico del taller | Dashboard, Inventario, Solicitud, Perfil                                   |
| `ADMIN`    | Administrador       | Todo lo anterior + Métricas, Gestión de Inventario, Usuarios y Solicitudes |

---

## 🔐 Autenticación JWT

El flujo de autenticación es el siguiente:

1. `POST /api/auth/login` con `{username, password}` → retorna `{token, username, roles, name}`
2. El frontend almacena el token en `localStorage`
3. `AuthContext.jsx` gestiona el estado global de sesión (user, token, rol)
4. Todas las peticiones protegidas incluyen `Authorization: Bearer {token}`
5. El API Gateway valida el token vía `JwtAuthenticationGatewayFilterFactory`
6. Si el token es inválido/expirado → `401 Unauthorized` → el frontend redirige a `/login`

---

## 🎨 Patrones de Diseño

### 1. API Gateway / BFF Pattern

El módulo `bff/` centraliza el ruteo, la validación JWT y el CORS para todo el sistema.

### 2. Service Registry Pattern (Eureka)

Los microservicios se descubren dinámicamente via Netflix Eureka. Las rutas usan `lb://ms-nombre` para balanceo de carga automático.

### 3. Data Transfer Object (DTO)

Los controladores nunca exponen la entidad JPA directamente. Siempre se convierte `Entity → DTO`:

```java
// ProcurementController.java
private SupplierOrderResponseDTO toDTO(SupplierOrder order) {
    return new SupplierOrderResponseDTO(
        order.getId(), order.getProductSku(),
        order.getQuantity(), order.getStatus(), order.getOrderDate()
    );
}
```

### 4. Repository Pattern

Cada microservicio sigue la cadena: `Controller → Service → Repository → BD`. El Controller no conoce la BD. El Service contiene la lógica de negocio.

---

## 🧪 Testing

Tests unitarios implementados con **JUnit 5** y **Mockito**:

| Microservicio           | Clase de Test            | Tests  | Estado          |
| ----------------------- | ------------------------ | ------ | --------------- |
| ms-auth-server          | `AuthServiceTest`        | 4      | ✅              |
| ms-catalog              | `CatalogServiceTest`     | 4      | ✅              |
| ms-supplier-procurement | `ProcurementServiceTest` | 5      | ✅              |
| **Total**               |                          | **13** | ✅ **0 fallos** |

### Ejecutar los tests

```bash
# Los tests se ejecutan automáticamente durante el build de Docker
docker-compose build ms-catalog
# → Buscar en el log: "[INFO] Tests run: 4, Failures: 0, Errors: 0, Skipped: 0"
```

---

## 🗄️ Base de Datos

**PostgreSQL 15** — un servidor compartido para todos los microservicios.

| Parámetro     | Valor              |
| ------------- | ------------------ |
| Host (Docker) | `vrakben-db`       |
| Host (local)  | `localhost`        |
| Puerto        | `5432`             |
| Usuario       | `user_vrakben`     |
| Contraseña    | `password_vrakben` |
| Base de datos | `vrakben_db`       |

Cada microservicio usa `spring.jpa.hibernate.ddl-auto=update` para crear/actualizar sus tablas automáticamente.

---

## 🛠️ Comandos Docker Útiles

```bash
# Ver estado de los contenedores
docker-compose ps

# Ver logs de un servicio en tiempo real
docker-compose logs -f api-gateway
docker-compose logs -f auth-server

# Reconstruir y reiniciar un servicio específico
docker-compose build auth-server && docker-compose up -d auth-server

# Reconstruir todo sin caché (útil si algo quedó corrupto)
docker-compose build --no-cache
docker-compose up -d

# Parar todo
docker-compose down

# Parar todo y borrar la BD (⚠️ destructivo)
docker-compose down -v

# Acceder a la consola PostgreSQL
docker-compose exec vrakben-db psql -U user_vrakben -d vrakben_db
```

---

## 📁 Estructura del Repositorio

```
VraKBen-CORP/
├── bff/                          # API Gateway (Spring Cloud Gateway 2024.0.0 + SB 3.4.0)
├── Backend/
│   ├── eureka-server/            # Service Discovery (Netflix Eureka)
│   ├── supplier-procurement/     # MS: Solicitudes de material
│   ├── job-orders/               # MS: Órdenes de trabajo
│   ├── appointment-scheduler/    # MS: Agendamiento de citas
│   ├── vehicle-history/          # MS: Historial de vehículos
│   └── order-management/         # MS: Gestión de órdenes/ventas
├── ms-auth-server/               # MS: Autenticación y usuarios
├── ms-catalog/                   # MS: Catálogo de repuestos
├── ms-shopping-cart/             # MS: Carrito de compras
├── ms-stock/                     # MS: Stock/inventario
├── frontend/                     # App React (Vite)
│   ├── src/
│   │   ├── components/           # Navbar, Footer, ProtectedRoute
│   │   ├── context/              # AuthContext
│   │   ├── pages/
│   │   │   ├── admin/            # Metricas, GestInv, GestUser, GestSolicitudes
│   │   │   └── mechanic/         # DashMec, InvMec, Solicitud
│   │   └── services/             # apiClient.js, authService.js, catalogoService.js
│   └── package.json
├── ARCHITECTURE.puml             # Diagrama UML de conexiones del sistema
├── STRUCTURE.puml                # Diagrama UML de estructura del proyecto
└── docker-compose.yml            # Orquestación completa del backend
```

---

## 🌿 Ramas y Git Flow

| Rama                            | Descripción                                                  |
| ------------------------------- | ------------------------------------------------------------ |
| `main`                          | Código estable y en producción                               |
| `feature/frontend-improvements` | Mejoras de UI, fix del Gateway, integración frontend-backend |
| `feature/testing-and-dtos`      | Tests JUnit/Mockito + DTOs (PR pendiente hacia main)         |
| `feature/conflict-demo`         | Rama de demostración de resolución de conflictos Git         |

---

## 🔧 Tecnologías

### Backend

| Tecnología                  | Versión       | Uso                          |
| --------------------------- | ------------- | ---------------------------- |
| Java                        | 17            | Lenguaje de programación     |
| Spring Boot                 | 3.4.0 / 4.0.3 | Framework principal          |
| Spring Cloud Gateway        | 2024.0.0      | API Gateway reactivo (BFF)   |
| Spring Security             | —             | Autenticación y autorización |
| Spring Data JPA / Hibernate | —             | ORM y acceso a BD            |
| Netflix Eureka              | —             | Service Discovery            |
| jjwt                        | 0.11.5        | Generación y validación JWT  |
| PostgreSQL                  | 15            | Base de datos relacional     |
| Docker / Docker Compose     | —             | Contenedores y orquestación  |
| Maven                       | 3.9.6         | Gestión de dependencias Java |
| JUnit 5                     | —             | Framework de testing         |
| Mockito                     | —             | Mocking en tests unitarios   |

### Frontend

| Tecnología   | Versión | Uso                            |
| ------------ | ------- | ------------------------------ |
| React        | 18      | Framework UI                   |
| Vite         | —       | Build tool ultrarrápido        |
| React Router | v6      | Navegación SPA                 |
| Axios        | —       | Cliente HTTP con interceptores |
| Recharts     | —       | Gráficas y métricas            |
| Lucide React | —       | Iconos                         |
| CSS Puro     | —       | Estilos sin frameworks         |

---

## 👨‍💻 Equipo

Proyecto desarrollado por el equipo **VraKBen** como sistema de gestión integral para taller mecánico chileno.

| Integrante        | Rol                                                 |
| ----------------- | --------------------------------------------------- |
| Vicente Placencia | Arquitectura, Gateway, Auth, Frontend & Integración |

| Ian Badilla | Microservicios Backend |
