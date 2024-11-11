import { Module } from '@nestjs/common';
import { QuizGeneratorController } from './quiz-generator.controller';
import { QuizGeneratorService } from './quiz-generator.service';
import { OpenaiModule } from '../openai/openai.module';

@Module({
  imports: [OpenaiModule],
  controllers: [QuizGeneratorController],
  providers: [QuizGeneratorService],
})
export class QuizGeneratorModule {}
