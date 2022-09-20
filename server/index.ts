import * as trpcExpress from "@trpc/server/adapters/express";

import cors from "cors";
import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./source/data-source";
import { createContext, t } from "./source/trpc";
import { tutorialRouter } from "./source/routes/tutorial";
const PORT = 4000;

async function connectDb() {
  try {
    await AppDataSource.initialize();
    console.log("Connected to database");
  } catch (error) {
    console.log("Error connecting to database", error);
  }
}

const appRouter = t.router({
  tutorial: tutorialRouter,
});

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

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));
  app.get("*", (req, res) => {
    res.sendFile("../client/build/index.html");
  });
}

async function main() {
  await connectDb();
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
}

main();
