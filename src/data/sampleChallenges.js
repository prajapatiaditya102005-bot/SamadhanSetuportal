// Sample societal challenges across Jharkhand districts with exact reference cases
export const INITIAL_CHALLENGES = [
  {
    id: "SSP-2026-0012",
    title: "Drinking water shortage in village",
    description: "Deep tube-well in Kanke village has gone dry due to ground water depletion. Over 450 households are dependent on a single seasonal tanker supplied once in 4 days. Women and schoolchildren have to walk 2.5 km to fetch muddy water from an open pond.",
    category: "Water",
    district: "Ranchi",
    block: "Kanke",
    village: "Kanke, Ranchi",
    locationCoordinates: { lat: 23.4350, lng: 85.3210 },
    urgency: "High",
    affectedPopulation: 1450,
    supportingCitizensCount: 234,
    status: "Under Validation", // Submitted, AI Analysis, Under Validation, Assigned to Institution, In Progress, Solution Proposed, Pilot Testing, Implemented, Impact Measured, Resolved
    submissionDate: "2026-03-02",
    submittedBy: {
      name: "Ramesh Kumar",
      role: "Citizen | Ranchi",
      contact: "+91 94311 88201",
      email: "ramesh.kumar@gmail.com"
    },
    images: [
      "https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?w=600&auto=format&fit=crop&q=80"
    ],
    documents: ["Kanke_Water_Crisis_Petition.pdf"],
    aiAnalysis: {
      category: "Water",
      confidence: 96.8,
      priority: "High",
      priorityScore: 92,
      priorityRationale: "Severe acute water scarcity in peri-urban residential village with high vulnerable population.",
      detectedKeywords: ["drinking water", "shortage", "kanke", "borewell", "groundwater", "ranchi"],
      similarChallengesCount: 1,
      similarChallengeIds: ["SSP-2026-0015"],
      recommendedExpertise: [
        "Hydro-geology & Groundwater Recharge",
        "Solar Powered Deep Lift Pump",
        "Community Water Purification"
      ],
      recommendedInstitutions: [
        { institutionId: "hei_bit_mesra", institutionName: "Birla Institute of Technology (BIT) Mesra", matchScore: 95, reason: "Water engineering lab with deep borehole recharge models" },
        { institutionId: "hei_cuj", institutionName: "Central University of Jharkhand", matchScore: 84, reason: "Groundwater hydrology department" }
      ],
      recommendedIndustryPartners: [
        { partnerId: "ind_tata_steel", partnerName: "Tata Steel CSR", matchScore: 94, domain: "Rural Drinking Water Systems" }
      ]
    },
    validationDetails: {
      validatedBy: "Drinking Water & Sanitation Dept, Ranchi",
      validatedAt: "2026-03-04",
      assignedDepartment: "Drinking Water & Sanitation Department",
      govtPriorityScore: "Priority Tier 1",
      govtComments: "Grievance received and verified by Kanke Block Development Officer. Forwarded to technical R&D cell."
    },
    assignedInstitution: {
      institutionId: "hei_bit_mesra",
      institutionName: "BIT Mesra",
      assignedDepartment: "Civil & Environmental Engineering",
      assignedDate: "2026-03-05",
      facultyMentor: {
        id: "f1",
        name: "Dr. Alok Kumar Verma",
        department: "Civil & Environmental Engineering",
        email: "alokverma@bitmesra.ac.in"
      },
      studentTeam: {
        teamId: "team_bit_hydro",
        teamName: "Team JalSetu",
        lead: "Abhishek Pandey",
        members: ["Abhishek Pandey", "Priya Murmu", "Karan Saw"],
        proposalTitle: "Solar Submersible Deep Recharge Well with Laterite Gravity Filter"
      }
    },
    industryCollaboration: {
      partnerId: "ind_tata_steel",
      partnerName: "Tata Steel Foundation",
      supportOffered: ["Funding", "Testing", "Deployment"],
      grantAmount: "₹3,50,000",
      status: "Active Collaboration"
    },
    projectMilestones: [
      { id: "m1", title: "Site Hydro-Geological Bore Sampling", status: "Completed", dueDate: "2026-03-06", progress: 100 },
      { id: "m2", title: "Solar Submersible CAD Blueprint", status: "In Progress", dueDate: "2026-03-15", progress: 60 },
      { id: "m3", title: "Installation at Kanke Middle School", status: "Pending", dueDate: "2026-03-30", progress: 0 }
    ],
    comments: [
      {
        id: "c1",
        authorName: "Somra Oraon",
        role: "Resident",
        date: "2026-03-03",
        text: "The pond water is causing skin rashes in children. We urgently need the solar lift pump."
      },
      {
        id: "c2",
        authorName: "Ramesh Kumar",
        role: "Citizen Submitter",
        date: "2026-03-04",
        text: "Thank you for the quick initial inspection. 450 families are counting on this resolution."
      }
    ],
    endorsements: [
      { userName: "Suresh Pahan", village: "Kanke", date: "2026-03-03", note: "Entire Ward 3 is facing this water crisis." },
      { userName: "Meena Devi", village: "Kanke", date: "2026-03-04", note: "Tankers come only once a week." }
    ]
  },
  {
    id: "SSP-2026-0008",
    title: "Broken street lights",
    description: "All 18 solar and LED street light fixtures along Harmu main bypass and market road have been non-functional for 3 months, resulting in frequent nighttime snatching incidents and pedestrian accidents.",
    category: "Electricity",
    district: "Ranchi",
    block: "Harmu",
    village: "Harmu, Ranchi",
    locationCoordinates: { lat: 23.3520, lng: 85.3110 },
    urgency: "Medium",
    affectedPopulation: 3200,
    supportingCitizensCount: 189,
    status: "In Progress",
    submissionDate: "2026-02-18",
    submittedBy: {
      name: "Ramesh Kumar",
      role: "Citizen | Ranchi",
      contact: "+91 94311 88201",
      email: "ramesh.kumar@gmail.com"
    },
    images: [
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80"
    ],
    documents: ["Harmu_Resident_Association_Letter.pdf"],
    aiAnalysis: {
      category: "Electricity",
      confidence: 97.2,
      priority: "Medium",
      priorityScore: 78,
      priorityRationale: "Urban safety and road hazard in densely populated residential locality.",
      detectedKeywords: ["street light", "harmu", "solar", "led", "ranchi", "lighting"],
      similarChallengesCount: 0,
      similarChallengeIds: [],
      recommendedExpertise: [
        "Smart LED Driver Electronics",
        "Solar Battery Management (BMS)",
        "IoT Mesh Fault Telemetry"
      ],
      recommendedInstitutions: [
        { institutionId: "hei_bit_mesra", institutionName: "BIT Mesra", matchScore: 92, reason: "Power electronics & smart lighting lab" }
      ],
      recommendedIndustryPartners: [
        { partnerId: "ind_adani_foundation", partnerName: "Adani Foundation", matchScore: 88, domain: "Solar Street Lighting" }
      ]
    },
    validationDetails: {
      validatedBy: "Urban Development & Housing Department",
      validatedAt: "2026-02-21",
      assignedDepartment: "Urban Development & Housing Department (UDHD)",
      govtPriorityScore: "Municipal Priority",
      govtComments: "Assigned to Ranchi Municipal Corporation electrical wing with BIT Mesra smart lighting sensor pilot."
    },
    assignedInstitution: {
      institutionId: "hei_bit_mesra",
      institutionName: "BIT Mesra",
      assignedDepartment: "Electrical & Electronics Engineering",
      assignedDate: "2026-02-24",
      facultyMentor: {
        id: "f3",
        name: "Dr. Rajeshwar Sharma",
        department: "Computer Science & Electrical",
        email: "rsharma@bitmesra.ac.in"
      },
      studentTeam: {
        teamId: "team_bit_light",
        teamName: "UrjaSetu Harmu",
        lead: "Rohit Agarwal",
        members: ["Rohit Agarwal", "Saurav Mukherjee"],
        proposalTitle: "IoT Smart Mesh Auto-Dimming LED Fixtures with Anti-Theft Battery Enclosure"
      }
    },
    industryCollaboration: {
      partnerId: "ind_adani_foundation",
      partnerName: "Adani Solar Division",
      supportOffered: ["Funding", "Technology"],
      grantAmount: "₹1,80,000",
      status: "Active Collaboration"
    },
    projectMilestones: [
      { id: "m201", title: "Harmu Corridor Electrical Audit", status: "Completed", dueDate: "2026-02-28", progress: 100 },
      { id: "m202", title: "Installation of 18 High-Lumen Solar LED Kits", status: "In Progress", dueDate: "2026-03-12", progress: 75 },
      { id: "m203", title: "Central Telemetry Dashboard Handover", status: "Pending", dueDate: "2026-03-25", progress: 0 }
    ],
    comments: [
      {
        id: "c201",
        authorName: "Anjali Tirkey",
        role: "Resident",
        date: "2026-02-20",
        text: "It was pitch dark near the Harmu ground. Thank you for taking this up!"
      }
    ],
    endorsements: []
  },
  {
    id: "SSP-2026-0005",
    title: "Garbage dumping near school",
    description: "Illegal open municipal solid waste dumping adjacent to the Morabadi Government Middle School boundary wall. Stray animals, foul stench, and mosquito breeding are causing severe attendance drop and health issues among 380 school students.",
    category: "Sanitation",
    district: "Ranchi",
    block: "Morabadi",
    village: "Morabadi, Ranchi",
    locationCoordinates: { lat: 23.3910, lng: 85.3340 },
    urgency: "High",
    affectedPopulation: 1800,
    supportingCitizensCount: 145,
    status: "Solution Proposed",
    submissionDate: "2026-02-10",
    submittedBy: {
      name: "Ramesh Kumar",
      role: "Citizen | Ranchi",
      contact: "+91 94311 88201",
      email: "ramesh.kumar@gmail.com"
    },
    images: [
      "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&auto=format&fit=crop&q=80"
    ],
    documents: ["Morabadi_School_Health_Report.pdf"],
    aiAnalysis: {
      category: "Sanitation",
      confidence: 98.4,
      priority: "High",
      priorityScore: 89,
      priorityRationale: "Direct health hazard for children and school attendance impediment.",
      detectedKeywords: ["garbage", "dumping", "school", "morabadi", "waste", "ranchi"],
      similarChallengesCount: 1,
      similarChallengeIds: ["SSP-2026-0016"],
      recommendedExpertise: [
        "Solid Waste Segregation & Bio-Digestion",
        "Municipal Trash Screen Barricades",
        "Public Health & Vector Control"
      ],
      recommendedInstitutions: [
        { institutionId: "hei_cuj", institutionName: "Central University of Jharkhand", matchScore: 91, reason: "Environmental sciences waste management lab" },
        { institutionId: "hei_bit_mesra", institutionName: "BIT Mesra", matchScore: 87, reason: "Bio-composting reactor prototypes" }
      ],
      recommendedIndustryPartners: [
        { partnerId: "ind_jharkhand_msme_assoc", partnerName: "Jharkhand MSME Cluster", matchScore: 89, domain: "Organic Waste Shredders" }
      ]
    },
    validationDetails: {
      validatedBy: "Ranchi Municipal Corporation (RMC)",
      validatedAt: "2026-02-14",
      assignedDepartment: "Urban Development & Housing Department (UDHD)",
      govtPriorityScore: "Urgent School Safety",
      govtComments: "Sanctioned for immediate perimeter waste clearance and installation of automated wet waste composter."
    },
    assignedInstitution: {
      institutionId: "hei_cuj",
      institutionName: "Central University of Jharkhand (CUJ)",
      assignedDepartment: "Center for Environmental Sciences",
      assignedDate: "2026-02-16",
      facultyMentor: {
        id: "f13",
        name: "Dr. Manoj Kumar",
        department: "Environmental Sciences",
        email: "manoj.kumar@cuj.ac.in"
      },
      studentTeam: {
        teamId: "team_cuj_clean",
        teamName: "SwachhMorabadi Squad",
        lead: "Aakash Singh",
        members: ["Aakash Singh", "Neha Choudhary", "Ravi Soren"],
        proposalTitle: "Closed Drum Aerobic Bio-Composter & Smart Ultrasonic Fill-Level Bins"
      }
    },
    industryCollaboration: {
      partnerId: "ind_jharkhand_msme_assoc",
      partnerName: "Jharkhand Small Industries Association",
      supportOffered: ["Manufacturing", "Deployment"],
      grantAmount: "₹2,20,000",
      status: "Active Collaboration"
    },
    projectMilestones: [
      { id: "m301", title: "Dump Site Sanitization & Lime Spraying", status: "Completed", dueDate: "2026-02-22", progress: 100 },
      { id: "m302", title: "Fabrication of 2 Closed Aerobic Drum Bins", status: "Completed", dueDate: "2026-03-01", progress: 100 },
      { id: "m303", title: "School Bio-Garden Composting Demonstration", status: "In Progress", dueDate: "2026-03-18", progress: 50 }
    ],
    comments: [
      {
        id: "c301",
        authorName: "Morabadi Headmaster",
        role: "School Principal",
        date: "2026-02-25",
        text: "The odor has drastically reduced after the first clearance. Thank you to the CUJ team!"
      }
    ],
    endorsements: []
  },
  {
    id: "SSP-2026-0002",
    title: "Poor road condition",
    description: "A 1.8 km stretch connecting Khelgaon main sports complex with Booty More had deep craters, loose gravel, and zero drainage, causing waterlogging and vehicle breakdowns during monsoons.",
    category: "Road",
    district: "Ranchi",
    block: "Khelgaon",
    village: "Khelgaon, Ranchi",
    locationCoordinates: { lat: 23.3980, lng: 85.3780 },
    urgency: "Medium",
    affectedPopulation: 5200,
    supportingCitizensCount: 312,
    status: "Resolved",
    submissionDate: "2025-10-15",
    submittedBy: {
      name: "Ramesh Kumar",
      role: "Citizen | Ranchi",
      contact: "+91 94311 88201",
      email: "ramesh.kumar@gmail.com"
    },
    images: [
      "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80"
    ],
    documents: ["Khelgaon_Road_Completion_Certificate.pdf"],
    aiAnalysis: {
      category: "Road",
      confidence: 96.0,
      priority: "Medium",
      priorityScore: 76,
      priorityRationale: "Major arterial connecting road impacting public transit and sports complex access.",
      detectedKeywords: ["road", "pothole", "khelgaon", "booty more", "waterlogging", "ranchi"],
      similarChallengesCount: 0,
      similarChallengeIds: [],
      recommendedExpertise: [
        "Geopolymer Concrete Paving",
        "Recycled Plastic Bitumen Road Tech",
        "Sub-surface Storm Drainage"
      ],
      recommendedInstitutions: [
        { institutionId: "hei_nit_jsr", institutionName: "NIT Jamshedpur", matchScore: 94, reason: "Transportation engineering & plastic road patents" }
      ],
      recommendedIndustryPartners: [
        { partnerId: "ind_tata_steel", partnerName: "Tata Steel CSR", matchScore: 90, domain: "Rural Road Infrastructure" }
      ]
    },
    validationDetails: {
      validatedBy: "Road Construction Department, Jharkhand",
      validatedAt: "2025-10-20",
      assignedDepartment: "Road Construction Department",
      govtPriorityScore: "Priority Tier 2",
      govtComments: "Reconstruction approved with waste plastic modified bitumen technology."
    },
    assignedInstitution: {
      institutionId: "hei_nit_jsr",
      institutionName: "NIT Jamshedpur",
      assignedDepartment: "Civil Engineering",
      assignedDate: "2025-10-25",
      facultyMentor: {
        id: "f9",
        name: "Dr. Nisha Beck",
        department: "Civil Engineering",
        email: "nbeck@nitjsr.ac.in"
      },
      studentTeam: {
        teamId: "team_nit_road",
        teamName: "Khelgaon PaveTech",
        lead: "Deepak Hansda",
        members: ["Deepak Hansda", "Vivek Sharma"],
        proposalTitle: "Recycled Plastic-Bitumen Dense Overlay with Pre-cast Concrete Paver Drains"
      }
    },
    industryCollaboration: {
      partnerId: "ind_tata_steel",
      partnerName: "Tata Steel Infra",
      supportOffered: ["Funding", "Manufacturing", "Deployment"],
      grantAmount: "₹8,50,000",
      status: "Completed & Verified"
    },
    projectMilestones: [
      { id: "m401", title: "Pavement Sub-base Dynamic Cone Penetration Test", status: "Completed", dueDate: "2025-11-10", progress: 100 },
      { id: "m402", title: "Laying 1.8 km Plastic-Modified Bitumen Layer", status: "Completed", dueDate: "2025-12-15", progress: 100 },
      { id: "m403", title: "Final Smoothness & Load Bearing Audit Handover", status: "Completed", dueDate: "2026-01-20", progress: 100 }
    ],
    comments: [
      {
        id: "c401",
        authorName: "Executive Engineer (RCD Ranchi)",
        role: "Government Engineer",
        date: "2026-01-25",
        text: "Project successfully completed and inspected. Road is fully open for traffic."
      }
    ],
    endorsements: []
  },
  {
    id: "SSP-2026-0015",
    title: "Irregular drinking water supply in Kanke Block",
    description: "Piped water supply through the municipal line operates only for 20 minutes every alternate day with low pressure in Kanke central wards. Over 234 families are forced to buy private tanker water.",
    category: "Water",
    district: "Ranchi",
    block: "Kanke",
    village: "Kanke, Ranchi",
    locationCoordinates: { lat: 23.4280, lng: 85.3180 },
    urgency: "High",
    affectedPopulation: 1200,
    supportingCitizensCount: 234,
    status: "Under Validation",
    submissionDate: "2026-02-28",
    submittedBy: {
      name: "Mangal Singh",
      role: "Citizen | Ranchi",
      contact: "+91 94311 77201",
      email: "mangal.kanke@gmail.com"
    },
    images: [
      "https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?w=600&auto=format&fit=crop&q=80"
    ],
    documents: [],
    aiAnalysis: {
      category: "Water",
      confidence: 97.0,
      priority: "High",
      priorityScore: 90,
      priorityRationale: "Municipal water supply failure in densely populated ward.",
      detectedKeywords: ["water supply", "kanke", "pipeline", "pressure", "ranchi"],
      similarChallengesCount: 1,
      similarChallengeIds: ["SSP-2026-0012"],
      recommendedExpertise: ["Municipal Pipeline Hydraulics", "Automated Valve Regulators"],
      recommendedInstitutions: [{ institutionId: "hei_bit_mesra", institutionName: "BIT Mesra", matchScore: 94 }],
      recommendedIndustryPartners: [{ partnerId: "ind_tata_steel", partnerName: "Tata Steel CSR", matchScore: 92 }]
    },
    validationDetails: null,
    assignedInstitution: null,
    industryCollaboration: null,
    projectMilestones: [],
    comments: [
      { id: "c15", authorName: "Sunita Devi", role: "Resident", date: "2026-03-01", text: "We have to wake up at 4 AM to wait for water." }
    ],
    endorsements: []
  },
  {
    id: "SSP-2026-0016",
    title: "Garbage not collected regularly",
    description: "Door-to-door municipal garbage collection vehicles visit Harmu residential blocks only once a week instead of daily, causing waste bags to pile up on open street corners and spreading foul stench.",
    category: "Sanitation",
    district: "Ranchi",
    block: "Harmu",
    village: "Harmu, Ranchi",
    locationCoordinates: { lat: 23.3610, lng: 85.3050 },
    urgency: "Medium",
    affectedPopulation: 950,
    supportingCitizensCount: 189,
    status: "Under Validation",
    submissionDate: "2026-02-25",
    submittedBy: {
      name: "Pooja Verma",
      role: "Citizen | Ranchi",
      contact: "+91 94318 44021",
      email: "pooja.verma@gmail.com"
    },
    images: [
      "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&auto=format&fit=crop&q=80"
    ],
    documents: [],
    aiAnalysis: {
      category: "Sanitation",
      confidence: 96.5,
      priority: "Medium",
      priorityScore: 75,
      priorityRationale: "Municipal collection scheduling and route optimization issue.",
      detectedKeywords: ["garbage", "harmu", "collection", "waste", "ranchi"],
      similarChallengesCount: 1,
      similarChallengeIds: ["SSP-2026-0005"],
      recommendedExpertise: ["Municipal Route Optimization", "GPS Vehicle Telemetry"],
      recommendedInstitutions: [{ institutionId: "hei_bit_mesra", institutionName: "BIT Mesra", matchScore: 89 }],
      recommendedIndustryPartners: [{ partnerId: "ind_jharkhand_msme_assoc", partnerName: "Jharkhand MSME Cluster", matchScore: 86 }]
    },
    validationDetails: null,
    assignedInstitution: null,
    industryCollaboration: null,
    projectMilestones: [],
    comments: [
      { id: "c16", authorName: "Rajiv Sahay", role: "Resident", date: "2026-02-26", text: "Stray dogs tear the bags every night." }
    ],
    endorsements: []
  },
  {
    id: "SSP-2026-0017",
    title: "Overhead transformer sparking and power surges",
    description: "Old 250 kVA transformer in Doranda ward sparks continuously during peak evening hours, causing sudden voltage surges that have damaged household appliances and posing fire hazards.",
    category: "Electricity",
    district: "Ranchi",
    block: "Doranda",
    village: "Doranda, Ranchi",
    locationCoordinates: { lat: 23.3360, lng: 85.3280 },
    urgency: "High",
    affectedPopulation: 1100,
    supportingCitizensCount: 94,
    status: "Under Validation",
    submissionDate: "2026-03-01",
    submittedBy: { name: "Anand Sinha", role: "Citizen | Ranchi", contact: "+91 94311 66102", email: "anand.sinha@gmail.com" },
    images: [],
    documents: [],
    aiAnalysis: {
      category: "Electricity",
      confidence: 97.5,
      priority: "High",
      priorityScore: 88,
      priorityRationale: "Imminent electrical fire hazard in crowded bazaar zone.",
      detectedKeywords: ["transformer", "sparking", "voltage", "doranda", "ranchi"],
      similarChallengesCount: 0,
      similarChallengeIds: [],
      recommendedExpertise: ["Electrical Grid Load Balancing", "Smart Transformer Thermal Sensors"],
      recommendedInstitutions: [{ institutionId: "hei_bit_mesra", institutionName: "BIT Mesra", matchScore: 96 }],
      recommendedIndustryPartners: [{ partnerId: "ind_adani_foundation", partnerName: "Adani Foundation", matchScore: 90 }]
    },
    validationDetails: null,
    assignedInstitution: null,
    industryCollaboration: null,
    projectMilestones: [],
    comments: [],
    endorsements: []
  },
  {
    id: "SSP-2026-0018",
    title: "Lack of Science lab kits in Rural High School",
    description: "Government High School in Ormanjhi has 420 students enrolled in classes 9 and 10 with no physics or chemistry laboratory apparatus, affecting practical science education.",
    category: "Education",
    district: "Ranchi",
    block: "Ormanjhi",
    village: "Ormanjhi, Ranchi",
    locationCoordinates: { lat: 23.4800, lng: 85.4800 },
    urgency: "Medium",
    affectedPopulation: 420,
    supportingCitizensCount: 165,
    status: "In Progress",
    submissionDate: "2026-02-12",
    submittedBy: { name: "Suman Kumari", role: "School Teacher", contact: "+91 94314 99012", email: "suman.teacher@gmail.com" },
    images: [],
    documents: [],
    aiAnalysis: {
      category: "Education",
      confidence: 95.0,
      priority: "Medium",
      priorityScore: 77,
      priorityRationale: "Secondary STEM education capability gap in rural tribal school.",
      detectedKeywords: ["school", "science lab", "ormanjhi", "education", "ranchi"],
      similarChallengesCount: 0,
      similarChallengeIds: [],
      recommendedExpertise: ["Low-Cost STEM DIY Lab Kits", "Experiential Science Pedagogy"],
      recommendedInstitutions: [{ institutionId: "hei_bit_mesra", institutionName: "BIT Mesra", matchScore: 93 }],
      recommendedIndustryPartners: [{ partnerId: "ind_jspl_csr", partnerName: "JSPL Foundation", matchScore: 95 }]
    },
    validationDetails: null,
    assignedInstitution: null,
    industryCollaboration: null,
    projectMilestones: [],
    comments: [],
    endorsements: []
  },
  {
    id: "SSP-2026-0019",
    title: "Waterlogging at Pundag Main Road Culvert",
    description: "Choked culvert in Pundag causes knee-deep waterlogging on the main bypass during rainfall, blocking public transport and school buses.",
    category: "Sanitation",
    district: "Ranchi",
    block: "Pundag",
    village: "Pundag, Ranchi",
    locationCoordinates: { lat: 23.3250, lng: 85.2750 },
    urgency: "Medium",
    affectedPopulation: 2800,
    supportingCitizensCount: 178,
    status: "Under Validation",
    submissionDate: "2026-02-27",
    submittedBy: { name: "Bipin Mahto", role: "Citizen | Ranchi", contact: "+91 94312 88401", email: "bipin.pundag@gmail.com" },
    images: [],
    documents: [],
    aiAnalysis: {
      category: "Sanitation",
      confidence: 96.0,
      priority: "Medium",
      priorityScore: 78,
      priorityRationale: "Municipal culvert blockage causing seasonal traffic standstill.",
      detectedKeywords: ["waterlogging", "culvert", "pundag", "drainage", "ranchi"],
      similarChallengesCount: 0,
      similarChallengeIds: [],
      recommendedExpertise: ["Stormwater Drainage Automation", "Culvert De-silting"],
      recommendedInstitutions: [{ institutionId: "hei_nit_jsr", institutionName: "NIT Jamshedpur", matchScore: 91 }],
      recommendedIndustryPartners: [{ partnerId: "ind_jharkhand_msme_assoc", partnerName: "Jharkhand MSME Cluster", matchScore: 88 }]
    },
    validationDetails: null,
    assignedInstitution: null,
    industryCollaboration: null,
    projectMilestones: [],
    comments: [],
    endorsements: []
  },
  {
    id: "SSP-2026-0020",
    title: "Namkum Industrial Area Effluent Odor",
    description: "Untreated small-scale industrial discharge entering the local stream in Namkum emits toxic sulfur odor, affecting residents of 3 nearby wards.",
    category: "Other",
    district: "Ranchi",
    block: "Namkum",
    village: "Namkum, Ranchi",
    locationCoordinates: { lat: 23.3500, lng: 85.3900 },
    urgency: "High",
    affectedPopulation: 3400,
    supportingCitizensCount: 210,
    status: "Under Validation",
    submissionDate: "2026-03-01",
    submittedBy: { name: "Sunil Toppo", role: "Citizen | Ranchi", contact: "+91 94317 22019", email: "sunil.namkum@gmail.com" },
    images: [],
    documents: [],
    aiAnalysis: {
      category: "Other",
      confidence: 94.0,
      priority: "High",
      priorityScore: 86,
      priorityRationale: "Industrial environmental odor and stream water contamination.",
      detectedKeywords: ["industrial", "effluent", "odor", "namkum", "ranchi"],
      similarChallengesCount: 0,
      similarChallengeIds: [],
      recommendedExpertise: ["Industrial Effluent Bio-Treatment", "Air Scrubbers"],
      recommendedInstitutions: [{ institutionId: "hei_bit_mesra", institutionName: "BIT Mesra", matchScore: 94 }],
      recommendedIndustryPartners: [{ partnerId: "ind_tata_steel", partnerName: "Tata Steel Foundation", matchScore: 90 }]
    },
    validationDetails: null,
    assignedInstitution: null,
    industryCollaboration: null,
    projectMilestones: [],
    comments: [],
    endorsements: []
  }
];

