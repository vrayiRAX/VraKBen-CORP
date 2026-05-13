# 🔧 VraKBen-CORP — Plataforma Digital de Microservicios

### Proyecto Semestral — Arquitectura de Software

> VraKBen es una plataforma digital unificada para la automotriz **VraKBen**, desarrollada con una arquitectura moderna de microservicios. El sistema resuelve la crisis operativa generada por el uso de herramientas descentralizadas y obsoletas, integrando en un solo ecosistema la gestión de inventario, ventas online, agendamiento de citas y control del taller mecánico.

[![Java](https://img.shields.io/badge/Java-17-orange)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4%2F4.0-brightgreen)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED)](https://docs.docker.com/compose/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791)](https://www.postgresql.org/)

---

## 📋 Tabla de Contenidos

- [Contexto del Caso](#contexto-del-caso--el-problema-operativo)
- [Solución](#solución--arquitectura-de-microservicios)
- [Flujo de la Aplicación](#flujo-de-la-aplicación)
- [Características Principales](#características-principales)
- [Stack Tecnológico](#stack-tecnológico)
- [Estructura del Repositorio](#estructura-del-repositorio)
- [Instalación y Ejecución](#instalación-y-ejecución)
- [Roles y Rutas](#roles-y-rutas)
- [Rutas del Gateway](#rutas-del-gateway)
- [Patrones de Diseño](#patrones-de-diseño)
- [Testing](#testing)
- [Base de Datos](#base-de-datos)
- [Comandos Docker Útiles](#comandos-docker-útiles)
- [Ramas y Git Flow](#ramas-y-git-flow)
- [Bitácora de Avance](#bitácora-de-avance-del-proyecto)
- [Bugs y Correcciones](#bugs-conocidos-y-correcciones-aplicadas)
- [Notas Técnicas](#notas-técnicas)
- [Equipo](#equipo-de-desarrollo)

---

## 📋 Contexto del Caso — El Problema Operativo

A pesar del éxito comercial de la automotriz VraKBen, la empresa enfrenta una **grave crisis de gestión interna**. Opera con sistemas descentralizados (planillas y software antiguo) que no se comunican entre sí, generando los siguientes puntos críticos:

| Problema | Descripción |
|---|---|
| 👻 **Inventario Fantasma** | El taller retira materiales sin descontarlos en tiempo real, generando quiebres de stock y ventas online de repuestos inexistentes |
| 📅 **Caos de Agendamiento** | Los clientes llegan al taller y los repuestos no fueron apartados, retrasando todo el flujo de trabajo |
| 🧩 **Falta de Trazabilidad** | Ventas y taller manejan la información del cliente por separado, generando una pésima experiencia |
| 💥 **Cuello de Botella Monolítico** | El sistema actual colapsa ante picos de tráfico, afectando a mecánicos y clientes simultáneamente |

---

## ✅ Solución — Arquitectura de Microservicios

VraKBen-CORP migra a una **arquitectura de microservicios con Spring Cloud** que separa responsabilidades en módulos independientes y escalables. Si el módulo de tienda online tiene un pico de tráfico, el sistema del taller **no se ve afectado**.

---

## 🌐 Flujo de la Aplicación

```
                    [Frontend React :5173]
                             |
                 [API Gateway / BFF :8080]  ← Valida JWT · CORS global · Ruteo lb://
                             |
                 [Eureka Server :8761] ← Registro y descubrimiento de servicios
                             |
  ┌──────────────┬───────────┼──────────────┬──────────────┐
  │              │           │              │              │
[auth-server] [ms-catalog] [ms-stock]  [ms-cart]   [ms-orders]
  :8083          :8084
                             │
         [ms-appointments] [ms-vehicle-history] [ms-job-orders] [ms-procurement]
                                                                    :8088
                             │
                 [PostgreSQL :5432 — vrakben_db]
```

---

## 🛠️ Características Principales

### 1. 🔐 Seguridad y Autenticación (JWT)

- **Login y Registro** con validación real contra base de datos PostgreSQL.
- **Tokens JWT** generados al autenticarse, con clave secreta compartida entre servicios.
- **Filtro global** en el API Gateway que intercepta y valida el token en cada petición.
- **Control de Roles**: `CLIENTE`, `MECANICO`, `ADMIN` gestionados desde el `auth-server`.
- **CORS centralizado**: gestionado globalmente en el Gateway. Los microservicios no usan `@CrossOrigin`.

### 2. 🛒 Portal de Clientes

- **Catálogo Visual** de repuestos con imágenes, precio y descripción (`ms-catalog`).
- **Carrito de Compras** con persistencia de sesión (`ms-shopping-cart`).
- **Checkout y Órdenes** con historial de compras (`ms-order-management`).
- **Agendar Citas** en el taller desde la plataforma web (`ms-appointment-scheduler`).
- **Historial de Vehículos** con registros de mantenimientos anteriores (`ms-vehicle-history`).
- **Perfil de Usuario** con foto editable, datos personales y vehículos con patentes formato chileno (ABCD-12).

### 3. 🔩 Intranet del Taller (Mecánico)

- **Dashboard de Órdenes de Trabajo** asignadas al mecánico (`ms-job-orders`).
- **Consulta de Inventario** en tiempo real para verificar disponibilidad de piezas.
- **Solicitud de Materiales** directamente desde el taller al área de bodega (`ms-supplier-procurement`).

### 4. 🖥️ Panel de Control (Admin)

- **Gestión de Bodega**: Control completo del inventario (`ms-stock-engine`).
- **Métricas con Gráficas Recharts**: datos reales de ventas y catálogo.
- **Gestión de Usuarios y Roles**: Búsqueda y administración de cuentas.
- **Gestión de Solicitudes**: Aprobar o rechazar solicitudes de materiales de los mecánicos.

---

## 📦 Stack Tecnológico

### ⚙️ Backend (Microservicios)

| Tecnología | Uso |
|---|---|
| **Java 17** | Lenguaje base de todos los microservicios |
| **Spring Boot 3.4.0 / 4.0.3** | Framework principal de cada servicio |
| **Spring Cloud Gateway 2024.0.0** | API Gateway reactivo (BFF) con filtros JWT |
| **Netflix Eureka** | Registro y descubrimiento de servicios |
| **Spring Data JPA + Hibernate** | Persistencia de datos con PostgreSQL |
| **JJWT 0.11.5** | Generación y validación de tokens JWT |
| **PostgreSQL 15** | Base de datos relacional centralizada |
| **Docker + Docker Compose** | Containerización y orquestación |
| **JUnit 5 + Mockito** | Tests unitarios de los microservicios |
| **Maven 3.9.6** | Gestión de dependencias (compilado en Docker) |

> ⚠️ El BFF usa Spring Boot **3.4.0** + Spring Cloud **2024.0.0**. Los demás microservicios usan **4.0.3**. Esta diferencia es intencional: `spring-cloud-starter-gateway` no es compatible con Spring Boot 4.x aún.

### 🖌️ Frontend

| Tecnología | Uso |
|---|---|
| **React 18 + Vite** | Framework SPA del portal web |
| **React Router v6** | Navegación con rutas protegidas por rol |
| **Axios** | Cliente HTTP con interceptores JWT automáticos |
| **Recharts** | Gráficas y métricas interactivas |
| **Lucide React** | Iconos |
| **CSS Puro** | Estilos sin frameworks externos |

---

## 🗂️ Estructura del Repositorio

```
VraKBen-CORP/
├── bff/                          # API Gateway (Spring Cloud Gateway 2024.0.0)
│   └── src/main/java/
│       ├── JwtAuthenticationGatewayFilterFactory.java
│       ├── JwtUtil.java
│       └── CorsConfig.java
├── Backend/
│   ├── eureka-server/            # Puerto 8761 — Registro de servicios
│   ├── supplier-procurement/     # MS: Solicitudes de material (:8088)
│   ├── job-orders/               # MS: Órdenes de trabajo
│   ├── appointment-scheduler/    # MS: Agendamiento de citas
│   ├── vehicle-history/          # MS: Historial de vehículos
│   └── order-management/         # MS: Gestión de órdenes/ventas
├── ms-auth-server/               # MS: Autenticación y usuarios (:8083)
├── ms-catalog/                   # MS: Catálogo de repuestos (:8084)
├── ms-shopping-cart/             # MS: Carrito de compras
├── ms-stock/                     # MS: Motor de inventario/stock
├── frontend/                     # App React (Vite) — Puerto 5173
│   └── src/
│       ├── components/           # Navbar, Footer, ProtectedRoute
│       ├── context/              # AuthContext (estado global de sesión)
│       ├── pages/
│       │   ├── admin/            # Metricas, GestInv, GestUser, GestSolicitudes
│       │   └── mechanic/         # DashMec, InvMec, Solicitud
│       └── services/             # apiClient.js, authService.js, catalogoService.js
├── ARCHITECTURE.puml             # Diagrama UML de conexiones del sistema
├── STRUCTURE.puml                # Diagrama UML de estructura de clases
└── docker-compose.yml            # Orquestación completa del backend
```

---

## 🚀 Instalación y Ejecución

### Requisitos Previos

- **Docker Desktop** instalado y en ejecución
- **Node.js 18+** y npm (solo para el frontend)
- **Git**

> Maven **no** necesita estar instalado localmente. Los microservicios Java se compilan dentro de Docker.

### Pasos para Levantar el Proyecto

```bash
# 1. Clonar el repositorio
git clone https://github.com/vrayiRAX/VraKBen-CORP.git
cd VraKBen-CORP

# 2. Levantar todo el backend con Docker
# (Primera vez tarda ~5-10 min descargando dependencias Maven)
docker-compose up --build -d

# 3. Verificar que todos los contenedores estén corriendo
docker-compose ps

# 4. Levantar el frontend
cd frontend
npm install
npm run dev
```

### URLs del Sistema

| Servicio | URL |
|---|---|
| **App Web** | http://localhost:5173 |
| **API Gateway** | http://localhost:8080 |
| **Eureka Dashboard** | http://localhost:8761 |
| Auth Server (debug) | http://localhost:8083 |
| Catálogo (debug) | http://localhost:8084 |
| Procurement (debug) | http://localhost:8088 |

### Prueba Rápida de la API

```bash
# 1. Registrar un usuario
POST http://localhost:8080/api/auth/register
Content-Type: application/json
{ "username": "cliente1", "password": "Password.123", "roles": ["USER"] }

# 2. Login — obtener JWT
POST http://localhost:8080/api/auth/login
Content-Type: application/json
{ "username": "cliente1", "password": "Password.123" }

# 3. Usar el token en rutas protegidas
GET http://localhost:8080/api/catalog/all
Authorization: Bearer <token_obtenido>
```

---

## 👥 Roles y Rutas del Frontend

| Ruta | Componente | Roles Permitidos |
|---|---|---|
| `/` | Home.jsx | Público |
| `/tienda` | Catalogo.jsx | Público |
| `/login` | Login.jsx | Público |
| `/register` | Register.jsx | Público |
| `/carrito` | Carrito.jsx | CLIENTE, ADMIN |
| `/pago` | Pago.jsx | CLIENTE |
| `/agendar` | Agendar.jsx | CLIENTE |
| `/perfil` | Perfil.jsx | CLIENTE, MECANICO, ADMIN |
| `/mecanico/dashboard` | DashMec.jsx | MECANICO |
| `/mecanico/inventario` | InvMec.jsx | MECANICO |
| `/mecanico/solicitud` | Solicitud.jsx | MECANICO |
| `/admin/metricas` | Metricas.jsx | ADMIN |
| `/admin/inventario` | GestInv.jsx | ADMIN |
| `/admin/usuarios` | GestUser.jsx | ADMIN |
| `/admin/solicitudes` | GestSolicitudes.jsx | ADMIN |

---

## 🌐 Rutas del Gateway

| Ruta | Microservicio Destino | JWT |
|---|---|---|
| `POST /api/auth/login` | ms-auth-server | ❌ Pública |
| `POST /api/auth/register` | ms-auth-server | ❌ Pública |
| `/api/catalog/**` | ms-catalog | ✅ Requerido |
| `/api/procurement/**` | ms-supplier-procurement | ✅ Requerido |
| `/api/cart/**` | ms-shopping-cart | ✅ Requerido |
| `/api/stock/**` | ms-stock-engine | ✅ Requerido |
| `/api/appointments/**` | ms-appointment-scheduler | ✅ Requerido |
| `/api/history/**` | ms-vehicle-history | ✅ Requerido |
| `/api/jobs/**` | ms-job-orders | ✅ Requerido |

---

## 🎨 Patrones de Diseño

### 1. API Gateway / BFF Pattern
El módulo `bff/` centraliza el ruteo, la validación JWT y el CORS para todo el sistema. El frontend nunca habla directamente con los microservicios.

### 2. Service Registry Pattern (Eureka)
Los microservicios se descubren dinámicamente. Las rutas usan `lb://ms-nombre` para resolución automática vía Eureka en vez de IPs fijas.

### 3. Data Transfer Object (DTO)
Los controladores nunca exponen la entidad JPA directamente. Siempre se convierte `Entity → DTO`:
```java
// ProcurementController.java — el profe puede preguntar "¿dónde conviertes Entity a DTO?"
private SupplierOrderResponseDTO toDTO(SupplierOrder order) {
    return new SupplierOrderResponseDTO(
        order.getId(), order.getProductSku(),
        order.getQuantity(), order.getStatus(), order.getOrderDate()
    );
}
```

### 4. Repository Pattern
Cada microservicio sigue la cadena: `Controller → Service → Repository → BD`.
El Controller no conoce la BD. El Service contiene la lógica de negocio.

---

## 🧪 Testing

Tests unitarios implementados con **JUnit 5** y **Mockito** (sin dependencia de BD real):

| Microservicio | Clase de Test | Tests | Casos cubiertos |
|---|---|---|---|
| ms-auth-server | `AuthServiceTest` | 4 | Login OK, Login incorrecto, Registro OK, Usuario duplicado |
| ms-catalog | `CatalogServiceTest` | 4 | Listar, Buscar por SKU OK, SKU no encontrado, Guardar |
| ms-supplier-procurement | `ProcurementServiceTest` | 5 | Crear, Aprobar, Rechazar, No encontrada, Listar todo |
| **Total** | | **13** | ✅ **0 fallos** |

```bash
# Los tests se ejecutan en el build de Docker (sin -DskipTests)
docker-compose build ms-catalog
# → "[INFO] Tests run: 4, Failures: 0, Errors: 0, Skipped: 0"
```

---

## 🗄️ Base de Datos

**PostgreSQL 15** — un servidor compartido para todos los microservicios.

| Parámetro | Valor |
|---|---|
| Host (Docker) | `vrakben-db` |
| Host (local) | `localhost` |
| Puerto | `5432` |
| Usuario | `user_vrakben` |
| Contraseña | `password_vrakben` |
| Base de datos | `vrakben_db` |

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
docker-compose build --no-cache && docker-compose up -d

# Parar todo
docker-compose down

# Parar todo y borrar la BD (⚠️ destructivo)
docker-compose down -v

# Acceder a la consola PostgreSQL
docker-compose exec vrakben-db psql -U user_vrakben -d vrakben_db
```

---

## 🌿 Ramas y Git Flow

| Rama | Descripción |
|---|---|
| `main` | Código estable |
| `feature/frontend-improvements` | Mejoras UI, fix Gateway, integración frontend-backend |
| `feature/testing-and-dtos` | Tests unitarios + DTOs (PR hacia main) |
| `feature/conflict-demo` | Demostración de resolución de conflictos Git |

---

## 📊 Bitácora de Avance del Proyecto

| Sesión | Tema | Estado |
|---|---|---|
| 1 | Diseño de arquitectura y plan de microservicios | ✅ Completado |
| 2 | Implementación de Eureka Server y API Gateway base | ✅ Completado |
| 3 | Microservicio de Catálogo (`ms-catalog`) con campo `imageUrl` | ✅ Completado |
| 4 | Seguridad JWT: filtro global en Gateway, login y registro con BD real | ✅ Completado |
| 5 | Corrección de incompatibilidad Spring Boot 4.x con Spring Cloud Gateway | ✅ Completado |
| 6 | Limpieza de microservicios innecesarios y reorganización del repo | ✅ Completado |
| 7 | Integración completa de todos los servicios en `docker-compose.yml` | ✅ Completado |
| 8 | Desarrollo del Frontend React (roles, paneles, catálogo con imágenes) | ✅ Completado |
| 9 | Integración Frontend ↔ Backend vía API Gateway (eliminación de bypasses) | ✅ Completado |
| 10 | Tests JUnit 5 + Mockito en 3 microservicios (13 tests, 0 fallos) | ✅ Completado |
| 11 | DTOs en controladores (Entity → DTO explícito con `toDTO()`) | ✅ Completado |
| 12 | Conexión de paneles del Mecánico a datos reales | 🔄 En progreso |
| 13 | Persistencia real del perfil de usuario en BD | 🔄 Pendiente |
| 14 | Proceso de pago completo (integración Transbank) | 🔄 Pendiente |

---

## 🐛 Bugs Conocidos y Correcciones Aplicadas

| Error | Causa | Solución Aplicada |
|---|---|---|
| API Gateway retornaba 404 para todas las rutas | Spring Boot 4.0.3 incompatible con `spring-cloud-starter-gateway` | Bajado a Spring Boot 3.4.0 + Spring Cloud 2024.0.0 |
| Rutas no resolvían los microservicios | URIs usaban `http://auth-server:8083` en vez de `lb://ms-auth-server` | Corregido a `lb://` para usar Service Discovery |
| No se podía crear productos | Frontend enviaba campo `stock` que ms-catalog no acepta | Removido `stock` del payload en el frontend |
| Imagen de perfil compartida entre usuarios | `localStorage` sin clave por usuario | Clave = `profile_pic_{username}` |
| Tests fallaban durante Docker build | `contextLoads` intentaba Docker-in-Docker | `@Disabled` en tests de integración; tests unitarios habilitados |
| Controlador de procurement exponía entidad JPA | Faltaba DTO de respuesta | Creado `SupplierOrderResponseDTO` + método `toDTO()` |
| `containsKey()` no existe en `HttpHeaders` | API cambiada en Spring Boot 3+ | Reemplazado por `.getFirst(HttpHeaders.AUTHORIZATION)` |
| `spring-boot-starter-actuator-test` no existe | Artefacto Maven inexistente | Reemplazado por `spring-boot-starter-test` |

---

## 📝 Notas Técnicas

- **Clave secreta JWT**: Definida en `JwtService` (auth-server) y `JwtUtil` (api-gateway). En producción debe externalizarse a variables de entorno.
- **Contraseñas**: Almacenadas con `BCryptPasswordEncoder` vía Spring Security.
- **Base de datos compartida**: Todos los microservicios comparten `vrakben_db`. En producción se recomienda una BD por servicio (*Database per Service pattern*).
- **`POSTGRES_DB`**: La base de datos `vrakben_db` se crea automáticamente al levantar el contenedor de PostgreSQL.
- **Tests en Docker**: Los Dockerfiles de `ms-auth-server`, `ms-catalog` y `ms-supplier-procurement` corren los tests unitarios en el proceso de build (sin `-DskipTests`). Los `contextLoads` de integración están `@Disabled` ya que requieren Docker-in-Docker.
- **Persistencia del perfil**: Los datos editables del perfil de usuario (foto, nombre, vehículos) se guardan en `localStorage` del navegador, aislados por username. Pendiente migración a endpoint REST en `ms-auth-server`.

---

## 👥 Equipo de Desarrollo

| Integrante | Rol |
|---|---|
| **Vicente Placencia** | Frontend, Diseño de BD, Documentación, Integración Frontend-Backend, Fix API Gateway |
| **Ian Badilla** | Backend Developer — Estructura de microservicios, endpoints de negocio, Docker Compose, Tests |

---

_Proyecto Semestral — Arquitectura de Software — 2025_
