export type RoadmapStep = {
  step: number;
  title: string;
  description: string;
  resources?: {
    title: string;
    url: string;
  }[];
};
