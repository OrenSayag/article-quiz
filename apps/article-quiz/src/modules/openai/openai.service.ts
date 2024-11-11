import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAi from 'openai';
import { log } from '@article-quiz/logger';

@Injectable()
export class OpenaiService {
  public openAi: OpenAi;
  constructor(configService: ConfigService) {
    this.openAi = new OpenAi({
      apiKey: configService.getOrThrow(`OPEN_AI_TOKEN`),
    });
  }

  public async prompt({ content }: { content: string }) {
    console.log(`Prompting OpenAI ChatGPT 4: ${content}`);
    const response = await this.openAi.chat.completions.create({
      messages: [
        {
          role: 'user',
          content,
        },
      ],
      model: 'gpt-4o',
      // temperature: 1,
      // top_p: 1,
      // n: 1,
      // stream: false,
      // max_tokens: 250,
      // presence_penalty: 0,
      // frequency_penalty: 0,
      response_format: {
        type: 'json_object',
      },
    });
    log.debug({
      promptAnswer: response.choices[0].message.content,
    });
    return response.choices[0].message.content;
  }
}
