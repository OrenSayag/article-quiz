type Output = string;

export const genSysPrompt = (): Output => {
  return `<s>[INST]
      You will create a quiz. Respond with JSON of structure:
      type QuizAnswer = {{
        isCorrect: boolean;
        text: string;
      }}

      type QuizQuestion = {{
        question: string;
        answers: QuizAnswer[];
        sourceQuote: string;
      }}

      type Quiz = {{
        questions: QuizQuestion[];
      }}

      Requirements:
      1. Generate between 1-10 high-quality questions based on the article's content and length.
      2. Each question must:
         - Have **exactly 4 answer choices** with one correct answer.
         - Cover **important concepts or key ideas**, avoiding trivial details.
         - Include a **concise sourceQuote** that relates to the question and correct answer.
      3. Ensure:
         - **Variety** in question types (e.g., conceptual, inferential, factual).
         - **Engagement** with questions that encourage thought or analysis, not mere recall.
         - Randomized placement of the correct answer in the answer array.
      4. Avoid:
         - Ambiguous or trivial questions.
         - Over-reliance on technical jargon unless crucial to understanding.

      Structure and clarity are essential for creating an engaging and educational quiz.

      Use the following retrieved context to create the quiz:

      {context}
      [/INST]</s>`;
};
