# 🔧 VraKBen-CORP — Plataforma Digital de Microservicios

### Proyecto Semestral — Arquitectura de Software / Ingeniería de Software

> VraKBen es una plataforma digital unificada para la automotriz **VraKBen**, desarrollada con una arquitectura moderna de microservicios. El sistema resuelve la crisis operativa generada por el uso de herramientas descentralizadas y obsoletas, integrando en un solo ecosistema la gestión de inventario, ventas online, agendamiento de citas y control del taller mecánico.

---

## 📋 Contexto del Caso — El Problema Operativo

A pesar del éxito comercial de la automotriz VraKBen, la empresa enfrenta una **grave crisis de gestión interna**. Opera con sistemas descentralizados (planillas y software antiguo) que no se comunican entre sí, generando los siguientes puntos críticos:

| Problema                            | Descripción                                                                                                                        |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| 👻 **Inventario Fantasma**          | El taller retira materiales sin descontarlos en tiempo real, generando quiebres de stock y ventas online de repuestos inexistentes |
| 📅 **Caos de Agendamiento**         | Los clientes llegan al taller y los repuestos no fueron apartados, retrasando todo el flujo de trabajo                             |
| 🧩 **Falta de Trazabilidad**        | Ventas y taller manejan la información del cliente por separado, generando una pésima experiencia                                  |
| 💥 **Cuello de Botella Monolítico** | El sistema actual colapsa ante picos de tráfico, afectando a mecánicos y clientes simultáneamente                                  |

---

## ✅ Solución — Arquitectura de Microservicios

VraKBen-CORP migra a una **arquitectura de microservicios con Spring Cloud** que separa responsabilidades en módulos independientes y escalables. Si el módulo de tienda online tiene un pico de tráfico, el sistema del taller **no se ve afectado**.

---

## 🌐 Flujo de la Aplicación

```
                         [Frontend React]
                                |
                    [API Gateway :8080]  ← Valida JWT en todas las rutas
                                |
                    [Eureka Server :8761] ← Registro de servicios
                                |
    ┌───────────────────────────┼────────────────────────────┐
    │               │           │            │               │
[auth-server]  [ms-catalog] [ms-stock]  [ms-cart]   [ms-orders]
    │               │           │
[ms-appointments] [ms-vehicle-history] [ms-job-orders] [ms-procurement]
                                |
                    [PostgreSQL :5432 — vrakben_db]
```

---

## 🛠️ Características Principales

### 1. 🔐 Seguridad y Autenticación (JWT)

- **Login y Registro** con validación real contra base de datos PostgreSQL.
- **Tokens JWT** generados al autenticarse, con clave secreta compartida entre servicios.
- **Filtro global** en el API Gateway que intercepta y valida el token en cada petición.
- **Control de Roles**: `CLIENTE`, `MECANICO`, `ADMIN` gestionados desde el `auth-server`.

### 2. 🛒 Portal de Clientes

- **Catálogo Público** de repuestos con imágenes, precio y descripción (`ms-catalog`).
- **Carrito de Compras** con persistencia de sesión (`ms-shopping-cart`).
- **Checkout y Órdenes** con historial de compras (`ms-order-management`).
- **Agendar Citas** en el taller desde la plataforma web (`ms-appointment-scheduler`).
- **Historial de Vehículos** con registros de mantenimientos anteriores (`ms-vehicle-history`).

### 3. 🔩 Intranet del Taller (Mecánico)

- **Dashboard de Órdenes de Trabajo** asignadas al mecánico (`ms-job-orders`).
- **Consulta de Inventario** en tiempo real para verificar disponibilidad de piezas.
- **Solicitud de Materiales** directamente desde el taller al área de bodega (`ms-supplier-procurement`).

### 4. 🖥️ Panel de Control (Admin)

- **Gestión de Bodega**: Control completo del inventario (`ms-stock-engine`).
- **Métricas de Ventas y Citas**: Reportes de actividad del negocio.
- **Gestión de Usuarios y Roles**: Alta, baja y modificación de cuentas.

---

## 📦 Stack Tecnológico

### ⚙️ Backend (Microservicios)

| Tecnología                      | Uso                                       |
| ------------------------------- | ----------------------------------------- |
| **Java 17**                     | Lenguaje base de todos los microservicios |
| **Spring Boot 4.0.3**           | Framework principal de cada servicio      |
| **Spring Cloud Gateway**        | API Gateway reactivo con filtros JWT      |
| **Netflix Eureka**              | Registro y descubrimiento de servicios    |
| **Spring Data JPA + Hibernate** | Persistencia de datos con PostgreSQL      |
| **JJWT 0.11.5**                 | Generación y validación de tokens JWT     |
| **Lombok**                      | Reducción de código boilerplate           |
| **PostgreSQL 15**               | Base de datos relacional centralizada     |
| **Docker + Docker Compose**     | Containerización y orquestación           |
| **Testcontainers + JUnit 5**    | Tests de integración con contenedores     |

### 🖌️ Frontend _(En desarrollo)_

| Tecnología                     | Uso                                 |
| ------------------------------ | ----------------------------------- |
| **React**                      | Framework SPA del portal web        |
| **Context API / localStorage** | Gestión del token JWT en el cliente |

---

## 🗂️ Estructura del Repositorio

```
VraKBen-CORP/
├── Backend/
│   ├── api-gateway/           # Puerto 8080 — Puerta de entrada con seguridad JWT
│   ├── eureka-server/         # Puerto 8761 — Registro de servicios
│   ├── auth-server/           # Login, registro y validación de roles
│   ├── catalog/               # Catálogo público de repuestos
│   ├── stock-engine/          # Control de bodega e inventario
│   ├── shopping-cart/         # Carrito de compras
│   ├── order-management/      # Órdenes de compra y métricas
│   ├── appointment-scheduler/ # Agendamiento de citas en taller
│   ├── vehicle-history/       # Historial de vehículos del cliente
│   ├── job-orders/            # Órdenes de trabajo de mecánicos
│   ├── supplier-procurement/  # Solicitudes de materiales
│   └── docker-compose.yml     # Orquestación completa del backend
└── README.md
```

