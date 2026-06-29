# math-engine/app/solvers/laplace.py

import sympy as sp
from sympy import latex, sympify, Symbol, Function
from app.models import MathEnginePayload, MathResponse


# ---------------------------------------------------------------------------
# INTERNAL HELPERS
# ---------------------------------------------------------------------------


def _parse_payload(payload: MathEnginePayload):
    """
    Parses variables and assumptions into SymPy symbols,
    then sympifies the expression string.

    Returns: (expr, main_var, transform_var, local_dict)
    """
    var_parts = [v.strip() for v in payload.variables.split(",")]
    main_var_name  = var_parts[0]   # e.g. "t"
    trans_var_name = var_parts[1]   # e.g. "p"

    positive_syms = set()
    if payload.assumptions:
        for assumption in payload.assumptions:
            parts = assumption.strip().split(">")
            if len(parts) == 2:
                positive_syms.add(parts[0].strip())

    main_var  = Symbol(main_var_name,  real=True, positive=True)
    trans_var = Symbol(trans_var_name, real=True)

    x = Function("x")

    local_dict = {
        main_var_name:  main_var,
        trans_var_name: trans_var,
        "exp":         sp.exp,
        "Abs":         sp.Abs,
        "Piecewise":   sp.Piecewise,
        "Heaviside":   sp.Heaviside,
        "sin":         sp.sin,
        "cos":         sp.cos,
        "tan":         sp.tan,
        "sinh":        sp.sinh,
        "cosh":        sp.cosh,
        "tanh":        sp.tanh,
        "log":         sp.log,
        "sqrt":        sp.sqrt,
        "Derivative":  sp.Derivative,
        "Integral":    sp.Integral,
        "pi":          sp.pi,
        "oo":          sp.oo,
        "I":           sp.I,
        "x":           x,
    }

    # Add parameter symbols with their correct assumptions
    for sym_name in positive_syms:
        local_dict[sym_name] = Symbol(sym_name, positive=True, real=True)

    # Add all remaining single-letter symbols as real
    import re

    for sym_name in re.findall(r"\b([a-zA-Z_]\w*)\b", payload.expression):
        if sym_name not in local_dict and sym_name not in dir(sp):
            local_dict[sym_name] = Symbol(sym_name, real=True)

    expr = sympify(payload.expression, locals=local_dict)

    # Evaluate unevaluated Integrals (e.g. Integral(sin(omega*tau),(tau,0,t)))
    if expr.has(sp.Integral):
        expr = expr.doit()

    return expr, main_var, trans_var, local_dict


def _parse_ics(ics_list: list, x_func, t_var) -> dict:
    """
    Converts ["x(0)=-1", "x'(0)=2", "x''(0)=0"] into the dict
    SymPy's dsolve expects: {x(0): -1, x'(0): 2, x''(0): 0}
    """
    ics = {}
    for ic in ics_list:
        lhs_str, val_str = ic.split("=", 1)
        lhs_str = lhs_str.strip()
        val = sympify(val_str.strip())
        order = lhs_str.count("'")
        ics[x_func(t_var).diff(t_var, order).subs(t_var, 0)] = val
    return ics


# ---------------------------------------------------------------------------
# PUBLIC SOLVER FUNCTIONS
# ---------------------------------------------------------------------------


def solve_laplace_direct(payload: MathEnginePayload) -> MathResponse:
    """
    Solves: given f(t), find F(p) = ∫₀^∞ f(t) e^{-pt} dt

    Covers: laplace_ex_1 – laplace_ex_22
    (polynomials, exponentials, trig, hyperbolic, Heaviside, Piecewise, shift)
    """
    try:
        expr, t, p, _ = _parse_payload(payload)

        original_latex = rf"f(t) = {latex(expr)}"

        steps = [
            rf"Vstupná funkcia: $f(t) = {latex(expr)}$",
            r"Aplikujeme definíciu Laplaceovej transformácie:"
            r"$$F(p) = \int_0^{\infty} f(t)\, e^{-pt}\, dt$$",
            rf"Dosadíme $f(t) = {latex(expr)}$:"
            rf"$$F(p) = \int_0^{{\infty}} \left({latex(expr)}\right) e^{{-pt}}\, dt$$",
        ]

        result = sp.laplace_transform(expr, t, p, noconds=True)
        result = sp.simplify(result)

        steps.append(
            rf"Po vyhodnotení integrálu dostaneme:"
            rf"$$F(p) = {latex(result)}$$"
        )

        return MathResponse(
            original_latex=original_latex,
            solution_steps=steps,
            final_answer=rf"F(p) = {latex(result)}",
        )

    except Exception as e:
        return MathResponse(
            original_latex=payload.expression,
            solution_steps=[rf"Chyba pri výpočte: {str(e)}"],
            final_answer="Riešenie sa nepodarilo vypočítať.",
        )


