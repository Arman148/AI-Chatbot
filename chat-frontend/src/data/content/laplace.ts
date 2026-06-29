// src/data/content/laplace.ts
import { CourseTopic } from "../../types/courseTypes";

export const laplace: CourseTopic = {
  id: "laplace_transform",
  title: "Laplaceova transformácia",
  subthemes: [
    // =========================================================
    // SUBTHEME 1: Úvod a definícia originálu
    // =========================================================
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

    // =========================================================
    // SUBTHEME 2: Základná gramatika Laplaceovej transformácie
    // =========================================================
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

    // =========================================================
    // SUBTHEME 3: Posun v originále a impulzy
    // =========================================================
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

    // =========================================================
    // SUBTHEME 4: Periodické funkcie a rady
    // =========================================================
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

    // =========================================================
    // SUBTHEME 5: Derivovanie, integrovanie a konvolúcia
    // =========================================================
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

    // =========================================================
    // SUBTHEME 6: Inverzná Laplaceova transformácia
    // =========================================================
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
};
