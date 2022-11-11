import { config } from 'dotenv'
config()

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

const { PORT = 3030, CORS } = process.env

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: CORS,
  })
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(PORT)
  console.log(`App is running on http://localhost:${PORT}`);
}
bootstrap()
