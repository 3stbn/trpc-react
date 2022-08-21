import * as trpcExpress from "@trpc/server/adapters/express";
import * as trpc from "@trpc/server";
import cors from "cors";
import express from "express";
import { z } from "zod";
import "reflect-metadata";
import { AppDataSource } from "./source/data-source";
import { createRouter } from "./source/utils";
import { tutorials } from "./source/routes/tutorial";
const PORT = 4000;

async function connectDb() {
  try {
    await AppDataSource.initialize();
    console.log("Connected to database");
  } catch (error) {
    console.log("Error connecting to database", error);
  }
}

const appRouter = createRouter().merge("tutorial.", tutorials);

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context

export type Context = trpc.inferAsyncReturnType<typeof createContext>;

export type AppRouter = typeof appRouter;

const app = express();

app.use(cors());
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

async function main() {
  await connectDb();
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
}

main();
