import { DataSource } from "typeorm";
import { Tutorial } from "./entity/Tutorial";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: ":memory:",

  entities: [Tutorial],
  //only used for development
  synchronize: true,
  dropSchema: true,

  logging: true,
});
