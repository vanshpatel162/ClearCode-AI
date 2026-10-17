
import logging
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import ValidationError

from schemas import CodeRequest, AnalysisResponse
from ai_service import explain_python_error

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

BASE_DIR = Path(__file__).resolve().parent
STATIC_DIR = BASE_DIR / "static"

app = FastAPI(title="ClearCode AI")

app.mount(
    "/static",
    StaticFiles(directory=STATIC_DIR),
    name="static"
)


@app.get("/")
def home():
    return FileResponse(STATIC_DIR / "index.html")


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/api/analyze-code")
def analyze_code(request: CodeRequest):
    try:
        result = explain_python_error(code=request.code)

        # Reject malformed or incomplete AI responses.
        analysis = AnalysisResponse.model_validate(result)

        return {
            "success": True,
            "analysis": analysis.model_dump()
        }

    except ValidationError:
        logger.exception("AI returned an invalid analysis response")
        raise HTTPException(
            status_code=502,
            detail="The AI returned an invalid response. Please try again."
        )

    except Exception:
        logger.exception("Code analysis failed")
        raise HTTPException(
            status_code=502,
            detail="AI service is temporarily unavailable. Please try again."
        )
