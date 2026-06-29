// src/hooks/useChat.ts

import { useEffect, useRef, useState } from "react";
import { TOPICS, TopicData } from "../data/topics";
import { COURSE_CONTENT } from "../data/course";
import { PRACTICE_EXERCISES } from "../data/practice";
import { chatService } from "../services/ai/chatService";
import { v4 as uuidv4 } from "uuid";
import { ChatMessage, OpenAIMessage } from "../types/chat";
import {
  ExerciseGroup,
  MathEnginePayload,
  PracticeExercise,
} from "../types/courseTypes";

type ApiClient = (input: RequestInfo, init?: RequestInit) => Promise<Response>;

interface UseChatOptions {
  isAuthenticated: boolean;
  isAuthLoading: boolean;
}

interface UseChat {
  topics: TopicData[];
  currentTopic: TopicData | null;
  activeSubthemeId: string | null;
  isTestMode: boolean;
  messages: ChatMessage[];
  isTyping: boolean;
  selectTopic: (id: string) => void;
  selectSubtheme: (id: string) => void;
  sendMessage: (content: string) => Promise<void>;
  requestTest: () => void;
}

interface MathEngineResponse {
  original_latex: string;
  solution_steps: string[];
  final_answer: string;
}

interface TestExerciseRuntime {
  id: string;
  prompt: string;
  difficulty?: "easy" | "medium" | "hard";
  correctAnswer?: string;
  mathEnginePayload?: MathEnginePayload;
  verifiedSolution: MathEngineResponse | null;
}

interface ActiveTestSession {
  topicId: string;
  exercises: TestExerciseRuntime[];
  currentIndex: number;
  completed: boolean;
}

interface ProfileExamplesSolvedItem {
  id: string;
  difficulty: "easy" | "medium" | "hard";
  success: boolean;
}

// ---------------------------------------------------------------------------
// MATH ENGINE HELPER
// ---------------------------------------------------------------------------

