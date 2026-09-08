// Higher Education Institutions (HEIs) and Universities in Jharkhand
export const INSTITUTIONS = [
  {
    id: "hei_bit_mesra",
    name: "Birla Institute of Technology (BIT) Mesra",
    shortName: "BIT Mesra",
    location: "Ranchi, Jharkhand",
    type: "Deemed University / Institute of National Eminence",
    established: 1955,
    verified: true,
    logoText: "BIT",
    primaryExpertise: [
      "Water Resources Engineering",
      "Environmental Engineering",
      "Remote Sensing & GIS",
      "Computer Science & AI",
      "Renewable Energy",
      "Mechanical & Automation"
    ],
    faculties: [
      { id: "f1", name: "Dr. Alok Kumar Verma", department: "Civil & Environmental Engineering", email: "alokverma@bitmesra.ac.in", activeProjects: 3 },
      { id: "f2", name: "Dr. Sunita Murmu", department: "Remote Sensing & GIS", email: "smurmu@bitmesra.ac.in", activeProjects: 2 },
      { id: "f3", name: "Dr. Rajeshwar Sharma", department: "Computer Science & Engineering", email: "rsharma@bitmesra.ac.in", activeProjects: 4 },
      { id: "f4", name: "Dr. Ananya Roy", department: "Chemical & Bio-Engineering", email: "aroy@bitmesra.ac.in", activeProjects: 1 }
    ],
    studentTeams: [
      { id: "team_bit_hydro", name: "Team JalSetu (Hydro-Tech)", lead: "Abhishek Pandey", membersCount: 5, domain: "Water Purification" },
      { id: "team_bit_agri", name: "Team KrishiVikas", lead: "Priyanka Soren", membersCount: 6, domain: "Solar Agri Sensors" },
      { id: "team_bit_telehealth", name: "Team SwasthyaMitra", lead: "Rohit Agarwal", membersCount: 4, domain: "IoT Remote Clinics" }
    ],
    activeChallengesCount: 8,
    solutionsImplemented: 5,
    matchKeywords: ["water", "purification", "fluoride", "gis", "mapping", "remote sensing", "iot", "solar", "drone", "data"]
  },
  {
    id: "hei_iit_ism",
    name: "Indian Institute of Technology (IIT ISM) Dhanbad",
    shortName: "IIT ISM Dhanbad",
    location: "Dhanbad, Jharkhand",
    type: "Institute of National Importance (INI)",
    established: 1926,
    verified: true,
    logoText: "IIT-ISM",
    primaryExpertise: [
      "Mining & Environmental Engineering",
      "Groundwater Hydrology",
      "Clean Energy Technologies",
      "Geotechnical Engineering",
      "Sensor Networks & IoT",
      "Material Science"
    ],
    faculties: [
      { id: "f5", name: "Prof. Vinod Kumar Saxena", department: "Mining & Environmental Sciences", email: "vksaxena@iitism.ac.in", activeProjects: 4 },
      { id: "f6", name: "Dr. Shailendra Mishra", department: "Applied Geology & Hydrology", email: "smishra@iitism.ac.in", activeProjects: 3 },
      { id: "f7", name: "Dr. Preeti Kumari", department: "Electronics & Electrical Engg", email: "preetieee@iitism.ac.in", activeProjects: 2 }
    ],
    studentTeams: [
      { id: "team_ism_minewaste", name: "GreenOverburden Innovators", lead: "Manish Tirkey", membersCount: 5, domain: "Mine Soil Remediation" },
      { id: "team_ism_microgrid", name: "UrjaSetu Solar Team", lead: "Sneha Sen", membersCount: 4, domain: "Off-Grid Microgrids" }
    ],
    activeChallengesCount: 11,
    solutionsImplemented: 7,
    matchKeywords: ["mining", "soil", "dust", "groundwater", "coal", "pollution", "energy", "hydrology", "subsidence"]
  },
  {
    id: "hei_nit_jsr",
    name: "National Institute of Technology (NIT) Jamshedpur",
    shortName: "NIT Jamshedpur",
    location: "Adityapur, Jamshedpur, Jharkhand",
    type: "Institute of National Importance (INI)",
    established: 1960,
    verified: true,
    logoText: "NIT-JSR",
    primaryExpertise: [
      "Mechanical & Production Systems",
      "Low-cost Automation & Robotics",
      "Smart City Infrastructure",
      "Civil & Transportation Engineering",
      "Metallurgical & Material Solutions"
    ],
    faculties: [
      { id: "f8", name: "Dr. Sanjay Kumar Bhagat", department: "Mechanical Engineering", email: "sbhagat@nitjsr.ac.in", activeProjects: 3 },
      { id: "f9", name: "Dr. Nisha Beck", department: "Civil Engineering", email: "nbeck@nitjsr.ac.in", activeProjects: 2 }
    ],
    studentTeams: [
      { id: "team_nit_coldchain", name: "KisanCold IoT Innovators", lead: "Deepak Hansda", membersCount: 5, domain: "Rural Cold Storage" },
      { id: "team_nit_assistive", name: "Sugamya Assistive Labs", lead: "Neha Choudhary", membersCount: 4, domain: "Divyangjan Wheelchairs" }
    ],
    activeChallengesCount: 7,
    solutionsImplemented: 4,
    matchKeywords: ["cold storage", "transportation", "roads", "bridges", "machinery", "fabrication", "assistive", "automation"]
  },
  {
    id: "hei_bau_ranchi",
    name: "Birsa Agricultural University (BAU) Ranchi",
    shortName: "BAU Ranchi",
    location: "Kanke, Ranchi, Jharkhand",
    type: "State Agricultural University",
    established: 1981,
    verified: true,
    logoText: "BAU",
    primaryExpertise: [
      "Agro-Forestry & NTFP Processing",
      "Lac & Tussar Silk Cultivation",
      "Rainfed Agriculture & Watershed Management",
      "Indigenous Crop Preservation",
      "Soil Health Remediation"
    ],
    faculties: [
      { id: "f10", name: "Dr. B. K. Oraon", department: "Agronomy & Soil Sciences", email: "bkoraon@bauranchi.org", activeProjects: 4 },
      { id: "f11", name: "Dr. Meenakshi Soren", department: "Forestry & NTFP", email: "msoren@bauranchi.org", activeProjects: 3 }
    ],
    studentTeams: [
      { id: "team_bau_lac", name: "Team Birsa Lac Innovators", lead: "Rakesh Munda", membersCount: 6, domain: "Lac Processing Machines" },
      { id: "team_bau_millets", name: "Marua Superfoods Circle", lead: "Pooja Bhengra", membersCount: 4, domain: "Tribal Millet Aggregation" }
    ],
    activeChallengesCount: 9,
    solutionsImplemented: 6,
    matchKeywords: ["agriculture", "crop", "irrigation", "lac", "tussar", "silk", "tribal livelihood", "soil", "millet", "kisan"]
  },
  {
    id: "hei_ranchi_univ",
    name: "Ranchi University",
    shortName: "Ranchi University",
    location: "Ranchi, Jharkhand",
    type: "State University",
    established: 1960,
    verified: true,
    logoText: "RU",
    primaryExpertise: [
      "Tribal & Regional Languages (TRL)",
      "Sociology & Community Development",
      "Applied Botany & Medicinal Flora",
      "Mass Communication & Public Awareness"
    ],
    faculties: [
      { id: "f12", name: "Prof. Karma Oraon (Chair)", department: "Tribal & Regional Studies", email: "tribal@ranchiuniversity.ac.in", activeProjects: 2 }
    ],
    studentTeams: [
      { id: "team_ru_lang", name: "BhashaSetu Team (Mundari & Kurukh NLP)", lead: "Suman Topno", membersCount: 5, domain: "Tribal Language Translation" }
    ],
    activeChallengesCount: 5,
    solutionsImplemented: 3,
    matchKeywords: ["tribal", "language", "culture", "translation", "handicrafts", "mundari", "santhali", "ho", "kurukh", "education"]
  },
  {
    id: "hei_cuj",
    name: "Central University of Jharkhand (CUJ)",
    shortName: "CUJ Ranchi",
    location: "Brambe / Cheri-Manatu, Ranchi, Jharkhand",
    type: "Central University",
    established: 2009,
    verified: true,
    logoText: "CUJ",
    primaryExpertise: [
      "Energy Engineering & Geoinformatics",
      "Environmental Sciences & Waste Management",
      "Mass Communication",
      "Water Engineering and Management"
    ],
    faculties: [
      { id: "f13", name: "Dr. Manoj Kumar", department: "Center for Environmental Sciences", email: "manoj.kumar@cuj.ac.in", activeProjects: 3 }
    ],
    studentTeams: [
      { id: "team_cuj_biogas", name: "CleanEnergy CUJ", lead: "Aakash Singh", membersCount: 4, domain: "Community Biogas Digesters" }
    ],
    activeChallengesCount: 6,
    solutionsImplemented: 2,
    matchKeywords: ["biogas", "waste management", "geoinformatics", "groundwater", "solar", "sanitation"]
  },
  {
    id: "hei_aiims_deoghar",
    name: "All India Institute of Medical Sciences (AIIMS) Deoghar",
    shortName: "AIIMS Deoghar",
    location: "Devipur, Deoghar, Jharkhand",
    type: "Institute of National Importance (INI)",
    established: 2019,
    verified: true,
    logoText: "AIIMS",
    primaryExpertise: [
      "Community Medicine & Rural Tele-Health",
      "Maternal & Child Nutrition",
      "Tropical Disease & Vector Control",
      "Emergency Trauma & Triage Systems"
    ],
    faculties: [
      { id: "f14", name: "Dr. Arvind K. Jha", department: "Community & Family Medicine", email: "drjha@aiimsdeoghar.edu.in", activeProjects: 3 }
    ],
    studentTeams: [
      { id: "team_aiims_tele", name: "Gramin Arogya Vani", lead: "Dr. Shikha Kumari", membersCount: 4, domain: "AI Tele-Triage for PHCs" }
    ],
    activeChallengesCount: 5,
    solutionsImplemented: 2,
    matchKeywords: ["health", "hospital", "telemedicine", "phc", "malnutrition", "vaccination", "ambulance", "doctor", "medicine"]
  }
];
