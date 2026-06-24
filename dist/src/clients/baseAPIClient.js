"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAPIClient = void 0;
class BaseAPIClient {
    baseUrl;
    defaultParams;
    constructor(baseUrl, defaultParams = {}) {
        this.baseUrl = baseUrl;
        this.defaultParams = defaultParams;
    }
    buildUrl(path, params = {}) {
        const url = new URL(path, this.baseUrl);
        const mergedParams = { ...this.defaultParams, ...params };
        for (const [key, value] of Object.entries(mergedParams)) {
            if (value !== undefined && value !== '') {
                url.searchParams.set(key, value);
            }
        }
        return url.toString();
    }
    async request(path, options = {}) {
        const url = this.buildUrl(path, options.params);
        const headers = { ...options.headers };
        const init = {
            method: options.method ?? 'GET',
            headers,
        };
        if (options.body !== undefined) {
            headers['Content-Type'] = 'application/json';
            init.body = JSON.stringify(options.body);
        }
        const response = await fetch(url, init);
        if (!response.ok) {
            throw new Error(`External API error: ${response.status} ${response.statusText}`);
        }
        return response.json();
    }
    async get(path, params = {}) {
        return this.request(path, { method: 'GET', params });
    }
    async post(path, body, params = {}) {
        return this.request(path, { method: 'POST', body, params });
    }
}
exports.BaseAPIClient = BaseAPIClient;
//# sourceMappingURL=baseAPIClient.js.map