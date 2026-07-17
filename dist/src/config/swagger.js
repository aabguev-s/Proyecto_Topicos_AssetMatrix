"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.specs = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'AssetMatrix - Financial Intelligence API',
            version: '1.0.0',
            description: 'API REST para monitoreo de activos bursátiles y criptográficos con arquitectura por capas.',
        },
        tags: [
            { name: 'Stocks', description: 'Mercados bursátiles (Alpha Vantage + MongoDB)' },
            { name: 'Cryptos', description: 'Activos criptográficos' },
        ],
        servers: [{ url: 'http://localhost:3000' }],
        components: {
            responses: {
                BadRequest: {
                    description: 'Solicitud inválida (400).',
                    content: {
                        'application/json': {
                            schema: { type: 'object', properties: { error: { type: 'string' } } },
                            example: { error: 'Parámetros inválidos.' },
                        },
                    },
                },
                NotFound: {
                    description: 'Recurso no encontrado (404).',
                    content: {
                        'application/json': {
                            schema: { type: 'object', properties: { error: { type: 'string' } } },
                            example: { error: 'Recurso no encontrado.' },
                        },
                    },
                },
                Conflict: {
                    description: 'Conflicto por recurso duplicado (409).',
                    content: {
                        'application/json': {
                            schema: { type: 'object', properties: { error: { type: 'string' } } },
                            example: { error: 'Recurso duplicado.' },
                        },
                    },
                },
                ExternalAPIError: {
                    description: 'Error de conexión o respuesta inválida desde API externa (500).',
                    content: {
                        'application/json': {
                            schema: { type: 'object', properties: { error: { type: 'string' } } },
                            example: { error: 'Proveedor externo ha fallado: límite de peticiones alcanzado.' },
                        },
                    },
                },
            },
        },
        paths: {
            '/api/stock': {
                get: {
                    summary: 'Tickers Actualmente en Seguimiento',
                    tags: ['Stocks'],
                    responses: {
                        200: {
                            description: 'Lista de tickers en seguimiento.',
                            content: { 'application/json': { example: [{ symbol: 'AAPL', name: 'Apple Inc.' }] } },
                        },
                        404: {
                            description: 'No hay tickers en seguimiento.',
                            content: { 'application/json': { example: { error: 'No hay tickers en seguimiento.' } } },
                        },
                    },
                },
            },
            '/api/stock/history': {
                get: {
                    summary: 'Análisis de las Tendencias Históricas de los Activos en Seguimiento',
                    tags: ['Stocks'],
                    responses: {
                        200: { description: 'Tendencias históricas encontradas.', content: { 'application/json': { example: [{ symbol: 'IBM', trends: {} }] } } },
                        404: { description: 'No se encontraron tickers en seguimiento.', content: { 'application/json': { example: { error: 'No se han encontrado tickers en seguimiento.' } } } },
                        500: { $ref: '#/components/responses/ExternalAPIError' },
                    },
                },
            },
            '/api/stock/watch': {
                post: {
                    summary: 'Guarda un Activo Bursátil en la Lista de Seguimiento del Usuario',
                    tags: ['Stocks'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: { type: 'object', properties: { symbol: { type: 'string' } } },
                                example: { symbol: 'IBM' },
                            },
                        },
                    },
                    responses: {
                        201: { description: 'Activo Bursátil Guardado.', content: { 'application/json': { example: { success: true, message: 'Se ha comenzado a seguir el activo: IBM' } } } },
                        400: { $ref: '#/components/responses/BadRequest' },
                        404: { description: 'Activo no encontrado en AlphaVantage.', content: { 'application/json': { example: { error: 'No se han encontrado activos bursátiles con el simbolo IBM.' } } } },
                        409: { $ref: '#/components/responses/Conflict' },
                        500: { $ref: '#/components/responses/ExternalAPIError' },
                    },
                },
            },
            '/api/stock/search/{keyword}': {
                get: {
                    summary: 'Buscar Activos Bursátiles por keyword',
                    tags: ['Stocks'],
                    parameters: [{ name: 'keyword', in: 'path', required: true, schema: { type: 'string' } }],
                    responses: {
                        200: { description: 'Resultados de búsqueda.', content: { 'application/json': { example: [{ symbol: 'MSFT', name: 'Microsoft' }] } } },
                        400: { $ref: '#/components/responses/BadRequest' },
                        404: { $ref: '#/components/responses/NotFound' },
                        500: { $ref: '#/components/responses/ExternalAPIError' },
                    },
                },
            },
            '/api/stock/{id}': {
                delete: {
                    summary: 'Elimina un Activo Bursátil de la Lista de Seguimiento',
                    tags: ['Stocks'],
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
                    responses: {
                        204: { description: 'Eliminado correctamente (No Content).' },
                        400: { $ref: '#/components/responses/BadRequest' },
                        404: { $ref: '#/components/responses/NotFound' },
                    },
                },
            },
            '/api/stock/{symbol}': {
                get: {
                    summary: 'Consulta el Precio y Volumen real de un Activo Bursátil',
                    tags: ['Stocks'],
                    parameters: [{ name: 'symbol', in: 'path', required: true, schema: { type: 'string' } }],
                    responses: {
                        200: { description: 'Datos del ticker.', content: { 'application/json': { example: { symbol: 'MSFT', price: 420.5, volume: 12345678 } } } },
                        400: { $ref: '#/components/responses/BadRequest' },
                        404: { $ref: '#/components/responses/NotFound' },
                        500: { $ref: '#/components/responses/ExternalAPIError' },
                    },
                },
            },
            // Cryptos
            '/api/crypto': {
                get: {
                    summary: 'Retorna la lista completa de criptomonedas registradas en la cartera',
                    tags: ['Cryptos'],
                    responses: {
                        200: { description: 'Lista de criptomonedas.', content: { 'application/json': { example: [{ id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' }] } } },
                        404: { description: 'No hay criptomonedas registradas.', content: { 'application/json': { example: { error: 'No hay criptomonedas registradas.' } } } },
                    },
                },
            },
            '/api/crypto/portfolio': {
                post: {
                    summary: 'Crea un nuevo registro de transacción para una criptomoneda específica',
                    tags: ['Cryptos'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['id', 'transaction'],
                                    properties: {
                                        id: { type: 'string' },
                                        transaction: { type: 'object' },
                                    },
                                },
                                example: { id: 'bitcoin', transaction: { current_price: 62599, total_volume: 25762387797, data_from: '2024-01-01T00:00:00Z' } },
                            },
                        },
                    },
                    responses: {
                        201: { description: 'Transacción creada correctamente.', content: { 'application/json': { example: { id: 'bitcoin', transactionId: 'tx_123', current_price: 62599 } } } },
                        400: { $ref: '#/components/responses/BadRequest' },
                        404: { description: 'Moneda no encontrada en CoinGecko.', content: { 'application/json': { example: { error: 'No se pudo obtener información de la criptomoneda con ID: bitcoin' } } } },
                        500: { $ref: '#/components/responses/ExternalAPIError' },
                    },
                },
            },
            '/api/crypto/analytics': {
                get: {
                    summary: 'Retorna el balance total histórico de la cartera',
                    tags: ['Cryptos'],
                    responses: {
                        200: { description: 'Balance histórico de cartera.', content: { 'application/json': { example: { totalTransactionsProcessed: 10, portfolioHistoricalBalance: {} } } } },
                        404: { description: 'No hay registros en la base de datos.', content: { 'application/json': { example: { error: 'No hay registros en la base de datos.' } } } },
                    },
                },
            },
            '/api/crypto/{coin}': {
                get: {
                    summary: 'Retorna las transacciones históricas de una criptomoneda específica',
                    tags: ['Cryptos'],
                    parameters: [{ name: 'coin', in: 'path', required: true, schema: { type: 'string' } }],
                    responses: {
                        200: { description: 'Historial de la moneda.', content: { 'application/json': { example: { id: 'bitcoin', transactions: [{ current_price: 62599 }] } } } },
                        400: { $ref: '#/components/responses/BadRequest' },
                        404: { description: 'Cryptocurrency asset not found', content: { 'application/json': { example: { error: 'Cryptocurrency asset not found' } } } },
                    },
                },
            },
            '/api/crypto/market/{coin}': {
                get: {
                    summary: 'Retorna el market cap y la fluctuación de un criptoactivo específico',
                    tags: ['Cryptos'],
                    parameters: [{ name: 'coin', in: 'path', required: true, schema: { type: 'string' } }],
                    responses: {
                        200: { description: 'Market data del criptoactivo.', content: { 'application/json': { example: { id: 'bitcoin', market_cap: 1000000000 } } } },
                        400: { $ref: '#/components/responses/BadRequest' },
                        404: { $ref: '#/components/responses/NotFound' },
                        500: { $ref: '#/components/responses/ExternalAPIError' },
                    },
                },
            },
            '/api/crypto/{tx_id}': {
                delete: {
                    summary: 'Elimina un registro de transacción de la cartera',
                    tags: ['Cryptos'],
                    parameters: [{ name: 'tx_id', in: 'path', required: true, schema: { type: 'string' } }],
                    responses: {
                        204: { description: 'No content' },
                        400: { $ref: '#/components/responses/BadRequest' },
                        404: { $ref: '#/components/responses/NotFound' },
                    },
                },
            },
        },
    },
    apis: ['./src/routes/*.ts', './dist/src/routes/*.js'],
};
exports.specs = (0, swagger_jsdoc_1.default)(swaggerOptions);
//# sourceMappingURL=swagger.js.map