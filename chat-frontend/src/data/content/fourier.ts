// src/data/content/fourier.ts
import { CourseTopic } from "../../types/courseTypes";

export const fourier: CourseTopic = {
  id: "fourier_transform",
  title: "Fourierova transformácia",
  subthemes: [
    // =========================================================
    // SUBTHEME 1: Fourierove rady
    // =========================================================
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
            func_def: "f:\\langle a,a+T\\rangle\\longrightarrow {\\pmb C}, T>0",
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
      ],
    },

    // =========================================================
    // SUBTHEME 2: Priama a inverzná Fourierova transformácia
    // =========================================================
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
                "Keďže f(t) = 0 pre t < 0, integrál sa zúží na \\(\\int_0^{\\infty} e^{-\\alpha t} e^{-ipt} dt\\).",
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

    // =========================================================
    // SUBTHEME 3: Racionálne funkcie, inverzná transformácia a vlastnosti
    // =========================================================
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
};
