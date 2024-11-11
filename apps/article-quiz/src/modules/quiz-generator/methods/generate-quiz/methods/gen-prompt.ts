type Input = {
  type: 'url';
} & {
  data: string;
};

type Output = string;

export const genPrompt = ({ type, data }: Input): Output => {
  switch (type) {
    case 'url':
      return `
      I need you to generate a quiz based on the article in the URL I will provide you.
      Your answer must be a JSON object of structure (following are typescript types):

      \`\`\`typescript
      type QuizAnswer = {
        isCorrect: boolean;
        text: string;
      }

      type QuizQuestion = {
        question: string;
        answers: QuizAnswer[];
      }

      type Quiz = {
        questions: QuizQuestion[];
      }
      \`\`\`

      You will provide 1-10 questions based on the article's length.

      Each question, will have 4 answer choices.

      The article URL is: ${data}.

      You must return the answer as a valid minified JSON.
      `;
  }
};
