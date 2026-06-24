"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../setup/app");
const db_1 = require("../../setup/db");
describe('POST /api/stocks/watch', () => {
    beforeAll(async () => {
        await (0, db_1.connectTestDB)();
    });
    beforeEach(async () => {
        await (0, db_1.clearTestDB)();
    });
    afterAll(async () => {
        await (0, db_1.disconnectTestDB)();
    });
    it('éxito: crea un ticker válido (201)', async () => {
        const response = await (0, supertest_1.default)(app_1.testApp)
            .post('/api/stocks/watch')
            .send({
            symbol: 'MSFT',
            companyName: 'Microsoft Corporation',
        });
        expect(response.status).toBe(201);
        expect(response.body).toEqual(expect.objectContaining({
            symbol: 'MSFT',
            companyName: 'Microsoft Corporation',
        }));
    });
    it('error: body inválido (400)', async () => {
        const response = await (0, supertest_1.default)(app_1.testApp)
            .post('/api/stocks/watch')
            .send({});
        expect(response.status).toBe(400);
        expect(response.body.status).toBe('fail');
    });
    it('éxito: crea un ticker con caracteres especiales si no es solo numérico', async () => {
        const response = await (0, supertest_1.default)(app_1.testApp)
            .post('/api/stocks/watch')
            .send({ symbol: 'MSFT-B', companyName: 'Microsoft' });
        expect(response.status).toBe(201);
        expect(response.body.symbol).toBe('MSFT-B');
    });
    it('error: responde 400 cuando el símbolo es completamente numérico', async () => {
        const response = await (0, supertest_1.default)(app_1.testApp)
            .post('/api/stocks/watch')
            .send({ symbol: '12345', companyName: 'Invalid' });
        expect(response.status).toBe(400);
        expect(response.body.status).toBe('fail');
    });
    it('éxito: crea un ticker con más de 5 caracteres si no es solo numérico', async () => {
        const response = await (0, supertest_1.default)(app_1.testApp)
            .post('/api/stocks/watch')
            .send({ symbol: 'MICROSOFT123', companyName: 'Microsoft' });
        expect(response.status).toBe(201);
        expect(response.body.symbol).toBe('MICROSOFT123');
    });
    it('éxito: crea un ticker con números válido (ej. BRK1)', async () => {
        const response = await (0, supertest_1.default)(app_1.testApp)
            .post('/api/stocks/watch')
            .send({
            symbol: 'BRK1',
            companyName: 'Berkshire Hathaway',
        });
        expect(response.status).toBe(201);
        expect(response.body).toEqual(expect.objectContaining({
            symbol: 'BRK1',
            companyName: 'Berkshire Hathaway',
        }));
    });
    it('error: símbolo duplicado (409)', async () => {
        await (0, supertest_1.default)(app_1.testApp)
            .post('/api/stocks/watch')
            .send({
            symbol: 'MSFT',
            companyName: 'Microsoft',
        });
        const response = await (0, supertest_1.default)(app_1.testApp)
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
        const response = await (0, supertest_1.default)(app_1.testApp)
            .post('/api/stocks/watch')
            .send({ symbol: 'TSLA', companyName: 'Tesla' });
        expect(response.status).toBe(500);
        expect(response.body).toEqual(expect.objectContaining({ error: expect.any(String) }));
    });
});
//# sourceMappingURL=post-stock-watch.test.js.map