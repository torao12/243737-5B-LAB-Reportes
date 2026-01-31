# 📊 Dashboard de Reportes E-commerce - Tarea 6

[cite_start]Este proyecto es una aplicación web analítica construida con **Next.js 15** y **PostgreSQL**, diseñada para visualizar reportes complejos mediante el consumo de **Vistas (VIEWS)**. [cite_start]La solución está completamente contenedorizada con **Docker Compose** para garantizar un despliegue reproducible con un solo comando[cite: 4, 14, 77].

## Ejecución con un solo comando
Para levantar la base de datos (esquema, datos y vistas) y la aplicación frontend:
```bash
docker compose up --build

## Abrir la app en el puerto local

http://localhost:3000/