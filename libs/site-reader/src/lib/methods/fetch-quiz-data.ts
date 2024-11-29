import { Quiz } from '@article-quiz/shared-types';

export function fetchQuizData(): Promise<Quiz> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const quizData: Quiz = {
        questions: [
          {
            question: 'What is the capital of France?',
            answers: [
              { text: 'Paris', isCorrect: true },
              { text: 'Berlin', isCorrect: false },
              { text: 'Madrid', isCorrect: false },
            ],
          },
          {
            question: 'Which planet is known as the Red Planet?',
            answers: [
              { text: 'Earth', isCorrect: false },
              { text: 'Mars', isCorrect: true },
              { text: 'Jupiter', isCorrect: false },
            ],
          },
          {
            question: 'What is 2 + 2?',
            answers: [
              { text: '3', isCorrect: false },
              { text: '4', isCorrect: true },
              { text: '5', isCorrect: false },
            ],
          },
        ],
      };
      resolve(quizData);
    }, 2000);
  });
}
