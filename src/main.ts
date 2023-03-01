import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'https://employee-manager-frontend-lovat.vercel.app',
    optionsSuccessStatus: 200,
    preflightContinue: true,
    credentials: true,
  });
  await app.listen(3001);
}

bootstrap();
