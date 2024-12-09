import Anthropic from '@anthropic-ai/sdk';
import { Quiz } from '@article-quiz/shared-types';
import { genPrompt } from './gen-prompt';
import { urlToPdfBase64 } from './utils/url-to-pdf-base64';
import { InputContent } from '../..';
import { htmlToPdfBase64 } from './utils/html-to-pdf-base64';

type Input = {
  apiKey: string;
} & InputContent;

type Output = Quiz;

export const generateQuizClaude = async (input: Input): Promise<Output> => {
  const { apiKey, contentType } = input;
  let base64;
  switch (contentType) {
    case 'url':
      base64 = await urlToPdfBase64({ url: input.url });
      break;
    case 'html':
      base64 = await htmlToPdfBase64({
        html: input.content,
      });
      break;
  }

  const client = new Anthropic({
    apiKey,
  });

  const prompt = genPrompt({
    type: 'attached-file',
  });

  const message = await client.beta.messages.create({
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'document',
            source: {
              media_type: 'application/pdf',
              data: base64,
              type: 'base64',
            },
          },
          {
            type: 'text',
            text: prompt,
          },
        ],
      },
    ],
    model: 'claude-3-5-sonnet-20241022',
    betas: ['pdfs-2024-09-25'],
  });

  if (!(message.content[0].type === 'text')) {
    throw new Error('Invalid response from API.');
  }

  const quiz = JSON.parse(message.content[0].text);

  return quiz;
};
