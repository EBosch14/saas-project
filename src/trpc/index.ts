import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { router, publicProcedure } from "./trpc";
import { TRPCError } from "@trpc/server";
import prismadb from "@/db";
export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = getUser();

    if (!user.id || !user.email) throw new TRPCError({ code: "UNAUTHORIZED" });

    const dbUser = await prismadb.user.findFirst({
      where: {
        id: user.id,
      },
    });

    if (!dbUser) {
      await prismadb.user.create({
        data: {
          id: user.id,
          email: user.email,
        },
      });
    }
  }),
});

export type AppRouter = typeof appRouter;
