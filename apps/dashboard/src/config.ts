import { z } from 'zod';

const configSchema = z.object({
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  AUTH_SECRET: z.string().min(1),
});

type Config = z.infer<typeof configSchema>;

const config: Config = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
  AUTH_SECRET: process.env.AUTH_SECRET!,
};

const validation = configSchema.safeParse(config);

if (!validation.success) {
  console.warn(
    `Invalid env vars. Issues: ${JSON.stringify(validation.error.issues)}`
  );
}

export default config;
