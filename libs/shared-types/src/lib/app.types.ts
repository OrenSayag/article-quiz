export type ApiBaseResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
};

export enum QuizGenerator {
  CHAT_GPT = 'chat-gpt',
}
