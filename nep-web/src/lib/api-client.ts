// API client — central fetch wrapper that talks to the NEP API Gateway and attaches the JWT access token.
const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL ?? '';

export async function apiClient(path: string, init?: RequestInit): Promise<Response> {
  // TODO: attach Authorization header, handle 401 -> refresh, error mapping.
  return fetch(`${API_GATEWAY_URL}${path}`, init);
}