---

## 🚀 Instalación y Ejecución

### Requisitos Previos

- **Docker Desktop** instalado y en ejecución
- **JDK 17** instalado (para desarrollo local fuera de Docker)
- **Postman** (para probar los endpoints de la API)

### Pasos para Levantar el Backend

```bash
# 1. Clonar el repositorio
git clone https://github.com/vrayiRAX/VraKBen-CORP.git
cd VraKBen-CORP/Backend

# 2. Construir todas las imágenes Docker
docker-compose build

# 3. Levantar todos los servicios
docker-compose up -d

# 4. Verificar que todos los contenedores estén corriendo
docker-compose ps
```

### Verificar el Sistema

Una vez levantado, abre en tu navegador:

- **Eureka Dashboard**: http://localhost:8761 → Verifica que todos los servicios aparezcan registrados.
- **API Gateway**: http://localhost:8080 → Puerta de entrada a todos los endpoints.

---

## 🧪 Pruebas de la API (Postman)

### Flujo de autenticación:

```bash
# 1. Registrar un usuario
POST http://localhost:8080/api/auth/register
Body (JSON):
{
  "username": "admin",
  "password": "123456",
  "roles": ["ADMIN"]
}

# 2. Iniciar sesión y obtener el JWT
POST http://localhost:8080/api/auth/login?username=admin&password=123456

# 3. Usar el token en rutas protegidas
GET http://localhost:8080/api/catalog/all
Header: Authorization: Bearer <token_obtenido>
```

---

## 📊 Bitácora de Avance del Proyecto

| Sesión | Tema                                                                     | Estado         |
| ------ | ------------------------------------------------------------------------ | -------------- |
| 1      | Diseño de arquitectura y plan de microservicios                          | ✅ Completado  |
| 2      | Implementación de Eureka Server y API Gateway base                       | ✅ Completado  |
| 3      | Microservicio de Catálogo (`ms-catalog`) con campo `imageUrl`            | ✅ Completado  |
| 4      | Seguridad JWT: filtro global en el Gateway, login y registro con BD real | ✅ Completado  |
| 5      | Corrección de errores de compilación en POM y filtros                    | ✅ Completado  |
| 6      | Limpieza de microservicios innecesarios (5 eliminados)                   | ✅ Completado  |
| 7      | Integración completa de todos los servicios en `docker-compose.yml`      | ✅ Completado  |
| 8      | Desarrollo de endpoints de negocio en los microservicios restantes       | 🔄 En progreso |
| 9      | Desarrollo del Frontend en React                                         | 🔄 Pendiente   |
| 10     | Integración Frontend ↔ Backend                                           | 🔄 Pendiente   |

---

## 🐛 Bugs Conocidos y Correcciones Aplicadas

| Error                                                   | Causa                                                                                              | Solución Aplicada                                                                       |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `auth-server` crasheaba al iniciar                      | Intentaba conectar a BD `db_auth` inexistente                                                      | Corregido a `vrakben_db` en `docker-compose.yml`                                        |
| `spring-boot-starter-actuator-test`                     | Artefacto Maven inexistente                                                                        | Reemplazado por `spring-boot-starter-test` en todos los `pom.xml`                       |
| `containsKey()` no existe en `HttpHeaders`              | API cambiada en Spring Boot 3+                                                                     | Reemplazado por `.getFirst(HttpHeaders.AUTHORIZATION)`                                  |
| Ruta `/api/auth/**` devolvía 404                        | Gateway apuntaba a `lb://auth-server` pero el servicio se registra como `ms-auth-server` en Eureka | Corregido el URI en `application.yml` del gateway                                       |
| Import incorrecto en `TestcontainersConfiguration.java` | Paquete `org.testcontainers.postgresql.PostgreSQLContainer` incorrecto                             | Corregido a `org.testcontainers.containers.PostgreSQLContainer` con tipo genérico `<?>` |
| Versiones no gestionadas de Testcontainers              | Falta del BOM de Testcontainers                                                                    | Añadido `testcontainers-bom v1.20.6` a `<dependencyManagement>`                         |

---

## 👥 Equipo de Desarrollo

Este proyecto fue desarrollado colaborativamente:

### 👤 [Vicente Placencia]

**Rol:** Frontend, DB Designer and Documentation Manager

- Diseño y creacion del Frontend
- Creacion de la base de datos
- Documentacion del proyecto
- Correccion de errores de compilacion en POM y filtros

### 👤 [Ian Badilla]

**Rol:** Backend Developer and tester

- Desarrollo del backend y estructura de los servicios
- Creacion de endpoints de negocio en los microservicios restantes
- Integracion completa de todos los servicios en docker-compose.yml

---

## 📝 Notas Técnicas

- **Clave secreta JWT**: Definida en `JwtService` (auth-server) y `JwtUtil` (api-gateway). En producción debe externalizarse a variables de entorno.
- **Contraseñas**: Almacenadas en texto plano para el MVP. En producción debe implementarse `BCryptPasswordEncoder`.
- **Base de datos**: Todos los microservicios comparten `vrakben_db`. En producción se recomienda una BD por servicio (Database per Service pattern).
- **`POSTGRES_DB`**: La base de datos `vrakben_db` se crea automáticamente al levantar el contenedor de PostgreSQL.

---

_Proyecto Semestral — Arquitectura de Software — 2025_
