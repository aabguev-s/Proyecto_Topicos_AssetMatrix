export interface APIClientRequestOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    params?: Record<string, string | undefined>;
    body?: unknown;
    headers?: Record<string, string>;
}
export declare class BaseAPIClient {
    protected readonly baseUrl: string;
    protected readonly defaultParams: Record<string, string>;
    constructor(baseUrl: string, defaultParams?: Record<string, string>);
    protected buildUrl(path: string, params?: Record<string, string | undefined>): string;
    protected request<T>(path: string, options?: APIClientRequestOptions): Promise<T>;
    get<T>(path: string, params?: Record<string, string | undefined>): Promise<T>;
    post<T>(path: string, body?: unknown, params?: Record<string, string | undefined>): Promise<T>;
}
//# sourceMappingURL=baseAPIClient.d.ts.map