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
        paths: {
            '/api/cryptos': {
                get: {
                    summary: 'Retrieve complete list of tracked cryptos',
                    tags: ['Cryptos'],
                    responses: {
                        200: { description: 'Success' },
                    },
                },
                post: {
                    summary: 'Create a new cryptocurrency token entry',
                    tags: ['Cryptos'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['name', 'symbol', 'price'],
                                    properties: {
                                        name: { type: 'string' },
                                        symbol: { type: 'string' },
                                        price: { type: 'number' },
                                        marketCap: { type: 'number' },
                                        createdAt: { type: 'string', format: 'date-time', readOnly: true },
                                        updatedAt: { type: 'string', format: 'date-time', readOnly: true }
                                    },
                                    example: {
                                        name: 'Bitcoin',
                                        symbol: 'BTC',
                                        price: 65000,
                                        marketCap: 1280000000000,
                                        createdAt: '2024-01-01T00:00:00Z',
                                        updatedAt: '2024-01-01T00:00:00Z'
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        201: { description: 'Created successfully' },
                        400: { description: 'Validation failure' },
                    },
                },
            },
            '/api/cryptos/{id}': {
                get: {
                    summary: 'Get a single asset metrics profile',
                    tags: ['Cryptos'],
                    parameters: [
                        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
                    ],
                    responses: {
                        200: { description: 'Success' },
                        404: { description: 'Asset not found' },
                    },
                },
                put: {
                    summary: 'Update profile traits data for a matching resource ID',
                    tags: ['Cryptos'],
                    parameters: [
                        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        name: { type: 'string' },
                                        symbol: { type: 'string' },
                                        price: { type: 'number' },
                                        marketCap: { type: 'number' },
                                    },
                                    example: {
                                        price: 67500.50
                                    }
                                },
                            },
                        },
                    },
                    responses: {
                        200: { description: 'Updated successfully' },
                        404: { description: 'Target does not exist' },
                    },
                },
                delete: {
                    summary: 'Purge a crypto record from the store',
                    tags: ['Cryptos'],
                    parameters: [
                        { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
                    ],
                    responses: {
                        204: { description: 'No content' },
                        404: { description: 'Target does not exist' },
                    },
                },
            },
        }
    },
    apis: ['./src/routes/*.ts', './dist/src/routes/*.js'],
};
exports.specs = (0, swagger_jsdoc_1.default)(swaggerOptions);
//# sourceMappingURL=swagger.js.map