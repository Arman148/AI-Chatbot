// src/data/practice.ts

import { ExerciseGroup } from "../types/courseTypes";

export const PRACTICE_EXERCISES: ExerciseGroup[] = [
  // ==========================================
  // FOURIER TRANSFORM
  // ==========================================
  {
    groupId: "fourier_group_1_9",
    topicId: "fourier_transform",
    instruction:
      "V úlohách 1 - 9 zistite, či sú nasledujúce funkcie z priestoru $L^1(\\mathbf{R})$ a nájdite ich Fourierove obrazy.",
    exercises: [
      {
        id: "fourier_ex_1",
        prompt: "1. $f(t) = e^{-a|t|}$, $a > 0$.",
        correctAnswer: "\\widehat{f}(p) = \\frac{2a}{p^2 + a^2}",
        difficulty: "easy",
        tags: ["fourier_transform", "exponential", "absolute_value"],
        mathEnginePayload: {
          problemType: "fourier_direct",
          expression: "exp(-a*Abs(t))",
          variables: "t,p",
          assumptions: ["a > 0"],
        },
      },
      {
        id: "fourier_ex_2",
        prompt:
          "2. $f(t) = \\begin{cases} 1, & \\text{ak } |t| \\le a \\\\ 0, & \\text{ak } |t| > a > 0 \\end{cases}$",
        correctAnswer:
          "\\begin{bmatrix} \\frac{2}{p} \\sin pa, & \\text{ak } p \\ne 0 \\\\ 2a, & \\text{ak } p = 0 \\end{bmatrix}",
        difficulty: "medium",
        tags: ["fourier_transform", "piecewise", "rectangular"],
        mathEnginePayload: {
          problemType: "fourier_direct",
          expression: "Piecewise((1, Abs(t) <= a), (0, True))",
          variables: "t,p",
          assumptions: ["a > 0"],
        },
      },
      {
        id: "fourier_ex_3",
        prompt: "3. $f(t) = \\frac{1}{t^2 + a^2}$, $a \\in \\mathbf{R}$.",
        correctAnswer: "\\frac{\\pi}{a}e^{-a|p|}",
        difficulty: "medium",
        tags: ["fourier_transform", "rational"],
        mathEnginePayload: {
          problemType: "fourier_direct",
          expression: "1 / (t**2 + a**2)",
          variables: "t,p",
          assumptions: ["a > 0"],
        },
      },
      {
        id: "fourier_ex_4",
        prompt: "4. $f(t) = e^{-at} \\cdot \\mathbf{1}(t)$.",
        correctAnswer: "F(p) = \\frac{1}{a+ip}",
        difficulty: "easy",
        tags: ["fourier_transform", "exponential", "step_function"],
        mathEnginePayload: {
          problemType: "fourier_direct",
          expression: "exp(-a*t) * Heaviside(t)",
          variables: "t,p",
          assumptions: ["a > 0"],
        },
      },
      {
        id: "fourier_ex_5",
        prompt: "5. $f(t) = \\frac{1}{(t^2+4)(t^2+9)}$.",
        correctAnswer:
          "F(p) = \\frac{\\pi}{5} \\left( \\frac{e^{-2|p|}}{2} - \\frac{e^{-3|p|}}{3} \\right)",
        difficulty: "hard",
        tags: ["fourier_transform", "rational"],
        mathEnginePayload: {
          problemType: "fourier_direct",
          expression: "1 / ((t**2 + 4)*(t**2 + 9))",
          variables: "t,p",
        },
      },
      {
        id: "fourier_ex_6",
        prompt: "6. $f(t) = e^{-\\alpha(t-1)^2}$, $\\alpha > 0$.",
        correctAnswer:
          "e^{-ip\\frac{\\sqrt{\\pi}}{\\sqrt{\\alpha}}} e^{-\\frac{p^2}{4\\alpha}}",
        difficulty: "hard",
        tags: ["fourier_transform", "gaussian", "shift"],
        mathEnginePayload: {
          problemType: "fourier_direct",
          expression: "exp(-alpha * (t-1)**2)",
          variables: "t,p",
          assumptions: ["alpha > 0"],
        },
      },
      {
        id: "fourier_ex_7",
        prompt: "7. $f(t) = \\sin t \\cdot e^{-\\alpha t^2}$, $\\alpha > 0$.",
        correctAnswer:
          "\\frac{-i}{2} \\frac{\\sqrt{\\pi}}{\\sqrt{\\alpha}} \\left( e^{-\\frac{(p-1)^2}{4\\alpha}} - e^{-\\frac{(p+1)^2}{4\\alpha}} \\right)",
        difficulty: "hard",
        tags: ["fourier_transform", "gaussian", "trigonometric"],
        mathEnginePayload: {
          problemType: "fourier_direct",
          expression: "sin(t) * exp(-alpha * t**2)",
          variables: "t,p",
          assumptions: ["alpha > 0"],
        },
      },
      {
        id: "fourier_ex_8",
        prompt:
          "8. $f(t) = te^{-\\alpha t} \\cdot \\mathbf{1}(t)$, $\\alpha > 0$.",
        correctAnswer: "\\frac{1}{(\\alpha + ip)^2}",
        difficulty: "medium",
        tags: ["fourier_transform", "polynomial", "exponential"],
        mathEnginePayload: {
          problemType: "fourier_direct",
          expression: "t * exp(-alpha * t) * Heaviside(t)",
          variables: "t,p",
          assumptions: ["alpha > 0"],
        },
      },
      {
        id: "fourier_ex_9",
        prompt: "9. $f(t) = t^2 e^{-\\alpha t^2}$, $\\alpha > 0$.",
        correctAnswer:
          "F(p) = \\frac{1}{2\\alpha} \\sqrt{\\frac{\\pi}{\\alpha}} \\left( e^{-\\frac{p^2}{4\\alpha}} - \\frac{p^2}{2\\alpha} e^{-\\frac{p^2}{4\\alpha}} \\right)",
        difficulty: "hard",
        tags: ["fourier_transform", "gaussian", "polynomial"],
        mathEnginePayload: {
          problemType: "fourier_direct",
          expression: "t**2 * exp(-alpha * t**2)",
          variables: "t,p",
          assumptions: ["alpha > 0"],
        },
      },
    ],
  },
  {
    groupId: "fourier_group_properties",
    topicId: "fourier_transform",
    instruction:
      "Riešte nasledujúce úlohy s využitím vlastností Fourierovej transformácie a konvolúcie.",
    exercises: [
      {
        id: "fourier_ex_10",
        prompt:
          "10. Určte inverznú Fourierovu transformáciu funkcie $g(p)=e^{i\\omega p}(\\mathbf{1}(p-a)-\\mathbf{1}(p-b))$, $a < b$.",
        correctAnswer:
          "f(t)=\\frac{1}{2\\pi}\\frac{e^{i(\\omega+t)b}-e^{i(\\omega+t)a}}{i(\\omega+t)}",
        difficulty: "hard",
        tags: ["fourier_inverse", "step_function"],
        mathEnginePayload: {
          problemType: "fourier_inverse",
          expression: "exp(I*omega*p) * (Heaviside(p-a) - Heaviside(p-b))",
          variables: "p,t",
          assumptions: ["b > a"],
        },
      },
      {
        id: "fourier_ex_11",
        prompt:
          "11. Aké funkcie majú súčasne reálny vzor aj obraz vo Fourierovej transformácii?",
        correctAnswer: "\\text{párne funkcie}",
        difficulty: "easy",
        tags: ["fourier_theory", "even_functions"],
        mathEnginePayload: {
          problemType: "theory",
          expression: "",
          variables: "",
        },
      },
      {
        id: "fourier_ex_12",
        prompt:
          "12. Pomocou Fourierovho obrazu funkcie $f(t)$ určte Fourierov obraz funkcie $g(t)=f(3t-2)$.",
        correctAnswer:
          "\\widehat{g}(p)=e^{-\\frac{2}{3}ip}\\frac{1}{3}\\widehat{f}\\left(\\frac{p}{3}\\right)",
        difficulty: "medium",
        tags: ["fourier_properties", "shift", "scaling"],
        mathEnginePayload: {
          problemType: "fourier_direct",
          expression: "f(3*t - 2)",
          variables: "t,p",
        },
      },
      {
        id: "fourier_ex_13",
        prompt:
          "13. Pomocou Fourierovho obrazu funkcie $f(t)$ určte Fourierov obraz funkcie $g(t) = tf(2t+1)$.",
        correctAnswer:
          "\\widehat{g}(p) = \\frac{i}{2}e^{i\\frac{p}{2}} \\left( \\frac{i}{2} \\widehat{f}\\left(\\frac{p}{2}\\right) + \\frac{1}{2} f'\\left(\\frac{p}{2}\\right) \\right)",
        difficulty: "hard",
        tags: ["fourier_properties", "derivative_in_frequency"],
        mathEnginePayload: {
          problemType: "fourier_direct",
          expression: "t * f(2*t + 1)",
          variables: "t,p",
        },
      },
      {
        id: "fourier_ex_14",
        prompt:
          "14. Pomocou Fourierovho obrazu funkcie $f(t)$ určte Fourierov obraz funkcie $g(t) = e^{-it} f'(2t-1)$.",
        correctAnswer:
          "\\widehat{g}(p) = \\frac{1}{2} e^{-\\frac{1}{2}i(p+1)} i \\frac{p+1}{2} \\widehat{f}\\left(\\frac{p+1}{2}\\right)",
        difficulty: "hard",
        tags: ["fourier_properties", "derivative_in_time", "shift"],
        mathEnginePayload: {
          problemType: "fourier_direct",
          expression: "exp(-I*t) * Derivative(f(2*t - 1), t)",
          variables: "t,p",
        },
      },
      {
        id: "fourier_ex_15",
        prompt:
          "15. Je daná funkcia $f(t) = \\frac{t}{t^2 + r^2}$, $r > 0$. \n a) Vypočítajte Fourierovu transformáciu funkcie $f(t)$ a nakreslite graf jej imaginárnej časti.\n b) Vypočitajte Fourierovu transformáciu funkcie $f(t) \\sin(2t)$.\n c) Vypočítajte inverznú Fourierovu transformáciu funkcie $f(t)$.",
        correctAnswer:
          "\\begin{bmatrix} a) F(p) = -\\operatorname{sign}(p)\\pi e^{-|p|r}i \\\\ b) F(p) = \\frac{1}{2i}f(p-2) - \\frac{1}{2i}f(p+2) \\\\ c) \\operatorname{sign}(p)\\pi e^{-|p|r}i\\frac{1}{2\\pi} \\end{bmatrix}",
        difficulty: "hard",
        tags: ["fourier_transform", "rational", "sine_modulation", "inverse"],
        mathEnginePayload: {
          problemType: "fourier_direct",
          expression: "t / (t**2 + r**2)",
          variables: "t,p",
          assumptions: ["r > 0"],
        },
      },
      {
        id: "fourier_ex_16",
        prompt:
          "16. Pomocou vety o rezíduách vypočítajte $\\int_{-\\infty}^{\\infty} \\frac{1}{(t^2+1)(t^2+2)} e^{-ipt} dt$. \n a) Pomocou tohto výsledku určte Fourierov obraz nasledujúcich funkcií:\n 1. $f(t) = \\frac{1}{(4t^2+1)(4t^2+2)}$,\n 2. $g(t) = \\frac{d}{dt} \\frac{1}{(t^2+1)(t^2+2)}$.",
        correctAnswer:
          "\\begin{bmatrix} \\pi \\left( e^{-|p|} - \\frac{1}{\\sqrt{2}} e^{-\\sqrt{2}|p|} \\right), \\\\ 1) \\frac{\\pi}{2} e^{-\\frac{|p|}{2}} - \\frac{1}{\\sqrt{2}} e^{-\\sqrt{2}\\frac{|p|}{2}}, \\\\ 2) ip\\pi \\left( e^{-|p|} - \\frac{1}{\\sqrt{2}} e^{-\\sqrt{2}|p|} \\right) \\end{bmatrix}",
        difficulty: "hard",
        tags: ["fourier_transform", "residue_theorem", "rational"],
        mathEnginePayload: {
          problemType: "fourier_direct",
          expression: "1 / ((t**2 + 1)*(t**2 + 2))",
          variables: "t,p",
        },
      },
      {
        id: "fourier_ex_17",
        prompt:
          "17. Určte funkciu $f(t)$, pre ktorú platí $f(t)*e^{-at^2}=e^{-bt^2}$, $a>b>0$.",
        correctAnswer:
          "f(t) = \\frac{a}{\\sqrt{\\pi(a-b)}} e^{-\\frac{ab}{a-b}t^2}",
        difficulty: "hard",
        tags: ["fourier_convolution", "gaussian"],
        mathEnginePayload: {
          problemType: "fourier_convolution",
          expression: "exp(-a*t**2)",
          variables: "t,p",
          equationRightSide: "exp(-b*t**2)",
          assumptions: ["a > b", "b > 0"],
        },
      },
      {
        id: "fourier_ex_18",
        prompt:
          "18. Riešte pomocou F-transformácie diferenciálnu rovnicu $-\\frac{d^2u(x)}{dx^2}+a^2u(x)=f(x)$, $-\\infty< x<\\infty$, $a>0$.",
        correctAnswer:
          "u(x) = \\frac{1}{2a} \\int_{-\\infty}^{\\infty} f(s) e^{-a|x-s|} ds",
        difficulty: "hard",
        tags: ["fourier_ode"],
        mathEnginePayload: {
          problemType: "fourier_ode",
          expression: "-Derivative(u(x), x, 2) + a**2 * u(x)",
          variables: "x,p",
          equationRightSide: "f(x)",
          assumptions: ["a > 0"],
        },
      },
    ],
  },

  // ==========================================
  // LAPLACE TRANSFORM - DIRECT
  // ==========================================
  {
    groupId: "laplace_group_direct_1_17",
    topicId: "laplace_transform",
    instruction:
      "V úlohách 1 - 17 nájdite Laplaceov obraz funkcie $f$, ak $f$ je originálom.",
    exercises: [
      {
        id: "laplace_ex_1",
        prompt: "1. $f(t) = 2e^{3t} + e^{it} + 6t^3 - 7t + 5$.",
        correctAnswer:
          "F(p) = \\frac{2}{p-3} + \\frac{1}{p-i} + \\frac{6\\cdot 3!}{p^4} - \\frac{7}{p^2} + \\frac{5}{p}",
        difficulty: "easy",
        tags: ["laplace_direct", "polynomial", "exponential"],
        mathEnginePayload: {
          problemType: "laplace_direct",
          expression: "2*exp(3*t) + exp(I*t) + 6*t**3 - 7*t + 5",
          variables: "t,p",
        },
      },
      {
        id: "laplace_ex_2",
        prompt: "2. $f(t) = \\sin(5t) + 2\\cos(3t) - \\sinh(t) + \\cosh(2t)$.",
        correctAnswer:
          "F(p) = \\frac{5}{p^2 + 25} + \\frac{2p}{p^2 + 9} - \\frac{1}{p^2 - 1} + \\frac{p}{p^2 - 4}",
        difficulty: "easy",
        tags: ["laplace_direct", "trigonometric", "hyperbolic"],
        mathEnginePayload: {
          problemType: "laplace_direct",
          expression: "sin(5*t) + 2*cos(3*t) - sinh(t) + cosh(2*t)",
          variables: "t,p",
        },
      },
      {
        id: "laplace_ex_3",
        prompt: "3. $f(t) = \\sin^2(at)$, $a \\in \\mathbf{R}$.",
        correctAnswer: "F(p) = \\frac{2a^2}{p(p^2 + 4a^2)}",
        difficulty: "medium",
        tags: ["laplace_direct", "trigonometric"],
        mathEnginePayload: {
          problemType: "laplace_direct",
          expression: "sin(a*t)**2",
          variables: "t,p",
        },
      },
      {
        id: "laplace_ex_4",
        prompt: "4. $f(t) = \\sin(at) \\cdot \\cos(at)$, $a \\in \\mathbf{R}$.",
        correctAnswer: "F(p) = \\frac{a}{p^2 + 4a^2}",
        difficulty: "medium",
        tags: ["laplace_direct", "trigonometric"],
        mathEnginePayload: {
          problemType: "laplace_direct",
          expression: "sin(a*t) * cos(a*t)",
          variables: "t,p",
        },
      },
      {
        id: "laplace_ex_5",
        prompt:
          "5. $f(t) = \\sin(at) \\cdot \\cos(bt)$, $a, b \\in \\mathbf{R}$, $a \\neq b$.",
        correctAnswer:
          "F(p) = \\frac{a(p^2 + a^2 - b^2)}{[p^2 + (a + b)^2] \\cdot [p^2 + (a - b)^2]}",
        difficulty: "medium",
        tags: ["laplace_direct", "trigonometric"],
        mathEnginePayload: {
          problemType: "laplace_direct",
          expression: "sin(a*t) * cos(b*t)",
          variables: "t,p",
        },
      },
      {
        id: "laplace_ex_6",
        prompt: "6. $f(t) = a^t + \\sin(\\omega t + \\varphi)$.",
        correctAnswer:
          "F(p) = \\frac{1}{p - \\ln a} + \\frac{\\omega}{(p^2 + \\omega^2)} \\cos \\varphi + \\frac{p}{p^2 + \\omega^2} \\sin \\varphi",
        difficulty: "medium",
        tags: ["laplace_direct", "exponential", "trigonometric"],
        mathEnginePayload: {
          problemType: "laplace_direct",
          expression: "a**t + sin(omega*t + phi)",
          variables: "t,p",
        },
      },
      {
        id: "laplace_ex_7",
        prompt: "7. $f(t) = \\sinh(3t)$.",
        correctAnswer: "F(p) = \\frac{3}{p^2 - 9}",
        difficulty: "easy",
        tags: ["laplace_direct", "hyperbolic"],
        mathEnginePayload: {
          problemType: "laplace_direct",
          expression: "sinh(3*t)",
          variables: "t,p",
        },
      },
      {
        id: "laplace_ex_8",
        prompt: "8. $f(t) = e^{(1+i)t} \\cdot \\sinh(3t)$.",
        correctAnswer: "F(p) = \\frac{3}{[p-(1+i)]^2 - 9}",
        difficulty: "medium",
        tags: ["laplace_direct", "exponential", "hyperbolic"],
        mathEnginePayload: {
          problemType: "laplace_direct",
          expression: "exp((1+I)*t) * sinh(3*t)",
          variables: "t,p",
        },
      },
      {
        id: "laplace_ex_9",
        prompt: "9. $f(t) = a^t$, $a > 0$.",
        correctAnswer: "F(p) = \\frac{1}{p - \\ln a}",
        difficulty: "easy",
        tags: ["laplace_direct", "exponential"],
        mathEnginePayload: {
          problemType: "laplace_direct",
          expression: "a**t",
          variables: "t,p",
          assumptions: ["a > 0"],
        },
      },
      {
        id: "laplace_ex_10",
        prompt: "10. $f(t) = ta^t$, $a > 0$.",
        correctAnswer: "F(p) = \\frac{1}{(p - \\ln a)^2}",
        difficulty: "medium",
        tags: ["laplace_direct", "exponential", "polynomial"],
        mathEnginePayload: {
          problemType: "laplace_direct",
          expression: "t * a**t",
          variables: "t,p",
          assumptions: ["a > 0"],
        },
      },
      {
        id: "laplace_ex_11",
        prompt: "11. $f(t) = e^{2t} \\cdot \\cos(3t) \\cdot \\cos(4t)$.",
        correctAnswer:
          "F(p) = \\frac{1}{2} \\frac{p-2}{(p-2)^2 + 7^2} + \\frac{1}{2} \\frac{p-2}{(p-2)^2 + 1}",
        difficulty: "hard",
        tags: ["laplace_direct", "exponential", "trigonometric"],
        mathEnginePayload: {
          problemType: "laplace_direct",
          expression: "exp(2*t) * cos(3*t) * cos(4*t)",
          variables: "t,p",
        },
      },
      {
        id: "laplace_ex_12",
        prompt: "12. $f(t) = e^{-t} + e^{t} \\cdot \\sin(2t)$.",
        correctAnswer: "F(p) = \\frac{1}{p+1} + \\frac{2}{(p-1)^2 + 2^2}",
        difficulty: "medium",
        tags: ["laplace_direct", "exponential", "trigonometric"],
        mathEnginePayload: {
          problemType: "laplace_direct",
          expression: "exp(-t) + exp(t) * sin(2*t)",
          variables: "t,p",
        },
      },
      {
        id: "laplace_ex_13",
        prompt: "13. $f(t) = t^2 \\cos(3t)$.",
        correctAnswer: "F(p) = \\frac{2p^3 - 54p}{(p^2 + 9)^3}",
        difficulty: "hard",
        tags: ["laplace_direct", "polynomial", "trigonometric"],
        mathEnginePayload: {
          problemType: "laplace_direct",
          expression: "t**2 * cos(3*t)",
          variables: "t,p",
        },
      },
      {
        id: "laplace_ex_14",
        prompt: "14. $f(t) = t^2 + 2t + 3 + te^{-5t}$.",
        correctAnswer: "F(p) = \\frac{2+2p+3p^2}{p^3} + \\frac{1}{(p+5)^2}",
        difficulty: "medium",
        tags: ["laplace_direct", "polynomial", "exponential"],
        mathEnginePayload: {
          problemType: "laplace_direct",
          expression: "t**2 + 2*t + 3 + t*exp(-5*t)",
          variables: "t,p",
        },
      },
      {
        id: "laplace_ex_15",
        prompt: "15. $f(t) = t(\\cos(2t) + e^{-t} \\cdot \\sin(2t))$.",
        correctAnswer:
          "F(p) = \\frac{p^2 - 4}{(p^2 + 4)^2} + \\frac{4(p+1)}{[(p+1)^2 + 4]^2}",
        difficulty: "hard",
        tags: ["laplace_direct", "polynomial", "trigonometric", "exponential"],
        mathEnginePayload: {
          problemType: "laplace_direct",
          expression: "t * (cos(2*t) + exp(-t) * sin(2*t))",
          variables: "t,p",
        },
      },
      {
        id: "laplace_ex_16",
        prompt: "16. $f(t) = t^2 (e^{-3t} + \\sin(2t))$.",
        correctAnswer:
          "F(p) = \\frac{2}{(p+3)^3} + \\frac{12p^2 - 16}{(p^2+4)^3}",
        difficulty: "hard",
        tags: ["laplace_direct", "polynomial", "exponential", "trigonometric"],
        mathEnginePayload: {
          problemType: "laplace_direct",
          expression: "t**2 * (exp(-3*t) + sin(2*t))",
          variables: "t,p",
        },
      },
      {
        id: "laplace_ex_17",
        prompt: "17. $f(t) = \\int_0^t \\sin(\\omega \\tau) d\\tau$.",
        correctAnswer: "F(p) = \\frac{\\omega}{p(p^2 + \\omega^2)}",
        difficulty: "medium",
        tags: ["laplace_direct", "integral", "trigonometric"],
        mathEnginePayload: {
          problemType: "laplace_direct",
          expression: "Integral(sin(omega * tau), (tau, 0, t))",
          variables: "t,p",
        },
      },
    ],
  },
  {
    groupId: "laplace_group_posun",
    topicId: "laplace_transform",
    instruction:
      "V úlohách 18 - 20 použitím vety o posune v originále nájdite Laplaceov obraz funkcie $f$:",
    exercises: [
      {
        id: "laplace_ex_18",
        prompt:
          "18. $f(t) = \\begin{cases} 0 & 0 < t < b \\\\ e^{at} & t \\ge b \\end{cases}$.",
        correctAnswer: "\\frac{e^{-(p-a)b}}{p-a}",
        difficulty: "medium",
        tags: ["laplace_direct", "shift_theorem", "piecewise"],
        mathEnginePayload: {
          problemType: "laplace_direct",
          expression: "Piecewise((0, (0 < t) & (t < b)), (exp(a*t), t >= b))",
          variables: "t,p",
        },
      },
      {
        id: "laplace_ex_19a",
        prompt: "19. (a) $f(t) = \\Theta(t) (t-2)^2$.",
        correctAnswer: "\\frac{2!}{p^3} - \\frac{4}{p^2} + \\frac{4}{p}",
        difficulty: "medium",
        tags: ["laplace_direct", "heaviside", "polynomial"],
        mathEnginePayload: {
          problemType: "laplace_direct",
          expression: "Heaviside(t) * (t-2)**2",
          variables: "t,p",
        },
      },
      {
        id: "laplace_ex_19b",
        prompt: "19. (b) $f(t) = \\Theta(t-2)(t-2)^2$.",
        correctAnswer: "e^{-2p}\\frac{2!}{p^3}",
        difficulty: "medium",
        tags: ["laplace_direct", "shift_theorem", "heaviside"],
        mathEnginePayload: {
          problemType: "laplace_direct",
          expression: "Heaviside(t-2) * (t-2)**2",
          variables: "t,p",
        },
      },
      {
        id: "laplace_ex_19c",
        prompt: "19. (c) $f(t) = \\Theta(t-2) t^2$.",
        correctAnswer:
          "e^{-2p} \\frac{2!}{p^3} + e^{-2p} \\frac{4}{p^2} + e^{-2p} \\frac{4}{p}",
        difficulty: "hard",
        tags: ["laplace_direct", "shift_theorem", "heaviside"],
        mathEnginePayload: {
          problemType: "laplace_direct",
          expression: "Heaviside(t-2) * t**2",
          variables: "t,p",
        },
      },
      {
        id: "laplace_ex_20",
        prompt:
          "20. $f(t) = \\begin{cases} 0 & t < 0 \\\\ \\sin t & t \\in \\left(0, \\frac{\\pi}{2}\\right) \\\\ 1 & t \\ge \\frac{\\pi}{2} \\end{cases}$.",
        correctAnswer:
          "\\begin{bmatrix} \\frac{p+e^{-\\frac{\\pi}{2}p}}{p^3+p} \\end{bmatrix}",
        difficulty: "hard",
        tags: ["laplace_direct", "piecewise", "trigonometric"],
        mathEnginePayload: {
          problemType: "laplace_direct",
          expression:
            "Piecewise((0, t < 0), (sin(t), (t > 0) & (t < pi/2)), (1, t >= pi/2))",
          variables: "t,p",
        },
      },
    ],
  },
  {
    groupId: "laplace_group_impulzy",
    topicId: "laplace_transform",
    instruction:
      "V úlohách 21 - 22 nájdite Laplaceove obrazy konečných impulzov.",
    exercises: [
      {
        id: "laplace_ex_21",
        prompt:
          "21. $f(t) = \\begin{cases} 0 & t \\notin \\langle 1, 4 \\rangle \\\\ t - 1 & t \\in \\langle 1, 2 \\rangle \\\\ -\\frac{t}{2} + 2 & t \\in \\langle 2, 4 \\rangle \\end{cases}$.",
        correctAnswer:
          "\\left( e^{-p} - \\frac{3e^{-2p}}{2} + \\frac{e^{-4p}}{2} \\right) \\frac{1}{p^2}",
        difficulty: "hard",
        tags: ["laplace_direct", "pulse", "piecewise"],
        mathEnginePayload: {
          problemType: "laplace_direct",
          expression:
            "Piecewise((0, (t < 1) | (t > 4)), (t - 1, (t >= 1) & (t <= 2)), (-t/2 + 2, (t > 2) & (t <= 4)))",
          variables: "t,p",
        },
      },
      {
        id: "laplace_ex_22",
        prompt:
          "22. $f(t) = \\begin{cases} 0 & t \\notin \\langle 1, 5 \\rangle \\\\ t - 1 & t \\in \\langle 1, 2 \\rangle \\\\ 1 & t \\in \\langle 2, 4 \\rangle \\\\ 5 - t & t \\in \\langle 4, 5 \\rangle \\end{cases}$.",
        correctAnswer: "(e^{-p} - e^{-2p} - e^{-4p} + e^{-5p}) \\frac{1}{p^2}",
        difficulty: "hard",
        tags: ["laplace_direct", "pulse", "piecewise"],
        mathEnginePayload: {
          problemType: "laplace_direct",
          expression:
            "Piecewise((0, (t < 1) | (t > 5)), (t - 1, (t >= 1) & (t <= 2)), (1, (t > 2) & (t <= 4)), (5 - t, (t > 4) & (t <= 5)))",
          variables: "t,p",
        },
      },
    ],
  },
  {
    groupId: "laplace_group_periodic",
    topicId: "laplace_transform",
    instruction:
      "V úlohách 23 - 24 nájdite Laplaceov obraz periodickej funkcie.",
    exercises: [
      {
        id: "laplace_ex_23",
        prompt:
          "23. $f(t) = \\begin{cases} 1 & t \\in \\langle 2k\\pi, (2k+1)\\pi \\rangle \\\\ -1 & t \\in \\langle (2k+1)\\pi, (2k+2)\\pi \\rangle \\end{cases}$, $k = 0, 1, 2, \\dots$.",
        correctAnswer: "\\frac{1 - e^{-p\\pi}}{p(1 + e^{-p\\pi})}",
        difficulty: "hard",
        tags: ["laplace_direct", "periodic", "square_wave"],
        mathEnginePayload: {
          problemType: "laplace_periodic",
          expression:
            "Piecewise((1, (t >= 0) & (t < pi)), (-1, (t >= pi) & (t < 2*pi)))",
          variables: "t,p",
          period: "2*pi",
        },
      },
      {
        id: "laplace_ex_24",
        prompt:
          "24. $f(t) = \\left| \\sin \\left( \\omega t \\right) \\right|$, $\\omega \\in \\mathbf{R}^+$.",
        correctAnswer:
          "\\frac{\\omega \\left( 1 + e^{-\\frac{p\\pi}{\\omega}} \\right)}{(p^2 + \\omega^2) \\left( 1 - e^{-\\frac{p\\pi}{\\omega}} \\right)}",
        difficulty: "hard",
        tags: ["laplace_direct", "periodic", "absolute_value"],
        mathEnginePayload: {
          problemType: "laplace_periodic",
          expression: "Abs(sin(omega*t))",
          variables: "t,p",
          period: "pi/omega",
          assumptions: ["omega > 0"],
        },
      },
    ],
  },
  {
    groupId: "laplace_group_convolution",
    topicId: "laplace_transform",
    instruction: "V úlohách 25 - 27 nájdite konvolučný súčin funkcií $f, g$:",
    exercises: [
      {
        id: "laplace_ex_25",
        prompt: "25. $f(t) = t$, $g(t) = \\cos t$.",
        correctAnswer: "1 - \\cos t",
        difficulty: "medium",
        tags: ["laplace_convolution"],
        mathEnginePayload: {
          problemType: "laplace_convolution",
          expression: "t",
          variables: "t,p",
          equationRightSide: "cos(t)",
        },
      },
      {
        id: "laplace_ex_26",
        prompt: "26. $f(t) = t^2$, $g(t) = t^3$.",
        correctAnswer: "\\frac{t^6}{60}",
        difficulty: "easy",
        tags: ["laplace_convolution", "polynomial"],
        mathEnginePayload: {
          problemType: "laplace_convolution",
          expression: "t**2",
          variables: "t,p",
          equationRightSide: "t**3",
        },
      },
      {
        id: "laplace_ex_27",
        prompt: "27. $f(t) = e^{at}$, $g(t) = 1 - at$.",
        correctAnswer: "t",
        difficulty: "medium",
        tags: ["laplace_convolution", "exponential"],
        mathEnginePayload: {
          problemType: "laplace_convolution",
          expression: "exp(a*t)",
          variables: "t,p",
          equationRightSide: "1 - a*t",
        },
      },
    ],
  },

  // ==========================================
  // LAPLACE TRANSFORM - INVERSE
  // ==========================================
  {
    groupId: "laplace_group_inverse_28_36",
    topicId: "laplace_transform",
    instruction: "V úlohách 28 - 36 nájdite originál k funkcii $F(p)$:",
    exercises: [
      {
        id: "laplace_ex_28",
        prompt: "28. $F(p) = \\frac{p^2+1}{p^3-p^2-2p}$.",
        correctAnswer:
          "f(t) = -\\frac{1}{2} + \\frac{2}{3}e^{-t} + \\frac{5}{6}e^{2t}",
        difficulty: "medium",
        tags: ["laplace_inverse", "rational"],
        mathEnginePayload: {
          problemType: "laplace_inverse",
          expression: "(p**2 + 1) / (p**3 - p**2 - 2*p)",
          variables: "p,t",
        },
      },
      {
        id: "laplace_ex_29",
        prompt: "29. $F(p) = \\frac{p^2 - 4p - 3}{(p-1)^2(p+2)}$.",
        correctAnswer: "f(t) = -2te^t + e^{-2t}",
        difficulty: "medium",
        tags: ["laplace_inverse", "rational", "multiple_roots"],
        mathEnginePayload: {
          problemType: "laplace_inverse",
          expression: "(p**2 - 4*p - 3) / ((p-1)**2 * (p+2))",
          variables: "p,t",
        },
      },
      {
        id: "laplace_ex_30",
        prompt: "30. $F(p) = \\frac{5p+3}{(p-1)(p^2+2p+5)}$.",
        correctAnswer:
          "f(t) = e^t - e^{-t}\\cos(2t) + \\frac{3}{2}e^{-t}\\sin(2t)",
        difficulty: "hard",
        tags: ["laplace_inverse", "rational", "complex_roots"],
        mathEnginePayload: {
          problemType: "laplace_inverse",
          expression: "(5*p + 3) / ((p-1)*(p**2 + 2*p + 5))",
          variables: "p,t",
        },
      },
      {
        id: "laplace_ex_31",
        prompt:
          "31. $F(p) = \\frac{-2p^3 + 2p + 5}{5(p^2 + 2p + 2)(p + 1)(p - 1)}$.",
        correctAnswer:
          "f(t) = \\frac{1}{5}e^{-t}\\sin t - \\frac{1}{2}e^{-t} + \\frac{1}{10}e^t",
        difficulty: "hard",
        tags: ["laplace_inverse", "rational"],
        mathEnginePayload: {
          problemType: "laplace_inverse",
          expression:
            "(-2*p**3 + 2*p + 5) / (5*(p**2 + 2*p + 2)*(p + 1)*(p - 1))",
          variables: "p,t",
        },
      },
      {
        id: "laplace_ex_32",
        prompt: "32. $F(p) = \\frac{e^{-\\pi p}}{p^2 + 5p + 6}$.",
        correctAnswer:
          "f(t) = \\Theta(t - \\pi) e^{-2(t - \\pi)} - \\Theta(t - \\pi) e^{-3(t - \\pi)}",
        difficulty: "medium",
        tags: ["laplace_inverse", "delay"],
        mathEnginePayload: {
          problemType: "laplace_inverse",
          expression: "exp(-pi*p) / (p**2 + 5*p + 6)",
          variables: "p,t",
        },
      },
      {
        id: "laplace_ex_33",
        prompt: "33. $F(p) = \\frac{1 - e^{-p} - pe^{-p}}{p^2(1 - e^{-p})}$.",
        correctAnswer:
          "\\begin{bmatrix} f(t) = \\begin{cases} 0 & t < 0 \\\\ t - k & t \\in \\langle k, k+1 \\rangle, k = 0, 1, \\dots \\end{cases} \\end{bmatrix}",
        difficulty: "hard",
        tags: ["laplace_inverse", "periodic"],
        mathEnginePayload: {
          problemType: "laplace_inverse",
          expression: "(1 - exp(-p) - p*exp(-p)) / (p**2 * (1 - exp(-p)))",
          variables: "p,t",
        },
      },
      {
        id: "laplace_ex_34",
        prompt: "34. $F(p) = \\frac{1}{p(1+e^{-ap})}$, $a \\in \\mathbf{R}^+$.",
        correctAnswer:
          "\\begin{bmatrix} f(t) = \\begin{cases} 0 & t < 0 \\\\ 1 & t \\in \\langle 2ka, (2k+1)a \\rangle \\\\ 0 & t \\in \\langle (2k+1)a, (2k+2)a \\rangle, k = 0, 1, ... \\end{cases} \\end{bmatrix}",
        difficulty: "hard",
        tags: ["laplace_inverse", "periodic"],
        mathEnginePayload: {
          problemType: "laplace_inverse",
          expression: "1 / (p * (1 + exp(-a*p)))",
          variables: "p,t",
          assumptions: ["a > 0"],
        },
      },
      {
        id: "laplace_ex_35",
        prompt: "35. $F(p) = \\frac{1}{p^3 - 2p^2 + 9p - 18}$.",
        correctAnswer:
          "f(t) = \\frac{1}{13}e^{2t} - \\frac{1}{13}\\cos(3t) - \\frac{2}{13}\\sin(3t)",
        difficulty: "medium",
        tags: ["laplace_inverse", "rational"],
        mathEnginePayload: {
          problemType: "laplace_inverse",
          expression: "1 / (p**3 - 2*p**2 + 9*p - 18)",
          variables: "p,t",
        },
      },
      {
        id: "laplace_ex_36",
        prompt:
          "36. $F(p) = \\frac{p}{p^2+1} + \\frac{1}{p(p^2+1)} (1 + e^{-\\pi p})$.",
        correctAnswer:
          "\\cos t + (1 - \\cos t) + \\Theta(t - \\pi)(1 - \\cos(t - \\pi))",
        difficulty: "hard",
        tags: ["laplace_inverse", "delay"],
        mathEnginePayload: {
          problemType: "laplace_inverse",
          expression: "p / (p**2 + 1) + (1 + exp(-pi*p)) / (p*(p**2 + 1))",
          variables: "p,t",
        },
      },
    ],
  },
  {
    groupId: "laplace_group_rozklad",
    topicId: "laplace_transform",
    instruction: "Pomocou vety o rozklade vypočítajte inverznú LT:",
    exercises: [
      {
        id: "laplace_rozklad_1",
        prompt: "1. $F(p) = \\operatorname{arctg} \\frac{1}{p}$.",
        correctAnswer: "f(t) = \\frac{\\sin t}{t}",
        difficulty: "medium",
        tags: ["laplace_inverse", "rozklad", "arctan"],
        mathEnginePayload: {
          problemType: "laplace_inverse",
          expression: "atan(1/p)",
          variables: "p,t",
        },
      },
      {
        id: "laplace_rozklad_2",
        prompt: "2. $F(p) = \\frac{e^{\\frac{1}{p}}}{p}$.",
        correctAnswer: "f(t) = \\sum_{n=0}^{\\infty} \\frac{1}{(n!)^2} t^n",
        difficulty: "hard",
        tags: ["laplace_inverse", "rozklad", "series"],
        mathEnginePayload: {
          problemType: "laplace_inverse",
          expression: "exp(1/p)/p",
          variables: "p,t",
        },
      },
      {
        id: "laplace_rozklad_3",
        prompt: "3. $F(p) = \\frac{\\sin \\frac{1}{p}}{p}$.",
        correctAnswer:
          "f(t) = \\sum_{n=0}^{\\infty} \\frac{(-1)^n}{((2n+1)!)^2} t^{2n+1}",
        difficulty: "hard",
        tags: ["laplace_inverse", "rozklad", "series"],
        mathEnginePayload: {
          problemType: "laplace_inverse",
          expression: "sin(1/p)/p",
          variables: "p,t",
        },
      },
    ],
  },

  // ==========================================
  // LAPLACE TRANSFORM - ODEs
  // ==========================================
  {
    groupId: "laplace_group_ode",
    topicId: "laplace_transform",
    instruction:
      "V úlohách 1 - 14 vypočítajte pomocou Laplaceovej transformácie riešenie začiatočnej úlohy:",
    exercises: [
      {
        id: "laplace_ode_1",
        prompt:
          "1. $x'''(t) + 2x''(t) + 5x'(t) = 0$, $x(0+) = -1$, $x'(0+) = 2$, $x''(0+) = 0$.",
        correctAnswer:
          "x(t) = -\\frac{1}{5} - \\frac{4}{5}e^{-t}\\cos(2t) + \\frac{3}{5}e^{-t}\\sin(2t)",
        difficulty: "hard",
        tags: ["laplace_ode", "differential_equation"],
        mathEnginePayload: {
          problemType: "laplace_ode",
          expression:
            "Derivative(x(t), t, 3) + 2*Derivative(x(t), t, 2) + 5*Derivative(x(t), t)",
          variables: "t,p",
          equationRightSide: "0",
          initialConditions: ["x(0)=-1", "x'(0)=2", "x''(0)=0"],
        },
      },
      {
        id: "laplace_ode_2",
        prompt:
          "2. $x^{(4)}(t) + 2x''(t) + x(t) = 1$, $x(0+) = x'(0+) = x''(0+) = x'''(0+) = 0$.",
        correctAnswer: "x(t) = 1 - \\cos t - \\frac{t}{2}\\sin t",
        difficulty: "hard",
        tags: ["laplace_ode", "differential_equation"],
        mathEnginePayload: {
          problemType: "laplace_ode",
          expression:
            "Derivative(x(t), t, 4) + 2*Derivative(x(t), t, 2) + x(t)",
          variables: "t,p",
          equationRightSide: "1",
          initialConditions: ["x(0)=0", "x'(0)=0", "x''(0)=0", "x'''(0)=0"],
        },
      },
      {
        id: "laplace_ode_3",
        prompt: "3. $x''(t) - 3x'(t) + 2x(t) = e^{3t}$, $x(0+) = x'(0+) = 0$.",
        correctAnswer: "x(t) = \\frac{1}{2}e^t - e^{2t} + \\frac{1}{2}e^{3t}",
        difficulty: "medium",
        tags: ["laplace_ode", "differential_equation"],
        mathEnginePayload: {
          problemType: "laplace_ode",
          expression: "Derivative(x(t), t, 2) - 3*Derivative(x(t), t) + 2*x(t)",
          variables: "t,p",
          equationRightSide: "exp(3*t)",
          initialConditions: ["x(0)=0", "x'(0)=0"],
        },
      },
      {
        id: "laplace_ode_4",
        prompt: "4. $x''(t) - 3x'(t) + 2x(t) = 2e^{3t}$, $x(0+) = x'(0+) = 0$.",
        correctAnswer: "x(t) = e^t - 2e^{2t} + e^{3t}",
        difficulty: "medium",
        tags: ["laplace_ode", "differential_equation"],
        mathEnginePayload: {
          problemType: "laplace_ode",
          expression: "Derivative(x(t), t, 2) - 3*Derivative(x(t), t) + 2*x(t)",
          variables: "t,p",
          equationRightSide: "2*exp(3*t)",
          initialConditions: ["x(0)=0", "x'(0)=0"],
        },
      },
      {
        id: "laplace_ode_5",
        prompt: "5. $x''(t) - x'(t) = te^t$, $x(0+) = 1$, $x'(0+) = 0$.",
        correctAnswer: "x(t) = e^t \\left(\\frac{t^2}{2} - t + 1\\right)",
        difficulty: "medium",
        tags: ["laplace_ode", "differential_equation"],
        mathEnginePayload: {
          problemType: "laplace_ode",
          expression: "Derivative(x(t), t, 2) - Derivative(x(t), t)",
          variables: "t,p",
          equationRightSide: "t*exp(t)",
          initialConditions: ["x(0)=1", "x'(0)=0"],
        },
      },
      {
        id: "laplace_ode_6",
        prompt: "6. $x'(t) + x(t) = t^2 e^{-t}$, $x(0+) = a$.",
        correctAnswer: "x(t) = ae^{-t} + \\frac{t^3}{3}e^{-t}",
        difficulty: "medium",
        tags: ["laplace_ode", "differential_equation"],
        mathEnginePayload: {
          problemType: "laplace_ode",
          expression: "Derivative(x(t), t) + x(t)",
          variables: "t,p",
          equationRightSide: "t**2*exp(-t)",
          initialConditions: ["x(0)=a"],
        },
      },
      {
        id: "laplace_ode_7",
        prompt:
          "7. $x''(t) + 4x'(t) + 4x(t) = t^3 e^{-2t}$, $x(0+) = 1$, $x'(0+) = 2$.",
        correctAnswer: "x(t) = e^{-2t} \\left(1 + 4t + \\frac{t^5}{20}\\right)",
        difficulty: "hard",
        tags: ["laplace_ode", "differential_equation"],
        mathEnginePayload: {
          problemType: "laplace_ode",
          expression: "Derivative(x(t), t, 2) + 4*Derivative(x(t), t) + 4*x(t)",
          variables: "t,p",
          equationRightSide: "t**3*exp(-2*t)",
          initialConditions: ["x(0)=1", "x'(0)=2"],
        },
      },
      {
        id: "laplace_ode_8",
        prompt:
          "8. $x'''(t) - x''(t) = \\sin t$, $x(0+) = x'(0+) = x''(0+) = 0$.",
        correctAnswer:
          "x(t) = -1 - t + \\frac{1}{2}e^t + \\frac{1}{2}(\\cos t + \\sin t)",
        difficulty: "hard",
        tags: ["laplace_ode", "differential_equation"],
        mathEnginePayload: {
          problemType: "laplace_ode",
          expression: "Derivative(x(t), t, 3) - Derivative(x(t), t, 2)",
          variables: "t,p",
          equationRightSide: "sin(t)",
          initialConditions: ["x(0)=0", "x'(0)=0", "x''(0)=0"],
        },
      },
      {
        id: "laplace_ode_9",
        prompt:
          "9. $x'(t) + x(t) = f(t)$, $x(0+) = 0$, $f(t) = \\begin{cases} 0 & t \\notin (0,2) \\\\ 1 & t \\in (0,2) \\end{cases}$.",
        correctAnswer:
          "x(t) = 1 - e^{-t} - \\Theta(t-2) \\left( 1 - e^{-(t-2)} \\right)",
        difficulty: "hard",
        tags: ["laplace_ode", "piecewise"],
        mathEnginePayload: {
          problemType: "laplace_ode",
          expression: "Derivative(x(t), t) + x(t)",
          variables: "t,p",
          equationRightSide: "Piecewise((1, (t > 0) & (t < 2)), (0, True))",
          initialConditions: ["x(0)=0"],
        },
      },
      {
        id: "laplace_ode_10",
        prompt:
          "10. $x''(t)+2x'(t)+x(t) = f(t)$, $x(0+) = x'(0+) = 0$, $f(t) = \\begin{cases} 0 & t < 0 \\\\ t & t \\in (0,1) \\\\ 1 & t \\ge 1 \\end{cases}$.",
        correctAnswer:
          "x(t) = -2 + t + 2e^{-t} + te^{-t} - \\Theta(t-1) \\left[ -2 + (t-1) + 2e^{-(t-1)} + (t-1)e^{-(t-1)} \\right]",
        difficulty: "hard",
        tags: ["laplace_ode", "piecewise"],
        mathEnginePayload: {
          problemType: "laplace_ode",
          expression: "Derivative(x(t), t, 2) + 2*Derivative(x(t), t) + x(t)",
          variables: "t,p",
          equationRightSide:
            "Piecewise((0, t < 0), (t, (t > 0) & (t < 1)), (1, t >= 1))",
          initialConditions: ["x(0)=0", "x'(0)=0"],
        },
      },
      {
        id: "laplace_ode_11",
        prompt:
          "11. $x''(t) + x(t) = f(t)$, $x(0+) = 1$, $x'(0+) = 0$, $f(t) = \\begin{cases} 0 & t < 0 \\\\ b & t \\in (0, a) \\\\ 2b & t \\ge a \\end{cases}$.",
        correctAnswer:
          "x(t) = \\Theta(t)[b + (1-b)\\cos t] + \\Theta(t-a)[b - b\\cos(t-a)]",
        difficulty: "hard",
        tags: ["laplace_ode", "piecewise"],
        mathEnginePayload: {
          problemType: "laplace_ode",
          expression: "Derivative(x(t), t, 2) + x(t)",
          variables: "t,p",
          equationRightSide:
            "Piecewise((0, t < 0), (b, (t > 0) & (t < a)), (2*b, t >= a))",
          initialConditions: ["x(0)=1", "x'(0)=0"],
        },
      },
      {
        id: "laplace_ode_12",
        prompt: "12. $x''(t) + x(t) = |\\sin t|$, $x(0+) = x'(0+) = 0$.",
        correctAnswer:
          "\\begin{bmatrix} X(p) = \\frac{p}{(p^2+1)^2(1-e^{-\\pi p})} + e^{-\\pi p} \\frac{p}{(p^2+1)^2(1-e^{-\\pi p})}, x(t) = \\dots \\end{bmatrix}",
        difficulty: "hard",
        tags: ["laplace_ode", "absolute_value"],
        mathEnginePayload: {
          problemType: "laplace_ode",
          expression: "Derivative(x(t), t, 2) + x(t)",
          variables: "t,p",
          equationRightSide: "Abs(sin(t))",
          initialConditions: ["x(0)=0", "x'(0)=0"],
        },
      },
      {
        id: "laplace_ode_13",
        prompt: "13. $x'(t) + 3x(t) = e^{-t} + |\\sin t|$, $x(0+) = 0$.",
        correctAnswer:
          "\\begin{bmatrix} X(p) = \\frac{1}{(p+3)(p+1)} + \\frac{p}{(p+3)(p^2+1)(1-e^{-\\pi p})} + e^{-\\pi p} \\frac{p}{(p+3)(p^2+1)(1-e^{-\\pi p})}, x(t) = \\dots \\end{bmatrix}",
        difficulty: "hard",
        tags: ["laplace_ode", "absolute_value"],
        mathEnginePayload: {
          problemType: "laplace_ode",
          expression: "Derivative(x(t), t) + 3*x(t)",
          variables: "t,p",
          equationRightSide: "exp(-t) + Abs(sin(t))",
          initialConditions: ["x(0)=0"],
        },
      },
      {
        id: "laplace_ode_14",
        prompt:
          "14. $x'(t)+2x(t)=Ae^{-t}+g(t)$, $x(0+)=0$, kde $A=\\frac{1}{1-e}$ a $g(t)$ je periodická s periódou 1, ktorá na intervale $\\langle 0,1\\rangle$ je $g(t)=(1-A)e^{-t}$.",
        correctAnswer:
          "\\begin{bmatrix} x(t)=\\frac{1}{1-e}e^{-t}-\\frac{1}{1-e^{2}}e^{-2t}+h(t) \\\\ \\text{kde } h(t) \\text{ je periodická funkcia s periódou 1,} \\\\ \\text{ktorá sa na intervale } \\langle 0,1\\rangle \\text{ rovná:} \\\\ h(t)=\\left(1-\\frac{1}{1-e}\\right)e^{-t}-\\left(1-\\frac{1}{1-e^{2}}\\right)e^{-2t} \\end{bmatrix}",
        difficulty: "hard",
        tags: ["laplace_ode", "periodic"],
        mathEnginePayload: {
          problemType: "laplace_ode",
          expression: "Derivative(x(t), t) + 2*x(t)",
          variables: "t,p",
          equationRightSide: "A*exp(-t) + g(t)",
          initialConditions: ["x(0)=0"],
        },
      },
    ],
  },

  // ==========================================
  // Z-TRANSFORM
  // ==========================================
  {
    groupId: "ztransform_group_direct",
    topicId: "z_transform",
    instruction:
      "V úlohách nájdite Z-obrazy nasledujúcich postupností $(a_n)_{n=0}^{\\infty}$.",
    exercises: [
      {
        id: "ztrans_ex_1",
        prompt:
          "1. $(a_n)_{n=0}^{\\infty} = (e^{-n} + 2^{\\frac{n}{2}})_{n=0}^{\\infty}$.",
        correctAnswer: "\\frac{ez}{ez-1} + \\frac{z}{z-\\sqrt{2}}",
        difficulty: "medium",
        tags: ["z_transform_direct", "exponential"],
        mathEnginePayload: {
          problemType: "z_transform_direct",
          expression: "exp(-n) + 2**(n/2)",
          variables: "n,z",
        },
      },
      {
        id: "ztrans_ex_2",
        prompt: "2. $(a_n)_{n=0}^{\\infty} = (3^n \\cos 2n)_{n=0}^{\\infty}$.",
        correctAnswer: "\\frac{z(z-3\\cos 2)}{z^2-6z\\cos 2+9}",
        difficulty: "medium",
        tags: ["z_transform_direct", "trigonometric"],
        mathEnginePayload: {
          problemType: "z_transform_direct",
          expression: "3**n * cos(2*n)",
          variables: "n,z",
        },
      },
      {
        id: "ztrans_ex_3",
        prompt: "3. $(a_n)_{n=0}^{\\infty} = (n2^n)_{n=0}^{\\infty}$.",
        correctAnswer: "\\frac{2z}{(z-2)^2}",
        difficulty: "medium",
        tags: ["z_transform_direct", "polynomial_exp"],
        mathEnginePayload: {
          problemType: "z_transform_direct",
          expression: "n * 2**n",
          variables: "n,z",
        },
      },
      {
        id: "ztrans_ex_4",
        prompt: "4. $(a_n)_{n=0}^{\\infty} = (3^{n+1})_{n=0}^{\\infty}$.",
        correctAnswer: "\\frac{3z}{z-3}",
        difficulty: "easy",
        tags: ["z_transform_direct", "exponential"],
        mathEnginePayload: {
          problemType: "z_transform_direct",
          expression: "3**(n+1)",
          variables: "n,z",
        },
      },
      {
        id: "ztrans_ex_5",
        prompt: "5. $(a_n)_{n=0}^{\\infty} = (n+2)_{n=0}^{\\infty}$.",
        correctAnswer: "\\frac{z(2z-1)}{(z-1)^2}",
        difficulty: "easy",
        tags: ["z_transform_direct", "polynomial"],
        mathEnginePayload: {
          problemType: "z_transform_direct",
          expression: "n + 2",
          variables: "n,z",
        },
      },
    ],
  },
  {
    groupId: "ztransform_group_inverse",
    topicId: "z_transform",
    instruction:
      "Nájdite postupnosť $(a_n)_{n=0}^{\\infty} \\in \\mathbb{Z}_0$, ktorej obraz je vyjadrený predpisom:",
    exercises: [
      {
        id: "ztrans_ex_6",
        prompt: "6. $\\frac{1}{(z-2)(z-3)}$.",
        correctAnswer: "a_0 = 0, a_n = 3^{n-1} - 2^{n-1}, n \\in \\mathbf{N}",
        difficulty: "medium",
        tags: ["z_transform_inverse", "rational"],
        mathEnginePayload: {
          problemType: "z_transform_inverse",
          expression: "1 / ((z-2)*(z-3))",
          variables: "z,n",
        },
      },
      {
        id: "ztrans_ex_7",
        prompt: "7. $\\frac{z}{z^2+1}$.",
        correctAnswer: "\\left(\\sin\\frac{n\\pi}{2}\\right)_{n=0}^{\\infty}",
        difficulty: "medium",
        tags: ["z_transform_inverse", "rational", "trigonometric"],
        mathEnginePayload: {
          problemType: "z_transform_inverse",
          expression: "z / (z**2 + 1)",
          variables: "z,n",
        },
      },
      {
        id: "ztrans_ex_8",
        prompt: "8. $\\frac{z+1}{z(z^2+2z+2)}$.",
        correctAnswer:
          "a_0=0, a_n=\\left(\\frac{1}{2}-i\\right)\\left(1+i\\right)^{n-1}+\\left(\\frac{1}{2}+i\\right)\\left(1-i\\right)^{n-1}, n \\in \\mathbf{N}",
        difficulty: "hard",
        tags: ["z_transform_inverse", "rational", "complex_roots"],
        mathEnginePayload: {
          problemType: "z_transform_inverse",
          expression: "(z+1) / (z*(z**2 + 2*z + 2))",
          variables: "z,n",
        },
      },
      {
        id: "ztrans_ex_9",
        prompt: "9. $\\frac{z}{z^4-1}$.",
        correctAnswer:
          "\\frac{1+(-1)^{n-1}}{4} - \\frac{1}{2}\\sin\\frac{n\\pi}{2}",
        difficulty: "hard",
        tags: ["z_transform_inverse", "rational"],
        mathEnginePayload: {
          problemType: "z_transform_inverse",
          expression: "z / (z**4 - 1)",
          variables: "z,n",
        },
      },
    ],
  },
  {
    groupId: "ztransform_group_difference_equations",
    topicId: "z_transform",
    instruction: "Riešme ZÚ pre diferenčné rovnice:",
    exercises: [
      {
        id: "ztrans_ex_10",
        prompt: "10. $y_{n+2} - 2y_{n+1} + 2y_n = 0$, $y_0 = 1$, $y_1 = 4$.",
        correctAnswer:
          "\\left( 2^{\\frac{n}{2}} \\left( \\cos \\frac{n\\pi}{2} + 3 \\sin \\frac{n\\pi}{2} \\right) \\right)_{n=0}^{\\infty}",
        difficulty: "hard",
        tags: ["z_transform_difference_eq"],
        mathEnginePayload: {
          problemType: "z_transform_difference_eq",
          expression: "y(n+2) - 2*y(n+1) + 2*y(n)",
          variables: "n,z",
          equationRightSide: "0",
          initialConditions: ["y_0=1", "y_1=4"],
        },
      },
      {
        id: "ztrans_ex_11",
        prompt: "11. $y_{n+2} + 3y_{n+1} - 4y_n = e^n$, $y_0 = 0$, $y_1 = 1$.",
        correctAnswer:
          "\\frac{e-2}{5(e-1)} + \\frac{e^n}{e^2 + 3e + 4} - (-4)^n \\frac{3+e}{5(e+4)}",
        difficulty: "hard",
        tags: ["z_transform_difference_eq"],
        mathEnginePayload: {
          problemType: "z_transform_difference_eq",
          expression: "y(n+2) + 3*y(n+1) - 4*y(n)",
          variables: "n,z",
          equationRightSide: "exp(n)",
          initialConditions: ["y_0=0", "y_1=1"],
        },
      },
      {
        id: "ztrans_ex_12",
        prompt:
          "12. $y_{n+1} + 2y_n = a_n$, $y_0 = 0$, $a_n = \\begin{cases} n, & \\text{ak } n < 4 \\\\ 0, & \\text{ak } n \\ge 4 \\end{cases}$.",
        correctAnswer:
          "y_0 = y_1 = 0, y_2 = 1, y_3 = 0, y_n = 3 \\left( -2 \\right)^{n-4}, n > 3.",
        difficulty: "hard",
        tags: ["z_transform_difference_eq", "piecewise_sequence"],
        mathEnginePayload: {
          problemType: "z_transform_difference_eq",
          expression: "y(n+1) + 2*y(n)",
          variables: "n,z",
          equationRightSide: "Piecewise((n, n < 4), (0, True))",
          initialConditions: ["y_0=0"],
        },
      },
    ],
  },
];
