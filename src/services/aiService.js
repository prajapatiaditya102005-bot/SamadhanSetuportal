// AI Problem Management & Triage Engine for Samadhan Setu
import { INSTITUTIONS } from '../data/institutionsData';
import { INDUSTRY_PARTNERS } from '../data/industryPartnersData';

const KEYWORD_MAP = {
  Water: ["water", "drinking", "fluoride", "arsenic", "handpump", "well", "borewell", "tank", "contamination", "pipeline", "supply", "jal", "dry", "purification"],
  Healthcare: ["health", "hospital", "phc", "doctor", "ambulance", "medicine", "snakebite", "malnutrition", "maternal", "fever", "illness", "telemedicine", "clinic", "swasthya"],
  Agriculture: ["farm", "crop", "kisan", "farmer", "irrigation", "drought", "paddy", "seed", "pest", "millet", "lac", "soil", "harvest", "cold storage", "fertilizer"],
  Education: ["school", "teacher", "student", "classroom", "books", "bus", "transport", "dropout", "girls", "college", "computer", "digital", "shiksha"],
  Environment: ["pollution", "dust", "mine", "coal", "air", "smoke", "fly ash", "forest", "wildlife", "elephant", "runoff", "slurry", "overburden", "tree"],
  Energy: ["electricity", "power", "solar", "grid", "outage", "blackout", "transformer", "wire", "lighting", "bijli", "voltage", "battery"],
  Sanitation: ["garbage", "waste", "drain", "sewage", "plastic", "toilet", "smell", "dumping", "swachh", "cleanliness", "mosquito"],
  "Rural Livelihood": ["artisan", "handicraft", "lac", "silk", "tussar", "weaver", "shg", "employment", "income", "haat", "bamboo", "forest produce", "ntfp"],
  "Urban Infrastructure": ["road", "pothole", "street light", "bridge", "culvert", "traffic", "building", "drainage", "waterlogging"],
  Accessibility: ["disabled", "divyang", "wheelchair", "ramp", "elderly", "blind", "hearing", "assistive", "braille"],
  "Public Services": ["pds", "ration", "aadhaar", "certificate", "grievance", "bribe", "office", "pension", "portal", "kiosk"]
};

// Calculate priority score (0 - 100)
export function calculatePriority(problemData) {
  let score = 50;
  const text = ((problemData.title || '') + ' ' + (problemData.description || '')).toLowerCase();
  
  // Urgency factor
  if (problemData.urgency === 'High') score += 20;
  else if (problemData.urgency === 'Medium') score += 10;
  
  // Population factor
  const pop = parseInt(problemData.affectedPopulation) || 0;
  if (pop > 5000) score += 18;
  else if (pop > 1000) score += 12;
  else if (pop > 300) score += 6;
  
  // Critical hazard keywords
  const criticalWords = ["fluoride", "arsenic", "death", "casualty", "epidemic", "poison", "toxic", "snakebite", "flood", "fire", "emergency", "collapse", "infant"];
  criticalWords.forEach(w => {
    if (text.includes(w)) score += 6;
  });

  score = Math.min(Math.max(score, 25), 98);
  
  let priority = "Medium";
  let rationale = "Standard community issue requiring systematic academic-administrative intervention.";
  
  if (score >= 82) {
    priority = "High";
    rationale = `Critical risk profile with substantial affected population (${pop > 0 ? pop.toLocaleString() + ' citizens' : 'high locality impact'}) and acute safety/health considerations.`;
  } else if (score < 55) {
    priority = "Low";
    rationale = "Localized non-emergency issue suitable for scheduled student innovation team cycles.";
  }
  
  return { score, priority, rationale };
}

