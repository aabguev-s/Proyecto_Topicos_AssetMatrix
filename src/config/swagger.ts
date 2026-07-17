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
        components: {
            responses: {
                BadRequest: {
                    description: 'Solicitud inválida (400).',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    error: { type: 'string', example: 'Se requiere de un símbolo válido.' }
                                }
                            }
                        }
                    }
                },
                NotFound: {
                    description: 'Recurso no encontrado (404).',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    error: { type: 'string', example: 'No se han encontrado tickers en seguimiento.' }
                                }
                            }
                        }
                    }
                },
                Conflict: {
                    description: 'Conflicto por recurso duplicado (409).',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    error: { type: 'string', example: 'El activo ya se encuentra bajo seguimiento.' }
                                }
                            }
                        }
                    }
                },
                ExternalAPIError: {
                    description: 'Error de conexión o respuesta inválida desde API externa (500).',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    error: { type: 'string', example: 'Alpha Vantage API ha fallado: API call frequency exceeded. Reintente más tarde.' }
                                }
                            }
                        }
                    }
                }
            }
        },
        paths: {
            '/api/stock': {
                get: {
                    summary: 'Tickers Actualmente en Seguimiento',
                    tags: ['Stocks'],
                    responses: {
                        200: { description: 'Se tienen los siguientes tickers de activos bursátiles en seguimiento.' },
                        400: { $ref: '#/components/responses/BadRequest' },
                        404: { $ref: '#/components/responses/NotFound' },
                        500: { $ref: '#/components/responses/ExternalAPIError' }
                    }
                }
            },
            '/api/stock/history': {
                get: {
                    summary: 'Análisis de las Tendencias Históricas de un Activo Bursátil',
                    tags: ['Stocks'],
                    responses: {
                        200: { description: 'Tendencias Históricas del Activo Bursátil Encontradas.' },
                        400: { $ref: '#/components/responses/BadRequest' },
                        404: { $ref: '#/components/responses/NotFound' },
                        500: { $ref: '#/components/responses/ExternalAPIError' }
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
                        400: { $ref: '#/components/responses/BadRequest' },
                        409: { $ref: '#/components/responses/Conflict' },
                        500: { $ref: '#/components/responses/ExternalAPIError' }
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
                        400: { $ref: '#/components/responses/BadRequest' },
                        404: { $ref: '#/components/responses/NotFound' },
                        500: { $ref: '#/components/responses/ExternalAPIError' }
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
                        400: { $ref: '#/components/responses/BadRequest' },
                        404: { $ref: '#/components/responses/NotFound' }
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
                        400: { $ref: '#/components/responses/BadRequest' },
                        404: { $ref: '#/components/responses/NotFound' },
                        500: { $ref: '#/components/responses/ExternalAPIError' }
                    }
                }
            },
            '/api/crypto': {
                get: {
                  summary: 'Retorna la lista completa de cryptomonedas registradas en la cartera',
                  tags: ['Cryptos'],
                  responses: {
                    200: { description: 'Success' },
                    400: { $ref: '#/components/responses/BadRequest' },
                    404: { $ref: '#/components/responses/NotFound' }
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
                    400: { $ref: '#/components/responses/BadRequest' },
                    409: { $ref: '#/components/responses/Conflict' },
                    500: { $ref: '#/components/responses/ExternalAPIError' }
                  },
                },
      },
      '/api/crypto/analytics': {
        get: {
          summary: 'Retorna el balance total histórico de la cartera',
          tags: ['Cryptos'],
          responses: {
            200: { description: 'Success' },
            400: { $ref: '#/components/responses/BadRequest' },
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
            400: { $ref: '#/components/responses/BadRequest' },
            404: { $ref: '#/components/responses/NotFound' },
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
                400: { $ref: '#/components/responses/BadRequest' },
                404: { $ref: '#/components/responses/NotFound' },
                500: { $ref: '#/components/responses/ExternalAPIError' }
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
                400: { $ref: '#/components/responses/BadRequest' },
                404: { $ref: '#/components/responses/NotFound' },
              },
            },
            },
        }
    },
    apis: ['./src/routes/*.ts', './dist/src/routes/*.js'],
};

export const specs = swaggerJsdoc(swaggerOptions);