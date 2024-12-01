import OpenAi, { toFile } from 'openai';
import { Quiz } from '../types/quiz.types';
import { genPrompt } from './gen-prompt';
import { MessageContent } from 'openai/resources/beta/threads';

type Input = {
  content: string;
  apiKey: string;
  assistantId: string;
};

type Output = Quiz;

export const generateQuizWithChatGpt = async ({
  content,
  apiKey,
  assistantId,
}: Input): Promise<Output> => {
  const openAi = new OpenAi({
    apiKey,
  });

  const htmlBuffer = Buffer.from(content, 'utf-8');

  const file = await openAi.files.create({
    file: await toFile(htmlBuffer, `${Date.now()}.html`, {
      type: 'text/html',
    }),
    purpose: 'assistants',
  });

  const fileId = file.id;

  const prompt = genPrompt({
    type: 'file',
    data: '',
  });

  const thread = await openAi.beta.threads.create({
    messages: [
      {
        role: 'user',
        content: prompt,
        attachments: [
          {
            file_id: fileId,
            tools: [
              {
                type: 'file_search',
              },
            ],
          },
        ],
      },
    ],
  });

  const run = await openAi.beta.threads.runs.createAndPoll(thread.id, {
    assistant_id: assistantId,
    additional_instructions:
      'please output as JSON - just JSON, nothing else. start response with {',
  });

  if (run.status === 'failed') {
    throw new Error('Run failed.');
  }

  const messages = await openAi.beta.threads.messages.list(thread.id, {
    run_id: run.id,
  });

  let message: MessageContent | string = messages.data[0].content[0];
  if (message.type !== 'text') {
    throw new Error('Invalid response from assistant.');
  }
  message = message.text.value;

  if (typeof message !== 'string') {
    throw new Error('Invalid response from assistant.');
  }

  return JSON.parse(message);
};

export const setUpAssistant = async (apiKey: string) => {
  const client = new OpenAi({
    apiKey,
  });
  const response = await client.beta.assistants.create({
    instructions: `You will generate JSON objects to represent quizzes for web pages HTML.
      The JSON structure will be provided in the prompts. HTML files will be attached to the user messages.
      Your answers to user messages must be only valid minified JSON object`,
    name: 'Article Quiz Generator',
    model: 'gpt-4o-mini',
    tools: [
      {
        type: 'file_search',
      },
    ],
    response_format: {
      type: 'json_object',
    },
  });
  return response;
};
