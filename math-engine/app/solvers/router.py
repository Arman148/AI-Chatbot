# math-engine/app/solvers/router.py

from fastapi import HTTPException
from app.models import MathEnginePayload, MathResponse
from app.solvers.fourier import (
    solve_fourier_direct,
    solve_fourier_inverse,
    solve_fourier_convolution,
    solve_fourier_ode,
)
from app.solvers.laplace import (
    solve_laplace_direct,
    solve_laplace_periodic,
    solve_laplace_convolution,
    solve_laplace_inverse,
    solve_laplace_ode,
)
from app.solvers.z_transform import (
    solve_z_transform_direct,
    solve_z_transform_inverse,
    solve_z_transform_difference_eq,
)


def route_problem(payload: MathEnginePayload) -> MathResponse:

    # ── Fourier Transform ──────────────────────────────────────────────────
    if payload.problemType == "fourier_direct":
        return solve_fourier_direct(payload)

    elif payload.problemType == "fourier_inverse":
        return solve_fourier_inverse(payload)

    elif payload.problemType == "fourier_convolution":
        return solve_fourier_convolution(payload)

    elif payload.problemType == "fourier_ode":
        return solve_fourier_ode(payload)

    # ── Laplace Transform ──────────────────────────────────────────────────
    elif payload.problemType == "laplace_direct":
        return solve_laplace_direct(payload)

    elif payload.problemType == "laplace_periodic":
        return solve_laplace_periodic(payload)

    elif payload.problemType == "laplace_convolution":
        return solve_laplace_convolution(payload)

    elif payload.problemType == "laplace_inverse":
        return solve_laplace_inverse(payload)

    elif payload.problemType == "laplace_ode":
        return solve_laplace_ode(payload)

    # ── Z-Transform ────────────────────────────────────────────────────────
    elif payload.problemType == "z_transform_direct":
        return solve_z_transform_direct(payload)

    elif payload.problemType == "z_transform_inverse":
        return solve_z_transform_inverse(payload)

    elif payload.problemType == "z_transform_difference_eq":
        return solve_z_transform_difference_eq(payload)

    # ── Unsupported ────────────────────────────────────────────────────────
    else:
        raise HTTPException(
            status_code=400,
            detail=f"Problem type '{payload.problemType}' is not yet supported.",
        )