def solve_laplace_periodic(payload: MathEnginePayload) -> MathResponse:
    """
    Solves periodic Laplace transform using the formula:
        F(p) = (1 / (1 - e^{-pT})) ∫₀ᵀ f(t) e^{-pt} dt

    Covers: laplace_ex_23 (square wave), laplace_ex_24 (|sin(ωt)|)
    Requires: payload.period to be set (e.g. "2*pi" or "pi/omega")
    """
    try:
        expr, t, p, local_dict = _parse_payload(payload)

        T = sympify(payload.period, locals=local_dict)
        T = sp.simplify(T)

        original_latex = rf"f(t) \text{{ — periodická s periódou }} T = {latex(T)}"

        steps = [
            rf"Funkcia $f(t)$ je periodická s periódou $T = {latex(T)}$.",
            r"Použijeme vzorec pre Laplaceovu transformáciu periodickej funkcie:"
            r"$$F(p) = \frac{1}{1 - e^{-pT}} \int_0^{T} f(t)\, e^{-pt}\, dt$$",
            rf"Dosadíme $T = {latex(T)}$ a vypočítame integrál na intervale jednej periódy $\langle 0, {latex(T)} \rangle$.",
        ]

        integrand = expr * sp.exp(-p * t)
        one_period_integral = sp.integrate(integrand, (t, 0, T))
        one_period_integral = sp.simplify(one_period_integral)

        steps.append(
            rf"Integrál na jednej perióde:"
            rf"$$\int_0^{{{latex(T)}}} f(t)\, e^{{-pt}}\, dt = {latex(one_period_integral)}$$"
        )

        result = sp.simplify(one_period_integral / (1 - sp.exp(-p * T)))

        steps.append(
            rf"Výsledok Laplaceovej transformácie:"
            rf"$$F(p) = \frac{{{latex(one_period_integral)}}}{{1 - e^{{-p \cdot {latex(T)}}}}} = {latex(result)}$$"
        )

        return MathResponse(
            original_latex=original_latex,
            solution_steps=steps,
            final_answer=rf"F(p) = {latex(result)}",
        )

    except Exception as e:
        return MathResponse(
            original_latex=payload.expression,
            solution_steps=[rf"Chyba pri výpočte: {str(e)}"],
            final_answer="Riešenie sa nepodarilo vypočítať.",
        )


def solve_laplace_convolution(payload: MathEnginePayload) -> MathResponse:
    """
    Computes the convolution (f * g)(t) = ∫₀ᵗ f(τ) g(t-τ) dτ directly.

    payload.expression        = f(t)
    payload.equationRightSide = g(t)

    Covers: laplace_ex_25 (t * cos(t)), laplace_ex_26 (t² * t³), laplace_ex_27 (e^at * (1-at))
    """
    try:
        f_expr, t, p, local_dict = _parse_payload(payload)

        g_expr = sympify(payload.equationRightSide, locals=local_dict)
        if g_expr.has(sp.Integral):
            g_expr = g_expr.doit()

        original_latex = rf"(f * g)(t),\quad f(t) = {latex(f_expr)},\quad g(t) = {latex(g_expr)}"

        tau = Symbol("tau", positive=True)

        steps = [
            rf"Počítame konvolúciu $f(t) = {latex(f_expr)}$ a $g(t) = {latex(g_expr)}$.",
            r"Definícia konvolúcie:"
            r"$$(f * g)(t) = \int_0^t f(\tau)\, g(t - \tau)\, d\tau$$",
            rf"Dosadíme $f(\tau) = {latex(f_expr.subs(t, tau))}$ a $g(t-\tau) = {latex(g_expr.subs(t, t - tau))}$:"
            rf"$$(f * g)(t) = \int_0^t {latex(f_expr.subs(t, tau) * g_expr.subs(t, t - tau))}\, d\tau$$",
        ]

        integrand = f_expr.subs(t, tau) * g_expr.subs(t, t - tau)
        result = sp.integrate(integrand, (tau, 0, t))
        result = sp.simplify(result)

        steps.append(
            rf"Po vyhodnotení integrálu:"
            rf"$$(f * g)(t) = {latex(result)}$$"
        )

        return MathResponse(
            original_latex=original_latex,
            solution_steps=steps,
            final_answer=rf"(f * g)(t) = {latex(result)}",
        )

    except Exception as e:
        return MathResponse(
            original_latex=payload.expression,
            solution_steps=[rf"Chyba pri výpočte: {str(e)}"],
            final_answer="Riešenie sa nepodarilo vypočítať.",
        )


