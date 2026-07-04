"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../setup/app");
const StockWatch_1 = require("../../../src/models/StockWatch");
const db_1 = require("../../setup/db");
describe('GET /api/stocks/watch', () => {
    beforeAll(async () => {
        await (0, db_1.connectTestDB)();
    });
    beforeEach(async () => {
        await (0, db_1.clearTestDB)();
    });
    afterAll(async () => {
        await (0, db_1.disconnectTestDB)();
    });
    it('éxito: responde 200 con una lista vacía cuando no existen registros', async () => {
        const response = await (0, supertest_1.default)(app_1.testApp)
            .get('/api/stocks/watch');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });
    it('éxito: responde 200 con múltiples registros guardados', async () => {
        await StockWatch_1.StockWatch.create([
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
        const response = await (0, supertest_1.default)(app_1.testApp)
            .get('/api/stocks/watch');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toHaveLength(3);
        const symbols = response.body.map((stock) => stock.symbol);
        expect(symbols).toContain('MSFT');
        expect(symbols).toContain('AAPL');
        expect(symbols).toContain('GOOGL');
    });
    it('error: responde 500 cuando hay fallo en la base de datos', async () => {
        jest.spyOn(StockWatch_1.StockWatch, 'find').mockImplementationOnce(() => {
            return {
                sort: () => ({ exec: () => Promise.reject(new Error('DB failure')) }),
            };
        });
        const response = await (0, supertest_1.default)(app_1.testApp)
            .get('/api/stocks/watch');
        expect(response.status).toBe(500);
        expect(response.body).toEqual(expect.objectContaining({ error: expect.any(String) }));
    });
});
//# sourceMappingURL=get-stock-watchlist.test.js.map