import { COURSE_CONTENT } from "./course";

export interface SubthemeData {
  id: string;
  label: string;
}

export interface TopicData {
  id: string;
  label: string;
  subthemes: SubthemeData[];
}

export const TOPICS: TopicData[] = Object.values(COURSE_CONTENT).map(
  (topic) => ({
    id: topic.id, // e.g. "fourier_transform"
    label: topic.title, // e.g. "Fourierova transformácia"
    subthemes: topic.subthemes.map((sub) => ({
      id: sub.id,
      label: sub.title,
    })),
  }),
);

/*
import { COURSE_CONTENT } from "./course";

export interface TopicData {
  id: string;
  label: string;
}

export const TOPICS: TopicData[] = Object.values(COURSE_CONTENT).map(
  (topic) => ({
    id: topic.id, // e.g. "fourier_transform"
    label: topic.title, // e.g. "Fourierova transformácia"
  })
);
*/
