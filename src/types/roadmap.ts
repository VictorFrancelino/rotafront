export type RoadmapStep = {
  step: number;
  title: string;
  description: string;
  dependencies?: string[];
  resources?: {
    title: string;
    url: string;
  }[];
};
