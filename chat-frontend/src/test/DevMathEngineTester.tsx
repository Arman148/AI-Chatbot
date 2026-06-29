import React, { useState } from "react";
import { PRACTICE_EXERCISES } from "../data/practice";
import { MathEnginePayload, PracticeExercise } from "../types/courseTypes";

type MathResponse = {
  original_latex: string;
  solution_steps: string[];
  final_answer: string;
};

type TestResult = {
  id: string;
  problemType: string;
  status: number;
  error: string | null;
  finalAnswer: string | null;
};

type ExerciseGroup = {
  groupId: string;
  topicId: string;
  instruction: string;
  exercises: PracticeExercise[];
};

const ENGINE_URL = "http://localhost:8000/solve";

export const DevMathEngineTester: React.FC = () => {
  const [results, setResults] = useState<TestResult[]>([]);
  const [running, setRunning] = useState(false);

  const runTests = async () => {
    setRunning(true);
    const allExercises = PRACTICE_EXERCISES.flatMap(
      (group: ExerciseGroup) => group.exercises,
    );
    const newResults: TestResult[] = [];

    for (const ex of allExercises) {
      const payload = ex.mathEnginePayload as MathEnginePayload | undefined;
      if (!payload) continue;

      try {
        const resp = await fetch(ENGINE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!resp.ok) {
          const errBody = await resp.text();
          newResults.push({
            id: ex.id,
            problemType: payload.problemType,
            status: resp.status,
            error: errBody,
            finalAnswer: null,
          });
        } else {
          const data = (await resp.json()) as MathResponse;
          newResults.push({
            id: ex.id,
            problemType: payload.problemType,
            status: 200,
            error: null,
            finalAnswer: data.final_answer,
          });
        }
      } catch (e: any) {
        newResults.push({
          id: ex.id,
          problemType: payload?.problemType ?? "",
          status: 0,
          error: e?.message ?? String(e),
          finalAnswer: null,
        });
      }

      setResults([...newResults]);
    }

    setRunning(false);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <button onClick={runTests} disabled={running}>
        {running ? "Running..." : "Run math engine tests"}
      </button>
      <p>Total results: {results.length}</p>
      <pre
        style={{
          maxHeight: "70vh",
          overflow: "auto",
          background: "#111",
          color: "#0f0",
          fontSize: 12,
        }}
      >
        {results
          .map(
            (r) =>
              `${r.id} [${r.problemType}] status=${r.status} ` +
              (r.error ? `ERROR=${r.error}` : `final=${r.finalAnswer}`),
          )
          .join("\n")}
      </pre>
    </div>
  );
};
