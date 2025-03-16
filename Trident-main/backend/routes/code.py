# routes/code.py
from fastapi import APIRouter, HTTPException
import subprocess, os
import schemas

router = APIRouter()

@router.post("/run")
def run_code(payload: schemas.CodeExecutionRequest):
    code = payload.code
    user_input = payload.userInput or ""
    try:
        # Write the code to a temporary file
        with open("temp_script.py", "w") as f:
            f.write(code)
        # Execute the script
        process = subprocess.Popen(
            ["python", "temp_script.py"],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        # Convert comma-separated user input into newline-separated values
        output, error = process.communicate(input=user_input.replace(",", "\n"))
        os.remove("temp_script.py")
        return {"output": output, "error": error}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
