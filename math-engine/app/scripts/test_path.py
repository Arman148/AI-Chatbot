from pathlib import Path

# From app/scripts -> .. -> app, .. -> math-engine, .. -> ai-chatbot
practice_path = (
    Path("..")
    / ".."
    / ".."
    / "chat-frontend"
    / "src"
    / "data"
    / "practice.ts"
)

print("Absolute path:", practice_path.resolve())

if practice_path.exists():
    print("File exists, first 3 lines:")
    with practice_path.open(encoding="utf-8") as f:
        for i in range(3):
            line = f.readline()
            if not line:
                break
            print(repr(line))
else:
    print("File does NOT exist at this path.")