import { z } from "zod";

const envSchema = z.object({
  AUTH_SECRET: z.string().min(1),
  TURSO_AUTH_URL: z.string().min(1),
  TURSO_AUTH_TOKEN: z.string().min(1),
  AUTH_GOOGLE_ID: z.string().min(1),
  AUTH_GOOGLE_SECRET: z.string().min(1),
});

export const env = envSchema.parse(process.env);