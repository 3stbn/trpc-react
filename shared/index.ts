export const tutorialStatusEnum = [
  "completed",
  "inProgress",
  "watchLater",
] as const;

export type tutorialStatus = typeof tutorialStatusEnum[number];

export interface Tutorial {
  id: number;
  youtubeUrl: string;
  title: string;
  progress: number;
  status: tutorialStatus;
}
