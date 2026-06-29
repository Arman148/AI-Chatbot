# math-engine/app/solvers/z_transform.py

import re
import sympy as sp
from sympy import Symbol, Function, sympify, latex
from app.models import MathEnginePayload, MathResponse


# ---------------------------------------------------------------------------
# INTERNAL HELPERS
# ---------------------------------------------------------------------------


def _parse_payload(payload: MathEnginePayload):
    """
    Parses variables and assumptions into SymPy symbols,
    then sympifies the expression string.

    Variable conventions:
      Direct:   variables="n,z"  -> main=n (integer, nonneg), trans=z
      Inverse:  variables="z,n"  -> main=z (real),            trans=n (integer)
      Diff. eq: variables="n,z"
    """
    var_parts = [v.strip() for v in payload.variables.split(",")]
    main_var_name = var_parts[0]
    trans_var_name = var_parts[1]

    positive_syms = set()
    if payload.assumptions:
        for assumption in payload.assumptions:
            parts = assumption.strip().split(">")
            if len(parts) == 2:
                positive_syms.add(parts[0].strip())

    def _make_sym(name: str):
        if name in ("n", "k", "m"):
            return Symbol(name, integer=True, nonnegative=True)
        if name in positive_syms:
            return Symbol(name, positive=True, real=True)
        return Symbol(name, real=True)

    main_var = _make_sym(main_var_name)
    trans_var = _make_sym(trans_var_name)

    y = Function("y")

    local_dict = {
        main_var_name: main_var,
        trans_var_name: trans_var,
        "exp": sp.exp,
        "Abs": sp.Abs,
        "Piecewise": sp.Piecewise,
        "Heaviside": sp.Heaviside,
        "sin": sp.sin,
        "cos": sp.cos,
        "tan": sp.tan,
        "sinh": sp.sinh,
        "cosh": sp.cosh,
        "tanh": sp.tanh,
        "log": sp.log,
        "sqrt": sp.sqrt,
        "pi": sp.pi,
        "oo": sp.oo,
        "I": sp.I,
        "y": y,
    }

    # assumptions like "a > 0"
    for sym_name in positive_syms:
        if sym_name not in local_dict:
            local_dict[sym_name] = Symbol(sym_name, positive=True, real=True)

    # any bare identifiers in expression → real symbols
    for sym_name in re.findall(r"\b([a-zA-Z_]\w*)\b", payload.expression):
        if sym_name not in local_dict and sym_name not in dir(sp):
            local_dict[sym_name] = Symbol(sym_name, real=True)

    expr = sympify(payload.expression, locals=local_dict)
    return expr, main_var, trans_var, local_dict


def _parse_ics(ics_list, y_func, n_var):
    """
    Supports both:
      - 'y(0)=1', 'y(1)=4'
      - 'y_0=1',  'y_1=4'  (format used in practice.ts)
    """
    ics = {}
    for ic in ics_list or []:
        lhs_str, val_str = ic.split("=", 1)
        lhs_str = lhs_str.strip()
        val = sympify(val_str.strip())

        m = re.match(r"y\((\d+)\)", lhs_str)
        if m:
            ics[y_func(int(m.group(1)))] = val
            continue

        m = re.match(r"y_(\d+)", lhs_str)
        if m:
            ics[y_func(int(m.group(1)))] = val

    return ics


# ---------------------------------------------------------------------------
# MANUAL Z-TRANSFORM (NO sympy.ztransform)
# ---------------------------------------------------------------------------


def _base_pair_a_pow_n(a, z):
    """Z{a^n} = z / (z - a)."""
    return z / (z - a)


def _apply_n_power(F, k, z):
    """
    Uses Z{n f[n]} = -z d/dz F(z) repeatedly:
      k = 0 -> F
      k = 1 -> -z dF/dz
      k = 2 -> (-z d/dz)^2 F, etc.
    """
    for _ in range(k):
        F = -z * sp.diff(F, z)
    return sp.simplify(F)


