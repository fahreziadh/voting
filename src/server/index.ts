import { z } from "zod";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  getHello: publicProcedure.query(async () => {
    return new Date().toISOString()
  }),
  getHelloById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return `Hello world ${input.id}`;
    }),
});

export type AppRouter = typeof appRouter;
