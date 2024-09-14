
import { env } from '@/lib/env'
import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./src/lib/db/generated",
  dialect: 'sqlite',
  driver: "turso",
  dbCredentials: {
    url: env.TURSO_AUTH_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  },
  verbose: true,
  strict: true,
})