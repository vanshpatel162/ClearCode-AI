from pydantic import BaseModel, Field


class CodeRequest(BaseModel):
    code: str = Field(
        min_length=1,
        max_length=10000,
        description="Python code to analyze"
    )

class AnalysisResponse(BaseModel):
    error_meaning: str = Field(min_length=1)
    likely_cause: str = Field(min_length=1)
    fix_steps: list[str] = Field(min_length=1)
    corrected_code: str
    prevention_tip: str = Field(min_length=1)