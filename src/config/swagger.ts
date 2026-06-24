import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Documentación de la API',
            version: '1.0.0',
            description: 'API construida en ExpressJS con arquitectura separada por capas ejecutándose en Docker.',
        },
        servers: [{ url: 'http://localhost:3000' }],
        paths: {
            '/api/cryptos': { //Ruta de prueba para la conexión con MongoDB y la gestión de criptomonedas
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
      '/api/cryptos/{id}': {    //Ruta de prueba para la conexión con MongoDB y la gestión de criptomonedas
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
            '/stocks': {
                '/:symbol':{
                    get: {
                        summary: 'Consulta el Precio y Volumen real de un los Activos Bursátiles',
                        responses: {
                            200: { description: 'Arreglo de Activos Encontrado.' },
                            500: { description: 'Error de Conexión con la API Externa.' }
                        }
                    }
                },
                '/watch':{
                    post: {
                        summary: 'Guarda un Activo Bursátil en la Lista de Seguimiento del Usuario',
                        requestBody: {
                            required: true,
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        required: [],
                                        properties: {
                                        }
                                    }
                                }
                            }
                        },
                        responses: {
                            201: { description: 'Activo Bursátil Guardado en la Lista de Seguimiento.' },
                            400: { description: 'Error de Validación del Activo.' }
                        }
                    }
                },
                '/history':{
                    get: {
                        summary: 'Análisis de las Tendencias Históricas de un Activo Bursátil',
                        responses: {
                            200: { description: 'Tendencias Históricas del Activo Bursátil Encontradas.' },
                            500: { description: 'Error de Conexión con la API Externa.' }
                        }
                    }
                },
                '/:id':{
                    delete: {
                        summary: 'Elimina un Activo Bursátil de la Lista de Seguimiento del Usuario',
                        responses: {
                            200: { description: 'Activo Bursátil Eliminado de la Lista de Seguimiento.' },
                            404: { description: 'Activo Bursátil no Encontrado en la Lista de Seguimiento.' }
                        }
                    }
                }
            },
            '/crypto':{
                '/:coin':{
                    get: {
                        summary: 'Consulta el Market Cap y Fluctuación de las Últimas 24 Horas de una Criptomoneda',
                        responses: {
                            200: { description: 'Información de la Criptomoneda Encontrada.' },
                            500: { description: 'Error de Conexión con la API Externa.' }
                        }
                    }
                },
                '/portfolio':{
                    post: {
                        summary: 'Registra una Transacción de Compra/Venta de Criptomonedas para el Usuario',
                        requestBody: {
                            required: true,
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        required: [],
                                        properties: {

                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                '/analytics': {
                    get: {
                        summary: 'Balance Total de la Cartera Histórica de Criptomonedas del Usuario',
                        responses: {
                            200: { description: 'Balance Total de la Cartera Histórica Calculado.'},
                            500: { description: 'Error al Calcular el Balance de la Cartera.'}
                        }
                    }
                },
                '/:tx_id': {
                    delete: {
                        summary: 'Revierte un Registro de Transacción de Criptomonedas en la Cartera del Usuario',
                        responses: {
                            200: { description: 'Transacción de Criptomonedas Revertida en la Cartera del Usuario.' },
                            404: { description: 'Transacción de Criptomonedas no Encontrada en la Cartera del Usuario.' }
                        }
                    }
                }
            }
        }
    },
    apis: ['./src/routes/*.ts', './dist/src/routes/*.js'],
};

export const specs = swaggerJsdoc(swaggerOptions);