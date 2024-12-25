type Input =
  | {
      type: 'url';
      contentUrl: string;
    }
  | {
      type: 'attached-file';
    }
  | {
      type: 'hard-coded';
      content: string;
    };

type Output = string;

export const genPrompt = (input: Input): Output => {
  const { type } = input;
  const base = `
      I need you to generate a quiz based on the article markdown in the ${
        type === 'url' ? 'URL' : type === 'attached-file' ? 'file' : 'markdown'
      } I will provide you.
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

      ${
        type === 'url'
          ? `The MD is:\n\n      <MD>https://r.jina.ai/${input.contentUrl}</MD>`
          : type === 'hard-coded'
          ? `The markdown content is: ${input.content}`
          : ''
      }
      `;
  return base;
};
