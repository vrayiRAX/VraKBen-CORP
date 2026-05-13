# VraKBen-CORP 🔧

Sistema de gestión integral para taller mecánico, implementado con Spring Boot y arquitectura orientada a microservicios en Docker.

## 🏗️ Arquitectura

```
Frontend React (Vite :5173)
        ↓
API Gateway / BFF (:8080)  ← Punto único de entrada + Validación JWT
        ↓
Microservicios Spring Boot (registrados en Eureka :8761)
        ↓
PostgreSQL 15 (:5432)
```

## 🚀 Cómo Levantar el Proyecto

### Requisitos
- Docker Desktop
- Node.js 18+
- Git

### Backend (Docker)
```bash
# Clonar el repositorio
git clone https://github.com/vrayiRAX/VraKBen-CORP.git
cd VraKBen-CORP

# Levantar todo el stack de backend
docker-compose up --build -d
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### URLs
| Servicio | URL |
|---|---|
| App Web | http://localhost:5173 |
| API Gateway | http://localhost:8080 |
| Eureka Dashboard | http://localhost:8761 |

## 📦 Microservicios

| Servicio | Puerto | Descripción |
|---|---|---|
| `bff` (API Gateway) | 8080 | Punto de entrada único, enrutamiento y validación JWT |
| `eureka-server` | 8761 | Service Discovery |
| `ms-auth-server` | 8083 | Autenticación, usuarios y roles (JWT) |
| `ms-catalog` | 8084 | Catálogo de repuestos |
| `ms-shopping-cart` | — | Carrito de compras |
| `ms-stock-engine` | — | Motor de inventario físico |
| `ms-supplier-procurement` | 8088 | Solicitudes de material (mecánicos → proveedor) |
| `ms-job-orders` | — | Órdenes de trabajo de mecánicos |
| `ms-appointment-scheduler` | — | Agendamiento de citas |
| `ms-vehicle-history` | — | Historial de vehículos |
| `ms-order-management` | — | Gestión de órdenes/ventas |

## 👥 Roles de Usuario

| Rol | Descripción | Acceso |
|---|---|---|
| `CLIENTE` | Cliente del taller | Tienda, carrito, agendar, perfil |
| `MECANICO` | Mecánico del taller | Panel de trabajo, inventario, solicitudes |
| `ADMIN` | Administrador | Todo lo anterior + métricas, gestión usuarios/inventario |

## 🔐 Autenticación

Basada en **JWT (JSON Web Tokens)**. El flujo es:
1. `POST /api/auth/login` → recibe `{username, password}` → retorna `{token, username, roles, name}`
2. El frontend almacena el token en `localStorage`
3. Todas las peticiones protegidas incluyen el header `Authorization: Bearer {token}`
4. El API Gateway valida el token antes de enrutar al microservicio destino

## 🛠️ Comandos Docker Útiles

```bash
# Ver estado de los contenedores
docker-compose ps

# Ver logs de un servicio
docker-compose logs -f api-gateway

# Reconstruir un servicio específico
docker-compose build auth-server && docker-compose up -d auth-server

# Parar todo
docker-compose down

# Parar y borrar datos (⚠️ borra la BD)
docker-compose down -v
```

## 📋 Tecnologías

**Backend:** Java 17, Spring Boot 3.x/4.x, Spring Cloud Gateway, Spring Security, JPA/Hibernate, PostgreSQL, Eureka (Netflix OSS), JWT (jjwt 0.11.5), Docker, Maven

**Frontend:** React 18, Vite, React Router v6, Axios, Recharts, Lucide React, CSS Puro

## 🌿 Ramas

- `main` — Código estable
- `feature/frontend-improvements` — Mejoras activas de UI e integración

## 👨‍💻 Equipo

Proyecto desarrollado por el equipo VraKBen como sistema de gestión para taller mecánico chileno.
