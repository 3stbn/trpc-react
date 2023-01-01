import { EntitySchema } from "typeorm";
import { Tutorial, tutorialStatusEnum } from "../../../lib";

export const tutorialEntity = new EntitySchema<Tutorial>({
  name: "Tutorial",
  columns: {
    id: {
      type: Number,
      generated: true,
      primary: true,
    },
    youtubeUrl: {
      type: String,
    },
    title: {
      type: String,
    },
    progress: {
      type: Number,
    },
    status: {
      type: "simple-enum",
      enum: tutorialStatusEnum,
    },
  },
});
