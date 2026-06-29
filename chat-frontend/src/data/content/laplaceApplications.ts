// src/data/content/laplaceApplications.ts
import { CourseTopic } from "../../types/courseTypes";

export const laplaceApplications: CourseTopic = {
  id: "laplace_applications",
  title: "Aplikácie Laplaceovej transformácie",
  subthemes: [
    // =========================================================
    // SUBTHEME 1: Lineárne diferenciálne rovnice
    // =========================================================
    {
      id: "laplace_ode_linear",
      title: "Riešenie diferenciálnych rovníc s konštantnými koeficientami",
      sections: [
        {
          id: "ode_linear_theory",
          type: "theory",
          title: "Základný princíp riešenia LDR",
          paragraphs: [
            "Jedným z najdôležitejších využití Laplaceovej transformácie je riešenie lineárnych diferenciálnych rovníc (LDR) s konštantnými koeficientami. Začiatočnú úlohu (ZÚ) formulujeme ako problém nájsť riešenie obyčajnej diferenciálnej rovnice pre $t > 0$: {{ode_general}}.",
            "Toto riešenie musí spĺňať predpísané počiatočné podmienky: {{initial_conditions}}.",
            "Z teórie LDR vieme, že táto úloha má jediné riešenie. Ak predpokladáme, že pravá strana $f(t)$ je Laplaceov originál, potom sa dá dokázať (pomocou fundamentálneho systému riešení a Wronskiánu), že aj samotné riešenie $x(t)$ a jeho derivácie sú originály.",
            "Aplikovaním Laplaceovej transformácie a vety o derivácii obrazu na obe strany rovnice sa všetky derivácie premenia na násobenie premennou $p$. Zložité integrovanie diferenciálnej rovnice sa tak zmení na riešenie jednoduchej algebrickej rovnice pre obraz $X(p) = \\mathcal{L}\\{x(t)\\}$.",
            "Po úprave a vyjadrení $X(p)$ dostávame výsledok v komplexnej oblasti: {{transformed_X}}.",
            "V tomto výraze je $Q_n(p)$ charakteristický polynóm diferenciálnej rovnice $n$-tého stupňa a $P_{n-1}(p)$ je polynóm závislý od počiatočných podmienok. Originál $x(t)$ potom získame inverznou transformáciou, napríklad rozkladom na parciálne zlomky alebo použitím vety o konvolúcii.",
          ],
          formulas: {
            ode_general:
              "a_n x^{(n)}(t) + a_{n-1} x^{(n-1)}(t) + \\dots + a_1 x'(t) + a_0 x(t) = f(t)",
            initial_conditions:
              "x(0+) = b_0, \\, x'(0+) = b_1, \\, \\dots, \\, x^{(n-1)}(0+) = b_{n-1}",
            transformed_X:
              "X(p) = \\frac{F(p)}{Q_n(p)} + \\frac{P_{n-1}(p)}{Q_n(p)}",
          },
          intuitiveExplanation: [
            "Predstavte si Laplaceovu transformáciu ako magický tunel. Na jednej strane máte ťažký problém s deriváciami v čase. Vy prejdete tunelom do 'p-sveta', kde sa z derivácií stane obyčajné násobenie.",
            "Tam problém ľahko vyriešite (obyčajná algebraická rovnica s udelením zlomkov) a výsledok pošlete späť tunelom do reálneho času. To, čo by trvalo strany výpočtov s konštantami, sa tu vyrieši elegantne na pár riadkov.",
          ],
        },
        {
          id: "ode_linear_examples",
          type: "worked_examples",
          title: "Príklad 94: Základná diferenciálna rovnica",
          examples: [
            {
              id: "ex_94_ode_cos",
              problem:
                "Riešte začiatočnú úlohu: $x'' - 2x' + 5x = e^t \\cos 2t$, s počiatočnými podmienkami $x(0+) = C_1$, $x'(0+) = C_2$.",
              solutionSteps: [
                "Označíme si obraz riešenia ako $X(p) = \\mathcal{L}\\{x(t)\\}$.",
                "Podľa vety o derivácii obrazu vyjadríme derivácie: $\\mathcal{L}\\{x'(t)\\} = pX(p) - C_1$ a $\\mathcal{L}\\{x''(t)\\} = p^2X(p) - pC_1 - C_2$.",
                "Nájdeme obraz pravej strany. Pre tlmený kosínus platí: $\\mathcal{L}\\{e^t \\cos 2t\\} = \\frac{p-1}{(p-1)^2 + 4}$.",
                "Aplikujeme transformáciu na celú rovnicu: $p^2X(p) - pC_1 - C_2 - 2[pX(p) - C_1] + 5X(p) = \\frac{p-1}{(p-1)^2 + 4}$.",
                "Zoskupíme členy pri $X(p)$ a prevedieme počiatočné podmienky na pravú stranu: $X(p)[p^2 - 2p + 5] = \\frac{p-1}{(p-1)^2 + 4} + pC_1 + C_2 - 2C_1$.",
                "Všimnime si, že charakteristický polynóm $p^2 - 2p + 5$ sa dá prepísať do tvaru $(p-1)^2 + 4$.",
                "Vyjadríme $X(p)$ delením, pričom čitateľ pre podmienky upravíme na tvar s $(p-1)$: $X(p) = \\frac{p-1}{[(p-1)^2 + 4]^2} + C_1 \\frac{p-1}{(p-1)^2 + 4} + (C_2 - C_1) \\frac{1}{(p-1)^2 + 4}$.",
                "Teraz pristúpime k inverznej transformácii jednotlivých členov. Z tabuliek alebo vety o konvolúcii vieme získať spätné obrazy.",
                "Inverzia prvého zlomku: $\\mathcal{L}^{-1}\\left\\{\\frac{p-1}{[(p-1)^2 + 4]^2}\\right\\} = \\frac{1}{4} t e^t \\sin 2t$.",
                "Inverzia pre zostávajúce časti (tlmené goniometrické funkcie): $\\mathcal{L}^{-1}\\left\\{\\frac{p-1}{(p-1)^2 + 4}\\right\\} = e^t \\cos 2t$ a pre sínus je to $\\mathcal{L}^{-1}\\left\\{\\frac{1}{(p-1)^2 + 4}\\right\\} = \\frac{1}{2} e^t \\sin 2t$.",
                "Výsledné riešenie v časovej oblasti je súčtom týchto originálov: $x(t) = \\frac{1}{4} t e^t \\sin 2t + C_1 e^t \\cos 2t + \\frac{C_2 - C_1}{2} e^t \\sin 2t$.",
              ],

              difficulty: "medium",
              tags: ["laplace", "ode", "initial_value_problem"],
            },
          ],
        },
      ],
    },

    // =========================================================
    // SUBTHEME 2: Nespojité a periodické pravé strany
    // =========================================================
    {
      id: "laplace_ode_special",
      title: "Rovnice s nespojitou alebo periodickou pravou stranou",
      sections: [
        {
          id: "ode_shift_theory",
          type: "theory",
          title: "Pravá strana vo forme impulzu (posuny)",
          paragraphs: [
            "Laplaceova transformácia je obzvlášť silná pri rovniciach, kde pravá strana $f(t)$ nie je súvislá funkcia, ale napríklad konečný impulz alebo séria oneskorených dejov.",
            "Tieto funkcie vieme modelovať pomocou Heavisideovej funkcie $\\Theta(t)$. Ak má pravá strana tvar: {{shifted_rhs}}, aplikujeme na ňu vetu o posune v originále.",
            "Po transformácii dostaneme obraz, ktorý obsahuje exponenciálne členy $e^{-\\tau p}$. Po úprave na $X(p)$ a následnom prechode späť do času opäť využijeme posun v originále, čím dostaneme riešenie 'zapínajúce sa' v rôznych okamihoch.",
          ],
          formulas: {
            shifted_rhs:
              "f(t) = \\Theta(t - \\tau_1) f_1(t - \\tau_1) + \\dots + \\Theta(t - \\tau_k) f_k(t - \\tau_k)",
          },
          intuitiveExplanation: [
            "Bežné metódy riešenia diferenciálnych rovníc (ako variácia konštánt) zlyhávajú alebo sú mimoriadne zdĺhavé, ak na systém pôsobí vonkajšia sila len po určitý čas (napríklad úder kladivom do pružiny alebo dočasné zapnutie napätia).",
            "S Laplaceovou transformáciou to nie je problém – impulz transformujeme na exponenciálu $e^{-\\tau p}$ a na konci výpočtu sa táto exponenciála zmení späť na časové oneskorenie signálu.",
          ],
        },
        {
          id: "ode_shift_examples",
          type: "worked_examples",
          title: "Príklad 96: Reakcia na obmedzený impulz",
          examples: [
            {
              id: "ex_96_pulse",
              problem:
                "Nájdite riešenie ZÚ: $x'' + 4x = f(t)$, kde $x(0+) = 1$, $x'(0+) = 0$ a $f(t)$ je kosínový impulz: $f(t) = \\cos t$ pre $t \\in \\langle 0, \\frac{\\pi}{2})$ a $0$ inak.",
              solutionSteps: [
                "Obrazy derivácií z počiatočných podmienok: $\\mathcal{L}\\{x'(t)\\} = pX(p) - 1$ a $\\mathcal{L}\\{x''(t)\\} = p^2X(p) - p$.",
                "Pravú stranu vyjadríme pomocou funkcie skoku: $f(t) = \\cos t \\left[\\Theta(t) - \\Theta(t - \\frac{\\pi}{2})\\right]$.",
                "Aby sme mohli použiť vetu o posune pre druhý člen, musíme argument upraviť: $\\cos t = \\cos((t - \\frac{\\pi}{2}) + \\frac{\\pi}{2}) = -\\sin(t - \\frac{\\pi}{2})$. V skriptách sa používa tvar s uvážením znamienok, čo vedie na $\\Theta(t)\\cos t + \\Theta(t - \\frac{\\pi}{2})\\sin(t - \\frac{\\pi}{2})$.",
                "Transformujeme upravenú pravú stranu: $\\mathcal{L}\\{f(t)\\} = \\frac{p}{p^2 + 1} + e^{-p \\frac{\\pi}{2}} \\frac{1}{p^2 + 1}$.",
                "Dosadíme do LDR: $p^2X(p) - p + 4X(p) = \\frac{p}{p^2 + 1} + e^{-p \\frac{\\pi}{2}} \\frac{1}{p^2 + 1}$.",
                "Vyjadríme $X(p)$: $X(p) = \\frac{p}{p^2 + 4} + \\frac{p}{(p^2 + 1)(p^2 + 4)} + e^{-p \\frac{\\pi}{2}} \\frac{1}{(p^2 + 1)(p^2 + 4)}$.",
                "Toto si označíme ako tri časti: $x(t) = x_1(t) + x_2(t) + \\Theta(t - \\frac{\\pi}{2}) x_3(t - \\frac{\\pi}{2})$.",
                "Aplikujeme rozklad na parciálne zlomky pre členy: $\\frac{p}{(p^2+1)(p^2+4)} = \\frac{1}{3}\\frac{p}{p^2+1} - \\frac{1}{3}\\frac{p}{p^2+4}$ a pre druhý zlomok $\\frac{1}{(p^2+1)(p^2+4)} = \\frac{1}{3}\\frac{1}{p^2+1} - \\frac{1}{3}\\frac{1}{p^2+4}$.",
                "Inverznou transformáciou dostávame zložky: $x_1(t) = \\cos 2t$, ďalej $x_2(t) = \\frac{1}{3}\\cos t - \\frac{1}{3}\\cos 2t$, a pre oneskorenú časť $x_3(t) = \\frac{1}{3}\\sin t - \\frac{1}{6}\\sin 2t$.",
                "Výsledné riešenie je súčet: $x(t) = \\frac{1}{3}\\cos t + \\frac{2}{3}\\cos 2t + \\Theta(t - \\frac{\\pi}{2})\\left[\\frac{1}{3}\\sin(t - \\frac{\\pi}{2}) - \\frac{1}{6}\\sin 2(t - \\frac{\\pi}{2})\\right]$.",
              ],
              difficulty: "hard",
              tags: ["laplace", "ode", "shifted_rhs", "heaviside"],
            },
          ],
        },
        {
          id: "ode_periodic_theory",
          type: "theory",
          title: "Periodická pravá strana",
          paragraphs: [
            "V elektrotechnike často riešime úlohy, kde na systém pôsobí periodický signál (napríklad striedavé napätie). Vtedy má pravá strana tvar $f(t) = f(t+T)$.",
            "Riešenie takejto úlohy hľadáme v tvare zloženia dvoch funkcií: $x(t) = y(t) + z(t)$.",
            "Funkcia $y(t)$ je tzv. ustálené periodické riešenie, ktoré kopíruje frekvenciu pravej strany. Určíme ju aplikáciou transformácie na jednu periódu: {{periodic_transform}} a vhodným nastavením počiatočnej podmienky tak, aby na konci periódy plynule nadväzovala.",
            "Funkcia $z(t)$ je prechodný dej (transient), ktorý je riešením homogénnej rovnice (s nulovou pravou stranou) a časom obvykle vyhasne na nulu.",
          ],
          formulas: {
            periodic_transform:
              "Y(p) = \\frac{P_{n-1}(p)}{Q_n(p)} + \\frac{F_T(p)}{Q_n(p)(1 - e^{-pT})} = \\frac{G(p)}{1 - e^{-pT}}",
          },
          intuitiveExplanation: [
            "Z fyzikálneho hľadiska, keď pripojíte spotrebič do zásuvky, prvé zlomky sekúnd v systéme prebehne chaos – to je prechodný dej $z(t)$. Po chvíli sa prúdy a napätia upokoja a začnú pravidelne kmitať frekvenciou siete – to je ustálené riešenie $y(t)$.",
          ],
        },
        {
          id: "ode_periodic_examples",
          type: "worked_examples",
          title: "Príklad 98: Periodický pílovitý signál",
          examples: [
            {
              id: "ex_98_periodic",
              problem:
                "Nájdite periodické riešenie ZÚ: $x' + x = f(t)$ pre $t > 0$, $x(0+) = 0$, kde $f(t)$ je periodická funkcia s periódou $T=1$ definovaná ako $f(t) = t - k$ pre $k \\le t < k+1$.",
              solutionSteps: [
                "Riešenie hľadáme v tvare $x(t) = y(t) + z(t)$, kde $y(t)$ je periodické s periódou $T=1$.",
                "Pre periodickú časť platí $y' + y = f(t)$ a predpokladáme podmienku $y(0+) = B$, ktorú určíme neskôr.",
                "Obraz prvej periódy pravej strany $f_{\\langle 0,1\\rangle}(t) = t\\Theta(t) - (t-1)\\Theta(t-1) - \\Theta(t-1)$ je $F_1(p) = \\frac{1}{p^2}(1 - e^{-p}) - \\frac{1}{p}e^{-p}$.",
                "Transformujeme rovnicu pre $Y(p) = \\mathcal{L}\\{y(t)\\}$ s podmienkou $B$: $Y(p)(p+1) = B + \\frac{1-e^{-p}-pe^{-p}}{p^2(1-e^{-p})}$.",
                "Upravíme výraz do tvaru periodicity $Y(p) = \\frac{G(p)}{1 - e^{-p}}$ a po algebraických úpravách izolujeme funkciu originálu $g(t)$.",
                "Pretože $y(t)$ musí byť periodická, takáto pomocná funkcia $g(t)$ musí byť pre $t > 1$ identicky rovná nule.",
                "Z podmienky $g(t) = 0$ pre $t > 1$ dostávame rovnicu $(B+1)e^{-t} + t - 1 - Be^{-(t-1)} - t + 1 = 0$, z čoho vyplýva hodnota $B = \\frac{1}{e-1}$.",
                "Dosadením tohto $B$ nájdeme konečný tvar periodickej zložky: $y(t) = \\frac{e^{1-t}}{e-1} + t - 1$ pre prvú periódu.",
                "Prechodná zložka $z(t)$ je riešením rovnice $z' + z = 0$ s podmienkou $z(0+) = -B$. Výsledkom je $z(t) = \\frac{1}{1-e} e^{-t}$.",
                "Celkové riešenie je ich súčtom. Pre prvý interval $0 \\le t < 1$ platí $x(t) = e^{-t} + t - 1$, a pre ďalšie periódy $x(t) = \\frac{e^{k+1}-1}{e-1}e^{-t} + t - k - 1$.",
              ],
              difficulty: "hard",
              tags: ["laplace", "ode", "periodic", "transient"],
            },
          ],
        },
      ],
    },

    // =========================================================
    // SUBTHEME 3: Systémy diferenciálnych rovníc
    // =========================================================
    {
      id: "laplace_systems",
      title: "Systémy obyčajných diferenciálnych rovníc",
      sections: [
        {
          id: "systems_theory",
          type: "theory",
          title: "Prevod systému na algebrické rovnice",
          paragraphs: [
            "Rovnakú metódu môžeme aplikovať aj na systémy prepojených diferenciálnych rovníc. Aplikáciou Laplaceovej transformácie na každú rovnicu systému sa derivácie nahradia premennou $p$.",
            "Výsledkom je sústava lineárnych algebrických rovníc pre neznáme obrazy $X_1(p), X_2(p), \\dots, X_n(p)$.",
            "Túto sústavu môžeme riešiť štandardnými metódami lineárnej algebry (napr. použitím Cramerovho pravidla: {{cramer_rule}}).",
            "Determinant sústavy $D(p)$ predstavuje charakteristický polynóm celého systému. Jeho korene určujú povahu prechodných dejov.",
          ],
          formulas: {
            cramer_rule:
              "X_j(p) = \\frac{D_j(p)}{D(p)}, \\quad j = 1, 2, \\dots, n",
          },
          intuitiveExplanation: [
            "Ak máte systém nádrží prepojených trubkami alebo zložitý elektrický obvod, všetko sa navzájom ovplyvňuje. Namiesto hľadania ťažkých substitúcií jednoducho preklopíte celý systém do komplexnej roviny. Tam z toho vznikne 'matika pre stredoškolákov' – klasická sústava rovníc s premennými X a Y, ktorú stačí vyjadriť a poslať späť do reálneho sveta.",
          ],
        },
        {
          id: "systems_examples",
          type: "worked_examples",
          title: "Príklady: Riešenie systémov rovníc",
          examples: [
            {
              id: "ex_100_system_2x2",
              problem:
                "Riešte začiatočnú úlohu pre systém: $x' - y = 2$ s podmienkou $x(0+) = 0$, a $y' - x = t$ s podmienkou $y(0+) = -1$.",
              solutionSteps: [
                "Označíme si obrazy ako $X = \\mathcal{L}\\{x\\}$ a $Y = \\mathcal{L}\\{y\\}$.",
                "Zderivované rovnice transformujeme dosadením počiatočných podmienok: $\\mathcal{L}\\{x'\\} = pX - 0$ a $\\mathcal{L}\\{y'\\} = pY - (-1) = pY + 1$.",
                "Pravé strany sú $\\mathcal{L}\\{2\\} = \\frac{2}{p}$ a $\\mathcal{L}\\{t\\} = \\frac{1}{p^2}$.",
                "Dosadíme a preusporiadame: pre prvú rovnicu platí $pX - Y = \\frac{2}{p}$.",
                "Pre druhú rovnicu platí $-X + pY + 1 = \\frac{1}{p^2}$, po úprave $-X + pY = \\frac{1}{p^2} - 1$.",
                "Riešime sústavu lineárnych rovníc Cramerovým pravidlom. Hlavný determinant je $D(p) = p^2 - 1$.",
                "Vypočítame $X(p) = \\frac{p^2 + 1}{p^2(p^2 - 1)}$ a rozložíme na zlomky: $X(p) = -\\frac{1}{p^2} + \\frac{1}{p-1} - \\frac{1}{p+1}$.",
                "Podobne pre druhú premennú: $Y(p) = \\frac{3 - p^2}{p(p^2 - 1)} = -\\frac{3}{p} + \\frac{1}{p-1} + \\frac{1}{p+1}$.",
                "Inverznou transformáciou zlomkov získame riešenie: $x(t) = -t + e^{-t} - e^t$ a $y(t) = -3 - e^{-t} + e^t$.",
              ],
              difficulty: "medium",
              tags: ["laplace", "system_ode"],
            },
            {
              id: "ex_102_system_trig",
              problem:
                "Riešte ZÚ: $x_1' + 2x_1 + x_2 = \\sin t$ s podmienkou $x_1(0+) = 0$, a $-4x_1 + x_2' - 2x_2 = \\cos t$ s podmienkou $x_2(0+) = 1$.",
              solutionSteps: [
                "Zavedieme obrazy $X_1$ a $X_2$. Laplaceova transformácia pravej strany je $\\frac{1}{p^2+1}$ pre sínus a $\\frac{p}{p^2+1}$ pre kosínus.",
                "Aplikujeme transformáciu a usporiadame do sústavy. Prvá rovnica: $(p+2)X_1 + X_2 = \\frac{1}{p^2+1}$.",
                "Druhá rovnica: $-4X_1 + (p-2)X_2 - 1 = \\frac{p}{p^2+1}$, čiže posunutím konštanty z podmienky na pravú stranu: $-4X_1 + (p-2)X_2 = \\frac{p}{p^2+1} + 1$.",
                "Hlavný determinant sústavy je $D(p) = (p+2)(p-2) - (-4)(1) = p^2 - 4 + 4 = p^2$.",
                "Cramerovým pravidlom vypočítame $X_1(p) = -\\frac{p^2+3}{p^2(p^2+1)} = -\\frac{3}{p^2} + \\frac{2}{p^2+1}$.",
                "Rovnako určíme $X_2(p) = \\frac{p^3+3p^2+3p+6}{p^2(p^2+1)}$. Po rozklade: $\\frac{3}{p} + \\frac{6}{p^2} - \\frac{2p}{p^2+1} - \\frac{3}{p^2+1}$.",
                "Inverznou transformáciou zlomkov dostávame finálne riešenie: $x_1(t) = -3t + 2\\sin t$ a $x_2(t) = 3 + 6t - 2\\cos t - 3\\sin t$.",
              ],
              difficulty: "hard",
              tags: ["laplace", "system_ode", "trigonometry"],
            },
          ],
        },
      ],
    },

    // =========================================================
    // SUBTHEME 4: Integrodiferenciálne rovnice
    // =========================================================
    {
      id: "laplace_integrodiff",
      title: "Riešenie integrodiferenciálnych rovníc",
      sections: [
        {
          id: "integrodiff_theory",
          type: "theory",
          title: "Derivácie aj integrály pod jednou strechou",
          paragraphs: [
            "Matematické modely niekedy obsahujú zmes derivácií (rýchlosť zmien) a integrálov (akumulácia alebo história). Príkladom je lineárna integrodiferenciálna rovnica prvého rádu: {{integro_diff_eq}}.",
            "Takúto rovnicu by sme klasicky museli najprv zderivovať, čím by vznikla diferenciálna rovnica vyššieho rádu. Pri použití Laplaceovej transformácie to nie je potrebné.",
            "Využijeme vetu o integrovaní originálu, ktorá hovorí, že integrál v čase sa transformuje na delenie premennou $p$: {{integral_transform}}.",
            "Vznikne algebrická rovnica, z ktorej priamo vyjadríme neznámy obraz $X(p)$.",
          ],
          formulas: {
            integro_diff_eq:
              "a_2 x'(t) + a_1 x(t) + a_0 \\int_0^t x(s) ds = f(t)",
            integral_transform:
              "\\mathcal{L}\\left[ \\int_0^t x(s) ds \\right] = \\frac{X(p)}{p}",
          },
          intuitiveExplanation: [
            "V teórii riadenia (napr. pri PID regulátoroch) máte bežne integračnú aj derivačnú zložku. Z pohľadu Laplaceovej transformácie je to dokonalá harmónia: zatiaľ čo derivácia v čase znamená 'násob p', integrál v čase znamená 'vydeľ p'. Všetko sa okamžite premení na jednoduché zlomky.",
          ],
        },
        {
          id: "integrodiff_examples",
          type: "worked_examples",
          title: "Príklad 104: Integrodiferenciálna rovnica",
          examples: [
            {
              id: "ex_104_integrodiff",
              problem:
                "Riešte ZÚ pre integrodiferenciálnu rovnicu: $x'(t) + 2x(t) + 2\\int_{0}^{t} x(s) ds = 1$ pre $t > 0$, s počiatočnou podmienkou $x(0+) = 0$.",
              solutionSteps: [
                "Položíme $X(p) = \\mathcal{L}\\{x(t)\\}$. Aplikujeme Laplaceovu transformáciu na každý člen rovnice.",
                "Obraz derivácie je $pX(p) - 0$. Obraz funkcie je $2X(p)$.",
                "Zásadný krok: obraz integrálu je podiel, takže dostávame $+ 2\\frac{X(p)}{p}$.",
                "Na pravej strane máme konštantu 1, ktorej obraz je $\\frac{1}{p}$.",
                "Zostavíme rovnicu: $pX(p) + 2X(p) + 2\\frac{X(p)}{p} = \\frac{1}{p}$.",
                "Vytkneme $X(p)$: $X(p) \\left( p + 2 + \\frac{2}{p} \\right) = \\frac{1}{p}$.",
                "Prenásobíme obe strany premennou $p$, aby sme odstránili zložené zlomky: $X(p) (p^2 + 2p + 2) = 1$.",
                "Vyjadríme obraz: $X(p) = \\frac{1}{p^2 + 2p + 2}$.",
                "Menovateľ nedokážeme rozložiť na reálne korene, upravíme ho preto na štvorec: $p^2 + 2p + 2 = (p+1)^2 + 1$.",
                "Tvar $X(p) = \\frac{1}{(p+1)^2 + 1}$ priamo zodpovedá tlmenému sínusu v časovej oblasti.",
                "Výsledný originál je $x(t) = e^{-t}\\sin t$.",
              ],
              difficulty: "medium",
              tags: ["laplace", "integrodifferential", "pid"],
            },
          ],
        },
      ],
    },
  ],
};
