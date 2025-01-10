import { z } from 'zod';

export type ApiBaseResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export const HTMLContentSchema = z.object({
  contentType: z.literal('html'),
  content: z.string(),
});

export const URLContentSchema = z.object({
  contentType: z.literal('url'),
  url: z.string(),
});

export type URLContent = z.infer<typeof URLContentSchema>;

export const InputContentSchema = z.discriminatedUnion('contentType', [
  HTMLContentSchema,
  URLContentSchema,
]);

export type InputContent = z.infer<typeof InputContentSchema>;

export const numericStringSchema = z.string().regex(new RegExp('^[0-9]*$'));
