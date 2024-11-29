export type ApiBaseResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
};

export type QuizGenerator = 'chat-gpt' | 'transformers';
