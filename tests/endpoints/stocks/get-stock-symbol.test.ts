import request from 'supertest';
import { testApp } from '../../setup/app';

describe('GET /api/stocks/:symbol', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it('éxito: responde 200 cuando el símbolo es válido', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: async () => ({
        'Global Quote': {
          '01. symbol': 'MSFT',
          '05. price': '420.50',
          '06. volume': '12345678',
          '07. latest trading day': '2024-06-20',
          '09. change': '2.35',
          '10. change percent': '0.56%',
        },
      }),
    }) as jest.Mock;

    const response = await request(testApp).get('/api/stocks/MSFT');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        symbol: 'MSFT',
        price: 420.5,
        volume: 12345678,
        change: 2.35,
        changePercent: '0.56%',
        latestTradingDay: '2024-06-20',
      })
    );
  });

  it('error: responde 404 cuando el símbolo no existe', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({}),
    }) as jest.Mock;

    const response = await request(testApp).get('/api/stocks/ZZZZ');

    expect(response.status).toBe(404);
    expect(response.body.error).toMatch(/not found/i);
  });

  it('error: responde 500 cuando la API externa falla', async () => {
    const { AlphaVantageClient } = require('../../../src/clients/alphaVantageClient');
    jest.spyOn(AlphaVantageClient.prototype, 'getGlobalQuote').mockRejectedValueOnce(new Error('Network error'));

    const response = await request(testApp).get('/api/stocks/MSFT');

    expect(response.status).toBe(500);
    expect(response.body).toEqual(expect.objectContaining({ error: expect.any(String) }));
  });
});