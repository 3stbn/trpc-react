import { AppDataSource } from "../data-source";
import { tutorialEntity } from "../entity/tutorials";
import { t } from "../trpc";
import { z } from "zod";
import { tutorialStatusEnum, Tutorial } from "../../../lib";

const tutorialRepository = AppDataSource.getRepository(tutorialEntity);

type CreateInput = Omit<Tutorial, "id">;
type OptionalCreateInput = Partial<CreateInput>;
type PatchInput = Pick<OptionalCreateInput, "progress" | "status"> &
  Pick<Tutorial, "id">;

const createSchema = z.object({
  youtubeUrl: z.string(),
  title: z.string(),
  progress: z.number(),
  status: z.enum(tutorialStatusEnum),
});

const patchSchema = z.object({
  id: z.number(),
  progress: z.number().optional(),
  status: z.enum(tutorialStatusEnum).optional(),
});

export const tutorialRouter = t.router({
  list: t.procedure.query(() => {
    return tutorialRepository.find();
  }),
  getByStatus: t.procedure
    .input(
      z.object({
        status: z.enum(tutorialStatusEnum),
      })
    )
    .query((req) => {
      return tutorialRepository.find({
        where: {
          status: req.input.status,
        },
      });
    }),
  create: t.procedure.input(createSchema).mutation((req) => {
    req.input;
    return tutorialRepository.save(req.input);
  }),
  patch: t.procedure.input(patchSchema).mutation((req) => {
    const { id, ...rest } = req.input;
    return tutorialRepository.update(id, rest);
  }),
  delete: t.procedure.input(z.object({ id: z.number() })).mutation((req) => {
    return tutorialRepository.delete(req.input.id);
  }),
});