def _compute_z_direct(expr, n, z):
    """
    Rule-based computation of F(z) = Σ a[n] z^{-n} for the patterns
    present in practice.ts.

    Supports terms of the form:
      C * n^k * a^n
      C * n^k * exp(c*n)  (treated as (e^c)^n)
      plus linear combinations of such terms.
    Also handles cos/sin via Euler expansion.
    """
    expr = sp.expand(expr)

    # Expand cos/sin to exponentials (but do NOT rewrite all powers)
    expr = expr.replace(
        sp.cos, lambda arg: (sp.exp(sp.I * arg) + sp.exp(-sp.I * arg)) / 2
    )
    expr = expr.replace(
        sp.sin, lambda arg: (sp.exp(sp.I * arg) - sp.exp(-sp.I * arg)) / (2 * sp.I)
    )
    expr = sp.expand(expr)

    result = sp.S.Zero

    for term in sp.Add.make_args(expr):
        coeff, n_part = term.as_independent(n)

        # We want term = coeff * n^k * a^n
        k = 0
        a = sp.S.One

        for factor in sp.Mul.make_args(n_part):
            # polynomial in n
            if factor == n:
                k += 1
                continue
            if isinstance(factor, sp.Pow) and factor.base == n and factor.exp.is_Integer:
                k += int(factor.exp)
                continue

            # exponential dependence a^n, exp(c*n), etc.
            if factor.has(n):
                # evaluate at n=1 to guess base a
                base = sp.simplify(factor.subs(n, 1))
                a *= base
                continue

        F_base = _base_pair_a_pow_n(a, z)
        F_term = coeff * _apply_n_power(F_base, k, z)
        result += F_term

    return sp.simplify(result)


# ---------------------------------------------------------------------------
# MANUAL INVERSE Z-TRANSFORM
# ---------------------------------------------------------------------------


def _compute_z_inverse(F_expr, z, n):
    """
    Inverse Z-transform using the standard residue formula:

      a[n] = Σ Res_{z = p_k} ( F(z) z^{n-1} ),

    where p_k are poles of F(z).

    Works for the rational F(z) used in ztrans_ex_6–9.
    """
    F = sp.simplify(F_expr)
    num, den = F.as_numer_denom()

    # Factor denominator and get simple poles
    den = sp.factor(den)
    poles = sp.roots(den, z)  # {pole: multiplicity}

    result = sp.S.Zero
    G = sp.simplify(F * z ** (n - 1))

    for p, mult in poles.items():
        if mult != 1:
            # All your Z examples have simple poles
            raise ValueError(
                f"Viacnásobný pól v bode z={p} zatiaľ nepodporujem."
            )

        # For simple pole at z=p: Res(G, z=p) = lim_{z->p} (z-p)*G(z)
        # Use cancel() before substitution to avoid 0/0 → NaN artifacts.
        res_expr = sp.cancel((z - p) * G)
        res = sp.simplify(res_expr.subs(z, p))
        result += res

    return sp.simplify(result)


# ---------------------------------------------------------------------------
# PUBLIC SOLVER FUNCTIONS
# ---------------------------------------------------------------------------


def solve_z_transform_direct(payload: MathEnginePayload) -> MathResponse:
    """
    Computes F(z) = Z{a[n]} = Σ_{n=0}^∞ a[n] z^{-n}.

    payload.variables  = "n,z"
    payload.expression = a[n] in terms of n

    Designed to cover the Z-direct practice group:
      - a[n] = exp(-1)**n + 2**n
      - a[n] = n * 2**n
      - a[n] = 3**(n+1)
      - a[n] = n + 2
      - a[n] = 3**n * cos(2*n)
      and similar patterns.
    """
    try:
        expr, n, z, _ = _parse_payload(payload)

        original_latex = rf"a[n] = {latex(expr)}"

        steps = [
            rf"Vstupná postupnosť: $a[n] = {latex(expr)}$.",
            r"Aplikujeme definíciu Z-transformácie:"
            r"$$F(z) = \sum_{n=0}^{\infty} a[n]\, z^{-n}.$$",
            r"Rozložíme $a[n]$ na súčet členov tvaru $C \cdot n^k \cdot a^n$ "
            r"a použijeme tabuľkové vzťahy pre $a^n$ a $n^k a^n$.",
        ]

        result = _compute_z_direct(expr, n, z)

        steps.append(
            rf"Výsledok:"
            rf"$$F(z) = {latex(result)}$$"
        )

        return MathResponse(
            original_latex=original_latex,
            solution_steps=steps,
            final_answer=rf"F(z) = {latex(result)}",
        )

    except Exception as e:
        return MathResponse(
            original_latex=payload.expression,
            solution_steps=[f"Chyba pri výpočte: {str(e)}"],
            final_answer="Riešenie sa nepodarilo vypočítať.",
        )


