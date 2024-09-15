import { z } from "zod";
import { authedProcedure, publicProcedure, router } from "./trpc";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { vote } from "@/lib/db/schema";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  profile: publicProcedure.query(async ({}) => {
    return await auth();
  }),

  // Create a new Vote
  createVote: authedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        options: z
          .array(
           z.string()
          )
          .min(2),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session?.user?.id;
      if (!userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }
      return await db
        .insert(vote)
        .values({
          userId,
          options: input.options,
          title: input.title,
        })
        .returning();
    }),

  // List all Votes by userId
  listVotesByUser: authedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user?.id;
    if (!userId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
      });
    }
    return await db.query.vote.findMany({
      orderBy(fields, { desc }) {
        return desc(fields.createdAt);
      },
    });
  }),

  // Get Vote by id
  getVote: authedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const userId = ctx.session?.user?.id;
      if (!userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }
      return await db.query.vote.findFirst({
        where(fields, { eq }) {
          return eq(fields.id, input.id);
        },
      });
    }),
});

export type AppRouter = typeof appRouter;
