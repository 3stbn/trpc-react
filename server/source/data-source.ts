import { DataSource } from "typeorm";
import { tutorialEntity } from "./entity/tutorials";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: ":memory:",

  entities: [tutorialEntity],
  //only used for development
  synchronize: true,
  dropSchema: true,

  logging: true,
});
