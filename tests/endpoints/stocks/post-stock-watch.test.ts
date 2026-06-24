import request from 'supertest';
import { testApp } from '../../setup/app';
import { clearTestDB, connectTestDB, disconnectTestDB } from '../../setup/db';

describe('POST /api/stocks/watch', () => {
  beforeAll(async () => {
    await connectTestDB();
  });

  beforeEach(async () => {
    await clearTestDB();
  });

  afterAll(async () => {
    await disconnectTestDB();
  });

  it('éxito: crea un ticker válido (201)', async () => {
    const response = await request(testApp)
      .post('/api/stocks/watch')
      .send({
        symbol: 'MSFT',
        companyName: 'Microsoft Corporation',
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        symbol: 'MSFT',
        companyName: 'Microsoft Corporation',
      })
    );
  });

  it('error: body inválido (400)', async () => {
    const response = await request(testApp)
      .post('/api/stocks/watch')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.status).toBe('fail');
  });

  it('error: símbolo duplicado (409)', async () => {
    await request(testApp)
      .post('/api/stocks/watch')
      .send({
        symbol: 'MSFT',
        companyName: 'Microsoft',
      });

    const response = await request(testApp)
      .post('/api/stocks/watch')
      .send({
        symbol: 'MSFT',
        companyName: 'Microsoft Corporation',
      });

    expect(response.status).toBe(409);
    expect(response.body.error).toMatch(/exist|duplicate/i);
  });

  it('error: responde 500 cuando falla al guardar en la base de datos', async () => {
    const { StockRepository } = require('../../../src/repositories/stockRepository');
    jest.spyOn(StockRepository.prototype, 'create').mockRejectedValueOnce(new Error('DB save failure'));

    const response = await request(testApp)
      .post('/api/stocks/watch')
      .send({ symbol: 'TSLA', companyName: 'Tesla' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual(expect.objectContaining({ error: expect.any(String) }));
  });
});