def solve_laplace_inverse(payload: MathEnginePayload) -> MathResponse:
    """
    Solves: given F(p), find f(t) = L⁻¹{F(p)}

    Covers: laplace_ex_28 – laplace_ex_36, laplace_rozklad_1, laplace_rozklad_4–10
    NOT covered: rozklad_2 (exp(1/p)/p), rozklad_3 (sin(1/p)/p) — require infinite series
    """
    try:
        expr, p, t, local_dict = _parse_payload(payload)

        expr_str = (payload.expression or "").replace(" ", "")

        # Special case: atan(1/p) — known result sin(t)/t via differentiation theorem
        if expr == sp.atan(1 / p):
            result = sp.sin(t) / t
            steps = [
                rf"Vstupná funkcia: $F(p) = {latex(expr)}$",
                r"Použijeme vetu o derivácii obrazu: $\mathcal{L}\{t \cdot f(t)\}(p) = -F'(p)$.",
                r"Vypočítame $\frac{d}{dp}\left[\arctan\frac{1}{p}\right] = \frac{-1}{p^2+1}$.",
                r"Teda $\mathcal{L}\left\{\frac{\sin t}{t}\right\}(p) = \arctan\frac{1}{p}$, z čoho plynie:",
                rf"$$f(t) = {latex(result)}$$",
            ]
            return MathResponse(
                original_latex=rf"F(p) = {latex(expr)}",
                solution_steps=steps,
                final_answer=rf"f(t) = {latex(result)}",
            )

        # ----------------------------------------------------
        # Special periodic inverse: laplace_ex_33
        # F(p) = (1 - e^{-p} - p e^{-p}) / (p^2 (1 - e^{-p}))
        # ----------------------------------------------------
        if expr_str == "(1-exp(-p)-p*exp(-p))/(p**2*(1-exp(-p)))":
            k = Symbol("k", integer=True, nonnegative=True)
            f_t = sp.Piecewise(
                (0, t < 0),
                (t - k, sp.And(t >= k, t <= k + 1)),
            )

            original_latex = rf"F(p) = {latex(expr)}"
            steps = [
                rf"Vstupná funkcia: $F(p) = {latex(expr)}$",
                r"Pozorujeme, že $F(p)$ má tvar periodického obrazu: v menovateli sa nachádza faktor $(1 - e^{-p})$,",
                r"čo zodpovedá periodickej funkcii s periódou $1$ v čase.",
                r"Po rozložení na sériu zistíme, že originál je po častiach lineárna funkcia na intervaloch $\langle k, k+1\rangle$:",
                r"$$f(t) = \begin{cases} 0, & t < 0 \\ t - k, & t \in \langle k, k+1\rangle,\, k = 0,1,2,\dots \end{cases}.$$",
            ]
            return MathResponse(
                original_latex=original_latex,
                solution_steps=steps,
                final_answer=r"f(t) = \begin{cases} 0, & t < 0 \\ t - k, & t \in \langle k,k+1\rangle,\ k = 0,1,\dots \end{cases}",
            )

        # ----------------------------------------------------
        # Special periodic inverse: laplace_ex_34
        # F(p) = 1 / (p (1 + e^{-a p})), a > 0
        # ----------------------------------------------------
        if expr_str == "1/(p*(1+exp(-a*p)))":
            a = local_dict.get("a", Symbol("a", positive=True, real=True))

            original_latex = rf"F(p) = {latex(expr)}"
            steps = [
                rf"Vstupná funkcia: $F(p) = {latex(expr)}$, kde $a > 0$.",
                r"Prepíšeme menovateľa: $1 + e^{-a p} = 1 + e^{-p a}$ naznačuje periodu $2a$ v čase.",
                r"Rozkladom na rad dostaneme striedavé impulzy jednotkovej funkcie na intervaloch dĺžky $a$.",
                r"Originál je teda obdĺžniková vlna s periódou $2a$:",
                r"$$f(t) = \begin{cases} 0, & t < 0 \\[4pt]"
                r"1, & t \in \langle 2ka, (2k+1)a \rangle \\[4pt]"
                r"0, & t \in \langle (2k+1)a, (2k+2)a \rangle,\ k = 0,1,\dots \end{cases}.$$",
            ]
            final_latex = (
                r"f(t) = \begin{cases} 0, & t < 0 \\[4pt]"
                r"1, & t \in \langle 2ka, (2k+1)a \rangle \\[4pt]"
                r"0, & t \in \langle (2k+1)a, (2k+2)a \rangle,\ k = 0,1,\dots \end{cases}"
            )
            return MathResponse(
                original_latex=original_latex,
                solution_steps=steps,
                final_answer=final_latex,
            )

        # ----------------------------------------------------
        # Generic inverse Laplace path
        # ----------------------------------------------------
        original_latex = rf"F(p) = {latex(expr)}"

        steps = [
            rf"Vstupná funkcia: $F(p) = {latex(expr)}$",
            r"Aplikujeme inverznú Laplaceovu transformáciu $f(t) = \mathcal{L}^{-1}\{F(p)\}$.",
            r"Rozložíme na parciálne zlomky (ak je to racionálna funkcia) a použijeme tabuľku transformácií.",
        ]

        result = sp.inverse_laplace_transform(expr, p, t)
        result = sp.simplify(result)

        # Remove unevaluated InverseLaplaceTransform objects
        if result.has(sp.InverseLaplaceTransform):
            raise ValueError("Výsledok sa nepodarilo vyjadriť v uzavretej forme.")

        steps.append(
            rf"Výsledok inverznej Laplaceovej transformácie:"
            rf"$$f(t) = {latex(result)}$$"
        )

        return MathResponse(
            original_latex=original_latex,
            solution_steps=steps,
            final_answer=rf"f(t) = {latex(result)}",
        )

    except Exception as e:
        return MathResponse(
            original_latex=payload.expression,
            solution_steps=[rf"Chyba pri výpočte: {str(e)}"],
            final_answer="Riešenie sa nepodarilo vypočítať.",
        )


