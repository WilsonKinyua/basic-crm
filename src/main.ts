import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpRequestExceptionFilter } from './common/filters/http-request-exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpRequestExceptionFilter());
  const port = process.env.PORT || 3000;
  await app.listen(port, "0.0.0.0");
}
bootstrap();
