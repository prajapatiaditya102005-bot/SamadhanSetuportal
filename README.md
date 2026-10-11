# Samadhan Setu (समाधान सेतु)

**A digital platform to crowdsource societal challenges and facilitate collaborative problem-solving through universities and industry partnerships in Jharkhand.**

---

## 🌟 Overview & Architecture

Samadhan Setu connects grassroots citizens directly with government nodal officers, universities/HEIs, student innovators, and corporate CSR partners.

### 👥 8 Tailored Role Portals:
1. **Citizen Portal** — Report localized problems, drop map pins, support community issues with *"I Am Also Affected"*, and track live progress.
2. **Government Portal** — Multi-department triage, validation queue, priority setting, and departmental fund allocation.
3. **Higher Education / HEI Portal** — Institutional challenge management (BIT Mesra, IIT ISM, NIT JSR, BAU), faculty appointment, and squad creation.
4. **Faculty / Mentor Portal** — Project mentoring, milestone approvals, prototype reviews, and lab oversight.
5. **Student Portal** — Squad tasks, prototype submissions, testing logs, and gamified reward points.
6. **Industry / Startup / MSME Portal** — R&D exploration, prototype grants, test bays, and manufacturing partnerships (Tata Steel, BCCL, JSPL).
7. **CSR / Research Partner Portal** — SDG-aligned funding, milestone-linked disbursements, and impact audit reports.
8. **Platform Admin Portal** — Statewide governance, AI triage rule configurations, institution verification, and audit logs.

---

## 📁 Project Structure

```
samadhan-setu/
├── backend/                  # FastAPI AI Triage & Verification engine
│   ├── main.py               # REST API endpoints & CORS setup
│   ├── ai_engine.py          # Category classification, priority heuristics & anti-duplicate logic
│   └── requirements.txt      # Python dependencies
│
├── src/
│   ├── assets/               # Static assets & images
│   ├── components/
│   │   ├── ai/               # AI Analysis & Triage preview cards
│   │   ├── challenges/       # Challenge Card, Filters, "I Am Also Affected" button, Lifecycle Stepper
│   │   ├── common/           # Navbar (with ☰ Role Menu), Footer, StatCards, StatusBadges
│   │   └── map/              # Leaflet OpenStreetMap interactive Jharkhand map with category pins
│   ├── context/
│   │   ├── AuthContext.jsx   # Role authentication & user state management
│   │   └── ChallengeContext.jsx # Statewide challenges data store & lifecycle mutations
│   ├── data/
│   │   ├── demoUsers.js      # 8 stakeholder demo personas & profile records
│   │   ├── sampleChallenges.js # Seed challenges across Jharkhand districts
│   │   ├── districtsData.js  # 24 Jharkhand districts & administrative divisions
│   │   ├── institutionsData.js # Universities & research specializations (BIT, IIT ISM, NIT, BAU)
│   │   └── industryPartnersData.js # Tata Steel, BCCL, JSPL, MSME hubs
│   ├── pages/
│   │   ├── LandingPage.jsx   # Official state landing page with 7-step pipeline
│   │   ├── LoginPage.jsx     # Role-based login & citizen registration
│   │   ├── ExploreChallengesPage.jsx # Public challenge directory & interactive map
│   │   ├── ChallengeDetailPage.jsx   # Deep-dive challenge lifecycle & milestone tracker
│   │   ├── StaticViews.jsx   # How It Works, Solutions R&D, Impact Analytics, About
│   │   └── portals/          # 8 Role-Specific Dashboards:
│   │       ├── CitizenPortal/       # Citizen Dashboard (with Report a Problem, Map, Area cards)
│   │       ├── GovernmentPortal/    # Triage Queue & Department Assignment
│   │       ├── UniversityPortal/    # HEI R&D Cell & Team Lead Squad Assignment
│   │       ├── FacultyPortal/       # Milestone Review & Technical Approvals
│   │       ├── StudentPortal/       # Squad Tasks, Prototype Uploads & Leaderboards
│   │       ├── IndustryPortal/      # Prototyping Sponsorship & Manufacturing Scale
│   │       ├── CSRPortal/           # Statutory CSR Grants & Social ROI Audits
│   │       └── AdminPortal/         # State Command & Control Center
│   ├── services/
│   │   └── storageService.js # LocalStorage persistence for demo sessions
│   ├── App.jsx               # Master view router
│   ├── main.jsx              # React DOM root entry
│   └── index.css             # Tailwind CSS custom themes & animations
│
├── index.html                # HTML entry template
├── package.json              # NPM dependencies & scripts
├── tailwind.config.js        # Tailwind styling configurations & custom color palettes
├── vite.config.js            # Vite build setup & path aliases
└── README.md                 # Documentation
```

---

## 🛡️ License
Designed for the Government of Jharkhand State Higher Education and Societal Innovation Network.
