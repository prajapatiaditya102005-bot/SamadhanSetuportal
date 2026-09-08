// Demo credentials and user profiles for all 8 roles
export const DEMO_ROLES = [
  {
    roleId: "citizen",
    roleName: "Citizen / Community Member",
    hindiTitle: "नागरिक / समुदाय",
    icon: "User",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    description: "Report localized village/ward problems, drop map pins, vote on challenges, and track live resolution progress.",
    sampleUser: {
      id: "usr_cit_01",
      name: "Citizen",
      role: "citizen",
      roleLabel: "Citizen | Jharkhand",
      email: "citizen@samadhansetu.in",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      district: "Jharkhand",
      block: "Local Ward",
      village: "Jharkhand",
      phone: "+91 94311 00000",
      isRegistered: false,
      submittedChallengesCount: 0,
      supportedChallengesCount: 0,
      resolvedCount: 0,
      inProgressCount: 0
    }
  },
  {
    roleId: "government",
    roleName: "Government Department Official",
    hindiTitle: "सरकारी विभाग अधिकारी",
    icon: "Landmark",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    description: "Validate citizen grievances, set emergency priorities, allocate departmental funds, and oversee multi-district project delivery.",
    sampleUser: {
      id: "usr_govt_01",
      name: "Sanjay Kumar IAS",
      role: "government",
      roleLabel: "Joint Secretary, Rural Development & Sanitation",
      department: "Drinking Water & Sanitation Department",
      email: "sanjay.kumar.ias@jharkhand.gov.in",
      avatar: "🏛️",
      officeLocation: "Project Building, Dhurwa, Ranchi",
      jurisdiction: "All 24 Districts of Jharkhand",
      pendingValidationsCount: 6,
      approvedProjectsCount: 18
    }
  },
  {
    roleId: "hei_admin",
    roleName: "Higher Education Institution (HEI)",
    hindiTitle: "उच्च शिक्षण संस्थान (विश्वविद्यालय)",
    icon: "School",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
    description: "Receive AI-matched challenges for your university, accept research scopes, appoint faculty leads, and form student teams.",
    sampleUser: {
      id: "usr_hei_01",
      name: "Dr. Alok Kumar Verma",
      role: "hei_admin",
      roleLabel: "Dean of R&D & Innovation Lead",
      institutionId: "hei_bit_mesra",
      institutionName: "Birla Institute of Technology (BIT) Mesra",
      email: "dean.rd@bitmesra.ac.in",
      avatar: "🎓",
      campusLocation: "Mesra, Ranchi",
      activeInstitutionalProjects: 8,
      assignedFacultyCount: 14
    }
  },
  {
    roleId: "faculty",
    roleName: "Faculty / Academic Mentor",
    hindiTitle: "प्राध्यापक / शोध मार्गदर्शक",
    icon: "GraduationCap",
    badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
    description: "Mentor multidisciplinary student teams, approve technical milestones, review prototypes, and coordinate with industry sponsors.",
    sampleUser: {
      id: "usr_fac_01",
      name: "Dr. Sunita Murmu",
      role: "faculty",
      roleLabel: "Associate Professor, Remote Sensing & Environmental Engg",
      institutionName: "BIT Mesra / Ranchi University",
      email: "smurmu@bitmesra.ac.in",
      avatar: "👩‍🏫",
      domainSpecialization: "Water Table Geo-Mapping & Fluoride Adsorption",
      activeMentoredTeams: 3,
      publishedPapersCount: 24
    }
  },
  {
    roleId: "student",
    roleName: "Student / Innovation Team",
    hindiTitle: "छात्र / नवाचार टीम",
    icon: "Lightbulb",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    description: "Work on real Jharkhand societal problems, build prototypes, update milestone tasks, and submit tested solutions.",
    sampleUser: {
      id: "usr_stu_01",
      name: "Abhishek Pandey & Team JalSetu",
      role: "student",
      roleLabel: "Team Lead - B.Tech Final Year (Team JalSetu)",
      institutionName: "BIT Mesra",
      email: "abhishek.jalsetu@bitmesra.ac.in",
      avatar: "🚀",
      teamSize: 5,
      currentProject: "Low-Cost Indigenous Fluoride Removal Filter for Chaibasa",
      milestonesCompleted: "3 of 5",
      rewardPoints: 850
    }
  },
  {
    roleId: "industry",
    roleName: "Industry / Startup / MSME",
    hindiTitle: "उद्योग / स्टार्टअप / एमएसएमई",
    icon: "Building2",
    badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-200",
    description: "Browse validated university projects, offer prototyping grants, provide lab testing or manufacturing, and scale solutions.",
    sampleUser: {
      id: "usr_ind_01",
      name: "Siddharth Kaushik",
      role: "industry",
      roleLabel: "Head - Sustainable Innovation & Corporate Partnerships",
      companyName: "Tata Steel Foundation & Innovation Hub",
      email: "siddharth.k@tatasteel.com",
      avatar: "🏭",
      industrySector: "Steel, Mining & Rural Infrastructure",
      activeCollaborations: 4,
      totalGrantsDisbursed: "₹45,00,000"
    }
  },
  {
    roleId: "csr",
    roleName: "CSR / Research / Innovation Partner",
    hindiTitle: "सीएसआर / अनुसंधान भागीदार",
    icon: "HeartHandshake",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
    description: "Target high-impact grassroots challenges matching SDG goals, pledge CSR funds, and track real-time social return on investment.",
    sampleUser: {
      id: "usr_csr_01",
      name: "Dr. Sunayana Verma",
      role: "csr",
      roleLabel: "CSR Executive Director",
      organizationName: "JSPL CSR & Community Foundation",
      email: "csr.jharkhand@jindalsteel.com",
      avatar: "🤝",
      allocatedBudget: "₹1,50,00,000",
      sdgPillars: ["SDG 6 (Clean Water)", "SDG 3 (Health)", "SDG 9 (Innovation)"],
      fundedProjectsCount: 5
    }
  },
  {
    roleId: "admin",
    roleName: "Platform Administrator",
    hindiTitle: "प्लेटफ़ॉर्म प्रशासक",
    icon: "ShieldCheck",
    badgeColor: "bg-slate-800 text-white border-slate-700",
    description: "Full system governance: verify institutions/industries, configure AI triage rules, moderate reports, and view statewide metrics.",
    sampleUser: {
      id: "usr_adm_01",
      name: "Amitabh Sen",
      role: "admin",
      roleLabel: "Chief System Administrator - Samadhan Setu",
      email: "admin@samadhansetu.jharkhand.gov.in",
      avatar: "🛡️",
      jurisdiction: "State Command & Control Center, Ranchi",
      systemHealth: "Optimal (99.9% Uptime)",
      totalEcosystemUsers: 4850
    }
  }
];

export const getDemoUserByRole = (roleId) => {
  const role = DEMO_ROLES.find(r => r.roleId === roleId);
  return role ? role.sampleUser : DEMO_ROLES[0].sampleUser;
};