async function callMathEngine(
  payload: MathEnginePayload,
): Promise<MathEngineResponse | null> {
  try {
    const res = await fetch("http://localhost:8000/solve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) return null;
    return (await res.json()) as MathEngineResponse;
  } catch (e) {
    console.error("Math engine call failed:", e);
    return null;
  }
}

// ---------------------------------------------------------------------------
// DETECT IF USER WANTS A SOLUTION FOR A SPECIFIC EXERCISE
// ---------------------------------------------------------------------------

function findRequestedExercisePayload(
  userMessage: string,
  topicId: string,
): MathEnginePayload | null {
  const wantsSolution =
    /vyrie[sš]|rie[sš]enie|rie[sš]te|postup|krok|solv|solution|step/i.test(
      userMessage,
    );

  if (!wantsSolution) return null;

  const allGroups = PRACTICE_EXERCISES.filter((g) => g.topicId === topicId);

  for (const group of allGroups) {
    for (const ex of group.exercises) {
      const idPattern = new RegExp(ex.id.replace(/_/g, "[_]?"), "i");
      if (idPattern.test(userMessage) && ex.mathEnginePayload) {
        return ex.mathEnginePayload;
      }
    }
  }

  return null;
}

// ---------------------------------------------------------------------------
// DETECT HOW MANY EXERCISES USER WANTS (default: 5, max: 15)
// ---------------------------------------------------------------------------

function detectRequestedCount(userMessage: string): number {
  const match = userMessage.match(/\b(\d+)\b/);
  if (match) {
    const n = parseInt(match[1], 10);
    return Math.min(Math.max(n, 1), 15);
  }
  return 5;
}

// ---------------------------------------------------------------------------
// DETECT IF USER WANTS TO PRACTICE WITHOUT SOLUTIONS
// ---------------------------------------------------------------------------

function wantsPracticeOnly(userMessage: string): boolean {
  return /sám|sama|bez rie[sš]|without sol|on my own|by myself|only problem|len úloh|len zadani/i.test(
    userMessage,
  );
}

// ---------------------------------------------------------------------------
// NORMALIZE LEGACY PROBLEM TYPE NAMES IF NEEDED
// ---------------------------------------------------------------------------

function normalizeMathEnginePayload(
  payload?: MathEnginePayload,
): MathEnginePayload | undefined {
  if (!payload) return undefined;

  const remap: Record<string, MathEnginePayload["problemType"]> = {
    fourierdirect: "fourier_direct",
    fourierinverse: "fourier_inverse",
    fourierproperties: "fourier_properties",
    fourierconvolution: "fourier_convolution",
    fourierode: "fourier_ode",
    laplacedirect: "laplace_direct",
    laplaceperiodic: "laplace_periodic",
    laplaceinverse: "laplace_inverse",
    laplaceconvolution: "laplace_convolution",
    laplaceode: "laplace_ode",
    laplacesystemode: "laplace_system_ode",
    ztransformdirect: "z_transform_direct",
    ztransforminverse: "z_transform_inverse",
    ztransformdifferenceeq: "z_transform_difference_eq",
  };

  const normalizedType =
    remap[payload.problemType as string] ?? payload.problemType;

  return {
    ...payload,
    problemType: normalizedType,
  };
}

// ---------------------------------------------------------------------------
// BUILD TOPIC CONTEXT
// ---------------------------------------------------------------------------

function buildTopicContext(
  topicId: string,
  activeSubthemeId: string | null,
  userMessage: string,
): { context: string; practiceOnlyMode: boolean } {
  const courseTopic = COURSE_CONTENT[topicId];
  if (!courseTopic) return { context: "", practiceOnlyMode: false };

  const activeSub =
    activeSubthemeId != null
      ? courseTopic.subthemes.find((s) => s.id === activeSubthemeId) || null
      : null;

  let contextText = `COURSE THEORY FOR: ${courseTopic.title}\n\n`;

  if (activeSub) {
    contextText += `CURRENT FOCUSED SUBTHEME: ${activeSub.title}\n\n`;
  } else {
    contextText += `CURRENT FOCUSED SUBTHEME: (none explicitly selected)\n\n`;
  }

  courseTopic.subthemes.forEach((subtheme) => {
    contextText += `===== COURSE SUBTHEME: ${subtheme.title} =====\n\n`;

    const theorySections = subtheme.sections.filter((s) => s.type === "theory");

    theorySections.forEach((section) => {
      if (section.type !== "theory") return;

      contextText += `--- ${section.title} ---\n`;

      section.paragraphs.forEach((p) => {
        let text = p;

        if (section.formulas) {
          Object.entries(section.formulas).forEach(([key, latex]) => {
            const placeholder = `{{${key}}}`;
            const rendered = ` $${latex}$ `;
            text = text.split(placeholder).join(rendered);
          });
        }

        contextText += text + "\n";
      });

      contextText += "\n";
    });

    const exampleSections = subtheme.sections.filter(
      (s) => s.type === "worked_examples",
    );

    if (exampleSections.length > 0) {
      contextText += `WORKED EXAMPLES FOR SUBTHEME: ${subtheme.title}\n\n`;

      exampleSections.forEach((section) => {
        if (section.type !== "worked_examples") return;

        contextText += `--- ${section.title} ---\n`;

        section.examples.forEach((ex, idx) => {
          contextText += `Príklad ${idx + 1}: `;

          let problemText = ex.problem;
          problemText = problemText.replace(
            /(f_a?\(t\)\s*=\s*[^,;]+)|(f\(t\)\s*=\s*[^,;]+)|(u\(t\)\s*=\s*[^,;]+)|(i\(t\)\s*=\s*[^,;]+)/g,
            (match) => `$${match}$`,
          );

          contextText += problemText + "\n";

          if (ex.solutionSteps && ex.solutionSteps.length > 0) {
            contextText += "Solution (steps):\n";
            ex.solutionSteps.forEach((step, stepIdx) => {
              contextText += ` ${stepIdx + 1}. ${step}\n`;
            });
          }

          contextText += "\n";
        });
      });
    }

    contextText += "\n";
  });

  const wantsPractice =
    /cvičenia?|úlohu?|príklad|exercise|example|examples|practice|task|problem|ukáž|daj|ukaž/i.test(
      userMessage,
    );

  const practiceOnlyMode = wantsPracticeOnly(userMessage);
  const requestedCount = detectRequestedCount(userMessage);

  if (wantsPractice) {
    const groupsForTopic = PRACTICE_EXERCISES.filter(
      (group) => group.topicId === topicId,
    );

    if (groupsForTopic.length > 0) {
      contextText +=
        "===== PRACTICE EXERCISES FOR THIS TOPIC (CVIČENIA) =====\n\n";

      groupsForTopic.forEach((group, gIdx) => {
        contextText += `--- Skupina Úloh ${gIdx + 1} ---\n`;
        contextText += `Inštrukcia: ${group.instruction}\n\n`;

        const limitedExercises = group.exercises.slice(0, requestedCount);

        limitedExercises.forEach((ex, eIdx) => {
          contextText += `Cvičenie ${eIdx + 1} (ID: ${ex.id}):\n`;
          contextText += `${ex.prompt}\n`;

          if (ex.correctAnswer && !practiceOnlyMode) {
            contextText += `Očakávaný výsledok (len pre tvoju internú kontrolu, nezverejňuj ho hneď bez výkladu): ${ex.correctAnswer}\n`;
          }

          contextText += "\n";
        });
      });
    }
  }

  return { context: contextText, practiceOnlyMode };
}

// ---------------------------------------------------------------------------
// NORMALIZE AI MATH OUTPUT
// ---------------------------------------------------------------------------

function normalizeMath(text: string): string {
  let out = text;

  out = out.replace(/\\\((.+?)\\\)/g, (_m, inner) => `$${inner}$`);
  out = out.replace(/\\\[(.+?)\\\]/g, (_m, inner) => `$$${inner}$$`);
  out = out.replace(/\$([^$]+)\.\$/g, (_m, inner) => `$${inner}$.`);
  out = out.replace(/(\$[^$\n]+?\)\.)/g, (match) => {
    const dollarCount = (match.match(/\$/g) || []).length;
    if (dollarCount === 1) {
      return match.replace(/\)\.$/, ")$.");
    }
    return match;
  });

  return out;
}