// Predict category based on text
export function predictCategory(title = '', description = '') {
  const combined = (title + ' ' + description).toLowerCase();
  let bestCategory = "Other";
  let maxMatches = 0;
  
  Object.keys(KEYWORD_MAP).forEach(cat => {
    const keywords = KEYWORD_MAP[cat];
    let matches = 0;
    keywords.forEach(kw => {
      if (combined.includes(kw)) matches++;
    });
    if (matches > maxMatches) {
      maxMatches = matches;
      bestCategory = cat;
    }
  });
  
  const confidence = Math.min(85 + (maxMatches * 3.5), 98.5);
  return { category: bestCategory, confidence: parseFloat(confidence.toFixed(1)) };
}

// Extract keywords
export function extractKeywords(title = '', description = '') {
  const text = (title + ' ' + description).toLowerCase();
  const words = text.split(/[\s,.\-_/()]+/);
  const stopWords = new Set(["the", "and", "in", "to", "of", "a", "for", "is", "on", "that", "by", "this", "with", "i", "you", "it", "not", "or", "be", "are", "from", "at", "as", "your", "all", "have", "new", "more", "an", "was", "we", "will", "my", "village", "area", "problem", "issue", "due", "over", "under"]);
  
  const counts = {};
  words.forEach(w => {
    const clean = w.replace(/[^a-z0-9]/g, '');
    if (clean.length > 3 && !stopWords.has(clean)) {
      counts[clean] = (counts[clean] || 0) + 1;
    }
  });
  
  return Object.keys(counts)
    .sort((a, b) => counts[b] - counts[a])
    .slice(0, 6);
}

// Check for duplicates or similar challenges
export function checkDuplicates(newTitle, newDesc, district, existingChallenges = []) {
  if (!existingChallenges || existingChallenges.length === 0) return { count: 0, matches: [] };
  
  const targetText = ((newTitle || '') + ' ' + (newDesc || '')).toLowerCase();
  const targetWords = new Set(targetText.split(/[\s,.\-_/()]+/).filter(w => w.length > 3));
  
  const matches = [];
  
  existingChallenges.forEach(ch => {
    const chText = ((ch.title || '') + ' ' + (ch.description || '')).toLowerCase();
    const chWords = chText.split(/[\s,.\-_/()]+/).filter(w => w.length > 3);
    
    let commonCount = 0;
    chWords.forEach(w => {
      if (targetWords.has(w)) commonCount++;
    });
    
    // Similarity ratio
    const similarity = (commonCount * 2) / (targetWords.size + chWords.length);
    const sameDistrict = ch.district && district && ch.district.toLowerCase() === district.toLowerCase();
    
    if (similarity > 0.18 || (sameDistrict && similarity > 0.12)) {
      matches.push({
        challengeId: ch.id,
        title: ch.title,
        district: ch.district,
        similarityScore: Math.min(Math.round(similarity * 100) + (sameDistrict ? 15 : 0), 96),
        category: ch.category,
        supportingCount: ch.supportingCitizensCount || 0
      });
    }
  });
  
  matches.sort((a, b) => b.similarityScore - a.similarityScore);
  
  return {
    count: matches.length,
    matches: matches.slice(0, 3)
  };
}

