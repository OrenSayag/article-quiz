import { db } from '../../../config';
import { quizzes } from '../../../schema';
import { eq } from 'drizzle-orm';
import { InputContent, Quiz } from '@article-quiz/shared-types';
import { NotFoundException } from '@nestjs/common';
import { generateQuizClaude } from '@orensayag/article-quiz-quiz-generator';
import { htmlToMd, urlToMd } from '@article-quiz/jina-ai';
import { mdGenOpts } from '@article-quiz/utils';
import { createQuiz } from './create-quiz';

type Input = (
  | {
      type: 'quiz-source';
      inputContent: InputContent;
    }
  | {
      type: 'id';
      id: number;
    }
) & {
  claudeApiKey: string;
};

type Output = Quiz;

export const getQuiz = async (input: Input): Promise<Output> => {
  const { type } = input;
  let cond;
  if (type === 'id') {
    cond = eq(quizzes.id, input.id);
  }
  let source;
  if (type === 'quiz-source') {
    source = (() => {
      switch (input.inputContent.contentType) {
        case 'url':
          return input.inputContent.url;
        case 'html':
          return input.inputContent.content;
      }
    })();
    cond = eq(quizzes.source, source);
  }
  const res = await db.select().from(quizzes).where(cond);
  if (res.length === 0) {
    if (input.type === 'id') {
      throw new NotFoundException('Quiz not found');
    }
    const mdContent = await (() => {
      switch (input.inputContent.contentType) {
        case 'url':
          return urlToMd({
            url: input.inputContent.url,
            ...mdGenOpts,
          });
        case 'html':
          return htmlToMd({
            html: input.inputContent.content,
            ...mdGenOpts,
          });
      }
    })();
    const start = new Date();
    const quiz = await generateQuizClaude({
      apiKey: input.claudeApiKey,
      mdContent: mdContent,
    });
    const end = new Date();
    await createQuiz({
      source: source!,
      data: quiz,
      timeToCreateInMs: end.getTime() - start.getTime(),
      modelUsed: 'claude api',
    });
    return quiz;
  }
  const [quizRecord] = res;
  return quizRecord.data;
};
