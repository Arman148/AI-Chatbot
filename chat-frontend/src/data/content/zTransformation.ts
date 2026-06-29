// src/data/content/zTransform.ts
import { CourseTopic } from "../../types/courseTypes";

export const zTransform: CourseTopic = {
  id: "z_transform",
  title: "Z-transformácia",
  subthemes: [
    // =========================================================
    // SUBTHEME 1: Základy a definícia Z-transformácie
    // =========================================================
    {
      id: "z_transform_basics",
      title: "Definícia a základné vlastnosti",
      sections: [
        {
          id: "z_transform_theory",
          type: "theory",
          title: "Z-transformácia diskrétneho signálu",
          paragraphs: [
            "Motiváciou pre Z-transformáciu je spracovanie diskrétnych signálov (napr. digitálny zvuk alebo vzorkované dáta). Kým Laplaceova transformácia integruje spojité funkcie, Z-transformácia sa pozerá na diskrétnu postupnosť $(a_n)_{n=0}^{\\infty}$ a mení ju na analytickú funkciu komplexnej premennej $z$.",
            "Z-transformáciu definujeme ako súčet nekonečného mocninového radu: {{z_def}}.",
            "Tento rad nekonverguje pre všetky postupnosti. Konverguje vtedy a len vtedy, ak má postupnosť najviac exponenciálny rast, čo znamená, že existujú konštanty $M \\geq 0$ a $c \\in \\mathbf{R}$ také, že platí: {{growth_condition}}.",
            "Množinu všetkých takýchto postupností označujeme ako $Z_0$. Patria sem napríklad ohraničené postupnosti, polynómy či vzorkované kvázipolynómy. Naopak, rýchlo rastúce postupnosti ako $(n^n)_{n=0}^{\\infty}$ alebo $(n!)_{n=0}^{\\infty}$ do $Z_0$ nepatria a ich Z-obraz neexistuje.",
          ],
          formulas: {
            z_def:
              "F(z) = \\mathcal{Z}\\{(a_n)_{n=0}^{\\infty}\\} = \\sum_{n=0}^{\\infty} \\frac{a_n}{z^n}",
            growth_condition: "|a_n| \\leq M e^{cn}, \\quad \\forall n",
          },
          intuitiveExplanation: [
            "Ak si postupnosť $(a_0, a_1, a_2, \\dots)$ predstavíte ako zoznam nameraných hodnôt v čase, Z-transformácia vezme každú hodnotu a 'prilepí' ju k mocnine $1/z$. Čím neskôr v čase hodnota nastane, tým vyššou mocninou $z$ ju v menovateli utlmíme.",
            "Preto musia byť body z grafu dostatočne umiernené (najviac exponenciálny rast). Ak by rástli rýchlejšie ako exponenciála, ani nekonečné delenie $z^n$ by rad nezachránilo a súčet by vybuchol.",
          ],
        },
        {
          id: "z_transform_basic_examples",
          type: "worked_examples",
          title: "Príklady: Z-obrazy základných postupností",
          examples: [
            {
              id: "ex_109_finite_sequence",
              problem:
                "Nájdite Z-obraz konečnej postupnosti $(a_n)_{n=0}^{\\infty} = (1, 2, 0, 4, 0, 0, \\dots)$.",
              solutionSteps: [
                "Z-obraz je definovaný ako súčet $\\sum_{n=0}^{\\infty} \\frac{a_n}{z^n}$.",
                "Dosadíme nenulové členy postupnosti: pre $n=0$ je $a_0 = 1$, pre $n=1$ je $a_1 = 2$ a pre $n=3$ je $a_3 = 4$.",
                "Výsledok je priamo $F(z) = 1 + \\frac{2}{z} + \\frac{4}{z^3}$ pre $z \\neq 0$.",
              ],
              difficulty: "easy",
              tags: ["z_transform", "finite_sequence"],
            },
            {
              id: "ex_111_delta_sequence",
              problem:
                "Nájdite Z-obraz Kroneckerovej delta postupnosti s posunom o $m$ krokov: $(\\delta_{mn})_{n=0}^{\\infty} = (0, \\dots, 0, 1, 0, \\dots)$, kde jednotka je na indexe $m$.",
              solutionSteps: [
                "Jediný nenulový člen postupnosti je pre $n=m$, kde $a_m = 1$.",
                "Dosadením do definície Z-transformácie dostaneme jediný člen radu.",
                "Výsledok: $F(z) = \\frac{1}{z^m}$.",
              ],
              difficulty: "easy",
              tags: ["z_transform", "delta_sequence", "impulse"],
            },
            {
              id: "ex_115_constant_sequence",
              problem:
                "Nájdite Z-obraz konštantnej postupnosti $(c)_{n=0}^{\\infty} = (c, c, c, \\dots)$.",
              solutionSteps: [
                "Dosadíme do definície: $F(z) = \\sum_{n=0}^{\\infty} \\frac{c}{z^n}$.",
                "Vidíme, že ide o nekonečný geometrický rad s prvým členom $a_0 = c$ a kvocientom $q = \\frac{1}{z}$.",
                "Súčet tohto radu je $\\frac{c}{1 - \\frac{1}{z}}$.",
                "Po úprave zlomku na spoločného menovateľa dostaneme $F(z) = \\frac{cz}{z - 1}$, čo konverguje pre $|z| > 1$.",
              ],
              difficulty: "medium",
              tags: ["z_transform", "constant", "geometric_series"],
            },
            {
              id: "ex_121_exponential_sequence",
              problem:
                "Nájdite Z-obraz exponenciálnej postupnosti $(a^n)_{n=0}^{\\infty}$ pre $a \\in \\mathbb{C}$.",
              solutionSteps: [
                "Podľa definície zapíšeme rad: $F(z) = \\sum_{n=0}^{\\infty} \\frac{a^n}{z^n} = \\sum_{n=0}^{\\infty} \\left(\\frac{a}{z}\\right)^n$.",
                "Toto je geometrický rad s kvocientom $q = \\frac{a}{z}$.",
                "Súčet existuje pre $|q| < 1$, teda $|z| > |a|$.",
                "Súčet je $\\frac{1}{1 - \\frac{a}{z}}$. Po rozšírení čitateľa aj menovateľa premennou $z$ dostaneme $F(z) = \\frac{z}{z - a}$.",
              ],
              difficulty: "medium",
              tags: ["z_transform", "exponential"],
            },
          ],
        },
      ],
    },

    // =========================================================
    // SUBTHEME 2: Základná gramatika Z-transformácie
    // =========================================================
    {
      id: "z_transform_grammar",
      title: "Gramatika, derivácie a posuny",
      sections: [
        {
          id: "z_grammar_theory",
          type: "theory",
          title: "Základné pravidlá počítania so Z-transformáciou",
          paragraphs: [
            "Z-transformácia spĺňa tri základné pravidlá, ktoré výrazne zjednodušujú výpočty bez nutnosti počítať nekonečné sumy:",
            "1. Linearita: Obraz lineárnej kombinácie postupností je lineárna kombinácia ich obrazov.",
            "2. Multiplikácia (zmena mierky v obraze): Ak postupnosť prenásobíme členom $a^n$, v jej obraze sa zmení argument z $z$ na $z/a$: {{multiplication_rule}}.",
            "3. Derivácia obrazu: Ak postupnosť prenásobíme indexom $n$, zodpovedá to derivácii obrazu podľa $z$ s následným prenásobením záporným $z$: {{derivative_rule}}.",
            "Okrem toho sú veľmi dôležité vety o posunoch. Posun doprava (vloženie núl na začiatok) sa v Z-transformácii prejaví ako delenie premennou $z^k$: {{shift_right}}.",
            "Posun doľava (useknutie prvých $k$ členov) má zložitejší tvar, pri ktorom musíme odpočítať stratené členy: {{shift_left}}.",
          ],
          formulas: {
            multiplication_rule:
              "\\mathcal{Z}\\{(a^n a_n)_{n=0}^{\\infty}\\} = F\\left(\\frac{z}{a}\\right)",
            derivative_rule:
              "\\mathcal{Z}\\{(n a_n)_{n=0}^{\\infty}\\} = -z F'(z)",
            shift_right:
              "\\mathcal{Z}\\{(b_n)_{n=0}^{\\infty}\\} = \\frac{1}{z^k} F(z)",
            shift_left:
              "\\mathcal{Z}\\{(a_{n+k})_{n=0}^{\\infty}\\} = z^k \\left[ F(z) - \\sum_{n=0}^{k-1} \\frac{a_n}{z^n} \\right]",
          },
          intuitiveExplanation: [
            "Posun doprava znamená oneskorenie signálu (napríklad zvuk príde o pár milisekúnd neskôr). Každý jeden krok oneskorenia v čase znamená jedno delenie premennou $z$ v komplexnej oblasti.",
            "Posun doľava znamená, že sa pozeráme na systém od neskoršieho času. Preto musíme matematicky odčítať začiatok signálu, ktorý už prebehol, inak by nám chýbal.",
          ],
        },
        {
          id: "z_grammar_examples_calc",
          type: "worked_examples",
          title: "Príklady na pravidlá gramatiky",
          examples: [
            {
              id: "ex_126_sin_sequence",
              problem:
                "Nájdite Z-obraz postupnosti $(\\sin \\omega n)_{n=0}^{\\infty}$.",
              solutionSteps: [
                "Funkciu sínus vyjadríme pomocou Eulerovho vzorca: $\\sin \\omega n = \\frac{1}{2i} (e^{i\\omega n} - e^{-i\\omega n})$.",
                "Vidíme tu dve exponenciálne postupnosti $(a^n)$, prvá s $a = e^{i\\omega}$ a druhá s $a = e^{-i\\omega}$.",
                "Podľa linearity a vzorca pre $(a^n)$ dostávame $F(z) = \\frac{1}{2i} \\left( \\frac{z}{z - e^{i\\omega}} - \\frac{z}{z - e^{-i\\omega}} \\right)$.",
                "Dáme na spoločného menovateľa: čitateľ bude $z(z - e^{-i\\omega}) - z(z - e^{i\\omega}) = z(e^{i\\omega} - e^{-i\\omega}) = z(2i \\sin \\omega)$.",
                "Menovateľ po roznásobení bude $(z - e^{i\\omega})(z - e^{-i\\omega}) = z^2 - z(e^{i\\omega} + e^{-i\\omega}) + 1 = z^2 - 2z\\cos\\omega + 1$.",
                "Výsledok: $F(z) = \\frac{z\\sin\\omega}{z^2 - 2z\\cos\\omega + 1}$.",
              ],
              difficulty: "hard",
              tags: ["z_transform", "trigonometry", "linearity"],
            },
            {
              id: "ex_130_n_sequence",
              problem:
                "Nájdite Z-obraz postupnosti $(n)_{n=0}^{\\infty} = (0, 1, 2, 3, \\dots)$.",
              solutionSteps: [
                "Táto postupnosť má tvar $n \\cdot a_n$, kde $(a_n)$ je konštantná postupnosť jednotiek $(1)_{n=0}^{\\infty}$.",
                "Obraz jednotkovej postupnosti je $F(z) = \\frac{z}{z - 1}$.",
                "Použijeme vetu o derivácii obrazu: $\\mathcal{Z}\\{n \\cdot 1\\} = -z \\cdot \\left(\\frac{z}{z - 1}\\right)'$.",
                "Derivujeme podiel: $\\left(\\frac{z}{z - 1}\\right)' = \\frac{1 \\cdot (z-1) - z \\cdot 1}{(z-1)^2} = \\frac{-1}{(z-1)^2}$.",
                "Dosadíme do vzorca: $-z \\cdot \\frac{-1}{(z-1)^2} = \\frac{z}{(z-1)^2}$.",
              ],
              difficulty: "medium",
              tags: ["z_transform", "derivative_rule"],
            },
            {
              id: "ex_132_n_squared",
              problem: "Nájdite Z-obraz postupnosti $(n^2)_{n=0}^{\\infty}$.",
              solutionSteps: [
                "Postupnosť vnímame ako $n \\cdot n$.",
                "Obraz pre $(n)$ z predchádzajúceho príkladu je $F(z) = \\frac{z}{(z-1)^2}$.",
                "Znovu aplikujeme vetu o derivácii obrazu: $\\mathcal{Z}\\{n \\cdot n\\} = -z \\cdot F'(z)$.",
                "Zderivujeme podiel $F(z)$: derivácia je $\\frac{1 \\cdot (z-1)^2 - z \\cdot 2(z-1)}{(z-1)^4} = \\frac{(z-1) - 2z}{(z-1)^3} = \\frac{-z - 1}{(z-1)^3}$.",
                "Vynásobíme $-z$: $-z \\cdot \\frac{-(z+1)}{(z-1)^3} = \\frac{z^2 + z}{(z-1)^3}$.",
              ],
              difficulty: "medium",
              tags: ["z_transform", "derivative_rule"],
            },
          ],
        },
        {
          id: "z_grammar_examples_shift",
          type: "worked_examples",
          title: "Príklady na diferencie a posuny",
          examples: [
            {
              id: "ex_137_shift_right",
              problem:
                "Nájdite Z-obraz postupnosti $(0, 0, 0, 1, 1, 1, \\dots)$.",
              solutionSteps: [
                "Vidíme, že ide o postupnosť jednotiek $(1)_{n=0}^{\\infty}$, ktorá je posunutá o 3 miesta doprava.",
                "Z-obraz $(1)_{n=0}^{\\infty}$ je $\\frac{z}{z - 1}$.",
                "Aplikujeme pravidlo o posune doprava o $k=3$ miesta: prenásobíme obraz faktorom $\\frac{1}{z^3}$.",
                "Výsledok: $F(z) = \\frac{1}{z^3} \\frac{z}{z - 1} = \\frac{1}{z^2(z - 1)}$.",
              ],
              difficulty: "easy",
              tags: ["z_transform", "shift_right"],
            },
            {
              id: "ex_142_shift_left",
              problem:
                "Nájdite Z-obraz postupnosti $((n+3)^2)_{n=0}^{\\infty}$.",
              solutionSteps: [
                "Ide o posun doľava o $k=3$ kroky pre postupnosť $a_n = n^2$.",
                "Z-obraz postupnosti $n^2$ je podľa predchádzajúcich výpočtov $F(z) = \\frac{z^2 + z}{(z - 1)^3}$.",
                "Potrebujeme prvé tri členy tejto postupnosti ($n=0,1,2$): $a_0 = 0$, $a_1 = 1$, $a_2 = 4$.",
                "Použijeme vzorec pre posun doľava: $\\mathcal{Z}\\{a_{n+3}\\} = z^3 \\left[ F(z) - a_0 - \\frac{a_1}{z} - \\frac{a_2}{z^2} \\right]$.",
                "Dosadíme: $z^3 \\left[ \\frac{z^2 + z}{(z - 1)^3} - 0 - \\frac{1}{z} - \\frac{4}{z^2} \\right]$.",
                "Výsledok je $\\frac{z^5 + z^4}{(z - 1)^3} - z^2 - 4z$.",
              ],
              difficulty: "hard",
              tags: ["z_transform", "shift_left"],
            },
          ],
        },
        {
          id: "z_convolution_theory",
          type: "theory",
          title: "Diferencia postupnosti a Konvolúcia",
          paragraphs: [
            "Diferencia postupnosti (diskrétna obdoba derivácie) je definovaná ako rozdiel dvoch susedných členov: $\\Delta a_n = a_{n+1} - a_n$.",
            "Jej Z-obraz sa dá jednoducho určiť pomocou vety o posune doľava: {{difference_rule}}.",
            "Konvolúcia dvoch postupností $(a_n)$ a $(b_n)$ je nová postupnosť definovaná vzťahom: {{discrete_convolution}}.",
            "Rovnako ako pri Laplaceovej transformácii, platí dôležitá Veta o konvolúcii: Z-obraz konvolúcie dvoch postupností je súčinom ich Z-obrazov. Teda zložité sčítanie cez všetky minulé vzorky sa v z-rovine redukuje na obyčajné násobenie: {{convolution_theorem}}.",
          ],
          formulas: {
            difference_rule:
              "\\mathcal{Z}\\{(\\Delta a_n)_{n=0}^{\\infty}\\} = (z-1)F(z) - z a_0",
            discrete_convolution: "c_n = \\sum_{k=0}^{n} a_k b_{n-k}",
            convolution_theorem:
              "\\mathcal{Z}\\{(a_n * b_n)_{n=0}^{\\infty}\\} = F(z) G(z)",
          },
          intuitiveExplanation: [
            "Diskrétna konvolúcia vyjadruje, ako systém reaguje na signál. Ak $(a_n)$ je hudba a $(b_n)$ je akustika koncertnej sály, tak ich konvolúcia je výsledný zvuk, ktorý počujete – v každom momente doznieva ozvena všetkých predchádzajúcich tónov.",
          ],
        },
        {
          id: "z_convolution_examples",
          type: "worked_examples",
          title: "Príklady: Výpočty s konvolúciou",
          examples: [
            {
              id: "ex_155_conv_one_exp",
              problem:
                "Nájdite Z-obraz konvolúcie dvoch postupností: $(1)_{n=0}^{\\infty} * (e^n)_{n=0}^{\\infty}$.",
              solutionSteps: [
                "Podľa vety o konvolúcii je obrazom konvolúcie súčin jednotlivých obrazov.",
                "Obraz jednotkovej postupnosti je $F(z) = \\frac{z}{z-1}$.",
                "Obraz exponenciálnej postupnosti (kde $a = e$) je $G(z) = \\frac{z}{z-e}$.",
                "Súčinom je výsledok $\\frac{z^2}{(z-1)(z-e)}$.",
              ],
              difficulty: "medium",
              tags: ["z_transform", "convolution"],
            },
            {
              id: "ex_156_find_sequence",
              problem:
                "Určte postupnosť $(a_n)_{n=0}^{\\infty}$, pre ktorú platí rovnica: $(a_n)_{n=0}^{\\infty} * (2^n)_{n=0}^{\\infty} = (4^n)_{n=0}^{\\infty}$.",
              solutionSteps: [
                "Aplikujeme Z-transformáciu na obe strany rovnice. Konvolúcia prejde na násobenie.",
                "Označíme $Z\\{(a_n)\\} = F(z)$. Rovnica v Z-rovine: $F(z) \\cdot \\frac{z}{z-2} = \\frac{z}{z-4}$.",
                "Vyjadríme $F(z)$: $F(z) = \\frac{z-2}{z-4}$.",
                "Upravíme výraz pre lepšiu inverziu: $\\frac{z-2}{z-4} = \\frac{z - 4 + 2}{z - 4} = 1 + \\frac{2}{z-4}$.",
                "Prvý člen (konštanta 1) je obraz Kroneckerovej delty v nule: $\\delta_{n0}$.",
                "Druhý člen je obraz posunutej exponenciály: $2 \\cdot z^{-1} \\frac{z}{z-4}$, čo odpovedá postupnosti $2 \\cdot 4^{n-1} \\cdot \\mathbf{1}(n-1)$.",
                "Riešením je postupnosť, ktorá začína jednotkou a ďalej pokračuje ako $2 \\cdot 4^{n-1}$: $(1, 2, 8, 32, \\dots)$.",
              ],
              difficulty: "hard",
              tags: ["z_transform", "convolution", "inverse_z"],
            },
          ],
        },
      ],
    },

    // =========================================================
    // SUBTHEME 3: Inverzná Z-transformácia
    // =========================================================
    {
      id: "z_transform_inverse",
      title: "Inverzná Z-transformácia",
      sections: [
        {
          id: "inverse_z_theory",
          type: "theory",
          title: "Metódy inverznej Z-transformácie",
          paragraphs: [
            "Inverzná Z-transformácia (získanie $(a_n)$ zo známeho obrazu $F(z)$) je kľúčová pre nájdenie riešenia v diskrétnom čase.",
            "Máme štyri základné metódy výpočtu:",
            "1. Rozvoj do Laurentovho radu (napríklad delením polynómu polynómom).",
            "2. Použitie vety o rezíduách: $a_n$ získame ako súčet rezíduí funkcie $F(z)z^{n-1}$ vo všetkých jej póloch: {{inverse_residue_theorem}}.",
            "3. Využitie známych tabuľkových obrazov (parciálne zlomky).",
            "4. Konvolúcia (ak sa $F(z)$ dá napísať ako súčin dvoch známych obrazov).",
          ],
          formulas: {
            inverse_residue_theorem:
              "a_n = \\sum_{z_i} \\operatorname*{res}_{z_i} \\left( F(z) z^{n-1} \\right)",
          },
          intuitiveExplanation: [
            "Ak obraz F(z) vyzerá ako známy zlomok, stačí použiť tabuľky (podobne ako pri Laplaceovi). Ak je však funkcia komplikovaná, najuniverzálnejšou zbraňou sú rezíduá – jednoducho skontrolujete všetky miesta, kde ide menovateľ do nuly (singularity) a sčítate ich 'príspevky' podľa danej formuly.",
          ],
        },
        {
          id: "inverse_z_examples",
          type: "worked_examples",
          title: "Príklady: Výpočet inverznej Z-transformácie",
          examples: [
            {
              id: "ex_167_inverse_partial_fractions",
              problem:
                "Nájdite inverznú Z-transformáciu pre $F(z) = \\frac{1}{(z-1)(z-e)}$ pomocou rezíduí.",
              solutionSteps: [
                "Podľa vety o rezíduách platí pre $n \\geq 1$, že $a_n = \\operatorname*{res}_1 \\left(F(z)z^{n-1}\\right) + \\operatorname*{res}_e \\left(F(z)z^{n-1}\\right)$.",
                "Singularity sú póly 1. rádu v bodoch $z=1$ a $z=e$.",
                "Rezíduum pre $z=1$: vynecháme člen $(z-1)$ z menovateľa a dosadíme 1. Výsledok je $\\frac{1^{n-1}}{1-e} = \\frac{1}{1-e}$.",
                "Rezíduum pre $z=e$: vynecháme člen $(z-e)$ a dosadíme $e$. Výsledok je $\\frac{e^{n-1}}{e-1}$.",
                "Súčtom dostaneme: $a_n = \\frac{1}{1-e} - \\frac{e^{n-1}}{1-e} = \\frac{1 - e^{n-1}}{1 - e}$. Pre $n=0$ urobíme limitu do nekonečna pre $F(z)$, čo dáva $a_0 = 0$.",
              ],
              difficulty: "medium",
              tags: ["inverse_z_transform", "residues"],
            },
            {
              id: "ex_169_inverse_double_pole",
              problem:
                "Nájdite inverznú Z-transformáciu pre $F(z) = \\frac{1}{(z-1)^2}$ pomocou rezíduí.",
              solutionSteps: [
                "Vidíme, že $z=1$ je pól 2. rádu (dvojnásobný koreň v menovateli).",
                "Pre $n \\geq 1$ použijeme vzorec pre rezíduum pólu 2. rádu: $a_n = \\operatorname*{res}_1 \\frac{z^{n-1}}{(z-1)^2}$.",
                "Počítame to ako limitu derivácie: $\\lim_{z \\to 1} \\frac{d}{dz} \\left( z^{n-1} \\right)$.",
                "Derivácia je $(n-1)z^{n-2}$. Po dosadení $z=1$ dostávame $a_n = n-1$.",
                "Pre $n=0$ máme $a_0 = 0$. Celá postupnosť je teda $(0, 0, 1, 2, 3, \\dots)$.",
              ],
              difficulty: "hard",
              tags: ["inverse_z_transform", "residues", "double_pole"],
            },
            {
              id: "ex_171_sum_of_squares",
              problem:
                "Pomocou Z-transformácie nájdite analytický vzorec pre súčet prvých $n$ štvorcov: $\\sum_{k=0}^{n} k^2$.",
              solutionSteps: [
                "Vieme z gramatiky, že Z-obraz čiastočných súčtov $\\sum_{k=0}^n a_k$ získame vynásobením Z-obrazu pôvodnej postupnosti faktorom $\\frac{z}{z-1}$.",
                "Obraz postupnosti $a_k = k^2$ je $F(z) = \\frac{z^2+z}{(z-1)^3}$.",
                "Obraz celého súčtu je teda $\\frac{z}{z-1} \\cdot \\frac{z^2+z}{(z-1)^3} = \\frac{z^3+z^2}{(z-1)^4}$.",
                "Hľadáme inverzný obraz pomocou rezídua v póle 4. rádu pre $z=1$: $a_n = \\lim_{z \\to 1} \\frac{1}{3!} \\frac{d^3}{dz^3} \\left( (z-1)^4 \\frac{z^3+z^2}{(z-1)^4} z^{n-1} \\right) = \\lim_{z \\to 1} \\frac{1}{3!} (z^{n+2} + z^{n+1})'''$.",
                "Tretia derivácia: $(n+2)(n+1)n \\cdot z^{n-1} + (n+1)n(n-1) \\cdot z^{n-2}$. Dosadením $z=1$ máme $\\frac{1}{6} [n(n+1)(n+2) + n(n-1)(n+1)]$.",
                "Po vytknutí spoločného faktora dostávame známy vzorec: $\\frac{1}{6}n(n+1)(2n+1)$.",
              ],
              difficulty: "hard",
              tags: ["z_transform", "series_sum", "residues"],
            },
          ],
        },
      ],
    },

    // =========================================================
    // SUBTHEME 4: Diferenčné rovnice
    // =========================================================
    {
      id: "z_difference_equations",
      title: "Riešenie diferenčných rovníc",
      sections: [
        {
          id: "diff_eq_theory",
          type: "theory",
          title: "Diferenčné rovnice a ich podstata",
          paragraphs: [
            "Diferenčné rovnice sú diskrétnou analógiou diferenciálnych rovníc. Kým v spojitom čase rátame s rýchlosťou zmeny (deriváciou), v diskrétnom čase rátame s rozdielmi medzi jednotlivými stavmi (krokmi $n$, $n+1$, $n+2$).",
            "Môžu modelovať vývoj populácie, hromadenie úrokov na účte, algoritmy spracovania signálov (napr. digitálne filtre) alebo reťazové siete.",
            "Pri riešení pomocou Z-transformácie aplikujeme transformáciu na celú rovnicu. Využijeme pritom vety o posunoch doľava pre členy $y_{n+1}$ a $y_{n+2}$: {{diff_eq_shifts}}.",
            "Členy so začiatočnými podmienkami z posunov vytvoria algebraickú rovnicu, ktorú jednoducho vyriešime voči $Y(z) = \\mathcal{Z}\\{y_n\\}$. Zvyškom úlohy je už len klasická inverzná Z-transformácia.",
          ],
          formulas: {
            diff_eq_shifts:
              "\\mathcal{Z}\\{y_{n+1}\\} = z(Y(z) - y_0), \\quad \\mathcal{Z}\\{y_{n+2}\\} = z^2(Y(z) - y_0 - y_1 z^{-1})",
          },
          intuitiveExplanation: [
            "Diferenčná rovnica vám hovorí: 'Ak vieš, čo bolo včera a dnes, poviem ti, čo bude zajtra.' Z-transformácia tento prístup 'krok za krokom' obíde a dá vám priamo univerzálny vzorec (funkciu), podľa ktorého môžete okamžite vypočítať, čo sa stane za 1000 dní bez toho, aby ste rátali všetky predošlé dni.",
          ],
        },
        {
          id: "diff_eq_examples",
          type: "worked_examples",
          title: "Príklady: Fibonacciho čísla a iné rovnice",
          examples: [
            {
              id: "ex_174_diff_eq_2nd_order",
              problem:
                "Riešte homogénnu diferenčnú rovnicu: $y_{n+2} + 2y_{n+1} + y_n = 0$, s podmienkami $y_0 = 1, y_1 = 1$.",
              solutionSteps: [
                "Definujeme Z-obraz hľadanej postupnosti: $Y(z) = \\mathcal{Z}\\{y_n\\}$.",
                "Podľa vzorcov pre posun: obraz $y_{n+1}$ je $z(Y(z) - 1)$, obraz $y_{n+2}$ je $z^2(Y(z) - 1 - 1/z) = z^2 Y(z) - z^2 - z$.",
                "Dosadíme to do rovnice: $z^2 Y(z) - z^2 - z + 2z(Y(z) - 1) + Y(z) = 0$.",
                "Vyčleníme všetky členy s $Y(z)$ a zvyšok dáme na pravú stranu: $Y(z)(z^2 + 2z + 1) = z^2 + 3z$.",
                "Vyjadríme $Y(z) = \\frac{z^2 + 3z}{(z+1)^2}$.",
                "Hľadáme originál pomocou vety o rezíduách. Máme tu jeden pól 2. rádu v bode $z = -1$.",
                "Počítame $y_n = \\lim_{z \\to -1} \\frac{d}{dz} \\left( \\frac{z^2 + 3z}{(z+1)^2} z^{n-1} (z+1)^2 \\right) = \\lim_{z \\to -1} \\left( z^{n+1} + 3z^n \\right)'$.",
                "Derivácia je $(n+1)z^n + 3nz^{n-1}$. Dosadením $z=-1$ dostaneme $(n+1)(-1)^n + 3n(-1)^{n-1}$.",
                "Výsledok upravíme: $y_n = (-1)^n(1 - 2n)$. Táto metóda je lepšia ako postupné dosadzovanie (numerický výpočet), kde by mohli vzniknúť chyby zaokrúhľovania.",
              ],
              difficulty: "medium",
              tags: ["z_transform", "difference_equation"],
            },
            {
              id: "ex_177_fibonacci",
              problem:
                "Riešte diferenčnú rovnicu pre Fibonacciho postupnosť: $y_{n+2} = y_{n+1} + y_n$, s podmienkami $y_0 = 1, y_1 = 1$.",
              solutionSteps: [
                "Prepíšeme si rovnicu do tvaru posunov a transformujeme. $y_0 = 1$ (prvý králik) a $y_1 = 1$ (králik o mesiac).",
                "Transformácia $y_{n+2}$ je $z^2(Y(z) - 1 - 1/z)$.",
                "Rovnica v $Z$-oblasti: $z^2 Y(z) - z^2 - z = z(Y(z) - 1) + Y(z)$.",
                "Vyčleníme $Y(z)$ a usporiadame: $Y(z)(z^2 - z - 1) = z^2$.",
                "Dostaneme $Y(z) = \\frac{z^2}{z^2 - z - 1}$.",
                "Korene menovateľa sú $z_1 = \\frac{1 + \\sqrt{5}}{2}$ a $z_2 = \\frac{1 - \\sqrt{5}}{2}$.",
                "Aby sme využili tabuľky pre vzorec $\\frac{z}{z-a}$, prepíšeme $Y(z)$ pomocou parciálnych zlomkov, pričom $z$ v čitateli ponecháme ako spoločný činiteľ.",
                "Zlomok upravíme na: $Y(z) = \\frac{1}{\\sqrt{5}} \\left( \\frac{z^2}{z - z_1} - \\frac{z^2}{z - z_2} \\right)$.",
                "Inverznou transformáciou získame slávny Binetov vzorec: $y_n = \\frac{1}{\\sqrt{5}} \\left( \\left( \\frac{1+\\sqrt{5}}{2} \\right)^n - \\left( \\frac{1-\\sqrt{5}}{2} \\right)^n \\right)$.",
              ],
              difficulty: "hard",
              tags: ["z_transform", "difference_equation", "fibonacci"],
            },
          ],
        },
      ],
    },
  ],
};
