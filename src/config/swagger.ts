//config/swagger.ts

import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJsdoc.Options = {
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
            '/api/crypto': {
                get: {
                  summary: 'Retorna la lista completa de cryptomonedas registradas en la cartera',
                  tags: ['Cryptos'],
                  responses: {
                    200: { description: 'Success' },
                  },
                },
              },
              '/api/crypto/portfolio': {
                post: {
                  summary: 'Crea un nuevo registro de transacción para una criptomoneda específica. Agrega la criptomoneda a la cartera si no existe previamente.',
                  tags: ['Cryptos'],
                  requestBody: {
                    required: true,
                    content: {
                      'application/json': {
                        schema: {
                          type: 'object',
                          required: ['id', 'transaction'],
                          properties: {
                            id: { type: 'string', example: 'bitcoin' },
                            transaction: {
                              type: 'object',
                              items: {
                                type: 'object',
                                properties: {
                                  current_price: { type: 'number', example: 62599 },
                                  total_volume: { type: 'number', example: 25762387797 },
                                  data_from: { type: 'string', example: '2024-01-01T00:00:00Z' }
                                }
                              }
                            }
                          },
                          example: {
                            id: 'bitcoin',
                            transaction:
                              {
                                current_price: 62599,
                                total_volume: 25762387797,
                                data_from: '2024-01-01T00:00:00Z'
                              }
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
      '/api/crypto/analytics': {
        get: {
          summary: 'Retorna el balance total histórico de la cartera',
          tags: ['Cryptos'],
          responses: {
            200: { description: 'Success' },
            500: { description: 'Internal Server Error' },
          },
        }
      },
      '/api/crypto/{coin}': {
        get: {
          summary: 'Retorna las transacciones históricas de una criptomoneda específica',
          tags: ['Cryptos'],
          parameters: [
            { name: 'coin', in: 'path', required: true, schema: { type: 'string' } },
          ],
          responses: {
            200: { description: 'Success' },
            404: { description: 'Asset not found' },
          },
        }
      },
      '/api/crypto/market/{coin}': { 
            get: {
              summary: 'Retorna el market cap y la fluctuación de un criptoactivo específico en las últimas 24 horas',
              tags: ['Cryptos'],
              parameters: [
                { name: 'coin', in: 'path', required: true, schema: { type: 'string' } },
              ],
              responses: {
                200: { description: 'Success' },
                404: { description: 'Asset not found' },
              },
            },
          },
          '/api/crypto/{tx_id}': {
            delete: {
              summary: 'Elimina un registro de transacción de la cartera',
              tags: ['Cryptos'],
              parameters: [
                { name: 'tx_id', in: 'path', required: true, schema: { type: 'string' } },
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

export const specs = swaggerJsdoc(swaggerOptions);