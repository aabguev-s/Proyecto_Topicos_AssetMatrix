# AssetMatrix API

AssetMatrix es una API REST desarrollada en Node.js (Express) y TypeScript pensada para ser ejecutada en Docker, para consultar y monitorear activos financieros, combinando información de criptomonedas y acciones. El proyecto está pensado con una arquitectura por capas que separa rutas, controladores, servicios, repositorios, modelos y clientes externos.

## 0. Desarrolladores

- Aarón Bastardo (aabguev-s)
- María Hohn (cecihohn)
- Diego Prieto (diegoprietoucab)

## 1. Características principales

- Gestión de cartera de criptomonedas con registro de transacciones.
- Consulta de información actual y de mercado para criptomonedas mediante CoinGecko.
- Seguimiento de tickers bursátiles con búsqueda, registro y análisis histórico.
- Integración con Alpha Vantage para series históricas, indicadores técnicos y búsqueda de símbolos.
- Documentación automática con Swagger en /api-docs.
- Persistencia de datos en MongoDB.

## 2. Tecnologías utilizadas

- Node.js
- TypeScript
- Express
- Mongoose
- Zod
- Swagger
- MongoDB
- CoinGecko API
- Alpha Vantage API

## 3. Estructura del proyecto

- src/app.ts: configuración principal de la aplicación Express.
- server.ts: punto de entrada que inicializa el servidor y conecta a MongoDB.
- src/routes/: define los endpoints expuestos por la API.
- src/controllers/: maneja las solicitudes HTTP y devuelve respuestas.
- src/services/: lógica de negocio del sistema.
- src/repositories/: acceso y persistencia de datos en MongoDB.
- src/models/: esquemas y tipos de datos del dominio.
- src/clients/: clientes para consumir APIs externas.
- src/config/: configuración de base de datos y documentación Swagger.
- src/schemas/: validaciones con Zod.
- src/utils/: funciones de validación y transformació de uso general.

## 4. Requisitos previos

- Node.js 20 o superior
- MongoDB en ejecución (contenerización de docker)
- API Key de Alpha Vantage
- API Key de CoinGecko

## 5. Instalación

```bash
docker compose build
```

Alternativamente
```bash
npm install
```

## 6. Ejecución

```bash
docker compose up
```

Alternativamente
```bash
npm run dev
```

El servidor quedará disponible por defecto en:

- http://localhost:3000
- Documentación Swagger: http://localhost:3000/api-docs

## 7. Variables de entorno (.env)

Crear un archivo .env en la raíz del proyecto con las siguientes variables:

```env
PORT=3000 (o el puerto en el que se desee correr el programa)
MONGO_URI=mongodb://localhost:27017/crypto_db
ALPHAVANTAGE_API_KEY=tu_api_key_de_alpha_vantage
COINGECKO_API_KEY=tu_api_key_de_coingecko
```

### Descripción de cada variable

- PORT: puerto en el que correrá la API. Por defecto es 3000 si no se define.
- MONGO_URI: cadena de conexión a MongoDB. Si no se establece, el sistema intentará usar mongodb://localhost:27017/crypto_db.
- ALPHAVANTAGE_API_KEY: clave para consumir los servicios de Alpha Vantage, usada para datos bursátiles y análisis técnicos.
- COINGECKO_API_KEY: clave opcional para consumir CoinGecko con mayor disponibilidad o límites de uso.

## 8. Endpoints de la API

La API expone dos grupos principales de rutas:

### 8.1 Endpoints de criptomonedas

Base: /api/crypto

| Método | Endpoint | Descripción |
| --- | --- | --- |
| GET | /api/crypto | Obtiene todas las criptomonedas registradas en la cartera. |
| POST | /api/crypto/portfolio | Registra una transacción o agrega una criptomoneda a la cartera. |
| GET | /api/crypto/analytics | Devuelve métricas históricas del balance de la cartera. |
| GET | /api/crypto/:coin | Obtiene el historial de transacciones de una criptomoneda específica. |
| DELETE | /api/crypto/:tx_id | Elimina una transacción de la cartera. |
| GET | /api/crypto/market/:coin | Obtiene datos de mercado recientes de una criptomoneda. |

### 8.2 Endpoints de acciones y tickers bursátiles

Base: /api/stock

| Método | Endpoint | Descripción |
| --- | --- | --- |
| GET | /api/stock | Obtiene los tickers actualmente registrados en seguimiento. |
| GET | /api/stock/history | Devuelve tendencias e indicadores técnicos de los tickers en seguimiento. |
| POST | /api/stock/watch | Agrega un ticker a la lista de seguimiento. |
| GET | /api/stock/search/:keyword | Busca activos bursátiles por palabra clave. |
| DELETE | /api/stock/:id | Elimina un ticker del seguimiento por su ID. |
| GET | /api/stock/:symbol | Obtiene datos actuales de un activo bursátil. |

## 9. Arquitectura del proyecto

El proyecto sigue un patrón de arquitectura por capas:

1. Capa de rutas
   - Define los endpoints HTTP.
   - Se encarga de recibir solicitudes y delegar al controlador correspondiente.

2. Capa de controladores
   - Recibe los parámetros y cuerpo de la petición.
   - Llama al servicio y formatea la respuesta.

3. Capa de servicios
   - Implementa la lógica de negocio.
   - Coordina la interacción entre repositorios y clientes externos.

4. Capa de repositorios
   - Encapsula el acceso a MongoDB.
   - Gestiona operaciones como crear, consultar, actualizar y eliminar registros.

5. Capa de clientes externos
   - Consume APIs de terceros como CoinGecko y Alpha Vantage.
   - Normaliza y valida la información recibida.

6. Capa de modelos y validaciones
   - Define las estructuras de datos y aplica validaciones con Zod.

## 10. Notas importantes

- El proyecto incluye Swagger en /api-docs para explorar los endpoints de forma interactiva.
- Si no se define MONGO_URI, la aplicación intentará conectarse a MongoDB local.
- El uso de API keys externas es necesario para obtener datos actualizados de mercado.
- La API key básica de AlphaVantage ofrece un límite de solicitudes reducido por día. Ciertas funciones como /history se pueden ver afectadas por los límites diarios
- Se establece un timeout posterior a cada consulta de la API debido a las limitaciones de las API key estándar utilizadas para crear el proyecto.
