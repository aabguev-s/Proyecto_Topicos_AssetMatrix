import request from 'supertest';
import { testApp } from '../../setup/app';
import { StockWatch } from '../../../src/models/StockWatch';
import {
  clearTestDB,
  connectTestDB,
  disconnectTestDB
} from '../../setup/db';

describe('GET /api/stocks/watch', () => {
  beforeAll(async () => {
    await connectTestDB();
  });

  beforeEach(async () => {
    await clearTestDB();
  });

  afterAll(async () => {
    await disconnectTestDB();
  });

  it('éxito: responde 200 con una lista vacía cuando no existen registros', async () => {
    const response = await request(testApp)
      .get('/api/stocks/watch');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('éxito: responde 200 con un único registro guardado', async () => {
    await StockWatch.create({
      symbol: 'MSFT',
      companyName: 'Microsoft Corporation'
    });

    const response = await request(testApp)
      .get('/api/stocks/watch');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(1);

    expect(response.body[0].symbol)
      .toBe('MSFT');

    expect(response.body[0].companyName)
      .toBe('Microsoft Corporation');
  });

  it('éxito: responde 200 con múltiples registros guardados', async () => {
    await StockWatch.create([
      {
        symbol: 'MSFT',
        companyName: 'Microsoft Corporation'
      },
      {
        symbol: 'AAPL',
        companyName: 'Apple Inc.'
      },
      {
        symbol: 'GOOGL',
        companyName: 'Alphabet Inc.'
      }
    ]);

    const response = await request(testApp)
      .get('/api/stocks/watch');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(3);

    const symbols = response.body.map(
      (stock: any) => stock.symbol
    );

    expect(symbols).toContain('MSFT');
    expect(symbols).toContain('AAPL');
    expect(symbols).toContain('GOOGL');
  });

  it('error: responde 500 cuando hay fallo en la base de datos', async () => {
    jest.spyOn(StockWatch, 'find').mockImplementationOnce((): any => {
      return {
        sort: () => ({ exec: () => Promise.reject(new Error('DB failure')) }),
      };
    });

    const response = await request(testApp)
      .get('/api/stocks/watch');

    expect(response.status).toBe(500);
    expect(response.body).toEqual(expect.objectContaining({ error: expect.any(String) }));
  });
});