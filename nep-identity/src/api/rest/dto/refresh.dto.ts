// API DTO — validates the /auth/refresh request body.
import { IsString, MinLength } from 'class-validator';

export class RefreshDto {
  @IsString()
  @MinLength(1)
  refreshToken!: string;
}
