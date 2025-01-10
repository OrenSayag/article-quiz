import { db } from '../../../config';
import { quizzes } from '../../../schema';
import { eq } from 'drizzle-orm';
import { InputContent, Quiz } from '@article-quiz/shared-types';

type Input =
  | {
      type: 'quiz-source';
      inputContent: InputContent;
    }
  | {
      type: 'id';
      id: number;
    };

type Output =
  | (Quiz & {
      id: number;
    })
  | 'not-found';

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
  if (res.length > 0) {
    return { ...res[0].data, id: res[0].id };
  }
  return 'not-found';
};
