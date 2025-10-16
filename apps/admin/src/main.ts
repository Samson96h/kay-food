import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import * as crypto from 'crypto';
import 'dotenv/config';
import { HttpExceptionFilter } from '@app/common/filters/exception.filter';
import { User } from '@app/common/database/entities';
import { AppModule } from './app.module';
import { Request } from 'express';

(global as any).crypto = crypto;

export interface AuthRequest extends Request {
  user: User;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());

const PORT = process.env.PORT_ADMIN || 4000;

  await app.listen(PORT);
  console.log(`App running on port ${PORT}`);
}

bootstrap();
