import { AppDataSource } from "../data-source";
import { Tutorial, tutorialStatusEnum } from "../entity/Tutorial";
import { createRouter } from "../utils";
import { z } from "zod";
const tutorialRepository = AppDataSource.getRepository(Tutorial);

export const tutorials = createRouter()
  .query("list", {
    resolve: async () => {
      return await tutorialRepository.find();
    },
  })
  .mutation("create", {
    input: z.object({
      youtubeUrl: z.string(),
      title: z.string(),
      progress: z.number(),
      userId: z.number(),
      status: z.enum(tutorialStatusEnum),
    }),
    resolve: async ({ input }) => {
      return await tutorialRepository.save(input);
    },
  });
