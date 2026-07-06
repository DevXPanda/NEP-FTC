// Auth helpers — JWT access/refresh token management (read, verify, refresh). Stub.

export type Tokens = { accessToken: string; refreshToken: string };

export function getTokens(): Tokens | null {
  // TODO: read tokens from cookies/session.
  return null;
}

export async function refreshAccessToken(): Promise<string | null> {
  // TODO: exchange refresh token for a new access token via the API Gateway.
  return null;
}
