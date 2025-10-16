import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import 'dotenv/config';

import { HttpExceptionFilter } from '../../../libs/common/src/filters/exception.filter';
import { AppModule } from './app.module';
import { Request } from 'express';
import { User } from '../../../libs/common/src/database/entities';
import * as crypto from 'crypto';


(global as any).crypto = crypto;

export interface AuthRequest extends Request {
  user: User;
}

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }))
  app.enableCors()
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(+PORT);
  console.log("App running on port", PORT)
}
bootstrap();