// ---------------------------------------------------------------------------
// DERIVE TEST CONVERSATION ID FROM TOPIC ID
// ---------------------------------------------------------------------------

function testConversationId(topicId: string): string {
  return `${topicId}__test`;
}

// ---------------------------------------------------------------------------
// SCORE EXTRACTION
// ---------------------------------------------------------------------------

function extractTestScore(
  text: string,
): { correct: number; total: number } | null {
  const patterns = [
    /\b(\d+)\s*\/\s*(\d+)\s*(správn|correct)/i,
    /(?:sk[oó]re|score)\s*[:—\-]?\s*(\d+)\s*\/\s*(\d+)/i,
    /\b(\d+)\s+z\s+(\d+)\s*(správn|úloh|bod)/i,
    /z[íi]skal[a]?\s+si\s+(\d+)\s+z\s+(\d+)/i,
    /\b(\d+)\s*\/\s*(\d+)\b(?=\s*(?:úloh|bodov|$))/im,
  ];

  for (const pattern of patterns) {
    const m = text.match(pattern);
    if (m) {
      const correct = parseInt(m[1], 10);
      const total = parseInt(m[2], 10);

      if (!isNaN(correct) && !isNaN(total) && total > 0) {
        return { correct, total };
      }
    }
  }

  return null;
}

// ---------------------------------------------------------------------------
// TEST SESSION HELPERS
// ---------------------------------------------------------------------------

function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function getTopicPracticeExercises(topicId: string): PracticeExercise[] {
  return PRACTICE_EXERCISES.filter(
    (group: ExerciseGroup) => group.topicId === topicId,
  )
    .flatMap((group) => group.exercises)
    .map((ex) => ({
      ...ex,
      mathEnginePayload: normalizeMathEnginePayload(ex.mathEnginePayload),
    }));
}

function pickExercisesForTest(topicId: string, count = 3): PracticeExercise[] {
  const allExercises = getTopicPracticeExercises(topicId);

  const withEngine = allExercises.filter((ex) => ex.mathEnginePayload);
  const pool = withEngine.length >= count ? withEngine : allExercises;

  return shuffleArray(pool).slice(0, count);
}

async function buildTestSession(topicId: string): Promise<ActiveTestSession> {
  const selected = pickExercisesForTest(topicId, 3);

  const exercises: TestExerciseRuntime[] = await Promise.all(
    selected.map(async (ex) => {
      let verifiedSolution: MathEngineResponse | null = null;

      if (ex.mathEnginePayload) {
        verifiedSolution = await callMathEngine(ex.mathEnginePayload);
      }

      return {
        id: ex.id,
        prompt: ex.prompt,
        difficulty: ex.difficulty,
        correctAnswer: ex.correctAnswer,
        mathEnginePayload: ex.mathEnginePayload,
        verifiedSolution,
      };
    }),
  );

  return {
    topicId,
    exercises,
    currentIndex: 0,
    completed: false,
  };
}

