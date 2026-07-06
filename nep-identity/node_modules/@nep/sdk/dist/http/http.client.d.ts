export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export interface HttpRequest<B = unknown> {
    method: HttpMethod;
    /** Path relative to the client baseUrl, e.g. "/v1/products/123". */
    path: string;
    query?: Record<string, string | number | boolean | undefined>;
    headers?: Record<string, string>;
    body?: B;
    /** Per-request timeout override in ms. */
    timeoutMs?: number;
}
export interface HttpResponse<T = unknown> {
    status: number;
    headers: Record<string, string>;
    data: T;
}
export interface RetryConfig {
    maxAttempts: number;
    backoffMs: number;
    maxBackoffMs?: number;
    /** HTTP status codes considered retryable (in addition to network errors). */
    retryableStatuses?: number[];
}
export interface CircuitBreakerConfig {
    /** Consecutive failures before the circuit opens. */
    failureThreshold: number;
    /** How long the circuit stays open before a half-open trial, in ms. */
    resetTimeoutMs: number;
}
export interface HttpClientOptions {
    baseUrl: string;
    defaultHeaders?: Record<string, string>;
    timeoutMs?: number;
    retry?: RetryConfig;
    circuitBreaker?: CircuitBreakerConfig;
}
export interface HttpClient {
    request<T = unknown, B = unknown>(req: HttpRequest<B>): Promise<HttpResponse<T>>;
    get<T = unknown>(path: string, init?: Omit<HttpRequest, 'method' | 'path' | 'body'>): Promise<HttpResponse<T>>;
    post<T = unknown, B = unknown>(path: string, body?: B, init?: Omit<HttpRequest<B>, 'method' | 'path' | 'body'>): Promise<HttpResponse<T>>;
    put<T = unknown, B = unknown>(path: string, body?: B, init?: Omit<HttpRequest<B>, 'method' | 'path' | 'body'>): Promise<HttpResponse<T>>;
    patch<T = unknown, B = unknown>(path: string, body?: B, init?: Omit<HttpRequest<B>, 'method' | 'path' | 'body'>): Promise<HttpResponse<T>>;
    delete<T = unknown>(path: string, init?: Omit<HttpRequest, 'method' | 'path' | 'body'>): Promise<HttpResponse<T>>;
}
/**
 * Creates a resilient HTTP client.
 * TODO: implement — apply timeout, retry transient failures with exponential backoff + jitter,
 * and short-circuit via a per-instance circuit breaker (closed -> open -> half-open).
 */
export declare function createHttpClient(_options: HttpClientOptions): HttpClient;
//# sourceMappingURL=http.client.d.ts.map