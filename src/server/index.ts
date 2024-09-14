import { z } from "zod";
import { authedProcedure, publicProcedure, router } from "./trpc";
import { auth } from "@/lib/auth";

export const appRouter = router({
  profile: publicProcedure.query(async ({}) => {
    return await auth();
  }),

  // Create a new Vote
  createVote: authedProcedure
    .input(
      z
        .array(
          z.object({
            id: z.string(),
            item: z.string(),
          })
        )
        .min(2)
    )
    .mutation(async ({ input,ctx }) => {
      return input;
    }),
});

export type AppRouter = typeof appRouter;