function buildSingleTaskMessage(session: ActiveTestSession): string {
  const current = session.exercises[session.currentIndex];
  const taskNumber = session.currentIndex + 1;
  const total = session.exercises.length;

  return [
    `Test začína. Budeme robiť úlohy po jednej.`,
    ``,
    `Úloha ${taskNumber}/${total} (ID: ${current.id})`,
    `${current.prompt}`,
    ``,
    `Napíš svoje riešenie alebo aspoň finálny výsledok. Keď odpovieš, skontrolujem ho a potom ti pošlem ďalšiu úlohu.`,
  ].join("\n");
}

function buildNextTaskMessage(session: ActiveTestSession): string {
  const current = session.exercises[session.currentIndex];
  const taskNumber = session.currentIndex + 1;
  const total = session.exercises.length;

  return [
    `Pokračujeme ďalšou úlohou.`,
    ``,
    `Úloha ${taskNumber}/${total} (ID: ${current.id})`,
    `${current.prompt}`,
    ``,
    `Napíš svoje riešenie alebo finálny výsledok.`,
  ].join("\n");
}

function buildVerifiedSolutionBlock(exercise: TestExerciseRuntime): string {
  const solutionSource =
    exercise.verifiedSolution?.final_answer || exercise.correctAnswer || "";

  const solutionSteps = exercise.verifiedSolution?.solution_steps?.length
    ? exercise.verifiedSolution.solution_steps
        .map((step, index) => `${index + 1}. ${step}`)
        .join("\n")
    : "Nie sú dostupné overené medzikroky z math engine.";

  return `
===== VERIFIED TEST EXERCISE =====
Exercise ID: ${exercise.id}
Problem:
${exercise.prompt}

Verified final answer:
${solutionSource || "Nedostupné."}

Verified solution steps:
${solutionSteps}
=================================
`;
}

// ---------------------------------------------------------------------------
// useChat HOOK
// ---------------------------------------------------------------------------

