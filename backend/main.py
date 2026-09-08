"""
Samadhan Setu - FastAPI Application Backend
RESTful API for Jharkhand Societal Innovation Platform
"""
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import date
from ai_engine import run_python_triage

app = FastAPI(
    title="Samadhan Setu API",
    description="Backend API for Jharkhand Crowdsourced Societal Innovation & University-Industry Collaboration Platform",
    version="1.0.0"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Models
class ProblemSubmission(BaseModel):
    title: str = Field(..., example="Fluoride in Jhinkpani deep tube-wells")
    description: str = Field(..., example="Groundwater contains high fluoride causing skeletal deformities in schoolchildren.")
    district: str = Field(default="West Singhbhum (Chaibasa)")
    block: Optional[str] = "Jhinkpani"
    village: Optional[str] = "Dokata"
    category: Optional[str] = "Water"
    urgency: Optional[str] = "High"
    affected_population: Optional[int] = 500
    contact_number: Optional[str] = None
    email: Optional[str] = None

class EndorsementRequest(BaseModel):
    user_name: str
    village: Optional[str] = None
    note: Optional[str] = None

class ValidationRequest(BaseModel):
    action: str = Field(..., example="validate") # "validate" or "reject"
    officer_name: str
    department: str
    priority: Optional[str] = "High"
    comments: Optional[str] = None

class SupportPledgeRequest(BaseModel):
    partner_id: str
    partner_name: str
    support_types: List[str] = ["Funding", "Testing"]
    grant_amount: str = "₹4,00,000"
    mentor_name: Optional[str] = None

# In-Memory Seed Storage for quick API demonstration
CHALLENGES_STORE: List[Dict[str, Any]] = [
    {
        "id": "CH-JH-2026-001",
        "title": "High Fluoride Contamination & Deep Tube-Well Failure in Jhinkpani Villages",
        "description": "Over 6 villages in Jhinkpani block of West Singhbhum face severe dental and skeletal fluorosis due to natural fluoride leaching in groundwater exceeding 4.8 mg/L.",
        "category": "Water",
        "district": "West Singhbhum (Chaibasa)",
        "block": "Jhinkpani",
        "village": "Dokata & Asura Tola",
        "urgency": "High",
        "affected_population": 1450,
        "supporting_citizens_count": 384,
        "status": "In Progress",
        "submission_date": "2026-02-14",
        "assigned_institution": "Birla Institute of Technology (BIT) Mesra",
        "industry_partner": "Tata Steel CSR & Foundation"
    },
    {
        "id": "CH-JH-2026-002",
        "title": "Post-Harvest Lac Storage Spoilage & Processing Crisis for Tribal Farmers",
        "description": "Smallholder tribal farmers in Murhu and Torpa blocks of Khunti produce premium raw sticklac, suffering 35% moisture fungal spoilage without localized de-waxing.",
        "category": "Rural Livelihood",
        "district": "Khunti",
        "block": "Murhu",
        "village": "Burju & Janumpiri",
        "urgency": "Medium",
        "affected_population": 2200,
        "supporting_citizens_count": 512,
        "status": "Solution Proposed",
        "submission_date": "2026-01-20",
        "assigned_institution": "Birsa Agricultural University (BAU) Ranchi",
        "industry_partner": "KrishiJharkhand AgriTech Solutions"
    }
]

@app.get("/api/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "platform": "Samadhan Setu (Jharkhand)",
        "version": "1.0.0",
        "api_docs": "/docs"
    }

@app.get("/api/challenges", tags=["Challenges"])
def get_all_challenges(category: Optional[str] = None, district: Optional[str] = None):
    results = CHALLENGES_STORE
    if category and category != "all":
        results = [c for c in results if c["category"].lower() == category.lower()]
    if district and district != "all":
        results = [c for c in results if district.lower() in c["district"].lower()]
    return {"total": len(results), "challenges": results}

@app.post("/api/challenges", status_code=status.HTTP_201_CREATED, tags=["Challenges"])
def create_challenge(payload: ProblemSubmission):
    triage = run_python_triage(
        title=payload.title,
        description=payload.description,
        district=payload.district,
        urgency=payload.urgency or "Medium",
        affected_pop=payload.affected_population or 500
    )
    
    new_id = f"CH-JH-2026-{len(CHALLENGES_STORE) + 1:03d}"
    record = {
        "id": new_id,
        "title": payload.title,
        "description": payload.description,
        "category": triage["category"],
        "district": payload.district,
        "block": payload.block,
        "village": payload.village,
        "urgency": triage["priority"],
        "affected_population": payload.affected_population,
        "supporting_citizens_count": 1,
        "status": "Submitted",
        "submission_date": str(date.today()),
        "ai_triage": triage
    }
    CHALLENGES_STORE.insert(0, record)
    return record

@app.post("/api/challenges/{challenge_id}/endorse", tags=["Endorsements"])
def endorse_challenge(challenge_id: str, payload: EndorsementRequest):
    for ch in CHALLENGES_STORE:
        if ch["id"] == challenge_id:
            ch["supporting_citizens_count"] += 1
            return {
                "message": f"Successfully recorded 'I AM ALSO AFFECTED' endorsement by {payload.user_name}.",
                "challenge_id": challenge_id,
                "total_supporting_citizens": ch["supporting_citizens_count"]
            }
    raise HTTPException(status_code=404, detail="Challenge ID not found")

@app.post("/api/challenges/{challenge_id}/validate", tags=["Government"])
def validate_challenge_endpoint(challenge_id: str, payload: ValidationRequest):
    for ch in CHALLENGES_STORE:
        if ch["id"] == challenge_id:
            if payload.action == "validate":
                ch["status"] = "Validated"
                ch["assigned_department"] = payload.department
                ch["urgency"] = payload.priority or ch["urgency"]
            else:
                ch["status"] = "Rejected"
            return {"status": "success", "challenge": ch}
    raise HTTPException(status_code=404, detail="Challenge ID not found")

@app.post("/api/challenges/{challenge_id}/support", tags=["Industry & CSR"])
def pledge_support_endpoint(challenge_id: str, payload: SupportPledgeRequest):
    for ch in CHALLENGES_STORE:
        if ch["id"] == challenge_id:
            ch["industry_partner"] = payload.partner_name
            ch["grant_amount"] = payload.grant_amount
            ch["status"] = "Pilot Testing"
            return {"status": "success", "message": f"Support offer registered by {payload.partner_name}", "challenge": ch}
    raise HTTPException(status_code=404, detail="Challenge ID not found")

@app.post("/api/ai/triage", tags=["AI Engine"])
def test_ai_triage(payload: ProblemSubmission):
    return run_python_triage(
        title=payload.title,
        description=payload.description,
        district=payload.district,
        urgency=payload.urgency or "Medium",
        affected_pop=payload.affected_population or 500
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
