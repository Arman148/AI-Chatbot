import re
import json
import csv
import requests
from pathlib import Path

ENGINE_URL = "http://localhost:8000/solve"
PRACTICE_PATH = (
    Path("..")
    / ".."
    / ".."
    / "chat-frontend"
    / "src"
    / "data"
    / "practice.ts"
)
OUTPUT_CSV = Path("engine_results.csv")


def extract_exercises(ts_text: str):
    """
    Find all exercises that have a mathEnginePayload block.

    Returns a list of (exercise_id, payload_dict).
    """
    pattern = re.compile(
        r"{\s*id:\s*\"(?P<id>[^\"]+)\".*?mathEnginePayload:\s*{(?P<payload>.*?)}\s*},",
        re.DOTALL,
    )
    exercises = []
    for m in pattern.finditer(ts_text):
        ex_id = m.group("id")
        payload_block = m.group("payload")
        payload = parse_payload_block(payload_block)
        if payload is not None:
            exercises.append((ex_id, payload))
    return exercises


def parse_payload_block(block: str):
    """
    Convert a TS-style object literal (only the inner mathEnginePayload) into a dict.
    Handles only the fields we care about and simple string arrays.
    """
    text = block

    # Add quotes around keys: problemType: -> "problemType":
    text = re.sub(r"(\w+)\s*:", r'"\1":', text)

    # Wrap in braces and try json.loads
    json_text = "{" + text + "}"
    # Remove trailing commas before } or ]
    json_text = re.sub(r",\s*([}\]])", r"\1", json_text)

    try:
        data = json.loads(json_text)
    except Exception as e:
        print("Failed to parse payload block:", e)
        print(json_text)
        return None

    # Ensure all expected keys are present (fill missing with None)
    for key in [
        "problemType",
        "expression",
        "variables",
        "assumptions",
        "equationRightSide",
        "initialConditions",
        "period",
        "systemEquations",
    ]:
        data.setdefault(key, None)

    return data


def call_engine(payload):
    resp = requests.post(ENGINE_URL, json=payload, timeout=15)
    try:
        data = resp.json()
    except Exception:
        data = {"raw_text": resp.text}
    return resp.status_code, data


def main():
    text = PRACTICE_PATH.read_text(encoding="utf-8")
    exercises = extract_exercises(text)
    print(f"Found {len(exercises)} exercises with mathEnginePayload")

    with OUTPUT_CSV.open("w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f, delimiter=";")
        writer.writerow(
            [
                "id",
                "problemType",
                "expression",
                "status",
                "error",
                "original_latex",
                "final_answer",
            ]
        )

        for ex_id, payload in exercises:
            engine_payload = {
                "problemType": payload["problemType"],
                "expression": payload["expression"] or "",
                "variables": payload["variables"] or "",
                "assumptions": payload.get("assumptions") or [],
                "equationRightSide": payload.get("equationRightSide"),
                "initialConditions": payload.get("initialConditions"),
                "period": payload.get("period"),
                "systemEquations": payload.get("systemEquations"),
            }

            status, data = call_engine(engine_payload)

            if status != 200:
                error_msg = data.get("detail", data.get("raw_text", "unknown error"))
                original = ""
                final = ""
            else:
                error_msg = ""
                original = data.get("original_latex", "")
                final = data.get("final_answer", "")

            writer.writerow(
                [
                    ex_id,
                    payload["problemType"],
                    payload["expression"],
                    status,
                    error_msg,
                    original,
                    final,
                ]
            )
            print(f"{ex_id}: status {status}")

    print(f"Results saved to {OUTPUT_CSV}")


if __name__ == "__main__":
    main()