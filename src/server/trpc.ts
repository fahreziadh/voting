import { auth } from "@/lib/auth";
import { TRPCError, initTRPC } from "@trpc/server";
const t = initTRPC.create();

export const authMiddleware = t.middleware(async ({ next }) => {
  const session = await auth();
  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next();
});

export const router = t.router;
export const publicProcedure = t.procedure;

export const authedProcedure = t.procedure.use(authMiddleware);
