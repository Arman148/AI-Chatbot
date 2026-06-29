// src/types/course.ts

export type CourseExample = {
  id: string;
  problem: string;
  solutionSteps?: string[];
  relatedTheorySectionId?: string;
  difficulty?: "easy" | "medium" | "hard";
  tags?: string[];
};

export type CourseQuestion = {
  id: string;
  prompt: string;
  correctAnswer?: string;
  difficulty?: "easy" | "medium" | "hard";
};

export type FormulaMap = Record<string, string>;

export type CourseLeafSection =
  | {
      id: string;
      type: "theory";
      title: string;
      paragraphs: string[];
      formulas?: FormulaMap;
      intuitiveExplanation?: string[];
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

export type CourseSubtheme = {
  id: string;
  title: string;
  sections: CourseLeafSection[];
};

export type CourseTopic = {
  id: string;
  title: string;
  subthemes: CourseSubtheme[];
};

// --- NEW MATH ENGINE TYPES ---

// --- FINAL MATH ENGINE TYPES ---

export type MathEngineProblemType =
  // General/Theory
  | "theory"
  // Fourier
  | "fourier_direct"
  | "fourier_inverse"
  | "fourier_properties"
  | "fourier_convolution"
  | "fourier_ode"
  // Laplace
  | "laplace_direct"
  | "laplace_periodic" // Specifically for exercises 23-24
  | "laplace_inverse"
  | "laplace_convolution"
  | "laplace_ode"
  | "laplace_system_ode" // Systems of equations
  // Z-Transform
  | "z_transform_direct"
  | "z_transform_inverse"
  | "z_transform_difference_eq";

export interface MathEnginePayload {
  problemType: MathEngineProblemType;

  // The main expression to transform, or the LHS of an equation
  expression: string;

  // The variables involved (e.g., "t,p" for Laplace, "n,z" for Z-transform, "x,y,t" for systems)
  variables: string;

  // Mathematical assumptions required for convergence (e.g., ["a > 0", "b > a", "p > 0"])
  assumptions?: string[];

  // For ODEs and Difference Equations: The RHS of the equation
  equationRightSide?: string;

  // For ODEs and Difference Equations: The initial values (e.g., ["x(0)=1", "x'(0)=0", "y_0=1", "y_1=4"])
  initialConditions?: string[];

  // For periodic functions: The period T
  period?: string;

  // For systems of ODEs: Additional equations if it's a system
  systemEquations?: string[];
}

export type PracticeExercise = {
  id: string;
  prompt: string;
  mathEnginePayload?: MathEnginePayload;
  correctAnswer?: string;
  difficulty?: "easy" | "medium" | "hard";
  tags?: string[];
};

export interface ExerciseGroup {
  groupId: string;
  topicId: string;
  instruction: string;
  exercises: PracticeExercise[];
}
