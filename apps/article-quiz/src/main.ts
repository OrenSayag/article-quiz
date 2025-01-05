import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './modules/app/app.module';
import { ZodValidationPipe } from 'nestjs-zod';
import { UserGuard } from './guards/user.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (process.env['NODE_ENV'] !== 'production') {
    app.enableCors();
  }
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ZodValidationPipe());
  app.useGlobalGuards(new UserGuard());
  const port = process.env.PORT || 3001;
  await app.listen(port);
  Logger.log(
    `🚀 article-quiz backend is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