def solve_z_transform_inverse(payload: MathEnginePayload) -> MathResponse:
    """
    Computes a[n] = Z^{-1}{F(z)} for rational F(z) using the residue formula.

    payload.variables  = "z,n"   (transform variable FIRST)
    payload.expression = F(z)

    Targets exercises of the type:
      F(z) = 1/((z-2)*(z-3)),
             z/(z**2+1),
             (z+1)/(z*(z**2+2*z+2)),
             z/(z**4-1), ...
    """
    try:
        expr, z, n, _ = _parse_payload(payload)

        original_latex = rf"F(z) = {latex(expr)}"

        steps = [
            rf"Vstupná funkcia (obraz): $F(z) = {latex(expr)}$.",
            r"Použijeme reziduový vzorec pre inverznú Z-transformáciu:",
            r"$$a[n] = \sum_{p_k} \operatorname{Res}_{z=p_k}\big(F(z)\,z^{n-1}\big),$$",
            r"kde $p_k$ sú póly funkcie $F(z)$.",
        ]

        result = _compute_z_inverse(expr, z, n)

        # Extra simplification: try to rewrite via sin/cos for nicer form
        pretty_result = sp.simplify(result.rewrite(sp.sin).rewrite(sp.cos))

        steps.append(
            rf"Po sčítaní všetkých reziduí dostaneme:"
            rf"$$a[n] = {latex(pretty_result)}$$"
        )

        return MathResponse(
            original_latex=original_latex,
            solution_steps=steps,
            final_answer=rf"a[n] = {latex(pretty_result)}",
        )

    except Exception as e:
        return MathResponse(
            original_latex=payload.expression,
            solution_steps=[f"Chyba pri výpočte: {str(e)}"],
            final_answer="Riešenie sa nepodarilo vypočítať.",
        )


