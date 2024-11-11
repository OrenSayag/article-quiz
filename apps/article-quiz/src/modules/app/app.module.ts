import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { QuizGeneratorModule } from '../quiz-generator/quiz-generator.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    QuizGeneratorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
