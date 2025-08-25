import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove campos não declarados no DTO
      forbidNonWhitelisted: true, // Lança erro se campo extra vier
      forbidUnknownValues: true, // Trata objetos desconhecidos como inválidos
      transform: true, // Transforma para os tipos definidos
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
