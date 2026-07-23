# PROYECTO DE MODULO DIPLOMADO
 
El siguiente proyecto es un task manager simple, con las funciones: crear tarea, completar tarea, eliminar tarea y editar tarea, este fue puesto en producción en forma de prueba con distintas herramientas (actualmente no se encuentra disponible).
 
[![CI](https://github.com/ReneVicente23/task-manager-react/actions/workflows/ci.yml/badge.svg)](https://github.com/ReneVicente23/task-manager-react/actions/workflows/ci.yml)

## 🚀 Instalación local
 
```bash
git clone https://github.com/ReneVicente23/task-manager-react.git
cd task-manager-react
npm install
cd backend
npm install
```
 
### Variables de entorno
Crea un archivo `.env` en la raíz con las siguientes claves (sin valores reales en este documento), o usa env.example para pruebas locales:
 
```
VITE_API_URL
```

Crea un archivo `backend/.env` con las siguientes claves (sin valores reales en este documento), o usa env.example para pruebas locales:
 
```
DATABASE_URL=
JWT_SECRET=
PORT=
```
 
## 📜 Comandos disponibles
### FRONTEND
 
| Comando          | Descripción                              |
|------------------|-------------------------------------------|
| `npm run dev`    | Levanta el entorno de desarrollo           |
| `npm run build`  | Genera el build de producción              |
| `npm test`       | Corre las pruebas automatizadas (pendiente — Sesión 3) |
| `npx vitest run --coverage --exclude=e2e/**`       | Corre las pruebas vitest |



### BACKEND
 
| Comando          | Descripción                              |
|------------------|-------------------------------------------|
| `npm run dev`    | Levanta el entorno de desarrollo           |
 
## 🗄️ Base de datos
 
PostgreSQL con migraciones y seeds gestionados con Prisma desde /backend (`backend/prisma/schema.prisma`).

| Comando          | Descripción                              |
|------------------|-------------------------------------------|
| `npx prisma migrate deploy`    | Migra la base de datos prisma           |

<!-- Copia estas dos secciones dentro de tu README.md existente -->

## Levantar el proyecto con Docker Compose

Requisitos: Docker Desktop (Windows/Mac) o Docker Engine + plugin de Compose (Linux). Verifica con `docker --version` y `docker compose version`.

```bash
git clone <url-del-repositorio>
cd task-manager-react
cp .env.example .env
docker compose up --build
```

En una terminal nueva, la primera vez que levantas el proyecto, aplica las migraciones de la base de datos:

```bash
docker compose exec backend npx prisma migrate deploy
```

Abre `http://localhost:5173` en tu navegador.

Puertos usados:

| Servicio | Puerto (host) |
|---|---|
| Frontend (nginx) | 5173 |
| Backend (Express) | 3000 |
| PostgreSQL | 5432 |

Si alguno de estos puertos ya está en uso en tu máquina (por ejemplo, otro PostgreSQL local), vas a ver un error `Ports are not available` al hacer `docker compose up`. Detén el servicio que lo esté usando, o cambia el mapeo del puerto en tu copia local de `docker-compose.yml` (por ejemplo `"5433:5432"`).

Los datos de PostgreSQL persisten entre reinicios gracias al volumen `postgres_data` — usa `docker compose down` (sin `-v`) para conservarlos, o `docker compose down -v` para borrarlos.

## Pruebas y cobertura

El proyecto tiene cuatro niveles de pruebas:

- **Unitarias** (`src/utils/validaciones.test.js`): validaciones de correo, título de tarea y conteo de pendientes.
- **Componente** (`src/componentes/FormularioTarea.test.jsx`, React Testing Library): formulario de creación de tareas.
- **API** (`backend/tests/*.test.ts`, Supertest): autenticación (`/login`, `/private`) y CRUD completo de `/tasks`.
- **E2E** (`e2e/flujo-tareas.spec.ts`, Playwright): flujo completo de creación de tareas contra una base de datos real.

Comandos:

```bash
npm run test              # unitarias + componente (raíz)
cd backend && npm run test # API (backend)
npx playwright test        # E2E (requiere backend + Postgres corriendo)
npx vitest run --coverage --exclude=e2e/**  # reporte de cobertura
```

Umbrales mínimos de cobertura (`vite.config.js`): 60% líneas, 60% funciones, 50% branches, 60% statements. Cobertura actual del backend: ~91%.

Estas cuatro suites corren automáticamente en CI (`.github/workflows/ci.yml`) y son checks obligatorios antes de mergear a `main`.
