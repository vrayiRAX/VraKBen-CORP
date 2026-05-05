# 🔧 VraKBen-CORP — Plataforma Digital de Microservicios

### Proyecto Semestral — Arquitectura de Software / Ingeniería de Software

> VraKBen es una plataforma digital unificada para la automotriz **VraKBen**, desarrollada con una arquitectura moderna de microservicios. El sistema integra en un solo ecosistema la gestión de inventario, ventas online, agendamiento de citas y control del taller mecánico.

---

## 📋 Contexto del Caso — El Problema Operativo

A pesar del éxito comercial de la automotriz VraKBen, la empresa enfrenta una **grave crisis de gestión interna**. Opera con sistemas descentralizados que no se comunican entre sí, generando los siguientes puntos críticos:

| Problema | Descripción |
| --- | --- |
| 👻 **Inventario Fantasma** | El taller retira materiales sin descontarlos en tiempo real, generando quiebres de stock |
| 📅 **Caos de Agendamiento** | Los clientes llegan al taller y los repuestos no fueron apartados |
| 🧩 **Falta de Trazabilidad** | Ventas y taller manejan la información del cliente por separado |
| 💥 **Cuello de Botella Monolítico** | El sistema actual colapsa ante picos de tráfico |

---

## ✅ Solución — Arquitectura de Microservicios

VraKBen-CORP migra a una **arquitectura de microservicios con Spring Cloud** que separa responsabilidades en módulos independientes y escalables.

---

## 🌐 Flujo de la Aplicación

```
                     [Frontend React :5173]
                              |
                    [BFF / API Gateway :8080]  ← Valida JWT + CORS
                              |
                    [Eureka Server :8761] ← Registro de servicios
                              |
    ┌─────────────────────────┼──────────────────────────┐
    │             │           │            │              │
[ms-auth-server] [ms-catalog] [ms-stock] [ms-cart]  [ms-orders]
    │
[PostgreSQL :5432 — vrakben_db]
```

---

## 🗂️ Estructura del Repositorio

```
VraKBen-CORP/
├── bff/                    # Puerto 8080 — API Gateway con filtro JWT y CORS
├── ms-auth-server/         # Autenticación: login, registro y generación de JWT
├── ms-catalog/             # Catálogo público de repuestos
├── ms-stock/               # Control de bodega e inventario
├── frontend/               # Portal web en React (Vite)
├── docs/                   # Documentación y guías de evaluación
├── Backend/                # Microservicios secundarios (eureka-server, shopping-cart, etc.)
├── docker-compose.yml      # Orquestación completa del ecosistema
└── README.md
```

---

## 📦 Stack Tecnológico

### ⚙️ Backend (Microservicios)

| Tecnología | Uso |
| --- | --- |
| **Java 17** | Lenguaje base de todos los microservicios |
| **Spring Boot 4.0.3** | Framework principal de cada servicio |
| **Spring Cloud Gateway** | BFF reactivo con filtros JWT y CORS global |
| **Netflix Eureka** | Registro y descubrimiento de servicios |
| **Spring Data JPA + Hibernate** | Persistencia con PostgreSQL |
| **JJWT 0.11.5** | Generación y validación de tokens JWT |
| **Lombok** | Reducción de código boilerplate |
| **PostgreSQL 15** | Base de datos relacional centralizada |
| **Docker + Docker Compose** | Containerización y orquestación |

### 🖌️ Frontend

| Tecnología | Uso |
| --- | --- |
| **React + Vite** | SPA del portal web |
| **Axios** | Cliente HTTP con interceptores JWT automáticos |
| **Context API + localStorage** | Gestión global del token JWT y sesión |
| **React Router DOM** | Navegación y rutas protegidas por rol |

---

## 🚀 Instalación y Ejecución

### Requisitos Previos

- **Docker Desktop** instalado y en ejecución
- **JDK 17** instalado (para desarrollo local)
- **Node.js 18+** (para el frontend)

### Levantar todo el Backend con Docker