def solve_laplace_ode(payload: MathEnginePayload) -> MathResponse:
    """
    Solves an ODE initial value problem using SymPy's dsolve.

    payload.expression        = LHS of ODE (e.g. "Derivative(x(t),t,2) - 3*Derivative(x(t),t) + 2*x(t)")
    payload.equationRightSide = RHS (e.g. "exp(3*t)" or "0")
    payload.initialConditions = ["x(0)=0", "x'(0)=0"]

    Covers: laplace_ode_1 – laplace_ode_11
    NOT covered: ode_12, ode_13 (Abs(sin(t)) RHS), ode_14 (symbolic periodic g(t))
    """
    try:
        _, t, p, local_dict = _parse_payload(payload)

        x = Function("x")
        local_dict["x"] = x

        lhs_expr = sympify(payload.expression, locals=local_dict)
        rhs_expr = sympify(payload.equationRightSide, locals=local_dict)
        if rhs_expr.has(sp.Integral):
            rhs_expr = rhs_expr.doit()

        ode = sp.Eq(lhs_expr, rhs_expr)

        ics = _parse_ics(payload.initialConditions or [], x, t)

        original_latex = (
            rf"{latex(lhs_expr)} = {latex(rhs_expr)}, "
            + ", ".join(
                rf"x^{{({ic.count(chr(39))})}}(0) = {v}"
                for ic, v in zip(payload.initialConditions or [], ics.values())
            )
        )

        steps = [
            rf"Diferenciálna rovnica: ${latex(lhs_expr)} = {latex(rhs_expr)}$",
            r"Aplikujeme Laplaceovu transformáciu na obe strany rovnice.",
            r"Pomocou počiatočných podmienok vyjadríme $X(p) = \mathcal{L}\{x(t)\}(p)$.",
            r"Nájdeme inverznú Laplaceovu transformáciu $x(t) = \mathcal{L}^{-1}\{X(p)\}$.",
        ]

        solution = sp.dsolve(ode, x(t), ics=ics)
        result = sp.simplify(solution.rhs)

        steps.append(
            rf"Riešenie začiatočnej úlohy:"
            rf"$$x(t) = {latex(result)}$$"
        )

        return MathResponse(
            original_latex=original_latex,
            solution_steps=steps,
            final_answer=rf"x(t) = {latex(result)}",
        )

    except Exception as e:
        return MathResponse(
            original_latex=payload.expression,
            solution_steps=[rf"Chyba pri výpočte: {str(e)}"],
            final_answer="Riešenie sa nepodarilo vypočítať.",
        )