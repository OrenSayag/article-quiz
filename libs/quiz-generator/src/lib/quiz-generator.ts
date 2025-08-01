import { Quiz, QuizGenerator } from './types/quiz.types';
import { generateQuizClaude } from './methods/generate-quiz-claude';
import { generateQuizGpt4o } from './methods/generate-quiz-gpt-4o';
import { InputContent, URLContent } from '@article-quiz/shared-types';

type ClaudeInput = {
  generator: QuizGenerator.CLAUDE;
} & Parameters<typeof generateQuizClaude>[0];

type GPT4OInput = {
  generator: QuizGenerator.GPT_4_O;
} & URLContent;

type ArticleQuizInput = {
  generator: QuizGenerator.ARTICLE_QUIZ;
} & InputContent;

type Input = (ClaudeInput | GPT4OInput | ArticleQuizInput) & { apiKey: string };

type Output = Quiz;

export async function quizGenerator(input: Input): Promise<Output> {
  const { generator } = input;
  let quiz: Quiz;
  switch (generator) {
    case QuizGenerator.CLAUDE:
      quiz = await generateQuizClaude({
        ...input,
      });
      break;
    case QuizGenerator.GPT_4_O:
      quiz = await generateQuizGpt4o({ ...input });
      break;
    case QuizGenerator.ARTICLE_QUIZ:
      throw new Error('ARTICLE_QUIZ: not implemented yet');
    default:
      throw new Error('quizGenerator: invalid param: generator');
  }
  return quiz;
}