export function useChat(
  apiClient: ApiClient,
  { isAuthenticated, isAuthLoading }: UseChatOptions,
): UseChat {
  const [topics] = useState<TopicData[]>(TOPICS);
  const [currentTopic, setCurrentTopic] = useState<TopicData | null>(
    topics[0] ?? null,
  );
  const [activeSubthemeId, setActiveSubthemeId] = useState<string | null>(
    topics[0]?.subthemes[0]?.id ?? null,
  );
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const [activeConversationId, setActiveConversationId] = useState<string>(
    topics[0]?.id ?? "",
  );

  const [isTestMode, setIsTestMode] = useState(false);

  const skipNextHistoryLoad = useRef(false);

  const testExerciseIdsRef = useRef<string[]>([]);
  const testResultsRef = useRef<Record<string, boolean>>({});
  const activeTestSessionRef = useRef<ActiveTestSession | null>(null);
  const didSaveCurrentTestRef = useRef(false);

  // ---------------------------------------------------------------------------
  // Load history whenever the active conversation channel changes
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (isAuthLoading || !isAuthenticated || !activeConversationId) return;

    if (skipNextHistoryLoad.current) {
      skipNextHistoryLoad.current = false;
      return;
    }

    const loadHistory = async () => {
      try {
        const res = await apiClient(
          `http://localhost:5000/api/messages?topicId=${activeConversationId}`,
        );

        if (!res.ok) {
          console.error("Failed to fetch messages for:", activeConversationId);
          return;
        }

        const data = await res.json();

        const mapped: ChatMessage[] = data.map((m: any) => ({
          id: m._id,
          role: m.role,
          content: m.content,
          timestamp: new Date(m.timestamp).getTime(),
        }));

        setMessages(mapped);
      } catch (e) {
        console.error("Failed to load history:", e);
      }
    };

    loadHistory();
  }, [apiClient, isAuthenticated, isAuthLoading, activeConversationId]);

  // ---------------------------------------------------------------------------
  // Topic selection
  // ---------------------------------------------------------------------------

  function selectTopic(id: string) {
    const found = topics.find((t) => t.id === id) ?? null;

    console.log(">>> Switching topic to:", id);

    setMessages([]);
    setCurrentTopic(found);
    setActiveConversationId(found?.id ?? "");

    if (found && found.subthemes.length > 0) {
      setActiveSubthemeId(found.subthemes[0].id);
    } else {
      setActiveSubthemeId(null);
    }

    setIsTestMode(false);
    testExerciseIdsRef.current = [];
    testResultsRef.current = {};
    activeTestSessionRef.current = null;
    didSaveCurrentTestRef.current = false;
  }

  // ---------------------------------------------------------------------------
  // Subtheme selection
  // ---------------------------------------------------------------------------

  function selectSubtheme(id: string) {
    console.log(">>> selectSubtheme called with:", id);

    setActiveSubthemeId(id);

    if (isTestMode) {
      if (currentTopic) {
        setActiveConversationId(currentTopic.id);
      }

      setIsTestMode(false);
      testExerciseIdsRef.current = [];
      testResultsRef.current = {};
      activeTestSessionRef.current = null;
      didSaveCurrentTestRef.current = false;
    }
  }

  // ---------------------------------------------------------------------------
  // Save test result to UserProfile
  // ---------------------------------------------------------------------------

  async function saveTestResultToProfile(
    topicId: string,
    score: { correct: number; total: number },
  ) {
    if (didSaveCurrentTestRef.current) {
      console.log(
        ">>> Test result already saved for current session, skipping.",
      );
      return;
    }

    const mastery = score.correct / score.total;
    const newStatus = mastery >= 0.67 ? "mastered" : "inprogress";

    const examplesSolved: ProfileExamplesSolvedItem[] =
      testExerciseIdsRef.current.map((id) => ({
        id,
        difficulty:
          activeTestSessionRef.current?.exercises.find((ex) => ex.id === id)
            ?.difficulty || "medium",
        success: testResultsRef.current[id] === true,
      }));

    const payload = {
      mastery,
      status: newStatus,
      ...(examplesSolved.length > 0 ? { examplesSolved } : {}),
    };

    try {
      const res = await apiClient(
        `http://localhost:5000/api/profile/topics/${topicId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.error(
          `Failed to save test result to profile: ${res.status} ${res.statusText}`,
          errorText,
        );
        return;
      }

      const updatedProfile = await res.json();

      didSaveCurrentTestRef.current = true;

      console.log(">>> Profile updated successfully:", {
        topicId,
        mastery,
        status: newStatus,
        examplesSolvedCount: examplesSolved.length,
        updatedProfile,
      });
    } catch (e) {
      console.error("Failed to save test result to profile:", e);
    }
  }

  // ---------------------------------------------------------------------------
  // requestTest — deterministic one-task-at-a-time test
  // ---------------------------------------------------------------------------

  async function requestTest() {
    if (!currentTopic) return;

    const testId = testConversationId(currentTopic.id);
    console.log(">>> Starting deterministic test conversation:", testId);

    setIsTyping(true);

    try {
      const session = await buildTestSession(currentTopic.id);
      activeTestSessionRef.current = session;
      testExerciseIdsRef.current = session.exercises.map((ex) => ex.id);
      testResultsRef.current = {};
      didSaveCurrentTestRef.current = false;

      setIsTestMode(true);

      const introMsg: ChatMessage = {
        id: uuidv4(),
        role: "assistant",
        content: buildSingleTaskMessage(session),
        timestamp: Date.now(),
      };

      skipNextHistoryLoad.current = true;
      setMessages([introMsg]);
      setActiveConversationId(testId);

      try {
        await apiClient("http://localhost:5000/api/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: introMsg.content,
            role: "assistant",
            topicId: testId,
          }),
        });
      } catch (e) {
        console.error("Failed to save initial test assistant message:", e);
      }
    } catch (e) {
      console.error("Failed to initialize test session:", e);

      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          role: "assistant",
          content: "Nepodarilo sa pripraviť test. Skús to prosím ešte raz.",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  // ---------------------------------------------------------------------------
  // Handle deterministic one-by-one test answer
  // ---------------------------------------------------------------------------

  async function handleTestAnswer(content: string): Promise<boolean> {
    if (!currentTopic || !isTestMode) return false;

    const session = activeTestSessionRef.current;
    if (!session || session.completed) return false;

    const currentExercise = session.exercises[session.currentIndex];
    const verifiedBlock = buildVerifiedSolutionBlock(currentExercise);

    const systemPrompt: OpenAIMessage = {
      role: "system",
      content: `You are a strict and precise university mathematics tutor teaching in Slovak.

You are grading ONE test answer for ONE specific exercise.
Respond ONLY in Slovak.

Rules:
- Judge the student's answer ONLY against the verified solution below.
- Be concise, fair, and precise.
- If the final result is mathematically correct, mark it as correct even if the student omitted steps.
- If it is partially correct, explain the main mistake briefly.
- Use LaTeX for all mathematics.
- End with EXACTLY one of these machine-readable lines:
RESULT: CORRECT
or
RESULT: INCORRECT

${verifiedBlock}`,
    };

    const apiMessages: OpenAIMessage[] = [
      systemPrompt,
      { role: "user", content },
    ];

    const rawAiContent = await chatService.fetchResponse(apiMessages);
    const aiContent = normalizeMath(rawAiContent);

    const isCorrect = /RESULT:\s*CORRECT/i.test(aiContent);

    const cleanedFeedback = aiContent
      .replace(/RESULT:\s*CORRECT/i, "")
      .replace(/RESULT:\s*INCORRECT/i, "")
      .trim();

    testResultsRef.current[currentExercise.id] = isCorrect;

    const nextIndex = session.currentIndex + 1;
    const isLast = nextIndex >= session.exercises.length;

    let finalAssistantContent = cleanedFeedback;

    if (isLast) {
      session.completed = true;
      activeTestSessionRef.current = session;

      const correct = Object.values(testResultsRef.current).filter(
        Boolean,
      ).length;
      const total = session.exercises.length;

      finalAssistantContent = [
        cleanedFeedback,
        "",
        `Test je hotový.`,
        `Skóre: ${correct}/${total} správne.`,
        correct >= 2
          ? "Veľmi dobré. V tejto téme máš solídny základ."
          : "Odporúčam ešte prejsť si teóriu alebo si skúsiť ďalší test.",
      ]
        .filter(Boolean)
        .join("\n");

      await saveTestResultToProfile(currentTopic.id, { correct, total });
    } else {
      session.currentIndex = nextIndex;
      activeTestSessionRef.current = session;

      finalAssistantContent = [
        cleanedFeedback,
        "",
        buildNextTaskMessage(session),
      ]
        .filter(Boolean)
        .join("\n");
    }

    const aiMsg: ChatMessage = {
      id: uuidv4(),
      role: "assistant",
      content: finalAssistantContent,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, aiMsg]);

    try {
      await apiClient("http://localhost:5000/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: finalAssistantContent,
          role: "assistant",
          topicId: activeConversationId,
        }),
      });
    } catch (e) {
      console.error("Failed to save assistant test feedback:", e);
    }

    return true;
  }

  // ---------------------------------------------------------------------------
  // sendMessage
  // ---------------------------------------------------------------------------

  async function sendMessage(content: string) {
    if (!currentTopic || !content.trim()) return;

    const userMsg: ChatMessage = {
      id: uuidv4(),
      role: "user",
      content,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);

    try {
      await apiClient("http://localhost:5000/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          role: "user",
          topicId: activeConversationId,
        }),
      });
    } catch (e) {
      console.error("Failed to save user message:", e);
    }

    setIsTyping(true);

    try {
      if (isTestMode) {
        const handled = await handleTestAnswer(content);
        if (handled) return;
      }

      const { context: courseContext, practiceOnlyMode } = buildTopicContext(
        currentTopic.id,
        activeSubthemeId,
        content,
      );

      let mathEngineBlock = "";

      const exercisePayload = findRequestedExercisePayload(
        content,
        currentTopic.id,
      );

      if (exercisePayload) {
        console.log(
          "Math engine: detected solution request, calling engine...",
        );

        const normalizedPayload = normalizeMathEnginePayload(exercisePayload);
        const engineResult = normalizedPayload
          ? await callMathEngine(normalizedPayload)
          : null;

        if (engineResult) {
          console.log("Math engine result:", engineResult);

          mathEngineBlock = `
===== VERIFIED COMPUTED SOLUTION (from Math Engine) =====
The following solution was computed symbolically and is mathematically verified.
Present these steps to the student in Slovak, step by step, using proper LaTeX formatting.

Original: ${engineResult.original_latex}

Steps:
${engineResult.solution_steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}

Final answer: ${engineResult.final_answer}
==========================================================
`;
          console.log("Math engine result injected into prompt.");
        } else {
          console.warn("Math engine returned null — falling back to AI only.");
        }
      }

      const baseSystemIntro = `You are a strict and precise university mathematics tutor teaching in Slovak.
The student is studying the topic: "${currentTopic.label}".

The course topic has multiple subthemes. One subtheme is marked as the current focus, but you MAY freely use information from other subthemes of this topic when it helps the explanation.
`;

      const systemPrompt: OpenAIMessage = {
        role: "system",
        content: `${baseSystemIntro}
YOUR INSTRUCTIONS:
1. Source of Truth: You must base your explanations ONLY on the official course material provided below. Do not introduce outside notation or definitions unless necessary for basic understanding.
2. Language: Respond ONLY in Slovak (Slovenský jazyk).
3. Math Formatting (CRITICAL):
- You MUST use LaTeX for all mathematical expressions.
- For inline math, wrap code in single dollar signs: $x^2$
- For block equations, wrap code in double dollar signs:
$$
\\int f(x) dx
$$
- NEVER use \\( ... \\) or \\[ ... \\].
- NEVER use plain text for variables (e.g. write "$x$" instead of "x").
- Keď veta končí vzorcom, vždy daj interpunkciu MIMO matematického bloku, napríklad "$f(t) = e^{-at^2}$." a nikdy nie "$f(t) = e^{-at^2}.$".
4. Style:
- Be concise and academic but clear.
- When introducing a formula, write it exactly as defined v materiáli najprv.
- Explain variables using the exact names from the material.
5. When you present practice exercises:
- Label them clearly as "Úloha 1", "Úloha 2", atď.
- Show ONLY the problem statement — the mathematical expression from the prompt field.
- Show the exercise ID in parentheses after the label so the student can reference it later, e.g. "Úloha 1 (ID: laplace_ex_1):".
- Do NOT reveal the correct answer or solution steps unless the student explicitly asks for a solution.
${
  practiceOnlyMode
    ? `- IMPORTANT: The student wants to practice on their own. Show ONLY the problem statements. Do NOT show any answers, hints, or solution steps. End your message by saying they can ask for a solution to any specific exercise by referencing its ID.`
    : `- If the student has not explicitly asked for a solution, after presenting the exercises ask: "Chcete, aby som vyriešil niektorú z týchto úloh? Ak áno, uveďte jej ID."`
}
6. When you present worked examples (one or many), show them v čistej, študentsky priateľskej forme:
- Použi číslovaný zoznam alebo jasne oddelené bloky.
- Label them simply as "Príklad 1", "Príklad 2", atď.
- Show only the mathematical problem text and its formulas in $...$ or $$...$$.
- Do NOT show internal ids or internal tag names, unless the student explicitly asks for them.
${
  mathEngineBlock
    ? `7. A verified symbolic solution has been computed for the requested exercise and is provided below in the VERIFIED COMPUTED SOLUTION block. You MUST use these exact steps and the final answer when explaining the solution. Do not invent or alter the mathematics — only translate and explain them clearly in Slovak.`
    : ""
}

OFFICIAL COURSE MATERIAL:
${courseContext}
${mathEngineBlock}

If the user asks about something NOT in this material, politely state: "Tento koncept sa nenachádza v aktuálnom študijnom materiáli."`,
      };

      console.log(">>> sendMessage state snapshot:", {
        topicId: currentTopic.id,
        activeConversationId,
        activeSubthemeId,
        isTestMode,
      });

      const apiMessages: OpenAIMessage[] = [
        systemPrompt,
        ...messages
          .filter((m) => m.role === "user" || m.role === "assistant")
          .map((m) => ({
            role: m.role,
            content: m.content,
          })),
        { role: "user", content },
      ];

      const rawAiContent = await chatService.fetchResponse(apiMessages);
      const aiContent = normalizeMath(rawAiContent);

      const aiMsg: ChatMessage = {
        id: uuidv4(),
        role: "assistant",
        content: aiContent,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, aiMsg]);

      try {
        await apiClient("http://localhost:5000/api/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: aiContent,
            role: "assistant",
            topicId: activeConversationId,
          }),
        });
      } catch (e) {
        console.error("Failed to save assistant message:", e);
      }

      if (isTestMode && !didSaveCurrentTestRef.current) {
        const score = extractTestScore(aiContent);
        if (score) {
          console.log(">>> Test score detected:", score);
          await saveTestResultToProfile(currentTopic.id, score);
        }
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          role: "assistant",
          content: "Sorry, an error occurred while getting the AI response.",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  return {
    topics,
    currentTopic,
    activeSubthemeId,
    isTestMode,
    messages,
    isTyping,
    selectTopic,
    selectSubtheme,
    sendMessage,
    requestTest,
  };
}
