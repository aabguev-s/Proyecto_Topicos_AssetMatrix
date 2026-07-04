export interface ApiClientConfig {
    baseUrl: string;
    apiKey?: string;
}
export declare abstract class BaseApiClient {
    protected baseUrl: string;
    protected apiKey: string;
    constructor(config: ApiClientConfig);
    protected request<T>(endpoint: string, options?: RequestInit): Promise<T>;
}
//# sourceMappingURL=baseAPIClient.d.ts.map