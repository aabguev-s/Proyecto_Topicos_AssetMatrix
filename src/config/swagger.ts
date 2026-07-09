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
                                    },
                                    example: {
                                        name: 'Bitcoin',
                                        symbol: 'BTC',
                                        price: 65000,
                                        marketCap: 1280000000000
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
                                    }
                                },
                            },
                        },
                    },
                    responses: {
                        200: { description: 'Updated successfully' },
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
                    },
                },
            },
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
            '/api/crypto/{coin}': {
                get: {
                    summary: 'Consulta el Market Cap y Fluctuación de las Últimas 24 Horas de una Criptomoneda',
                    tags: ['Cryptos'],
                    responses: {
                        200: { description: 'Información de la Criptomoneda Encontrada.' },
                        500: { description: 'Error de Conexión con la API Externa.' }
                    }
                }
            },
            'api/crypto/portfolio': {
                post: {
                    summary: 'Registra una Transacción de Compra/Venta de Criptomonedas para el Usuario',
                    tags: ['Cryptos'],
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
            '/api/crypto/analytics': {
                get: {
                    summary: 'Balance Total de la Cartera Histórica de Criptomonedas del Usuario',
                    tags: ['Cryptos'],
                    responses: {
                        200: { description: 'Balance Total de la Cartera Histórica Calculado.'},
                        500: { description: 'Error al Calcular el Balance de la Cartera.'}
                    }
                }   
            },
            '/api/crypto/{tx_id}': {
                delete: {
                    summary: 'Revierte un Registro de Transacción de Criptomonedas en la Cartera del Usuario',
                    tags: ['Cryptos'],
                    responses: {
                        200: { description: 'Transacción de Criptomonedas Revertida en la Cartera del Usuario.' },
                        404: { description: 'Transacción de Criptomonedas no Encontrada en la Cartera del Usuario.' }
                    }
                }
            }

        }
    },
    apis: [], 
};

export const specs = swaggerJsdoc(swaggerOptions);