import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [OpenaiService, ConfigService],
  exports: [OpenaiService],
})
export class OpenaiModule {}
