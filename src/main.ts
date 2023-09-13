import { config } from 'dotenv';
config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const { PORT = 4090, CORS } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: CORS,
  });
  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(3000);
  console.log(`App is running on http://localhost:${PORT}`);
}
bootstrap();
