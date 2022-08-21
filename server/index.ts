import * as trpcExpress from '@trpc/server/adapters/express';
import * as trpc from '@trpc/server';
import express from 'express';

const appRouter = trpc
  .router()
  .query('helloWorld', {
    async resolve() {
      return { message: 'Hello World' };
    },
  })



export type AppRouter = typeof appRouter;

const app = express();


app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
);

app.listen(4000);