type Input = {
  type: 'url' | 'file';
} & {
  data: string;
};

type Output = string;

export const genPrompt = ({ type, data }: Input): Output => {
  const base = `
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

      Each question, will have 4 answer choices, and the position of the correct answer in the array, is random.

      You must return the answer as a valid minified JSON.
      `;
  switch (type) {
    case 'url':
      return `
      ${base}

      The article URL is: ${data}.
      `;
    case 'file':
      return `
      I need you to generate a quiz based on the provided web article HTML.

      Extract the main content from this HTML article while removing unnecessary HTML tags, scripts, styles, advertisements, and navigation elements.
      Retain the headings, paragraphs, links, and essential images.
      Use the cleaned content in plain text or minimal HTML as source for the quiz questions.

      Do not include in the quiz, questions or answers that are not included in the article.

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

      You will provide 1-20 questions based on the article's length. Please create questions that are most relevant to the article content - based on the article title. I prefer maximum amount of questions, but only if they are relevant to the article title. The questions must cover all sections of the article.

      Each question, will have 4 answer choices, and the position of the correct answer in the array, is random.

      You must return the answer as a valid minified JSON.
      `;
  }
};