```bash
# 1. Clonar el repositorio
git clone https://github.com/vrayiRAX/VraKBen-CORP.git
cd VraKBen-CORP

# 2. Construir y levantar todos los servicios
docker-compose build
docker-compose up -d

# 3. Verificar que todos los contenedores estén corriendo
docker-compose ps
```

### Levantar el Frontend

```bash
cd frontend
npm install
npm run dev
# Disponible en http://localhost:5173
```

### Verificar el Sistema

- **Eureka Dashboard**: http://localhost:8761
- **BFF / API Gateway**: http://localhost:8080
- **Frontend**: http://localhost:5173

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
POST http://localhost:8080/api/auth/login
Body (JSON):
{
  "username": "admin",
  "password": "123456"
}
# Response: { "token": "eyJ...", "username": "admin", "message": "Login exitoso" }

# 3. Usar el token en rutas protegidas
GET http://localhost:8080/api/catalog/all
Header: Authorization: Bearer <token_obtenido>
```

---

## 📊 Bitácora de Avance del Proyecto

| Sesión | Tema | Estado |
| --- | --- | --- |
| 1 | Diseño de arquitectura y plan de microservicios | ✅ Completado |
| 2 | Eureka Server y API Gateway base | ✅ Completado |
| 3 | Microservicio de Catálogo (`ms-catalog`) | ✅ Completado |
| 4 | Seguridad JWT: filtro global en el Gateway | ✅ Completado |
| 5 | Corrección de errores de compilación | ✅ Completado |
| 6 | Limpieza de microservicios innecesarios | ✅ Completado |
| 7 | Integración en `docker-compose.yml` | ✅ Completado |
| 8 | Reestructuración multimódulo + DTOs + CORS | ✅ Completado |
| 9 | Conexión Frontend ↔ Backend real (JWT + Axios) | ✅ Completado |
| 10 | Conectar catálogo real con frontend | 🔄 En progreso |

---

## 🐛 Bugs Conocidos y Correcciones Aplicadas

| Error | Causa | Solución |
| --- | --- | --- |
| `auth-server` crasheaba al iniciar | Intentaba conectar a BD `db_auth` inexistente | Corregido a `vrakben_db` en `docker-compose.yml` |
| `containsKey()` no existe en `HttpHeaders` | API cambiada en Spring Boot 3+ | Reemplazado por `.getFirst(HttpHeaders.AUTHORIZATION)` |
| Login devolvía 400 desde el frontend | El endpoint usaba `@RequestParam` en lugar de `@RequestBody` | Refactorizado a `@RequestBody LoginRequestDTO` |
| Frontend bloqueado por CORS | BFF sin configuración CORS | Creado `CorsConfig.java` con `CorsWebFilter` |
| Versiones no gestionadas de Testcontainers | Falta del BOM | Añadido `testcontainers-bom v1.20.6` |

---

## 👥 Equipo de Desarrollo

### 👤 Vicente Placencia
**Rol:** Frontend Developer, DB Designer & Documentation Manager
- Diseño y creación del Frontend en React
- Diseño de la base de datos
- Documentación del proyecto
- Corrección de errores de compilación

### 👤 Ian Badilla
**Rol:** Backend Developer & Tester
- Desarrollo del backend y estructura de microservicios
- Creación de endpoints de negocio
- Integración completa en docker-compose.yml

---

## 📝 Notas Técnicas

- **Clave secreta JWT**: Compartida entre `ms-auth-server` y `bff`. En producción debe externalizarse a variables de entorno.
- **Contraseñas**: Almacenadas en texto plano para el MVP. En producción debe usarse `BCryptPasswordEncoder`.
- **Base de datos**: Todos los microservicios comparten `vrakben_db`. En producción se recomienda una BD por servicio.

---

## 📁 Documentación

Ver la carpeta [`docs/`](./docs/) para la guía de evaluación del Parcial 2 y el informe del Parcial 1.

---

_Proyecto Semestral — Arquitectura de Software — 2026_
