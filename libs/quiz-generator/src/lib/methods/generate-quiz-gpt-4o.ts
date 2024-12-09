import OpenAi from 'openai';
import { Quiz } from '../types/quiz.types';
import { genPrompt } from './gen-prompt';

type Input = {
  url: string;
  apiKey: string;
};

type Output = Quiz;

export const generateQuizGpt4o = async ({
  url,
  apiKey,
}: Input): Promise<Output> => {
  console.log('Generating quiz with gpt 4o...');
  const openAi = new OpenAi({
    apiKey,
  });
  const prompt = genPrompt({
    type: 'url',
    contentUrl: url,
  });
  const response = await openAi.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-4o',
    temperature: 0.1,
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
  return JSON.parse(response.choices[0].message.content);
};
