// Composition root — bootstraps the NestJS application (framework/entrypoint layer, outermost ring).
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DomainExceptionFilter } from './api/filters/domain-exception.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const config = app.get(ConfigService);

  app.setGlobalPrefix('api');

  // Global input validation: strip unknown props, reject extras, and transform payloads to DTO types.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Translate @nep/sdk DomainErrors into canonical HTTP responses.
  app.useGlobalFilters(new DomainExceptionFilter());

  app.enableShutdownHooks();

  const port = config.get<number>('port', 3000);
  await app.listen(port);
}

void bootstrap();
