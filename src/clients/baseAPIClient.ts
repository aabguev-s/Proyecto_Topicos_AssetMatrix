//clients/baseAPIClient.ts

export interface ApiClientConfig {
  baseUrl: string;
  apiKey?: string;
}

export abstract class BaseApiClient {
  protected baseUrl: string;
  protected apiKey: string;

  constructor(config: ApiClientConfig) {
    this.baseUrl = config.baseUrl;
    this.apiKey = config.apiKey || '';
  }

  protected async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, { ...options });
      if (!response.ok) {
        throw new Error(`Error de la API externa [${response.status}]: ${response.statusText}`);
      }
      return await response.json() as T;
    } catch (error) {
      console.error(`Fallo en la conexión con el endpoint ${endpoint}:`, error);
      throw error;
    }
  }
}