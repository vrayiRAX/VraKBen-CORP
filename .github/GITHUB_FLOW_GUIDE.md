# Guía Práctica de GitHub Flow para VraKBen-CORP 🚀

¡Hola! Esta guía está hecha especialmente para ti. Aquí aprenderás cómo usar **GitHub Flow**, que es la forma más moderna y sencilla de trabajar con Git sin hacerte un lío con las ramas. 

A diferencia de *Git Flow* (que es más complejo y antiguo), *GitHub Flow* es perfecto para desarrollo ágil, integración continua y despliegues rápidos.

---

## ¿Qué es GitHub Flow?

Es un flujo de trabajo ligero basado en ramas. La regla de oro es muy simple:

> [!IMPORTANT]
> **La rama `main` SIEMPRE debe estar lista para ser desplegada a producción.**
> 
> Nunca, jamás, bajo ninguna circunstancia, escribas código directamente en la rama `main`.

---

## El Ciclo de Vida (Paso a Paso)

Todo el trabajo en GitHub Flow sigue estos 6 pasos exactos:

### 1. Crea una rama desde `main`
Antes de escribir una sola línea de código, crea una rama. El nombre debe ser descriptivo de lo que vas a hacer.

```bash
# Asegúrate de estar en main y tener la última versión
git checkout main
git pull origin main

# Crea tu nueva rama y muévete a ella
git checkout -b feature/agregar-carrito-compras
```

**Buenas prácticas para nombres de ramas:**
- `feature/nueva-funcionalidad` (para cosas nuevas)
- `bugfix/reparar-login` (para arreglar errores)
- `docs/actualizar-readme` (para documentación)

### 2. Haz tus cambios (Commits)
Trabaja en tu código normalmente. Haz commits pequeños y descriptivos. ¡No esperes a terminar todo para hacer un commit gigante!

```bash
# Ver qué archivos cambiaste
git status

# Agregar los archivos que quieres guardar
git add .

# Hacer el commit con un buen mensaje
git commit -m "feat: crear controlador para ms-shopping-cart"
```

### 3. Sube tus cambios a GitHub (Push)
Sube tu rama al repositorio remoto para que no se pierda en tu computadora local y para que otros puedan verla.

```bash
git push -u origin feature/agregar-carrito-compras
```

### 4. Abre un Pull Request (PR)
Ve a GitHub.com y verás un botón verde que dice **"Compare & pull request"**. 

Un Pull Request es literalmente "pedir permiso" para que tu código se fusione con la rama `main`. Aquí es donde debes explicar:
- ¿Qué problema resuelve este código?
- ¿Cómo se puede probar?
- ¿Qué microservicios se ven afectados?

### 5. Revisión y Aprobación
Pide a alguien de tu equipo que revise tu código (Code Review).
- Si encuentran algo que mejorar, te dejarán comentarios.
- Haces los cambios en tu compu, haces un nuevo `git commit` y un `git push`.
- ¡El PR se actualiza automáticamente!

> [!TIP]
> Incluso si trabajas solo, hacer Pull Requests es una excelente práctica. Te obliga a revisar tu propio código antes de fusionarlo.

### 6. Fusionar a `main` (Merge)
Una vez que el PR está aprobado y las pruebas automáticas (si las hay) pasan en verde, haces clic en el botón **"Merge pull request"** en GitHub.

¡Felicidades! Tu código ahora forma parte oficial del proyecto.

> [!NOTE]
> Después de hacer el merge, es seguro **eliminar tu rama** `feature/...`. Ya no la necesitas porque tu código ya vive en `main`.

---

## 🛠️ Ejemplo Práctico en VraKBen-CORP

Imagina que necesitas arreglar el bug que encontramos hoy con la ruta del gateway para el carrito:

1. **Creas la rama:**
   `git checkout -b bugfix/rutas-gateway`
   
2. **Haces el arreglo:**
   Editas `application.yml` en el BFF.
   
3. **Guardas el cambio:**
   `git add bff/src/main/resources/application.yml`
   `git commit -m "fix: corregir ruta de gateway para ms-job-orders"`
   
4. **Lo subes:**
   `git push -u origin bugfix/rutas-gateway`
   
5. **Vas a GitHub y abres el PR.**
6. **Revisas que los cambios estén bien en la web.**
7. **Le das a "Merge".**
8. **Vuelves a tu consola y limpias:**
   `git checkout main`
   `git pull origin main` (¡para bajar tu nuevo arreglo!)

¡Eso es todo! Con este flujo nunca romperás el código principal de tus compañeros y siempre sabrás exactamente qué cambios se introdujeron y por qué.