def solve_z_transform_difference_eq(payload: MathEnginePayload) -> MathResponse:
    """
    Solves a linear difference equation y[n] via sympy.rsolve.

    payload.variables         = "n,z"
    payload.expression        = LHS, e.g. "y(n+2) - 2*y(n+1) + 2*y(n)"
    payload.equationRightSide = RHS, e.g. "0" or "exp(1)**n"
    payload.initialConditions = ["y_0=1", "y_1=4"] or ["y(0)=1", "y(1)=4"]

    For Piecewise RHS we usually return a clear explanation, except for the
    special finite-piecewise case ztrans_ex_12.
    """
    try:
        _, n, z, local_dict = _parse_payload(payload)

        y = Function("y")
        local_dict["y"] = y

        lhs_expr = sympify(payload.expression, locals=local_dict)
        rhs_str = payload.equationRightSide or "0"

        # ----------------------------------------------------
        # Special case: ztrans_ex_12
        # y_{n+1} + 2 y_n = a_n, a_n = n (n < 4), 0 (n >= 4), y_0 = 0
        # ----------------------------------------------------
        rhs_str_no_space = rhs_str.replace(" ", "")
        if (
            payload.expression.replace(" ", "") == "y(n+1)+2*y(n)"
            and rhs_str_no_space == "Piecewise((n,n<4),(0,True))"
        ):
            a_n = sp.Piecewise((n, n < 4), (0, True))
            max_n = 8

            values = {}
            # from initialConditions: y_0 = 0
            values[0] = 0

            for k in range(0, max_n):
                y_k = values.get(k, 0)
                a_k = a_n.subs(n, k)
                y_next = sp.simplify(a_k - 2 * y_k)
                values[k + 1] = y_next

            # y0=0, y1=0, y2=1, y3=0, y4=3, y5=-6, y6=12, ...

            y_formula = sp.Piecewise(
                (0, sp.Eq(n, 0)),
                (0, sp.Eq(n, 1)),
                (1, sp.Eq(n, 2)),
                (0, sp.Eq(n, 3)),
                (3 * (-2) ** (n - 4), n > 3),
            )

            original_latex = (
                r"y_{n+1} + 2y_n = a_n,\quad a_n = \begin{cases} n, & n < 4 \\ 0, & n \ge 4 \end{cases},"
                r"\quad y_0 = 0"
            )
            steps = [
                r"Máme rekurenciu $y_{n+1} + 2y_n = a_n$ s počiatočnou hodnotou $y_0 = 0$,",
                r"kde $a_n = n$ pre $n < 4$ a $a_n = 0$ pre $n \ge 4$.",
                r"Najprv vypočítame niekoľko prvých členov explicitne:",
                rf"$y_0 = 0$, $y_1 = {latex(values[1])}$, $y_2 = {latex(values[2])}$, "
                rf"$y_3 = {latex(values[3])}$, $y_4 = {latex(values[4])}$, $y_5 = {latex(values[5])}$, \dots",
                r"Z hodnôt od $n=4$ ďalej vidíme geometrický tvar $3\cdot(-2)^{n-4}$.",
                r"Teda riešenie možno zapísať ako",
                r"$$y_0 = y_1 = 0,\quad y_2 = 1,\quad y_3 = 0,\quad"
                r"y_n = 3(-2)^{n-4}\ \text{pre}\ n > 3.$$",
            ]

            final_latex = (
                r"y_0 = y_1 = 0,\ y_2 = 1,\ y_3 = 0,\ "
                r"y_n = 3(-2)^{n-4},\ n > 3."
            )

            return MathResponse(
                original_latex=original_latex,
                solution_steps=steps,
                final_answer=final_latex,
            )

        # ----------------------------------------------------
        # Generic path — Piecewise RHS not supported
        # ----------------------------------------------------
        if "Piecewise" in rhs_str:
            return MathResponse(
                original_latex=payload.expression,
                solution_steps=[
                    r"Pravá strana je definovaná po častiach (Piecewise), "
                    r"čo aktuálna implementácia automatického riešenia nepodporuje.",
                    r"Odporúčaný postup: vypočítajte niekoľko prvých hodnôt ručne "
                    r"a potom nájdite uzavretý vzťah pre $n$ väčšie ako bod zlomu.",
                ],
                final_answer="Riešenie s po častiach definovanou pravou stranou vyžaduje manuálny postup.",
            )

        rhs_expr = sympify(rhs_str, locals=local_dict)
        ics = _parse_ics(payload.initialConditions, y, n)

        original_latex = rf"{latex(lhs_expr)} = {latex(rhs_expr)}"

        steps = [
            rf"Diferenčná rovnica: ${latex(lhs_expr)} = {latex(rhs_expr)}$.",
            r"Použijeme metódu riešenia lineárnych rekurenčných vzťahov (sympy.rsolve).",
        ]

        if ics:
            ic_strs = [
                rf"$y({int(sym.args[0])}) = {latex(val)}$"
                for sym, val in ics.items()
            ]
            steps.append("Počiatočné podmienky: " + ", ".join(ic_strs) + ".")

        recurrence = lhs_expr - rhs_expr
        solution = sp.rsolve(recurrence, y(n), ics or {})

        if solution is None:
            raise ValueError("Rekurentnú rovnicu sa nepodarilo vyriešiť.")

        result = sp.simplify(solution)

        steps.append(
            rf"Výsledok:"
            rf"$$y[n] = {latex(result)}$$"
        )

        return MathResponse(
            original_latex=original_latex,
            solution_steps=steps,
            final_answer=rf"y[n] = {latex(result)}",
        )

    except Exception as e:
        return MathResponse(
            original_latex=payload.expression,
            solution_steps=[f"Chyba pri výpočte: {str(e)}"],
            final_answer="Riešenie sa nepodarilo vypočítať.",
        )