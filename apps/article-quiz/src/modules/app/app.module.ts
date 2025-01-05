import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { QuizModule } from '../quiz/quiz.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), QuizModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
