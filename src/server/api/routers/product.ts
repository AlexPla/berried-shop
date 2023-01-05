import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.product.findMany();
  }),
  getOne: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.product.findUnique({ where: { id: input } });
  }),
  create: publicProcedure
    .input(z.object({ name: z.string(), price: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.product.create({
        data: { name: input.name, price: input.price },
      });
    }),
});