export const LIFECYCLE_STAGES = [
  { id: "Submitted", step: 1, label: "Submitted", desc: "Your problem has been submitted", role: "Citizen", statusText: "Your problem has been submitted" },
  { id: "AI Analysis", step: 2, label: "AI Analysis", desc: "Our system is analyzing the problem", role: "AI Engine", statusText: "Our system is analyzing the problem" },
  { id: "Under Validation", step: 3, label: "Under Validation", desc: "Being reviewed by authorities", role: "Government", statusText: "Being reviewed by authorities" },
  { id: "Assigned to Institution", step: 4, label: "Assigned to Institution", desc: "Allocated to university research team", role: "University Admin", statusText: "Allocated to university research team" },
  { id: "In Progress", step: 5, label: "In Progress", desc: "Active multidisciplinary research", role: "Faculty / Students", statusText: "Active multidisciplinary research" },
  { id: "Solution Proposed", step: 6, label: "Solution Proposed", desc: "Technical prototype design ready", role: "Student Team", statusText: "Technical prototype design ready" },
  { id: "Pilot Testing", step: 7, label: "Pilot Testing", desc: "Field trial with industry sponsor", role: "Industry & Team", statusText: "Field trial with industry sponsor" },
  { id: "Implemented", step: 8, label: "Implemented", desc: "On-ground deployment complete", role: "Govt / Industry", statusText: "On-ground deployment complete" },
  { id: "Impact Measured", step: 9, label: "Impact Measured", desc: "Social ROI & community audit verified", role: "All Stakeholders", statusText: "Social ROI & community audit verified" }
];
