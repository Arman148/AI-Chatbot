import sympy as sp
from app.solvers.fourier import solve_fourier_direct, solve_fourier_convolution
from app.models import MathEnginePayload

payload_15 = MathEnginePayload(
    problemType="fourier_direct",
    expression="t / (t**2 + r**2)",
    variables="t,p",
    assumptions=["r > 0"],
    equationRightSide="",
)

payload_17 = MathEnginePayload(
    problemType="fourier_convolution",
    expression="exp(-a*t**2)",
    variables="t,p",
    equationRightSide="exp(-b*t**2)",
    assumptions=["a > b", "b > 0"],
)

print("=== fourier_ex_15 ===")
resp_15 = solve_fourier_direct(payload_15)
print("original:", resp_15.original_latex)
print("final:", resp_15.final_answer)
print("steps:", *resp_15.solution_steps, sep="\n")

print("\n=== fourier_ex_17 ===")
resp_17 = solve_fourier_convolution(payload_17)
print("original:", resp_17.original_latex)
print("final:", resp_17.final_answer)
print("steps:", *resp_17.solution_steps, sep="\n")