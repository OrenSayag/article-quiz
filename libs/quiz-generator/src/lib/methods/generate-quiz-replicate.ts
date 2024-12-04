import { Quiz } from '@orensayag/article-quiz-quiz-generator';
import Replicate from 'replicate';
import { genPrompt } from './gen-prompt';

type Input = {
  apiKey: string;
  url: string;
};

type Output = Quiz;

const modelId =
  'zhouhaojiang/qwen_32b:94378aca5cdf8fb28951d729424b636737017abc9eb9e843bd710ff4169db012';

export const generateQuizWithReplicate = async ({
  url,
  apiKey,
}: Input): Promise<Output> => {
  console.log('Generating quiz with replicate qwen...');
  const replicate = new Replicate({
    auth: apiKey,
  });
  const prompt = genPrompt({
    contentUrl: url,
  });
  const output = await replicate.run(modelId, {
    input: {
      top_k: 100,
      top_p: 0.5,
      prompt,
      max_tokens: 1024,
      temperature: 0,
      system_prompt: '',
    },
  });
  console.log({
    output: (output as Array<string>).join(''),
  });
  throw new Error('not implemented');
};
