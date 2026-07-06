// Application DTO — result of an authentication use case (returned to the api layer).
export interface AuthTokensDto {
  accessToken: string;
  refreshToken: string;
  tokenType: 'Bearer';
  /** Access-token lifetime in seconds. */
  expiresIn: number;
}
