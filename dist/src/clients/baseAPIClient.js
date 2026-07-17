"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseApiClient = void 0;
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms)); // Existe para lidiar con los limites de request por segundo
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
            // Intentar leer el cuerpo para extraer mensajes del proveedor cuando haya error
            if (!response.ok) {
                let bodyText = null;
                try {
                    const contentType = response.headers.get('content-type') || '';
                    if (contentType.includes('application/json')) {
                        const parsed = await response.json();
                        bodyText = parsed?.Note || parsed?.Information || parsed?.['Error Message'] || parsed?.error || parsed?.message || parsed?.note || JSON.stringify(parsed);
                    }
                    else {
                        bodyText = await response.text();
                    }
                }
                catch (e) {
                    bodyText = null;
                }
                const cleanBodyText = bodyText ? String(bodyText).trim() : '';
                throw new Error(`Error de la API externa [${response.status}]: ${response.statusText}${cleanBodyText ? ' - ' + cleanBodyText : ''}`);
            }
            await sleep(2000);
            return await response.json();
        }
        catch (error) {
            console.error(`Fallo en la conexión con el endpoint ${endpoint}:`, error);
            const errorMessage = error?.message ? String(error.message) : 'Error desconocido de la API externa';
            throw new Error(`Error de la API externa: ${errorMessage}`);
        }
    }
}
exports.BaseApiClient = BaseApiClient;
//# sourceMappingURL=baseAPIClient.js.map