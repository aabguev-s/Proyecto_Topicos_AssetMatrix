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
            '/api/stock': {
                get: {
                    summary: 'Tickers Actualmente en Seguimiento',
                    tags: ['Stocks'],
                    responses: {
                        200: { description: 'Se tienen los siguientes tickers de activos bursatiles en seguimiento.' },
                        500: { description: 'No hay tickers en seguimiento.' }
                    }
                }
            },
            '/api/stock/history': {
                get: {
                    summary: 'Análisis de las Tendencias Históricas de un Activo Bursátil',
                    tags: ['Stocks'],
                    responses: {
                        200: { description: 'Tendencias Históricas del Activo Bursátil Encontradas.' },
                        500: { description: 'Error de Conexión con la API Externa.' }
                    }
                }
            },
            '/api/stock/watch': {
                post: {
                    summary: 'Guarda un Activo Bursátil en la Lista de Seguimiento del Usuario',
                    tags: ['Stocks'],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        symbol: { type: 'string', example: 'IBM' }
                                    }
                                }
                            }
                        },
                    },
                    responses: {
                        201: { description: 'Activo Bursátil Guardado.' },
                        400: { description: 'Error de Validación.' }
                    }
                }
            },
            '/api/stock/search/{keyword}': {
                get: {
                    summary: 'Buscar Áctivos Bursátiles que Encajen con la Keyword Definida',
                    tags: ['Stocks'],
                    parameters: [
                        { name: 'keyword', in: 'path', required: true, schema: { type: 'string' } }
                    ],
                    responses: {
                        200: { description: 'Se encontraron los siguientes activos:' },
                        500: { description: 'Error de Conexión con la API Externa.' }
                    }
                }
            },
            '/api/stock/{id}': {
                delete: {
                    summary: 'Elimina un Activo Bursátil de la Lista de Seguimiento del Usuario',
                    tags: ['Stocks'],
                    parameters: [
                        { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
                    ],
                    responses: {
                        200: { description: 'Activo Bursátil Eliminado.' },
                        404: { description: 'No encontrado.' }
                    }
                }
            },
            '/api/stock/{symbol}': {
                get: {
                    summary: 'Consulta el Precio y Volumen real de un los Activos Bursátiles',
                    tags: ['Stocks'],
                    parameters: [
                        { name: 'symbol', in: 'path', required: true, schema: { type: 'string' } }
                    ],
                    responses: {
                        200: { description: 'Arreglo de Activos Encontrado.' },
                        500: { description: 'Error de Conexión con la API Externa.' }
                    }
                }
            },
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