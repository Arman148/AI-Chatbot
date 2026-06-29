from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models import MathEnginePayload, MathResponse
from app.solvers.router import route_problem

app = FastAPI(title="The Learning Assistant - Math Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "Math Engine is running and ready!"}

@app.post("/solve", response_model=MathResponse)
def solve_math(payload: MathEnginePayload):
    return route_problem(payload)