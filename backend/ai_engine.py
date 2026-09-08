"""
Samadhan Setu - AI/ML Problem Triage & Institutional Matching Engine (Python / NLP)
"""
import re
from typing import List, Dict, Any

CATEGORY_KEYWORDS = {
    "Water": ["water", "drinking", "fluoride", "arsenic", "handpump", "well", "borewell", "contamination", "pipeline", "jal"],
    "Healthcare": ["health", "hospital", "phc", "doctor", "ambulance", "medicine", "snakebite", "malnutrition", "telemedicine"],
    "Agriculture": ["farm", "crop", "kisan", "irrigation", "drought", "paddy", "pest", "lac", "soil", "harvest", "cold storage"],
    "Education": ["school", "teacher", "student", "classroom", "bus", "transport", "dropout", "girls", "college", "computer"],
    "Environment": ["pollution", "dust", "mine", "coal", "air", "smoke", "fly ash", "wildlife", "elephant", "overburden"],
    "Energy": ["electricity", "solar", "grid", "outage", "transformer", "lighting", "voltage", "battery", "microgrid"],
    "Sanitation": ["garbage", "waste", "drain", "plastic", "toilet", "dumping", "swachh", "cleanliness"],
    "Rural Livelihood": ["artisan", "handicraft", "lac", "tussar", "silk", "weaver", "shg", "income", "bamboo", "forest produce"],
    "Urban Infrastructure": ["road", "pothole", "street light", "bridge", "culvert", "drainage", "waterlogging"],
    "Accessibility": ["disabled", "divyang", "wheelchair", "ramp", "elderly", "assistive", "braille"],
    "Public Services": ["pds", "ration", "aadhaar", "certificate", "grievance", "pension", "kiosk"]
}

INSTITUTION_PROFILES = [
    {
        "id": "hei_bit_mesra",
        "name": "Birla Institute of Technology (BIT) Mesra",
        "expertise": ["Water Resources Engineering", "Environmental Engineering", "Remote Sensing & GIS", "Computer Science & AI"],
        "keywords": ["water", "fluoride", "gis", "mapping", "remote sensing", "iot", "solar", "drone"]
    },
    {
        "id": "hei_iit_ism",
        "name": "Indian Institute of Technology (IIT ISM) Dhanbad",
        "expertise": ["Mining & Environmental Engineering", "Groundwater Hydrology", "Clean Energy", "Geotechnical"],
        "keywords": ["mining", "soil", "dust", "groundwater", "coal", "pollution", "energy", "hydrology"]
    },
    {
        "id": "hei_bau_ranchi",
        "name": "Birsa Agricultural University (BAU) Ranchi",
        "expertise": ["Agro-Forestry & NTFP", "Lac & Tussar Cultivation", "Rainfed Agriculture", "Indigenous Crops"],
        "keywords": ["agriculture", "crop", "irrigation", "lac", "tussar", "silk", "tribal livelihood", "soil", "millet"]
    },
    {
        "id": "hei_nit_jsr",
        "name": "National Institute of Technology (NIT) Jamshedpur",
        "expertise": ["Mechanical Systems", "Low-cost Automation", "Smart Infrastructure", "Civil & Transport"],
        "keywords": ["cold storage", "transportation", "roads", "bridges", "machinery", "automation", "assistive"]
    },
    {
        "id": "hei_aiims_deoghar",
        "name": "AIIMS Deoghar",
        "expertise": ["Community Medicine & Tele-Health", "Maternal Nutrition", "Tropical Disease Control"],
        "keywords": ["health", "hospital", "telemedicine", "phc", "malnutrition", "vaccination", "ambulance"]
    }
]

def predict_category(text: str) -> Dict[str, Any]:
    text_lower = text.lower()
    scores = {}
    for cat, keywords in CATEGORY_KEYWORDS.items():
        score = sum(1 for kw in keywords if kw in text_lower)
        scores[cat] = score
    
    best_cat = max(scores, key=scores.get)
    max_score = scores[best_cat]
    confidence = min(82.0 + (max_score * 4.0), 98.5) if max_score > 0 else 75.0
    return {"category": best_cat if max_score > 0 else "Other", "confidence": round(confidence, 1)}

def calculate_priority_score(title: str, description: str, urgency: str, affected_pop: int) -> Dict[str, Any]:
    score = 50
    if urgency.lower() == "high":
        score += 20
    elif urgency.lower() == "medium":
        score += 10
    
    if affected_pop > 5000:
        score += 18
    elif affected_pop > 1000:
        score += 12
    elif affected_pop > 300:
        score += 6
        
    combined = (title + " " + description).lower()
    critical_words = ["fluoride", "arsenic", "death", "poison", "toxic", "snakebite", "flood", "emergency"]
    for w in critical_words:
        if w in combined:
            score += 6

    final_score = min(max(score, 25), 98)
    priority = "High" if final_score >= 82 else ("Medium" if final_score >= 55 else "Low")
    rationale = f"Evaluated based on {affected_pop} affected citizens, {urgency} urgency flag, and public hazard keywords."
    return {"score": final_score, "priority": priority, "rationale": rationale}

def match_institutions(category: str, text: str) -> List[Dict[str, Any]]:
    text_lower = (category + " " + text).lower()
    results = []
    for inst in INSTITUTION_PROFILES:
        score = 65
        for kw in inst["keywords"]:
            if kw in text_lower:
                score += 8
        score = min(max(score, 70), 98)
        results.append({
            "institution_id": inst["id"],
            "institution_name": inst["name"],
            "match_score": score,
            "primary_expertise": inst["expertise"]
        })
    results.sort(key=lambda x: x["match_score"], reverse=True)
    return results[:3]

def run_python_triage(title: str, description: str, district: str, urgency: str, affected_pop: int) -> Dict[str, Any]:
    combined_text = f"{title} {description}"
    cat_res = predict_category(combined_text)
    prio_res = calculate_priority_score(title, description, urgency, affected_pop)
    hei_matches = match_institutions(cat_res["category"], combined_text)
    
    # Extract simple keywords
    words = re.findall(r'\b[a-zA-Z]{4,}\b', combined_text.lower())
    stop = {"with", "that", "this", "from", "have", "area", "village", "water", "also"}
    filtered_words = [w for w in words if w not in stop]
    top_keywords = list(dict.fromkeys(filtered_words))[:6]

    return {
        "category": cat_res["category"],
        "confidence": cat_res["confidence"],
        "priority": prio_res["priority"],
        "priority_score": prio_res["score"],
        "priority_rationale": prio_res["rationale"],
        "detected_keywords": top_keywords,
        "recommended_institutions": hei_matches
    }
