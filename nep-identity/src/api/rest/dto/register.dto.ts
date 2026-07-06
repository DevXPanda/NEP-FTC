// API DTO — validates the /auth/register request body.
import {
  ArrayUnique,
  IsArray,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  ValidateIf,
} from 'class-validator';

const SCOPE_TYPES = ['global', 'organization', 'branch', 'warehouse'] as const;

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @IsIn(SCOPE_TYPES)
  scopeType!: (typeof SCOPE_TYPES)[number];

  // Required for any non-global scope.
  @ValidateIf((o: RegisterDto) => o.scopeType !== 'global')
  @IsUUID()
  scopeId?: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  roles?: string[];
}
