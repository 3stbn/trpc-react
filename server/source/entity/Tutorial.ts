import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export const tutorialStatusEnum = [
  "completed",
  "inProgress",
  "watchLater",
] as const;

@Entity()
export class Tutorial {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  youtubeUrl: string;
  @Column()
  title: string;
  @Column()
  progress: number;
  @Column()
  userId: number;
  @Column({ type: "simple-enum", enum: tutorialStatusEnum })
  status: typeof tutorialStatusEnum[number];
}
