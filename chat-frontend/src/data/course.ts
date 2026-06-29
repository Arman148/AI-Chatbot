// src/data/course.ts
import { CourseTopic } from "../types/courseTypes";
import { fourier } from "./content/fourier";
import { laplace } from "./content/laplace";
import { laplaceApplications } from "./content/laplaceApplications";
import { zTransform } from "./content/zTransformation";

export const COURSE_CONTENT: Record<string, CourseTopic> = {
  fourier_transform: fourier,
  laplace_transform: laplace,
  laplace_applications: laplaceApplications,
  z_transform: zTransform,
};

/*
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

export type PracticeExercise = {
  id: string; // "fourier_ex_1"
  topicId: string; // e.g. "fourier_transform"
  prompt: string; // full task text
  correctAnswer?: string; // optional closed-form answer
  difficulty?: "easy" | "medium" | "hard";
  tags?: string[]; // optional: ["fourier_transform", "gaussian"]
};

*/

/*
export const COURSE_CONTENT: Record<string, CourseTopic> = {
  fourier_transform: {
    id: "fourier_transform",
    title: "Fourierova transformácia",
    subthemes: [
      {
        id: "fourier_series",
        title: "Fourierove rady",
        sections: [
          {
            id: "fourier_series_intro",
            type: "theory",
            title: "Fourierove rady a periodická funkcia",
            paragraphs: [
              "Základom pre pochopenie frekvenčnej analýzy je práca s periodickými funkciami. Uvažujme funkciu {{func_def}}, ktorá je definovaná na intervale dĺžky T, alebo je priamo periodická s periódou T.",
              "Aby sme s takouto funkciou mohli pracovať, vyžadujeme, aby bola integrovateľná na danom intervale, čo znamená: {{int_condition}}.",
              "Takúto funkciu môžeme vyjadriť pomocou Fourierovho radu v komplexnom tvare. Ide o súčet nekonečného radu exponenciálnych funkcií: {{complex_series}}.",
              "V tomto vyjadrení vystupuje uhlová frekvencia {{omega}}.",
              "Jednotlivé členy radu sú vážené Fourierovými koeficientmi {{coeff_def}}. Tieto koeficienty nám hovoria, akou mierou sa daná harmonická zložka (kmitočet) podieľa na výslednom tvare funkcie.",
              "Dôležitou vlastnosťou je, že ak majú dve funkcie rovnaké Fourierove koeficienty, sú identické (pre spojité funkcie). Koeficienty teda jednoznačne charakterizujú funkciu vo frekvenčnej oblasti.",
              "Špeciálnym prípadom je, ak je funkcia f reálna. Vtedy platí vzťah symetrie pre koeficienty: {{real_symmetry}}.",
              "Pre reálnu funkciu môžeme Fourierov rad upraviť zlúčením komplexne združených členov do reálneho tvaru. Pre n ≥ 1 platí úprava: {{real_derivation}}.",
              "Tým dostávame vyjadrenie pomocou reálnych koeficientov a_n a b_n: {{ab_def}}.",
              "Výsledný kosínovo-sínový tvar Fourierovho radu potom vyzerá takto: {{sincos_form}}, pričom amplitúda n-tej harmonickej zložky je {{amplitude}}.",
              "Medzi komplexnými a reálnymi koeficientmi existujú jednoduché prevodné vzťahy: {{transform_relations}}.",
            ],
            formulas: {
              func_def:
                "f:\\langle a,a+T\\rangle\\longrightarrow {\\pmb C}, T>0",
              int_condition: "\\int_a^{a+T} |f(t)| dt < \\infty",
              complex_series:
                "\\sum_{n=-\\infty}^{\\infty} c_n e^{in\\omega t} = \\dots + c_{-1} e^{-i\\omega t} + c_0 + c_1 e^{i\\omega t} + \\dots",
              omega: "\\omega = \\frac{2\\pi}{T}",
              coeff_def:
                "c_n = \\frac{1}{T} \\int_a^{a+T} f(t)e^{-in\\omega t} dt",
              real_symmetry: "c_{-n} = \\overline{c_n}",
              real_derivation:
                "c_n e^{in\\omega t} + c_{-n} e^{-in\\omega t} = 2 \\operatorname{Re} c_n \\cos n\\omega t - 2 \\operatorname{Im} c_n \\sin n\\omega t",
              ab_def:
                "a_n = 2 \\operatorname{Re} c_n = \\frac{2}{T} \\int_a^{a+T} f(t) \\cos n\\omega t dt, \\quad b_n = -2 \\operatorname{Im} c_n = \\frac{2}{T} \\int_a^{a+T} f(t) \\sin n\\omega t dt",
              sincos_form:
                "\\frac{a_0}{2} + \\sum_{n=1}^{\\infty} a_n \\cos n\\omega t + b_n \\sin n\\omega t",
              amplitude: "A_n = \\sqrt{a_n^2 + b_n^2}",
              transform_relations:
                "c_n = \\frac{a_n - ib_n}{2}, \\quad c_{-n} = \\frac{a_n + ib_n}{2}",
            },
            intuitiveExplanation: [
              "Predstavte si, že máte zložitý zvukový signál (napríklad akord na klavíri). Fourierov rad nám hovorí, že tento zložitý zvuk môžeme 'rozobrať' na veľa jednoduchých čistých tónov (sínusoidy).",
              "Koeficienty c_n (alebo a_n, b_n) sú ako 'volume' gombíky pre každý jeden čistý tón. Ak je koeficient veľký, ten tón je v zvuku silno počuť.",
              "Komplexný tvar je len matematicky elegantnejší spôsob, ako zapísať to isté, čo sínusy a kosínusy.",
            ],
          },
          {
            id: "dirichlet_theorem",
            type: "theory",
            title: "Dirichletova veta o konvergencii",
            paragraphs: [
              "Dôležitou otázkou je, či sa súčet Fourierovho radu skutočne rovná pôvodnej funkcii. Odpoveď dáva Dirichletova veta.",
              "Ak je reálna funkcia f(t) s periódou T po častiach spojitá a má po častiach spojitú deriváciu, potom Fourierov rad konverguje k priemeru ľavej a pravej limity funkcie v danom bode: {{dirichlet_formula}}.",
            ],
            formulas: {
              dirichlet_formula:
                "\\frac{f(t+)+f(t-)}{2} = \\frac{a_0}{2} + \\sum_{n=1}^{\\infty} (a_n \\cos n\\omega t + b_n \\sin n\\omega t)",
            },
            intuitiveExplanation: [],
          },
          // later: worked_examples + exercises for Fourier series
        ],
      },

      {
        id: "fourier_transform_basics",
        title: "Priama a inverzná Fourierova transformácia",
        sections: [
          {
            id: "fourier_transform_definition",
            type: "theory",
            title: "Priama a inverzná Fourierova transformácia",
            paragraphs: [
              "Doteraz sme hovorili o periodických funkciách. Čo však ak funkcia nie je periodická? Motiváciou pre Fourierovu transformáciu je rozšírenie tejto myšlienky na nekonečnú časovú oblasť (akoby perióda T išla do nekonečna).",
              "Namiesto diskrétnych koeficientov dostávame spojitú funkciu frekvencií. Definujeme priamu Fourierovu transformáciu funkcie f ako: {{fourier_transform_def}}.",
              "Tento proces je vratný. Pôvodnú funkciu môžeme získať späť pomocou inverznej Fourierovej transformácie: {{inverse_fourier_def}}.",
              "Premenná p v týchto vzorcoch reprezentuje uhlovú frekvenciu (často značená aj ako omega).",
              "Často sa používa aj iné značenie pre transformáciu, napríklad pomocou operátorov: {{notation_variants}}.",
              "Aby Fourierova transformácia vôbec existovala, funkcia musí byť absolútne integrovateľná na celej reálnej osi. To je postačujúca podmienka: {{existence_condition}}.",
              "Množinu všetkých takýchto funkcií označujeme ako L1 priestor: {{l1_space}}.",
            ],
            formulas: {
              fourier_transform_def:
                "\\mathcal{F}\\{f(t)\\} = \\int_{-\\infty}^{\\infty} f(t)e^{-ipt}dt, \\quad p \\in \\mathbf{R}",
              inverse_fourier_def:
                "\\mathcal{F}^{-1}\\{f(t)\\} = \\frac{1}{2\\pi} \\int_{-\\infty}^{\\infty} f(t) e^{ipt} dt",
              notation_variants:
                "\\mathcal{F}:f\\mapsto \\stackrel{\\downarrow}{f}, \\quad F\\{f(t)\\} = \\stackrel{\\downarrow}{f}(p)",
              existence_condition:
                "\\int_{-\\infty}^{\\infty} |f(t)| dt < \\infty",
              l1_space:
                "L^1(\\mathbf{R}) = \\{f: \\mathbf{R} \\longrightarrow \\mathbf{C}: \\int_{-\\infty}^{\\infty} |f(t)| dt < \\infty\\}",
            },
            intuitiveExplanation: [],
          },
          {
            id: "fourier_transform_examples_block_4_10",
            type: "worked_examples",
            title: "Príklady 4–10: Základné Fourierove obrazy",
            examples: [
              {
                id: "example_4_rect_window",
                problem:
                  "Nájdite Fourierovu transformáciu funkcie f_a(t) = 1 pre t ∈ ⟨-a, a⟩ a f_a(t) = 0 inak, kde a > 0.",
                relatedTheorySectionId: "fourier_transform_definition",
                difficulty: "easy",
                tags: ["fourier_transform", "rectangular_pulse"],
                solutionSteps: [
                  "Zapíšeme definíciu Fourierovej transformácie pre f_a(t): \\(\\mathcal{F}\\{f_a\\}(p) = \\int_{-\\infty}^{\\infty} f_a(t) e^{-ipt} dt\\).",
                  "Keďže f_a(t) je 1 iba na intervale ⟨-a, a⟩ a inde 0, integrál sa zúži na \\(\\int_{-a}^{a} e^{-ipt} dt\\).",
                  "Vyrátame neurčitý integrál: \\(\\int e^{-ipt} dt = \\frac{e^{-ipt}}{-ip}\\).",
                  "Dosadíme hranice -a a a: \\(\\left[\\frac{e^{-ipt}}{-ip}\\right]_{-a}^{a} = \\frac{e^{iap} - e^{-iap}}{ip}\\).",
                  "Použijeme identitu \\(e^{ix} - e^{-ix} = 2i\\sin x\\) a upravíme na tvar \\(2 \\frac{\\sin(ap)}{p}\\).",
                  "Výsledkom je Fourierova transformácia: \\(\\mathcal{F}\\{f_a\\}(p) = 2\\frac{\\sin(ap)}{p}\\).",
                ],
              },
              {
                id: "example_6_inverse_rect_window",
                problem:
                  "Nájdite inverzný obraz funkcie, ktorej Fourierova transformácia zodpovedá f_a(t) = 1 pre t ∈ ⟨-a, a⟩ a 0 inak, a > 0.",
                relatedTheorySectionId: "fourier_transform_definition",
                difficulty: "easy",
                tags: ["inverse_fourier_transform", "rectangular_pulse"],
                solutionSteps: [
                  "Využijeme vzťah medzi Fourierovou transformáciou a jej inverziou v normalizácii, kde platí \\(\\mathcal{F}^{-1}\\{f\\}(p) = \\frac{1}{2\\pi} f(-p)\\).",
                  "Pre náš prípad platí, že obraz f_a(t) má tvar \\(2 \\frac{\\sin(ap)}{p}\\), takže pri inverzii sa objaví faktor \\(\\frac{1}{2\\pi}\\).",
                  "Dosadením dostaneme \\(\\mathcal{F}^{-1}\\{f_a\\}(p) = \\frac{1}{2\\pi} 2 \\frac{\\sin(-ap)}{-p}\\).",
                  "Upravíme znamienka: \\(\\sin(-ap) = -\\sin(ap)\\), čím dostaneme \\(\\frac{1}{\\pi} \\frac{\\sin(ap)}{p}\\).",
                  "Výsledkom je, že inverzný obraz má tvar \\(\\mathcal{F}^{-1}\\{f_a\\}(p) = \\frac{1}{\\pi} \\frac{\\sin(ap)}{p}\\).",
                ],
              },
              {
                id: "example_8_gaussian",
                problem:
                  "Nájdite Fourierovu transformáciu gaussovskej funkcie f(t) = e^{-at^2}, kde a > 0.",
                relatedTheorySectionId: "fourier_transform_definition",
                difficulty: "medium",
                tags: ["fourier_transform", "gaussian"],
                solutionSteps: [
                  "Vychádzame zo známeho integrálu \\(\\int_{-\\infty}^{\\infty} e^{-t^2} e^{-ipt} dt = \\sqrt{\\pi} e^{-p^2/4}\\).",
                  "Fourierovu transformáciu f(t) = e^{-at^2} zapíšeme ako \\(\\int_{-\\infty}^{\\infty} e^{-at^2} e^{-ipt} dt\\).",
                  "Substituujeme \\(u = \\sqrt{a} t\\), takže \\(t = u/\\sqrt{a}\\) a \\(dt = du/\\sqrt{a}\\).",
                  "Po substitúcii dostaneme \\(\\hat{f}(p) = \\frac{1}{\\sqrt{a}} \\int_{-\\infty}^{\\infty} e^{-u^2} e^{-iup/\\sqrt{a}} du\\).",
                  "Použijeme tvar známeho integrálu, kde \\(p\\) nahradíme \\(p/\\sqrt{a}\\), a dostaneme \\(\\sqrt{\\pi} e^{-p^2/(4a)}\\).",
                  "Výsledkom je \\(\\hat{f}(p) = \\sqrt{\\frac{\\pi}{a}} e^{-p^2/(4a)}\\).",
                ],
              },
              {
                id: "example_10_rc_discharge",
                problem:
                  "Nájdite Fourierovu transformáciu funkcie, ktorá popisuje vybíjanie kondenzátora f(t) = e^{-\\alpha t} pre t ≥ 0 a f(t) = 0 pre t < 0, kde \\(\\alpha > 0\\).",
                relatedTheorySectionId: "fourier_transform_definition",
                difficulty: "medium",
                tags: ["fourier_transform", "exponential", "causal_signal"],
                solutionSteps: [
                  "Zapíšeme Fourierovu transformáciu ako \\(\\mathcal{F}\\{f\\}(p) = \\int_{-\\infty}^{\\infty} f(t) e^{-ipt} dt\\).",
                  "Keďže f(t) = 0 pre t < 0, integrál sa zúži na \\(\\int_0^{\\infty} e^{-\\alpha t} e^{-ipt} dt\\).",
                  "Spojíme exponenty: \\(e^{-\\alpha t} e^{-ipt} = e^{-(\\alpha + ip)t}\\).",
                  "Integrál má tvar \\(\\int_0^{\\infty} e^{-(\\alpha + ip)t} dt\\).",
                  "Vyrátame neurčitý integrál: \\(\\int e^{-(\\alpha + ip)t} dt = -\\frac{1}{\\alpha + ip} e^{-(\\alpha + ip)t}\\).",
                  "Dosadením hraníc 0 a \\(\\infty\\) dostaneme \\(\\left[-\\frac{1}{\\alpha + ip} e^{-(\\alpha + ip)t}\\right]_0^{\\infty} = \\frac{1}{\\alpha + ip}\\).",
                  "Výsledkom je \\(\\mathcal{F}\\{f\\}(p) = \\frac{1}{\\alpha + ip}\\).",
                ],
              },
            ],
          },
        ],
      },

      {
        id: "fourier_rational_and_properties",
        title: "Racionálne funkcie, inverzná transformácia a vlastnosti",
        sections: [
          {
            id: "fourier_rational_images",
            type: "theory",
            title: "Fourierove obrazy racionálnych funkcií",
            paragraphs: [
              "Fourierove obrazy racionálnych funkcií sú aplikáciou Cauchyho vety o rezíduách. Predpokladajme, že P a Q sú polynómy, platí st Q > st P a Q nemá reálne korene. Potom platí integrálový vzťah: {{rational_residue_formula}}.",
              "Pri výpočte Fourierovej transformácie racionálnej funkcie $\\frac{P(t)}{Q(t)}$ potrebujeme vypočítať integrál $\\int_{-\\infty}^{\\infty} \\frac{P(t)}{Q(t)} e^{-ipt} dt$. Pomocou substitúcie ho prevedieme na tvar vhodný pre Cauchyho vetu. Pre $p \\neq 0$ použijeme substitúciu $u = -pt$, $du = -p\\,dt$.",
              "Po tejto substitúcii dostaneme vzťah: {{rational_substitution}}.",
              "Ak označíme $R(z) = \\frac{P(-z/p)}{Q(-z/p)}$, získame výslednú formu integrálu v komplexnej rovine: {{rational_Rz_formula}}.",
            ],
            formulas: {
              rational_residue_formula:
                "\\int_{-\\infty}^{\\infty} \\frac{P(t)}{Q(t)} e^{it} dt = 2\\pi i \\sum_{\\{ z : Q(z) = 0,\\ \\operatorname{Im} z > 0 \\}} \\operatorname*{res}\\left( \\frac{P(z)}{Q(z)} e^{iz} \\right)",
              rational_substitution:
                "\\int_{-\\infty}^{\\infty} \\frac{P(t)}{Q(t)} e^{-ipt} dt = \\int_{-\\infty}^{\\infty} \\frac{P\\left(-\\frac{u}{p}\\right)}{Q\\left(-\\frac{u}{p}\\right)} e^{iu} \\frac{du}{|p|}",
              rational_Rz_formula:
                "\\int_{-\\infty}^{\\infty} \\frac{P(t)}{Q(t)} e^{-ipt} dt = \\frac{2\\pi i}{|p|} \\sum_{\\{ z : Q(-z/p) = 0,\\ \\operatorname{Im} z > 0 \\}} \\operatorname*{res}_z \\left( R(z) e^{iz} \\right)",
            },
            intuitiveExplanation: [],
          },
          {
            id: "fourier_rational_example_12",
            type: "worked_examples",
            title: "Príklad 12: Obraz racionálnej funkcie",
            examples: [
              {
                id: "example_12_rational_1_over_t2_plus_1",
                problem:
                  "Nájdite Fourierovu transformáciu funkcie $f(t) = \\frac{1}{t^2 + 1}$.",
                relatedTheorySectionId: "fourier_rational_images",
                difficulty: "medium",
                tags: ["fourier_transform", "rational_function"],
                solutionSteps: [
                  "Uvažujeme integrál $\\int_{-\\infty}^{\\infty} \\frac{1}{t^2 + 1} e^{-ipt} dt$ pre $p \\neq 0$ a použijeme metodiku racionálnych funkcií a rezíduí.",
                  "Definujeme $R(z) = \\frac{1}{(-z/p)^2 + 1} = \\frac{p^2}{z^2 + p^2}$ a aplikujeme Cauchyho vetu o rezíduách na póly v hornej polrovine.",
                  "Výsledkom je známy vzťah pre Fourierovu transformáciu tejto funkcie: $\\widehat{f}(p) = \\pi e^{-|p|}$.",
                ],
              },
            ],
          },
          {
            id: "fourier_series_connection",
            type: "theory",
            title: "Súvislosť Fourierovej transformácie a Fourierovho radu",
            paragraphs: [
              "Predpokladajme, že $f(t)$ je periodická funkcia s periódou $T > 0$ taká, že $\\int_a^{a+T} |f(t)| dt < \\infty$. Označme $\\mathbf{1}_{\\langle a,a+T\\rangle}$ charakteristickú funkciu intervalu $\\langle a,a+T\\rangle$ a $f_T = \\mathbf{1}_{\\langle a,a+T\\rangle} f(t)$.",
              "Pre Fourierov koeficient $c_n$ funkcie $f(t)$ platí vzťah {{fourier_coeff_transform_link}}, ktorý prepája Fourierovu transformáciu orezanej funkcie $f_T$ s Fourierovým radom pôvodnej funkcie.",
            ],
            formulas: {
              fourier_coeff_transform_link:
                "c_n = \\frac{1}{T} \\int_a^{a+T} f(t) e^{-in\\omega t} dt = \\frac{1}{T} \\widehat{f_T}(n\\omega)",
            },
            intuitiveExplanation: [],
          },
          {
            id: "inverse_fourier_theorem",
            type: "theory",
            title: "Veta o inverznej Fourierovej transformácii",
            paragraphs: [
              "Nech $f \\in L^1(\\mathbf{R})$. Ak je $f$ spojitá na $\\mathbf{R}$ a $f \\in L^1(\\mathbf{R})$, potom pre všetky $t \\in \\mathbf{R}$ platí {{inverse_fourier_case1}}.",
              "Ak sú $f$ a $f'$ po častiach spojité funkcie na $\\mathbf{R}$, potom pre všetky $t \\in \\mathbf{R}$ platí {{inverse_fourier_case2}}.",
              "Význam týchto vzťahov je v tom, že zápis $f(t) = \\frac{1}{2\\pi} \\int_{-\\infty}^{\\infty} \\widehat{f}(p) e^{ipt} dp$ môžeme chápať ako limitu aproximujúcich súčtov s diskrétnymi frekvenciami $p_i$, kde $|\\widehat{f}(p)|$ vystupuje ako amplitúda harmonickej zložky.",
            ],
            formulas: {
              inverse_fourier_case1:
                "f(t) = \\frac{1}{2\\pi} \\int_{-\\infty}^{\\infty} \\widehat{f}(p) e^{ipt} dp",
              inverse_fourier_case2:
                "\\frac{f(t+) + f(t-)}{2} = \\frac{1}{2\\pi} \\int_{-\\infty}^{\\infty} \\widehat{f}(p) e^{ipt} dp",
            },
            intuitiveExplanation: [],
          },
          {
            id: "inverse_fourier_example_16",
            type: "worked_examples",
            title: "Príklad 16: Inverzný obraz funkcie",
            examples: [
              {
                id: "example_16_inverse_sin_p_over_p",
                problem:
                  "Nech $g(t) = \\frac{1}{2\\pi} \\int_{-\\infty}^{\\infty} 2\\,\\frac{\\sin p}{p} e^{ipt} dp$. Nájdite tvar funkcie $g(t)$ a určte inverzný obraz funkcie $h(p) = \\frac{2\\sin p}{p}$.",
                relatedTheorySectionId: "inverse_fourier_theorem",
                difficulty: "medium",
                tags: ["inverse_fourier_transform", "rectangular_pulse"],
                solutionSteps: [
                  "Použijeme vetu o inverznej Fourierovej transformácii na funkciu s obrazom $h(p) = \\frac{2\\sin p}{p}$. Integrál definuje funkciu $g(t)$ ako inverzný obraz tejto funkcie.",
                  "Z vlastností Fourierovej transformácie reálneho obmedzeného impulzu vieme, že výsledná funkcia $g(t)$ je bránová funkcia na intervale $(-1,1)$ s polovičnými hodnotami v krajných bodoch.",
                  "Dostávame teda $g(t) = 1$ pre $t \\in (-1,1)$, $g(t) = \\frac{1}{2}$ pre $t = \\pm 1$ a $g(t) = 0$ inak. Inverzný obraz funkcie $h(p) = \\frac{2\\sin p}{p}$ je práve táto funkcia $g(t)$.",
                ],
              },
            ],
          },
          {
            id: "fourier_grammar_properties",
            type: "theory",
            title: "Základná gramatika Fourierovej transformácie",
            paragraphs: [
              "Nech $F(p) = \\mathcal{F}\\{f(t)\\} = \\int_{-\\infty}^{\\infty} f(t) e^{ipt} dt$, $p \\in \\mathbf{R}$. Nasledujúce pravidlá opisujú základné operácie s Fourierovou transformáciou: posun, zmenu mierky, konjugáciu a moduláciu.",
              "Pravidlá sú: {{grammar_shift_origin}}, {{grammar_scaling}}, {{grammar_conjugation}}, {{grammar_modulation}}.",
            ],
            formulas: {
              grammar_shift_origin:
                "1.\\ \\mathcal{F}\\{f(t-a)\\}(p) = e^{-ipa} F(p)",
              grammar_scaling:
                "2.\\ \\mathcal{F}\\{f(at)\\}(p) = \\frac{1}{|a|} F\\!\\left(\\frac{p}{a}\\right),\\ a \\neq 0",
              grammar_conjugation:
                "3.\\ \\mathcal{F}\\{\\overline{f(-t)}\\}(p) = \\overline{F(p)}",
              grammar_modulation:
                "4.\\ \\mathcal{F}\\{e^{iat} f(t)\\}(p) = F(p-a)",
            },
            intuitiveExplanation: [],
          },
          {
            id: "fourier_grammar_examples",
            type: "worked_examples",
            title: "Príklady k základnej gramatike",
            examples: [
              {
                id: "example_18_gaussian_shift",
                problem:
                  "Vypočítajte Fourierovu transformáciu $\\mathcal{F}(f)$, ak $f(t) = e^{-\\frac{1}{2}(t-1)^2}$, pričom poznáme Fourierovu transformáciu všeobecnej gaussovskej funkcie.",
                relatedTheorySectionId: "fourier_grammar_properties",
                difficulty: "medium",
                tags: ["fourier_transform", "gaussian", "shift"],
                solutionSteps: [
                  "Východiskom je Fourierova transformácia gaussovskej funkcie $e^{-\\frac{1}{2}t^2}$, ktorá má tvar $\\sqrt{2\\pi} e^{-\\frac{p^2}{2}}$.",
                  "Funkcia $f(t) = e^{-\\frac{1}{2}(t-1)^2}$ je posunutou gaussovskou funkciou o 1, teda $f(t) = g(t-1)$.",
                  "Podľa pravidla posunu v originále platí $\\mathcal{F}\\{f(t)\\}(p) = e^{-ip} \\sqrt{2\\pi} e^{-\\frac{p^2}{2}}$.",
                ],
              },
              {
                id: "example_20_sin_times_gaussian",
                problem:
                  "Vypočítajte Fourierovu transformáciu $\\mathcal{F}(f)$, ak $f(t) = \\sin t \\cdot e^{-t^2}$.",
                relatedTheorySectionId: "fourier_grammar_properties",
                difficulty: "medium",
                tags: ["fourier_transform", "gaussian", "modulation"],
                solutionSteps: [
                  "Zapíšeme $\\sin t$ pomocou komplexnej exponenciály: $\\sin t = \\frac{e^{it} - e^{-it}}{2i}$, takže $f(t) = \\frac{e^{it} - e^{-it}}{2i} e^{-t^2}$.",
                  "Fourierova transformácia gaussovskej funkcie $e^{-t^2}$ je $\\sqrt{\\pi} e^{-\\frac{p^2}{4}}$. Použitím pravidla modulácie získame posuny argumentu v obraze.",
                  "Výsledok má tvar $\\mathcal{F}\\{f(t)\\}(p) = \\frac{1}{2i} \\sqrt{\\pi} \\left( e^{-\\frac{(p-1)^2}{4}} - e^{-\\frac{(p+1)^2}{4}} \\right)$.",
                ],
              },
              {
                id: "example_22_real_image_condition",
                problem:
                  "Predpokladajme platnosť vety o inverznej Fourierovej transformácii. Aké reálne funkcie majú reálny Fourierov obraz?",
                relatedTheorySectionId: "fourier_grammar_properties",
                difficulty: "easy",
                tags: ["fourier_transform", "symmetry"],
                solutionSteps: [
                  "Aby Fourierov obraz reálnej funkcie bol reálny, musí platiť $\\widehat{f}(p) = \\overline{\\widehat{f}(p)}$.",
                  "Z pravidiel symetrie pre Fourierovu transformáciu vyplýva, že táto podmienka je splnená, ak je pôvodná funkcia párna, teda $f(-t) = f(t)$.",
                  "Reálne funkcie s reálnym Fourierovým obrazom sú preto práve párne reálne funkcie.",
                ],
              },
              {
                id: "example_24_scaled_shifted_function",
                problem:
                  "Vypočítajte Fourierov obraz funkcie $g(t) = f(2t - 3)$ pomocou známeho obrazu funkcie $f(t)$.",
                relatedTheorySectionId: "fourier_grammar_properties",
                difficulty: "easy",
                tags: ["fourier_transform", "shift", "scaling"],
                solutionSteps: [
                  "Ak poznáme obraz $\\mathcal{F}\\{f(t)\\}(p) = F(p)$, môžeme použiť pravidlá posunu a zmeny mierky.",
                  "Najprv použijeme posun: $f(t-3)$ má obraz $e^{-3ip} F(p)$. Potom zmenu mierky pre $f(2t-3) = f(2(t-\\frac{3}{2}))$.",
                  "Výsledok je $\\mathcal{F}\\{f(2t-3)\\}(p) = \\frac{1}{2} e^{-\\frac{3}{2}ip} F\\!\\left(\\frac{p}{2}\\right)$.",
                ],
              },
            ],
          },
          {
            id: "fourier_derivative_convolution",
            type: "theory",
            title: "Derivácie, konvolúcia a ich obrazy",
            paragraphs: [
              "Riemannova–Lebesgueova veta hovorí, že ak $f \\in L^1(\\mathbf{R})$, potom je jej Fourierov obraz spojitý a platí $\\lim_{p \\to \\pm \\infty} \\widehat{f}(p) = 0$. To opisuje miznutie vysokofrekvenčných zložiek.",
              "Pre deriváciu platí, že ak je $f$ spojite diferencovateľná a $f, f' \\in L^1(\\mathbf{R})$, potom Fourierov obraz derivácie spĺňa vzťah {{derivative_image}}.",
              "Ak sú $f, f', \\dots, f^{(k)}$ spojité funkcie z $L^1(\\mathbf{R})$, potom obraz $k$-tej derivácie spĺňa {{derivative_corollary}}, čo v kombinácii s Riemannovou–Lebesgueovou lemmou dáva informáciu o poklese obrazu.",
              "Konvolúcia $h = f * g$ je definovaná vzťahom {{convolution_def}} a jej Fourierov obraz je súčinom obrazov: {{convolution_image}}.",
            ],
            formulas: {
              derivative_image:
                "\\mathcal{F}\\{f'(t)\\}(p) = ip\\,\\widehat{f}(p)",
              derivative_corollary:
                "f^{(k)}(t)\\ \\widehat{\\ }\\ (ip)^k \\widehat{f}(p),\\ \\lim_{|p| \\to \\infty} p^k \\widehat{f}(p) = 0",
              convolution_def:
                "(f * g)(t) = \\int_{-\\infty}^{\\infty} f(s) g(t-s) ds",
              convolution_image:
                "\\widehat{h}(p) = \\widehat{f}(p)\\,\\widehat{g}(p)",
            },
            intuitiveExplanation: [],
          },
          {
            id: "fourier_derivative_convolution_examples",
            type: "worked_examples",
            title: "Príklady: derivácie, konvolúcia a diferenciálna rovnica",
            examples: [
              {
                id: "example_28_derivative_gaussian",
                problem:
                  "Vypočítajte Fourierov obraz $f'$, ak $f(t) = e^{-at^2}$, $a > 0$.",
                relatedTheorySectionId: "fourier_derivative_convolution",
                difficulty: "medium",
                tags: ["fourier_transform", "derivative", "gaussian"],
                solutionSteps: [
                  "Najprv určujeme deriváciu $f'(t) = -2at e^{-at^2}$.",
                  "Fourierov obraz funkcie $f(t) = e^{-at^2}$ je $\\widehat{f}(p) = \\sqrt{\\frac{\\pi}{a}} e^{-\\frac{p^2}{4a}}$.",
                  "Použijeme vzťah pre obraz derivácie: $\\mathcal{F}\\{f'(t)\\}(p) = ip\\,\\widehat{f}(p)$, takže $\\widehat{f'}(p) = ip \\sqrt{\\frac{\\pi}{a}} e^{-\\frac{p^2}{4a}}$.",
                ],
              },
              {
                id: "example_32_t_times_gaussian",
                problem:
                  "Vypočítajte Fourierovu transformáciu funkcie $f(t) = t e^{-\\frac{t^2}{2}}$.",
                relatedTheorySectionId: "fourier_derivative_convolution",
                difficulty: "medium",
                tags: ["fourier_transform", "derivative", "gaussian"],
                solutionSteps: [
                  "Využijeme vzťah pre obraz funkcie $t f(t)$: $\\mathcal{F}\\{t f(t)\\}(p) = i\\,\\frac{d}{dp} F(p)$, kde $F(p)$ je Fourierov obraz $f(t)$.",
                  "Fourierov obraz gaussovskej funkcie $e^{-\\frac{t^2}{2}}$ je $\\sqrt{2\\pi} e^{-\\frac{p^2}{2}}$.",
                  "Derivovaním dostávame $i\\,\\frac{d}{dp}\\left( \\sqrt{2\\pi} e^{-\\frac{p^2}{2}} \\right) = -i\\sqrt{2\\pi} p e^{-\\frac{p^2}{2}}$, čo je hľadaný obraz funkcie $t e^{-\\frac{t^2}{2}}$.",
                ],
              },
              {
                id: "example_35_convolution_rect",
                problem:
                  "Určte konvolúciu $h = f_a * f_a$, kde $f_a$ je bránová funkcia na intervale $\\langle -a, a \\rangle$.",
                relatedTheorySectionId: "fourier_derivative_convolution",
                difficulty: "easy",
                tags: ["convolution", "rectangular_pulse"],
                solutionSteps: [
                  "Konvolúcia má tvar $h(t) = \\int_{-\\infty}^{\\infty} f_a(s) f_a(t-s) ds$.",
                  "Integrujeme cez prienik intervalov $\\langle -a,a \\rangle$ a $\\langle t-a, t+a \\rangle$ a postupne určujeme hodnoty $h(t)$ v rôznych intervaloch $t$.",
                  "Dostávame trojuholníkovú funkciu: $h(t) = 0$ pre $t < -2a$, $h(t) = t + 2a$ pre $t \\in \\langle -2a, 0 \\rangle$, $h(t) = 2a - t$ pre $t \\in \\langle 0, 2a \\rangle$ a $h(t) = 0$ pre $t > 2a$.",
                ],
              },
              {
                id: "example_38_triangle_image",
                problem:
                  "Vypočítajte Fourierov obraz trojuholníkovej funkcie $$f(t) = \\begin{cases} 0 & t < -2a \\\\ t + 2a & t \\in \\langle -2a, 0 \\rangle \\\\ 2a - t & t \\in \\langle 0, 2a \\rangle \\\\ 0 & t > 2a \\end{cases}.$$",
                relatedTheorySectionId: "fourier_derivative_convolution",
                difficulty: "medium",
                tags: ["fourier_transform", "convolution", "triangle"],
                solutionSteps: [
                  "Rozpoznáme, že daná trojuholníková funkcia vznikne ako konvolúcia dvoch bránových funkcií: $f(t) = f_a * f_a$.",
                  "Podľa vety o obraze konvolúcie platí, že obraz konvolúcie je súčinom obrazov: $\\widehat{f}(p) = (\\widehat{f_a}(p))^2$.",
                  "Keďže $\\widehat{f_a}(p) = 2\\,\\frac{\\sin(ap)}{p}$, dostávame $\\widehat{f}(p) = \\left( \\frac{2\\sin(ap)}{p} \\right)^2 = \\frac{4\\sin^2(ap)}{p^2}$.",
                ],
              },
              {
                id: "example_40_gaussian_convolution",
                problem:
                  "Vypočítajte konvolúciu $e^{-at^2} * e^{-bt^2}$ pre $a, b > 0$.",
                relatedTheorySectionId: "fourier_derivative_convolution",
                difficulty: "hard",
                tags: ["fourier_transform", "convolution", "gaussian"],
                solutionSteps: [
                  "Najprv určujeme Fourierove obrazy funkcií $e^{-at^2}$ a $e^{-bt^2}$, ktoré majú tvary $\\sqrt{\\frac{\\pi}{a}} e^{-\\frac{p^2}{4a}}$ a $\\sqrt{\\frac{\\pi}{b}} e^{-\\frac{p^2}{4b}}$.",
                  "Fourierov obraz konvolúcie je súčinom obrazov: $\\mathcal{F}\\{e^{-at^2} * e^{-bt^2}\\}(p) = \\sqrt{\\frac{\\pi}{a}} e^{-\\frac{p^2}{4a}} \\cdot \\sqrt{\\frac{\\pi}{b}} e^{-\\frac{p^2}{4b}} = \\frac{\\pi}{\\sqrt{ab}} e^{-\\frac{p^2}{4\\left( \\frac{ab}{a+b} \\right)}}$.",
                  "Inverznou Fourierovou transformáciou zistíme, že $e^{-at^2} * e^{-bt^2} = \\sqrt{\\frac{\\pi}{a+b}} e^{-\\frac{ab}{a+b} t^2}$, čo je opäť gaussovská funkcia.",
                ],
              },
              {
                id: "example_42_diff_eq_gaussian",
                problem:
                  "Riešte diferenciálnu rovnicu $y''(t) - y(t) = e^{-t^2}$ pomocou Fourierovej transformácie.",
                relatedTheorySectionId: "fourier_derivative_convolution",
                difficulty: "hard",
                tags: [
                  "fourier_transform",
                  "differential_equation",
                  "convolution",
                ],
                solutionSteps: [
                  "Aplikujeme Fourierovu transformáciu na rovnicu $y''(t) - y(t) = e^{-t^2}$. Použitím vzťahu pre obraz derivácie získame $(-p^2 - 1) \\widehat{y}(p) = \\widehat{e^{-t^2}}(p)$.",
                  "Fourierov obraz pravej strany je $\\widehat{e^{-t^2}}(p)$ a teda $\\widehat{y}(p) = -\\frac{1}{1 + p^2} \\widehat{e^{-t^2}}(p)$.",
                  "Prejdeme späť do časovej oblasti: riešenie je konvolúcia $y(t) = -\\left[ e^{-t^2} * \\mathcal{F}^{-1}\\left( \\frac{1}{1 + p^2} \\right) \\right](t)$, pričom $\\mathcal{F}^{-1}\\left( \\frac{1}{1 + p^2} \\right)(t) = \\frac{1}{2} e^{-|t|}$. Dostávame tvar $y(t) = -\\frac{1}{2} \\int_{-\\infty}^{\\infty} e^{-|t-s|} e^{-s^2} ds$.",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  laplace_transform: {
    id: "laplace_transform",
    title: "Laplaceova transformácia",
    subthemes: [
      {
        id: "laplace_intro_and_definition",
        title: "Úvod a definícia originálu",
        sections: [
          {
            id: "laplace_definition_theory",
            type: "theory",
            title: "Definícia Laplaceovej transformácie",
            paragraphs: [
              "Operačný počet je 'abecedou automatizácie' a kľúčovým nástrojom pri riešení diferenciálnych rovníc. Umožňuje previesť zložité operácie (ako derivovanie a integrovanie) v časovej oblasti na jednoduchšie algebraické operácie (násobenie a delenie) v komplexnej oblasti.",
              "Základom je integrálna Laplaceova transformácia, ktorá zobrazí reálnu funkciu $f(t)$ (nazývanú originál) na komplexnú funkciu $F(p)$ (nazývanú obraz). Definujeme ju vzťahom: {{laplace_def}}.",
              "Premenná $p = \\alpha + i\\beta$ je komplexná premenná. Aby tento integrál existoval, funkcia $f(t)$ musí spĺňať určité podmienky – musí byť tzv. 'Laplaceov originál'.",
              "Funkciu $f$ nazývame originálom, ak spĺňa tri podmienky: je po častiach spojitá, pre $t < 0$ je nulová a nerastie príliš rýchlo (exponenciálny rast). Matematicky zapísané: {{growth_condition}}.",
              "Hodnota $\\alpha_0$, pre ktorú tento odhad platí, sa nazýva index rastu. Laplaceova transformácia potom existuje a je analytická v polrovine {{convergence_region}}.",
            ],
            formulas: {
              laplace_def:
                "\\mathcal{L}\\{f(t)\\} = F(p) = \\int_{0}^{\\infty} f(t) e^{-pt} dt",
              growth_condition:
                "|f(t)| \\le M e^{\\alpha t}, \\quad \\forall t \\in \\mathbf{R}",
              convergence_region: "\\operatorname{Re} p > \\alpha_0",
            },
            intuitiveExplanation: [
              "Predstavte si Laplaceovu transformáciu ako prekladateľku. Prekladá 'ťažký jazyk' diferenciálnych rovníc (kde sa všetko mení v čase) do 'ľahkého jazyka' algebry.",
              "Podmienka 'originálu' len hovorí, že funkcia nesmie vybuchnúť do nekonečna rýchlejšie, než ju stihne utlmiť člen $e^{-pt}$ v integráli.",
            ],
          },
          {
            id: "basic_originals_examples",
            type: "worked_examples",
            title: "Príklady: Originály a neoriginály",
            examples: [
              {
                id: "ex_heaviside_definition",
                problem:
                  "Overte, či je Heavisideova funkcia $\\Theta(t)$ (jednotkový skok) originálom a nájdite jej index rastu.",
                solutionSteps: [
                  "Heavisideova funkcia je definovaná ako 0 pre $t<0$ a 1 pre $t \\ge 0$.",
                  "Podmienka spojitosti je splnená (je po častiach spojitá). Podmienka nulovosti pre $t<0$ je tiež splnená.",
                  "Skúmame rast: Platí $|\\Theta(t)| = 1 \\le 1 \\cdot e^{\\alpha t}$ pre ľubovoľné $\\alpha \\ge 0$.",
                  "Najmenšie také $\\alpha$ je 0, teda funkcia je originál s indexom rastu $\\alpha_0 = 0$.",
                ],
                difficulty: "easy",
                tags: ["laplace", "heaviside", "original_check"],
              },
              {
                id: "ex_heaviside_image",
                problem:
                  "Vypočítajte Laplaceov obraz Heavisideovej funkcie $\\Theta(t)$.",
                solutionSteps: [
                  "Dosadíme do definície: $F(p) = \\int_0^\\infty 1 \\cdot e^{-pt} dt$.",
                  "Integrujeme: $\\left[ -\\frac{1}{p} e^{-pt} \\right]_0^\\infty$.",
                  "Pre $\\operatorname{Re} p > 0$ je horná hranica 0, dolná je $-(-1/p)$.",
                  "Výsledok: $\\mathcal{L}\\{\\Theta(t)\\} = \\frac{1}{p}$.",
                ],
                difficulty: "easy",
                tags: ["laplace", "heaviside", "calculation"],
              },
              {
                id: "ex_non_original_growth",
                problem:
                  "Rozhodnite, či je funkcia $f(t) = \\Theta(t) e^{t^3}$ originálom.",
                solutionSteps: [
                  "Skúmame tretiu podmienku originálu (index rastu).",
                  "Počítame limitu $\\lim_{t \\to \\infty} \\frac{e^{t^3}}{e^{\\alpha t}} = \\lim_{t \\to \\infty} e^{t(t^2 - \\alpha)}$.",
                  "Pre akékoľvek pevné $\\alpha$ ide táto limita do nekonečna.",
                  "Funkcia rastie príliš rýchlo, neexistujú konštanty $M, \\alpha$, ktoré by ju ohraničili. Nie je to originál.",
                ],
                difficulty: "easy",
                tags: ["laplace", "counter_example"],
              },
            ],
          },
        ],
      },
      {
        id: "laplace_grammar_properties",
        title: "Základná gramatika Laplaceovej transformácie",
        sections: [
          {
            id: "laplace_properties_theory",
            type: "theory",
            title: "Vlastnosti: Linearita, derivácia obrazu a posuny",
            paragraphs: [
              "Laplaceova transformácia je lineárna. Obraz lineárnej kombinácie je lineárna kombinácia obrazov: {{linearity}}.",
              "Ak poznáme obraz funkcie $f(t)$, môžeme ľahko určiť obraz funkcie vynásobenej mocninou $t$. Táto operácia v čase zodpovedá derivácii v komplexnej oblasti: {{diff_image}}.",
              "Násobenie exponenciálou v čase (tlmenie alebo budenie) spôsobuje posun v komplexnej rovine: {{shift_image}}.",
              "Zmena časovej mierky (zrýchlenie/spomalenie deja) sa prejaví inverznou zmenou mierky v obraze: {{scaling}}.",
            ],
            formulas: {
              linearity:
                "\\mathcal{L}\\{\\lambda f(t) + \\vartheta g(t)\\} = \\lambda F(p) + \\vartheta G(p)",
              diff_image: "\\mathcal{L}\\{t^n f(t)\\} = (-1)^n F^{(n)}(p)",
              shift_image: "\\mathcal{L}\\{e^{at} f(t)\\} = F(p-a)",
              scaling:
                "\\mathcal{L}\\{f(bt)\\} = \\frac{1}{b} F\\left(\\frac{p}{b}\\right)",
            },
            intuitiveExplanation: [],
          },
          {
            id: "laplace_properties_examples",
            type: "worked_examples",
            title: "Príklady na vlastnosti transformácie",
            examples: [
              {
                id: "ex_power_function",
                problem:
                  "Nájdite obraz funkcie $f(t) = t^n$ pre $n \\in \\mathbb{N}$.",
                solutionSteps: [
                  "Vieme, že obraz jednotkového skoku $\\Theta(t)$ je $1/p$.",
                  "Použijeme vetu o derivácii obrazu pre $t^n \\cdot 1$.",
                  "Derivujeme $1/p$ $n$-krát: prvá derivácia $-1/p^2$, druhá $2/p^3$, atď.",
                  "Všeobecný vzorec: $\\mathcal{L}\\{t^n\\} = \\frac{n!}{p^{n+1}}$.",
                ],
                difficulty: "easy",
                tags: ["laplace", "polynomial"],
              },
              {
                id: "ex_shift_exponential",
                problem: "Nájdite obraz funkcie $f(t) = e^{at}$.",
                solutionSteps: [
                  "Použijeme vetu o posunutí na funkciu $1$ (obraz $1/p$).",
                  "Veta hovorí, že násobenie $e^{at}$ posúva argument $p \\to p-a$.",
                  "Výsledok: $\\mathcal{L}\\{e^{at}\\} = \\frac{1}{p-a}$.",
                ],
                difficulty: "easy",
                tags: ["laplace", "exponential", "shift"],
              },
              {
                id: "ex_cos_sin",
                problem:
                  "Odvoďte obrazy funkcií $\\cos(\\omega t)$ a $\\sin(\\omega t)$.",
                solutionSteps: [
                  "Využijeme Eulerov vzťah: $\\cos t = \\frac{e^{it} + e^{-it}}{2}$.",
                  "Obraz $e^{it}$ je $\\frac{1}{p-i}$. Obraz $\\cos t$ je priemer: $\\frac{1}{2}(\\frac{1}{p-i} + \\frac{1}{p+i}) = \\frac{p}{p^2+1}$.",
                  "Pre zmenu mierky $t \\to \\omega t$ použijeme vetu o zmene mierky alebo dosadíme do vzorca.",
                  "Výsledok $\\cos(\\omega t) \\to \\frac{p}{p^2 + \\omega^2}$.",
                  "Analogicky pre sínus: $\\sin(\\omega t) \\to \\frac{\\omega}{p^2 + \\omega^2}$.",
                ],
                difficulty: "medium",
                tags: ["laplace", "trigonometry"],
              },
            ],
          },
        ],
      },
      {
        id: "laplace_shift_original",
        title: "Posun v originále a impulzy",
        sections: [
          {
            id: "shift_original_theory",
            type: "theory",
            title: "Veta o posune v originále",
            paragraphs: [
              "V technickej praxi často pracujeme so signálmi, ktoré sa zapínajú s oneskorením. Na to slúži veta o posune v originále.",
              "Ak je funkcia $f(t)$ 'zapnutá' až v čase $\\tau$ (teda má tvar $f(t-\\tau)\\Theta(t-\\tau)$), jej obraz sa len prenásobí exponenciálnym členom: {{time_shift}}.",
              "Táto veta je kľúčová pre modelovanie impulzov (obdĺžnikových, lichobežníkových) pomocou skladania posunutých Heavisideových skokov.",
            ],
            formulas: {
              time_shift:
                "\\mathcal{L}\\{\\Theta(t-\\tau)f(t-\\tau)\\} = e^{-\\tau p}F(p)",
            },
            intuitiveExplanation: [
              "Ak signál mešká o čas $\\tau$, v Laplaceovom svete to nezmení tvar funkcie $F(p)$, len k nej 'prilepíme' vizitku $e^{-\\tau p}$, ktorá hovorí 'pozor, toto prišlo neskôr'.",
            ],
          },
          {
            id: "pulse_examples",
            type: "worked_examples",
            title: "Príklady: Impulzy a posuny",
            examples: [
              {
                id: "ex_rect_pulse",
                problem:
                  "Nájdite obraz obdĺžnikového impulzu výšky $M$ trvajúceho od $t=0$ do $t=a$.",
                solutionSteps: [
                  "Zapíšeme impulz pomocou Heavisideových funkcií: $f(t) = M[\\Theta(t) - \\Theta(t-a)]$.",
                  "Aplikujeme transformáciu: $\\mathcal{L}\\{\\Theta(t)\\} = 1/p$.",
                  "Pre posunutý skok $\\Theta(t-a)$ (kde $f(t-a)=1$) platí $e^{-ap} \\cdot 1/p$.",
                  "Výsledok: $F(p) = \\frac{M}{p}(1 - e^{-ap})$.",
                ],
                difficulty: "medium",
                tags: ["laplace", "pulse", "rectangular"],
              },
              {
                id: "ex_sine_pulse",
                problem:
                  "Nájdite obraz jedného oblúka sínusoidy: $f(t) = \\sin t$ pre $t \\in \\langle 0, \\pi \\rangle$ a 0 inak.",
                solutionSteps: [
                  "Funkciu zapíšeme ako zapnutie sínusu v 0 a vypnutie v $\\pi$.",
                  "Pozor: $\\sin t$ na intervale za $\\pi$ je záporný, takže musíme sčítať: $f(t) = \\Theta(t)\\sin t + \\Theta(t-\\pi)\\sin(t-\\pi)$.",
                  "Platí $\\sin(t-\\pi) = -\\sin t$, takže súčet $\\sin t + \\sin(t-\\pi)$ naozaj vynuluje signál pre $t > \\pi$.",
                  "Obraz $\\sin t$ je $\\frac{1}{p^2+1}$. Obraz posunutého je $e^{-\\pi p} \\frac{1}{p^2+1}$.",
                  "Výsledok: $F(p) = \\frac{1}{p^2+1}(1 + e^{-\\pi p})$.",
                ],
                difficulty: "medium",
                tags: ["laplace", "pulse", "sine"],
              },
            ],
          },
        ],
      },
      {
        id: "laplace_periodic_series",
        title: "Periodické funkcie a rady",
        sections: [
          {
            id: "periodic_theory",
            type: "theory",
            title: "Obraz periodickej funkcie",
            paragraphs: [
              "Ak je funkcia periodická s periódou $T$, nemusíme integrovať až do nekonečna. Stačí integrovať cez jednu periódu a výsledok prenásobiť faktorom geometrického radu.",
              "Vzorec pre obraz periodickej funkcie je: {{periodic_formula}}, kde $F_T(p)$ je obraz jedného periodického 'okna' (impulzu).",
              "Laplaceova transformácia sa dá aplikovať aj člen po člene na mocninové rady (napr. Taylorov rad), ak rad konverguje.",
            ],
            formulas: {
              periodic_formula:
                "\\mathcal{L}\\{f(t)\\} = \\frac{\\int_{0}^{T} f(t) e^{-pt} dt}{1 - e^{-pT}} = \\frac{F_{T}(p)}{1 - e^{-pT}}",
            },
            intuitiveExplanation: [],
          },
          {
            id: "periodic_examples",
            type: "worked_examples",
            title: "Príklady: Periodické signály",
            examples: [
              {
                id: "ex_abs_sine",
                problem: "Nájdite obraz usmerneného sínusu $f(t) = |\\sin t|$.",
                solutionSteps: [
                  "Funkcia má periódu $T = \\pi$.",
                  "Obraz jedného 'kopčeka' (impulzu na $\\langle 0, \\pi \\rangle$) sme vypočítali v predchádzajúcej sekcii: $F_\\pi(p) = \\frac{1 + e^{-\\pi p}}{p^2+1}$.",
                  "Použijeme vzorec pre periodicitu: predelíme výrazom $(1 - e^{-\\pi p})$.",
                  "Výsledok: $F(p) = \\frac{1 + e^{-\\pi p}}{(p^2 + 1)(1 - e^{-\\pi p})} = \\frac{1}{p^2+1} \\coth(\\frac{\\pi p}{2})$.",
                ],
                difficulty: "hard",
                tags: ["laplace", "periodic", "rectifier"],
              },
              {
                id: "ex_series_sinc",
                problem:
                  "Nájdite obraz funkcie $f(t) = \\frac{\\sin t}{t}$ pomocou rozvoja do radu.",
                solutionSteps: [
                  "Rozvinieme $\\sin t$ do Taylorovho radu a predelíme $t$: $\\frac{\\sin t}{t} = \\sum_{n=0}^{\\infty} \\frac{(-1)^n t^{2n}}{(2n+1)!}$.",
                  "Transformujeme člen po člene. Obraz $t^{2n}$ je $\\frac{(2n)!}{p^{2n+1}}$.",
                  "Dosadíme: $F(p) = \\sum_{n=0}^{\\infty} \\frac{(-1)^n (2n)!}{(2n+1)! p^{2n+1}} = \\sum_{n=0}^{\\infty} \\frac{(-1)^n}{(2n+1) p^{2n+1}}$.",
                  "Tento rad (pre $|p|>1$) zodpovedá funkcii $\\operatorname{arctg}(1/p)$.",
                ],
                difficulty: "hard",
                tags: ["laplace", "series", "sinc"],
              },
            ],
          },
        ],
      },
      {
        id: "laplace_calculus_convolution",
        title: "Derivovanie, integrovanie a konvolúcia",
        sections: [
          {
            id: "calculus_conv_theory",
            type: "theory",
            title: "Obraz derivácie a konvolúcia",
            paragraphs: [
              "Toto je najsilnejšia stránka Laplaceovej transformácie: derivácia v čase sa mení na násobenie premennou $p$ (s odčítaním počiatočných podmienok). To umožňuje riešiť diferenciálne rovnice algebraicky: {{deriv_image}}.",
              "Integrovanie v čase zodpovedá deleniu premennou $p$: {{integ_image}}.",
              "Konvolúcia $(f*g)(t)$ je integrálna operácia, ktorá sa v Laplaceovom obraze mení na jednoduchý súčin obrazov: {{conv_image}}.",
            ],
            formulas: {
              deriv_image:
                "\\mathcal{L}\\{f^{(k)}(t)\\} = p^k F(p) - p^{k-1}f(0) - \\dots - f^{(k-1)}(0)",
              integ_image:
                "\\mathcal{L}\\{\\int_0^t f(s) ds\\} = \\frac{F(p)}{p}",
              conv_image: "\\mathcal{L}\\{(f*g)(t)\\} = F(p) \\cdot G(p)",
            },
            intuitiveExplanation: [
              "Ak je Laplaceov obraz 'frekvenčné spektrum', tak konvolúcia (zložité miešanie signálov v čase) je len obyčajné násobenie ich spektier. To sa využíva v spracovaní signálov (filtrovanie).",
            ],
          },
          {
            id: "conv_example",
            type: "worked_examples",
            title: "Príklad na konvolúciu",
            examples: [
              {
                id: "ex_convolution_trig",
                problem:
                  "Nájdite konvolúciu $f(t) = e^t \\cos 2t$ a $g(t) = e^t \\sin 2t$ pomocou Laplaceovej transformácie.",
                solutionSteps: [
                  "Namiesto zložitého integrálu v čase vypočítame obrazy.",
                  "$\\mathcal{L}\\{e^t \\cos 2t\\} = \\frac{p-1}{(p-1)^2 + 4}$.",
                  "$\\mathcal{L}\\{e^t \\sin 2t\\} = \\frac{2}{(p-1)^2 + 4}$.",
                  "Obraz konvolúcie je súčin: $\\frac{2(p-1)}{[(p-1)^2 + 4]^2}$.",
                  "Spätnou transformáciou (napr. pomocou rezíduí alebo tabuliek) zistíme, že originál je $\\frac{1}{2} e^t t \\sin 2t$.",
                ],
                difficulty: "hard",
                tags: ["laplace", "convolution"],
              },
            ],
          },
        ],
      },
      {
        id: "laplace_inverse",
        title: "Inverzná Laplaceova transformácia",
        sections: [
          {
            id: "inverse_theory",
            type: "theory",
            title: "Hľadanie originálu (Inverzia)",
            paragraphs: [
              "Inverzná transformácia je definovaná komplexným integrálom (Bromwichov integrál), ale v praxi sa používa zriedka.",
              "Najčastejšie využívame Vetu o rezíduách. Ak má funkcia $F(p)$ izolované singulárne body $p_k$, originál vypočítame ako súčet rezíduí funkcie $F(p)e^{pt}$: {{residue_theorem}}.",
              "Alternatívou je rozklad na parciálne zlomky (pre racionálne lomené funkcie) alebo rozvoj do radu (Veta o rozklade).",
            ],
            formulas: {
              residue_theorem:
                "f(t) = \\sum_{k=1}^{n} \\operatorname*{res}_{p_{k}}\\left[F(p)e^{pt}\\right], \\quad t > 0",
            },
            intuitiveExplanation: [],
          },
          {
            id: "inverse_examples",
            type: "worked_examples",
            title: "Príklady: Výpočet inverznej transformácie",
            examples: [
              {
                id: "ex_inv_residue_simple",
                problem:
                  "Nájdite originál k funkcii $F(p) = \\frac{1}{p^2(p+1)}$.",
                solutionSteps: [
                  "Singulárne body sú $p=0$ (pól 2. rádu) a $p=-1$ (pól 1. rádu).",
                  "Rezíduum v -1: $\\lim_{p \\to -1} (p+1)F(p)e^{pt} = e^{-t}$.",
                  "Rezíduum v 0: $\\lim_{p \\to 0} \\frac{d}{dp} [\\frac{e^{pt}}{p+1}]$. Derivácia je $\\frac{te^{pt}(p+1) - e^{pt}}{(p+1)^2}$. Po dosadení 0 dostaneme $t-1$.",
                  "Výsledok: $f(t) = e^{-t} + t - 1$ pre $t>0$.",
                ],
                difficulty: "medium",
                tags: ["inverse_laplace", "residues"],
              },
              {
                id: "ex_inv_shift_residue",
                problem:
                  "Nájdite originál k $F(p) = e^{-2p} \\frac{p}{(p-1)(p^2+1)}$.",
                solutionSteps: [
                  "Člen $e^{-2p}$ indikuje posun v čase o 2.",
                  "Najprv nájdeme originál $g(t)$ k funkcii bez exponenciály $G(p) = \\frac{p}{(p-1)(p^2+1)}$.",
                  "Póly $G(p)$ sú $1, i, -i$. Rezíduá: v 1 je $1/2 e^t$, v $\\pm i$ sú komplexne združené, ich súčet dáva $\\frac{1}{2}(\\sin t - \\cos t)$.",
                  "Zložíme $g(t) = \\frac{1}{2}(e^t + \\sin t - \\cos t)$.",
                  "Finálny výsledok aplikovaním posunu: $f(t) = \\Theta(t-2) g(t-2)$.",
                ],
                difficulty: "hard",
                tags: ["inverse_laplace", "shift", "residues"],
              },
              {
                id: "ex_inv_series_bessel",
                problem: "Nájdite originál k $F(p) = \\frac{1}{p} e^{-1/p}$.",
                solutionSteps: [
                  "Funkcia má podstatnú singularitu v 0, rezíduá sú ťažkopádne. Použijeme rozvoj do radu (Veta o rozklade).",
                  "Rozvinieme $e^{-1/p} = \\sum \\frac{(-1)^n}{n! p^n}$.",
                  "Vynásobíme $1/p$: $F(p) = \\sum \\frac{(-1)^n}{n! p^{n+1}}$.",
                  "Invertujeme člen po člene ($\\{1/p^{n+1}\\} \\to t^n/n!$).",
                  "Výsledok: $f(t) = \\sum_{n=0}^\\infty \\frac{(-1)^n}{(n!)^2} t^n = J_0(2\\sqrt{t})$ (Besselova funkcia).",
                ],
                difficulty: "hard",
                tags: ["inverse_laplace", "series"],
              },
            ],
          },
        ],
      },
    ],
  },
};
*/
