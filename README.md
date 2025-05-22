# Daly BMS Monitor

Una aplicación web para monitorizar y visualizar datos de un BMS Daly a través de una API REST.

## Características

- Interfaz de usuario sencilla y moderna
- Conexión a API BMS Daly
- Visualización de datos en tiempo real
- Actualización manual y automática
- Vista detallada de voltajes de celdas, temperaturas y estado de protección

## Estructura del proyecto

El proyecto está compuesto por:

1. **Backend API (FastAPI)**: Proporciona endpoints REST para obtener datos del BMS Daly.
2. **Frontend (React + TypeScript + Vite)**: Interfaz de usuario para visualizar los datos.

## Requisitos previos

- Node.js (v14 o superior)
- Python (v3.7 o superior) para el backend (instalado en RaspBerry PI)
- Un BMS Daly conectado al sistema (instalado en RaspBerry PI)

## Instalación

### Backend (API FastAPI)
Ver las instrucciones de instalación en el archivo `API/README.md`
### Frontend (React + TypeScript + Vite)

1. Instala las dependencias:
   ```bash
   npm install
   ```

2. Ejecuta el servidor de desarrollo:
   ```bash
   npm start
   ```

La aplicación se abrirá automáticamente en tu navegador en `http://localhost:3333`

## Uso

1. Inicia el backend (API FastAPI)
2. Inicia el frontend (React)
3. En la aplicación web, introduce la URL de la API (por defecto: `http://localhost:8000`) en general debería ser:

```
http://<IP-RASPBERRY>:8000
```

4. Conéctate y visualiza los datos del BMS

## Personalización

- Puedes modificar los estilos en los archivos CSS


## Despliegue en Raspberry Pi

1. Transfiere los archivos del backend a tu Raspberry Pi
2. Configura un servicio systemd para ejecutar la API automáticamente al inicio
3. Despliega los archivos de producción del frontend en un servidor web (como Nginx)

Para más información ver `API/DEPLOYMENT.md`

## Licencia

MIT
Grid Seed
