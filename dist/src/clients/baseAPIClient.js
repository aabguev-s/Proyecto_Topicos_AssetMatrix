"use strict";
//clients/baseAPIClient.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseApiClient = void 0;
class BaseApiClient {
    baseUrl;
    apiKey;
    constructor(config) {
        this.baseUrl = config.baseUrl;
        this.apiKey = config.apiKey || '';
    }
    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        try {
            const response = await fetch(url, { ...options });
            if (!response.ok) {
                throw new Error(`Error de la API externa [${response.status}]: ${response.statusText}`);
            }
            return await response.json();
        }
        catch (error) {
            console.error(`Fallo en la conexión con el endpoint ${endpoint}:`, error);
            throw error;
        }
    }
}
exports.BaseApiClient = BaseApiClient;
//# sourceMappingURL=baseAPIClient.js.map