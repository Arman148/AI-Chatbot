export type CourseExample = {
  id: string;
  problem: string;
  solutionSteps?: string[];
};

export type CourseQuestion = {
  id: string;
  prompt: string;
  correctAnswer?: string; // Optional: can be string or later expression/JSON
  difficulty?: "easy" | "medium" | "hard";
};

export type CourseSection =
  | {
      id: string;
      type: "theory";
      title: string;
      paragraphs: string[];
      formulas?: string[];
    }
  | {
      id: string;
      type: "worked_examples";
      title: string;
      examples: CourseExample[];
    }
  | {
      id: string;
      type: "exercises";
      title: string;
      exercises: CourseQuestion[];
    };

export type CourseTopic = {
  id: string;
  title: string;
  sections: CourseSection[];
};

export const COURSE_CONTENT: Record<string, CourseTopic> = {
  fourier_transform: {
    id: "fourier_transform",
    title: "Fourierova transformácia",
    sections: [
      {
        id: "intro",
        type: "theory",
        title: "Úvod do Fourierovej transformácie",
        paragraphs: ["Fourierova transformácia je ..."],
        formulas: [
          "F(\\omega) = \\int_{-\\infty}^{\\infty} f(t) e^{-i \\omega t} dt",
        ],
      },
      {
        id: "examples_1",
        type: "worked_examples",
        title: "Príklady s riešením",
        examples: [
          {
            id: "ex18",
            problem: "Vypočítajte Fourierov obraz funkcie f(t) = ...",
            solutionSteps: [
              "1. Najprv dosadíme definíciu Fourierovej transformácie...",
              "2. Upravíme integrál pomocou ...",
            ],
          },
        ],
      },
      {
        id: "exercises_1",
        type: "exercises",
        title: "Cvičenia",
        exercises: [
          {
            id: "task1",
            prompt: "Nájdite Fourierov obraz funkcie f(t) = e^{-a|t|}, a > 0.",
          },
        ],
      },
    ],
  },
};
