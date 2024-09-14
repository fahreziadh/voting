import { auth } from "@/lib/auth";
import { inferAsyncReturnType } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

// The app's context - is generated for each incoming request
export async function createContext(opts?: trpcNext.CreateNextContextOptions) {
  const session = await auth();

  return {
    session,
  };
}
export type Context = inferAsyncReturnType<typeof createContext>;
