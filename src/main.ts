import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import 'dotenv/config';

import { AppModule } from './app.module';
import { Request } from 'express';
import { User } from './entities';

export interface AuthRequest extends Request {
  user: User;
}

const PORT = process.env.PORT || 3000

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
  await app.listen(+PORT);
  console.log("App running on port", PORT)
}
bootstrap();