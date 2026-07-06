// API layer — maps @nep/sdk DomainError instances to their canonical HTTP responses.
import { ArgumentsHost, Catch, type ExceptionFilter } from '@nestjs/common';
import { DomainError } from '@nep/sdk';

@Catch(DomainError)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainError, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<{
      status(code: number): { json(body: unknown): void };
    }>();
    response.status(exception.status).json({ error: exception.toJSON() });
  }
}
