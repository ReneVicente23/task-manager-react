# PROYECTO DE MODULO DIPLOMADO
 
El siguiente proyecto es un task manager simple, con las funciones: crear tarea, completar tarea, eliminar tarea y editar tarea, este fue puesto en producción en forma de prueba con distintas herramientas (actualmente no se encuentra disponible).
 
<!-- BADGE_CI -->

<!-- END_BADGE_CI -->
 
## 🚀 Instalación local
 
```bash
git clone https://github.com/ReneVicente23/task-manager-react.git
cd backend
npm install
```
 
### Variables de entorno
Crea un archivo `.env` en la raíz con las siguientes claves (sin valores reales en este documento):
 
```
DATABASE_URL= postgresql://task-manager
JWT_SECRET= SECRET
PORT= 3000
```
 
## 📜 Comandos disponibles
 
| Comando          | Descripción                              |
|------------------|-------------------------------------------|
| `npm run dev`    | Levanta el entorno de desarrollo           |
| `npm run build`  | Genera el build de producción              |
| `npm test`       | Corre las pruebas automatizadas (pendiente — Sesión 3) |
 
## 🗄️ Base de datos
 
PostgreSQL con migraciones y seeds gestionados con Prisma (ver Módulo 2).
# prueba de protección
