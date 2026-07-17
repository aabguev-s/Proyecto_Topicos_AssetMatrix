export interface ApiClientConfig {
  baseUrl: string;
  apiKey?: string;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms)); // Existe para lidiar con los limites de request por segundo
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
      // Intentar leer el cuerpo para extraer mensajes del proveedor cuando haya error
      if (!response.ok) {
        let bodyText: string | null = null;
        try {
          const contentType = response.headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            const parsed = await response.json();
            bodyText = parsed?.error || parsed?.message || JSON.stringify(parsed);
          } else {
            bodyText = await response.text();
          }
        } catch (e) {
          bodyText = null;
        }
        throw new Error(`Error de la API externa [${response.status}]: ${response.statusText}${bodyText ? ' - ' + bodyText : ''}`);
      }
      await sleep(2000);
      return await response.json() as T;
    } catch (error) {
      console.error(`Fallo en la conexión con el endpoint ${endpoint}:`, error);
      throw error;
    }
  }
}