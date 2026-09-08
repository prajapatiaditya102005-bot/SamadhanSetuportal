import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { runAITriage } from '../services/aiService';
import { JHARKHAND_DISTRICTS } from '../data/districtsData';

const ChallengeContext = createContext();

export const ChallengeProvider = ({ children }) => {
  const [challenges, setChallenges] = useState(() => storageService.getChallenges());
  const [selectedChallengeId, setSelectedChallengeId] = useState(null);
  const [filterDistrict, setFilterDistrict] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    storageService.saveChallenges(challenges);
  }, [challenges]);

  // Create New Challenge with Automated AI Triage
  const createChallenge = (formData, user) => {
    // Determine district coordinates if not picked
    const distData = JHARKHAND_DISTRICTS.find(d => d.name.toLowerCase().includes((formData.district || '').toLowerCase())) || JHARKHAND_DISTRICTS[0];
    const coords = formData.locationCoordinates || {
      lat: distData.lat + (Math.random() * 0.04 - 0.02),
      lng: distData.lng + (Math.random() * 0.04 - 0.02)
    };

    // Run AI Triage
    const aiResult = runAITriage({
      title: formData.title,
      description: formData.description,
      category: formData.category,
      district: formData.district,
      urgency: formData.urgency || "Medium",
      affectedPopulation: formData.affectedPopulation || 500
    }, challenges);

    const newIdNumber = challenges.length + 1;
    const challengeId = `CH-JH-2026-${String(newIdNumber).padStart(3, '0')}`;

    const newChallenge = {
      id: challengeId,
      title: formData.title,
      description: formData.description,
      category: aiResult.category || formData.category || "Other",
      district: formData.district || "Ranchi",
      block: formData.block || "Sadar",
      village: formData.village || "Main Village",
      locationCoordinates: coords,
      urgency: formData.urgency || aiResult.priority || "Medium",
      affectedPopulation: parseInt(formData.affectedPopulation) || 350,
      supportingCitizensCount: 1, // Submitter is 1st supporter
      status: "Submitted",
      submissionDate: new Date().toISOString().split('T')[0],
      submittedBy: {
        name: user?.name || "Anonymous Citizen",
        role: user?.roleLabel || "Citizen",
        contact: formData.contactNumber || user?.phone || "+91 94311 00000",
        email: formData.email || user?.email || "citizen@jharkhand.gov.in"
      },
      images: formData.images?.length ? formData.images : [
        "https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?w=600&auto=format&fit=crop&q=80"
      ],
      documents: formData.documents?.length ? formData.documents : ["Community_Petition_Document.pdf"],
      aiAnalysis: aiResult,
      validationDetails: null,
      assignedInstitution: null,
      industryCollaboration: null,
      csrPartner: null,
      projectMilestones: [],
      comments: [
        {
          id: `c_init_${Date.now()}`,
          authorName: user?.name || "Citizen Submitter",
          role: "Citizen Submitter",
          date: new Date().toISOString().split('T')[0],
          text: `Challenge registered for ${formData.district}. Requesting prompt administrative & university review.`
        }
      ],
      endorsements: [
        {
          userName: user?.name || "Citizen Submitter",
          village: formData.village || "Local Area",
          date: new Date().toISOString().split('T')[0],
          note: "Initiated the challenge report."
        }
      ]
    };

    setChallenges(prev => [newChallenge, ...prev]);
    return newChallenge;
  };

  // "I AM ALSO AFFECTED" Endorsement
  const supportChallenge = (challengeId, endorsementData = {}, user = null) => {
    setChallenges(prev => prev.map(ch => {
      if (ch.id === challengeId) {
        const newSupporterCount = (ch.supportingCitizensCount || 0) + 1;
        const newEndorsement = {
          userName: user?.name || endorsementData.userName || "Verified Resident",
          village: endorsementData.village || user?.village || ch.village,
          date: new Date().toISOString().split('T')[0],
          note: endorsementData.note || "I am also facing this issue in our area and strongly support prompt resolution."
        };

        const newComment = endorsementData.note ? {
          id: `c_${Date.now()}`,
          authorName: user?.name || endorsementData.userName || "Affected Citizen",
          role: "Endorsing Citizen",
          date: new Date().toISOString().split('T')[0],
          text: endorsementData.note
        } : null;

        return {
          ...ch,
          supportingCitizensCount: newSupporterCount,
          endorsements: [newEndorsement, ...(ch.endorsements || [])],
          comments: newComment ? [newComment, ...(ch.comments || [])] : ch.comments
        };
      }
      return ch;
    }));
  };

  // Add Comment
  const addComment = (challengeId, text, authorName, role) => {
    const newComment = {
      id: `c_${Date.now()}`,
      authorName: authorName || "Community Member",
      role: role || "User",
      date: new Date().toISOString().split('T')[0],
      text
    };

    setChallenges(prev => prev.map(ch => {
      if (ch.id === challengeId) {
        return {
          ...ch,
          comments: [newComment, ...(ch.comments || [])]
        };
      }
      return ch;
    }));
  };

  // Government Validation Action
  const validateChallenge = (challengeId, action, details = {}) => {
    setChallenges(prev => prev.map(ch => {
      if (ch.id === challengeId) {
        if (action === 'validate') {
          return {
            ...ch,
            status: "Validated",
            urgency: details.priority || ch.urgency,
            validationDetails: {
              validatedBy: details.officerName || "Govt Nodal Officer",
              validatedAt: new Date().toISOString().split('T')[0],
              assignedDepartment: details.department || ch.aiAnalysis?.category || "General Administration",
              govtPriorityScore: details.priority ? `${details.priority} Priority Tier` : "Validated Standard",
              govtComments: details.comments || "Challenge verified on-ground. Authorized for academic-industry collaboration."
            }
          };
        } else if (action === 'reject') {
          return {
            ...ch,
            status: "Rejected",
            validationDetails: {
              validatedBy: details.officerName || "Govt Nodal Officer",
              validatedAt: new Date().toISOString().split('T')[0],
              govtComments: details.comments || "Challenge did not meet verification criteria or is covered under existing departmental scheme."
            }
          };
        }
      }
      return ch;
    }));
  };

  // University / HEI Accepts Challenge & Assigns Team
  const acceptChallengeByHEI = (challengeId, heiData, facultyData, teamData) => {
    setChallenges(prev => prev.map(ch => {
      if (ch.id === challengeId) {
        const initialMilestones = [
          { id: `m_${Date.now()}_1`, title: "Field Baseline Survey & Problem Mapping", status: "In Progress", dueDate: "2026-03-25", completedDate: null, progress: 30 },
          { id: `m_${Date.now()}_2`, title: "CAD / Algorithm Solution Design Architecture", status: "Pending", dueDate: "2026-04-10", completedDate: null, progress: 0 },
          { id: `m_${Date.now()}_3`, title: "Benchtop Prototype Fabrication & Lab Validation", status: "Pending", dueDate: "2026-04-30", completedDate: null, progress: 0 },
          { id: `m_${Date.now()}_4`, title: "Village/Ward Pilot Deployment & Field Testing", status: "Pending", dueDate: "2026-05-20", completedDate: null, progress: 0 },
          { id: `m_${Date.now()}_5`, title: "Social Impact & Economic ROI Measurement", status: "Pending", dueDate: "2026-06-15", completedDate: null, progress: 0 }
        ];

        return {
          ...ch,
          status: "In Progress",
          assignedInstitution: {
            institutionId: heiData.institutionId || "hei_bit_mesra",
            institutionName: heiData.institutionName || "BIT Mesra",
            assignedDepartment: heiData.department || "Innovation & Research Cell",
            assignedDate: new Date().toISOString().split('T')[0],
            facultyMentor: facultyData || {
              name: "Dr. Alok Kumar Verma",
              department: "Civil & Environmental Engineering",
              email: "faculty@university.edu.in"
            },
            studentTeam: teamData || {
              teamName: "Samadhan Innovators Squad",
              lead: "Student Lead",
              members: ["Lead", "Member 1", "Member 2", "Member 3"],
              proposalTitle: `Technological Intervention for ${ch.title}`
            }
          },
          projectMilestones: initialMilestones
        };
      }
      return ch;
    }));
  };

  // Update Project Milestone
  const updateProjectMilestone = (challengeId, milestoneId, progress, newStatus) => {
    setChallenges(prev => prev.map(ch => {
      if (ch.id === challengeId && ch.projectMilestones) {
        const updatedMilestones = ch.projectMilestones.map(m => {
          if (m.id === milestoneId) {
            return {
              ...m,
              progress: progress !== undefined ? progress : m.progress,
              status: newStatus || (progress >= 100 ? "Completed" : "In Progress"),
              completedDate: progress >= 100 ? new Date().toISOString().split('T')[0] : null
            };
          }
          return m;
        });

        // Calculate overall lifecycle advancement
        const allCompleted = updatedMilestones.every(m => m.status === 'Completed');
        const hasProgress = updatedMilestones.some(m => m.status === 'In Progress' || m.status === 'Completed');

        let advancedStatus = ch.status;
        if (allCompleted) advancedStatus = "Impact Measured";
        else if (updatedMilestones[3]?.status === 'In Progress' || updatedMilestones[3]?.status === 'Completed') advancedStatus = "Pilot Testing";
        else if (updatedMilestones[1]?.status === 'Completed') advancedStatus = "Solution Proposed";

        return {
          ...ch,
          status: advancedStatus,
          projectMilestones: updatedMilestones
        };
      }
      return ch;
    }));
  };

  // Student Submits Prototype / Solution
  const submitSolutionProposal = (challengeId, proposalData) => {
    setChallenges(prev => prev.map(ch => {
      if (ch.id === challengeId) {
        return {
          ...ch,
          status: "Solution Proposed",
          assignedInstitution: {
            ...ch.assignedInstitution,
            studentTeam: {
              ...(ch.assignedInstitution?.studentTeam || {}),
              proposalTitle: proposalData.proposalTitle || ch.assignedInstitution?.studentTeam?.proposalTitle,
              solutionAbstract: proposalData.solutionAbstract,
              prototypeLink: proposalData.prototypeLink,
              costEstimate: proposalData.costEstimate,
              timelineMonths: proposalData.timelineMonths
            }
          }
        };
      }
      return ch;
    }));
  };

  // Industry / CSR Support Offer
  const offerIndustrySupport = (challengeId, supportData) => {
    setChallenges(prev => prev.map(ch => {
      if (ch.id === challengeId) {
        const isCsr = supportData.isCsr;
        const updated = { ...ch };
        
        if (isCsr) {
          updated.csrPartner = {
            partnerId: supportData.partnerId,
            partnerName: supportData.partnerName,
            fundAllocated: supportData.fundAmount || "₹5,00,000",
            sdgAligned: supportData.sdg || "SDG 6 / SDG 11",
            date: new Date().toISOString().split('T')[0]
          };
        } else {
          updated.industryCollaboration = {
            partnerId: supportData.partnerId,
            partnerName: supportData.partnerName,
            supportOffered: supportData.supportTypes || ["Funding", "Testing"],
            grantAmount: supportData.grantAmount || "₹3,50,000",
            status: "Active Collaboration",
            mentorAssigned: supportData.mentorName || "Industry Lead Specialist",
            date: new Date().toISOString().split('T')[0]
          };
        }

        if (updated.status === "Assigned to Institution" || updated.status === "Solution Proposed") {
          updated.status = "Pilot Testing";
        }

        return updated;
      }
      return ch;
    }));
  };

  // Direct Lifecycle Stage Transition
  const updateLifecycleStatus = (challengeId, newStatus) => {
    setChallenges(prev => prev.map(ch => ch.id === challengeId ? { ...ch, status: newStatus } : ch));
  };

  // Reset to initial demo challenges
  const resetDemoData = () => {
    const data = storageService.resetChallenges();
    setChallenges(data);
  };

  // Filtered challenges list
  const filteredChallenges = challenges.filter(ch => {
    const matchesDistrict = filterDistrict === 'all' || ch.district?.toLowerCase().includes(filterDistrict.toLowerCase());
    const matchesCategory = filterCategory === 'all' || ch.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || ch.status === filterStatus;
    const matchesSearch = !searchQuery || 
      ch.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      ch.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.id.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDistrict && matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <ChallengeContext.Provider
      value={{
        challenges,
        filteredChallenges,
        selectedChallengeId,
        setSelectedChallengeId,
        filterDistrict,
        setFilterDistrict,
        filterCategory,
        setFilterCategory,
        filterStatus,
        setFilterStatus,
        searchQuery,
        setSearchQuery,
        createChallenge,
        supportChallenge,
        addComment,
        validateChallenge,
        acceptChallengeByHEI,
        updateProjectMilestone,
        submitSolutionProposal,
        offerIndustrySupport,
        updateLifecycleStatus,
        resetDemoData
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
};

export const useChallenges = () => {
  const context = useContext(ChallengeContext);
  if (!context) {
    throw new Error('useChallenges must be used within a ChallengeProvider');
  }
  return context;
};
