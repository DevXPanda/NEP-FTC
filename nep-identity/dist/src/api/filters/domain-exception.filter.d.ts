import { ArgumentsHost, type ExceptionFilter } from '@nestjs/common';
import { DomainError } from '@nep/sdk';
export declare class DomainExceptionFilter implements ExceptionFilter {
    catch(exception: DomainError, host: ArgumentsHost): void;
}
