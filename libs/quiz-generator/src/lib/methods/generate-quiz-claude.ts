import Anthropic from '@anthropic-ai/sdk';
import { Quiz } from '@article-quiz/shared-types';
import { genPrompt } from './gen-prompt';

type Input = {
  apiKey: string;
  mdContent: string;
};

type Output = Quiz;

export const generateQuizClaude = async (input: Input): Promise<Output> => {
  const { apiKey, mdContent } = input;

  const client = new Anthropic({
    apiKey,
  });

  const prompt = genPrompt({
    type: 'hard-coded',
    content: mdContent,
  });

  const message = await client.messages.create({
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: prompt,
          },
        ],
      },
    ],
    model: 'claude-3-5-sonnet-20241022',
  });

  if (!(message.content[0].type === 'text')) {
    throw new Error('Invalid response from API.');
  }

  const quiz = JSON.parse(message.content[0].text);

  return quiz;
};