// Recommend HEIs and Industry Partners
export function recommendPartners(category, keywords = [], district = '') {
  const combinedKeywords = [...keywords, category.toLowerCase()];
  
  // Score institutions
  const matchedInstitutions = INSTITUTIONS.map(inst => {
    let score = 65;
    
    // Check match keywords
    inst.matchKeywords.forEach(kw => {
      combinedKeywords.forEach(ck => {
        if (kw.includes(ck) || ck.includes(kw)) score += 8;
      });
    });
    
    // Check primary expertise
    inst.primaryExpertise.forEach(exp => {
      combinedKeywords.forEach(ck => {
        if (exp.toLowerCase().includes(ck)) score += 10;
      });
    });

    score = Math.min(Math.max(score, 70), 98);
    
    return {
      institutionId: inst.id,
      institutionName: inst.name,
      shortName: inst.shortName,
      location: inst.location,
      matchScore: score,
      primaryExpertise: inst.primaryExpertise.slice(0, 3),
      reason: `High faculty capability in ${inst.primaryExpertise[0]} with verified laboratory infrastructure.`
    };
  }).sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);

  // Score industry partners
  const matchedIndustry = INDUSTRY_PARTNERS.map(ind => {
    let score = 60;
    ind.focusDomains.forEach(dom => {
      combinedKeywords.forEach(ck => {
        if (dom.toLowerCase().includes(ck)) score += 12;
      });
    });
    score = Math.min(Math.max(score, 68), 96);
    return {
      partnerId: ind.id,
      partnerName: ind.name,
      category: ind.category,
      matchScore: score,
      supportOffered: ind.supportTypesOffered,
      domain: ind.focusDomains[0] || "Community Infrastructure"
    };
  }).sort((a, b) => b.matchScore - a.matchScore).slice(0, 2);

  // Recommended expertise list
  const expertiseMap = {
    Water: ["Water Resources Engineering", "Environmental Chemistry & Adsorption", "Community Water Infrastructure", "Geo-Hydrology"],
    Healthcare: ["Rural Tele-Medicine & AI Triage", "Solar Cold Chain Logistics", "Public Health Informatics", "Vector Biology"],
    Agriculture: ["Solar Micro-Irrigation & Drip Automation", "Hard-Rock Watershed Management", "Agro-Forestry & Post Harvest Tech"],
    Education: ["Rural Transport Systems", "Low-Cost Modular Civil Infra", "Digital Educational Platforms"],
    Environment: ["Mining Environmental Remediation", "Air Quality Sensor IoT", "Soil Stabilization & Phytoremediation"],
    Energy: ["Off-Grid Solar Microgrids", "Power Electronics & Inverters", "Battery Storage Management"],
    Sanitation: ["Solid Waste Mechanical Shredders", "Municipal Drainage Automation", "Plastic Upcycling Chemistry"],
    "Rural Livelihood": ["Agro-Forestry & NTFP Processing", "Mechanical Automation for Small Scale Craft", "Supply Chain Optimization"],
    "Urban Infrastructure": ["Pothole Telemetry & Road Design", "Modular Drainage Grates", "Smart LED Street Grid"],
    Accessibility: ["Assistive IoT Hardware", "Ergonomic Mechanical Wheelchairs", "Voice AI in Regional Dialects"],
    "Public Services": ["Decentralized Citizen Kiosk Design", "Transparent Queue Automation", "Public Policy Informatics"],
    Other: ["Multidisciplinary Engineering", "Community Technology Design", "Social Impact Assessment"]
  };

  return {
    recommendedInstitutions: matchedInstitutions,
    recommendedIndustryPartners: matchedIndustry,
    recommendedExpertise: expertiseMap[category] || expertiseMap.Other
  };
}

// Complete AI Triage Pipeline
export function runAITriage(problemData, existingChallenges = []) {
  const { category, confidence } = predictCategory(problemData.title, problemData.description);
  const assignedCategory = problemData.category && problemData.category !== 'Other' ? problemData.category : category;
  
  const { score: priorityScore, priority, rationale: priorityRationale } = calculatePriority({
    ...problemData,
    category: assignedCategory
  });
  
  const detectedKeywords = extractKeywords(problemData.title, problemData.description);
  const duplicates = checkDuplicates(problemData.title, problemData.description, problemData.district, existingChallenges);
  const { recommendedInstitutions, recommendedIndustryPartners, recommendedExpertise } = recommendPartners(assignedCategory, detectedKeywords, problemData.district);
  
  return {
    category: assignedCategory,
    confidence,
    priority,
    priorityScore,
    priorityRationale,
    detectedKeywords,
    similarChallengesCount: duplicates.count,
    similarChallengeIds: duplicates.matches.map(m => m.challengeId),
    similarMatches: duplicates.matches,
    recommendedExpertise,
    recommendedInstitutions,
    recommendedIndustryPartners
  };
}
