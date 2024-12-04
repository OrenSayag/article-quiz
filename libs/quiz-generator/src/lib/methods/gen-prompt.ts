type Input = {
  contentUrl: string;
};

type Output = string;

export const genPrompt = ({ contentUrl }: Input): Output => {
  const base = `
      I need you to generate a quiz based on the article markdown in the URL I will provide you.
      Your answer must be a JSON object of structure (following are typescript types):

      \`\`\`typescript
      type QuizAnswer = {
        isCorrect: boolean;
        text: string;
      }

      type QuizQuestion = {
        question: string;
        answers: QuizAnswer[];
        sourceQuote: string;
      }

      type Quiz = {
        questions: QuizQuestion[];
      }
      \`\`\`

      You will provide 1-10 questions based on the article's length.

      Each question, will have 4 answer choices, and the position of the correct answer in the array, is random.
      In each question object, include the sourceQuote field which should quote text from the markdown, which relates to the question / correct answer.

      You must return the answer as a valid minified JSON.

      The MD is:

      <MD>https://r.jina.ai/${contentUrl}</MD>
      `;
  return base;
};
