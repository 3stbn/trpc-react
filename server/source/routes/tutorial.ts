import { AppDataSource } from "../data-source";
import { tutorialEntity } from "../entity/tutorials";
import { createRouter } from "../utils";
import { z } from "zod";
import { tutorialStatusEnum, Tutorial } from "local-shared";

const tutorialRepository = AppDataSource.getRepository(tutorialEntity);

type CreateInput = Omit<Tutorial, "id">;
type PatchInput = Partial<CreateInput> & Pick<Tutorial, "id">;

const createSchema: z.ZodType<CreateInput> = z.object({
  youtubeUrl: z.string(),
  title: z.string(),
  progress: z.number(),
  userId: z.number(),
  status: z.enum(tutorialStatusEnum),
});

const patchSchema: z.ZodType<PatchInput> = z.object({
  id: z.number(),
  progress: z.number(),
  status: z.enum(tutorialStatusEnum),
});

export const tutorials = createRouter()
  .query("list", {
    resolve: async () => {
      return await tutorialRepository.find();
    },
  })
  .query("getByStatus", {
    input: z.object({
      status: z.enum(tutorialStatusEnum),
    }),
    resolve: async ({ input }) => {
      return await tutorialRepository.find({
        where: {
          status: input.status,
        },
      });
    },
  })
  .mutation("create", {
    input: createSchema,
    resolve: async ({ input }) => {
      return await tutorialRepository.save(input);
    },
  })
  .mutation("patch", {
    input: patchSchema,
    resolve: async ({ input }) => {
      return await tutorialRepository.update(input.id, input);
    },
  })
  .mutation("delete", {
    input: z.object({
      id: z.number(),
    }),
    resolve: async ({ input }) => {
      return await tutorialRepository.delete(input.id);
    },
  });
