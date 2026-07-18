import request from 'supertest';
import { createApp } from '../src/app';
import mongoose from 'mongoose';
import { StockTicker } from '../src/models/StockTicker';
import { StockApiClient } from '../src/clients/alphavantageAPIClient';

describe('POST /api/stock/watch duplicate handling', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/assetmatrix');
  });

  beforeEach(async () => {
    jest.restoreAllMocks();
    await mongoose.connection.dropDatabase();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('returns 409 when the ticker already exists', async () => {
    jest.spyOn(StockApiClient.prototype, 'getSymbolSearch').mockResolvedValue([
      {
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        type: 'Equity',
        region: 'United States',
        currency: 'USD',
        score: '0.99',
      },
    ] as any);

    const app = createApp({ includeSwagger: false });

    await StockTicker.create({
      name: 'MICROSOFT CORPORATION',
      symbol: 'MSFT',
      type: 'Equity',
      region: 'United States',
      currency: 'USD',
    });

    const response = await request(app)
      .post('/api/stock/watch')
      .send({ symbol: 'MSFT' });

    expect(response.status).toBe(409);
    expect(response.body.error).toMatch(/ya se encuentra siguiendo/i);
  });
});
