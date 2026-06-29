from pydantic import BaseModel
from typing import List, Optional

class MathEnginePayload(BaseModel):
    problemType: str
    expression: str
    variables: str
    assumptions: Optional[List[str]] = None
    equationRightSide: Optional[str] = None
    initialConditions: Optional[List[str]] = None
    period: Optional[str] = None
    systemEquations: Optional[List[str]] = None

class MathResponse(BaseModel):
    original_latex: str
    solution_steps: List[str]
    final_answer: str
