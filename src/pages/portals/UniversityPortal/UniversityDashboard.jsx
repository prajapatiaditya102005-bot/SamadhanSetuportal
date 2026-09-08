import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useChallenges } from '../../../context/ChallengeContext';
import { StatCard } from '../../../components/common/StatCard';
import { StatusBadge } from '../../../components/common/StatusBadge';
import { PriorityBadge } from '../../../components/common/PriorityBadge';
import { AIAnalysisCard } from '../../../components/ai/AIAnalysisCard';
import { INSTITUTIONS } from '../../../data/institutionsData';
import { INDUSTRY_PARTNERS } from '../../../data/industryPartnersData';
import { 
  School, 
  CheckCircle2, 
  XCircle, 
  Users, 
  UserPlus, 
  Briefcase, 
  Lightbulb, 
  FileText, 
  Layers, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const UniversityDashboard = ({ onSelectChallenge }) => {
  const { currentUser } = useAuth();
  const { challenges, acceptChallengeByHEI, updateLifecycleStatus } = useChallenges();
  const [activeTab, setActiveTab] = useState('matched'); // matched, active-projects, faculty, teams, industry, proposals
  
  // Modal for team formation
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [selectedChallengeToAccept, setSelectedChallengeToAccept] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [teamName, setTeamName] = useState('');
  const [teamLead, setTeamLead] = useState('');
  const [teamMembers, setTeamMembers] = useState('');
  const [proposalTitle, setProposalTitle] = useState('');
  const [successToast, setSuccessToast] = useState('');

  const currentInstitution = INSTITUTIONS.find(i => i.id === currentUser?.institutionId) || INSTITUTIONS[0];

  // Matched challenges (either suggested by AI or assigned)
  const matchedChallenges = challenges.filter(c => {
    const isAssigned = c.assignedInstitution?.institutionId === currentInstitution.id || c.assignedInstitution?.institutionName?.includes(currentInstitution.shortName);
    const isRecommended = c.aiAnalysis?.recommendedInstitutions?.some(r => r.institutionId === currentInstitution.id || r.institutionName?.includes(currentInstitution.shortName));
    return (isAssigned || isRecommended) && c.status !== 'Rejected';
  });

  const activeProjects = challenges.filter(c => 
    c.assignedInstitution?.institutionId === currentInstitution.id ||
    c.assignedInstitution?.institutionName?.includes(currentInstitution.shortName)
  );

  const handleOpenTeamModal = (challenge) => {
    setSelectedChallengeToAccept(challenge);
    setSelectedFaculty(currentInstitution.faculties[0]?.name || '');
    setTeamName(`Team ${challenge.category} Innovators`);
    setTeamLead('Abhishek Pandey');
    setTeamMembers('Abhishek Pandey (Lead), Priya Murmu (Bio-Engg), Karan Saw (Mechanical), Sana Parveen (Electronics)');
    setProposalTitle(`Low-Cost Technological Intervention for ${challenge.title.slice(0, 45)}...`);
    setTeamModalOpen(true);
  };

  const handleAcceptAndFormTeam = (e) => {
    e.preventDefault();
    if (!selectedChallengeToAccept) return;

    const facultyObj = currentInstitution.faculties.find(f => f.name === selectedFaculty) || currentInstitution.faculties[0];

    acceptChallengeByHEI(
      selectedChallengeToAccept.id,
      {
        institutionId: currentInstitution.id,
        institutionName: currentInstitution.name,
        department: facultyObj.department
      },
      {
        id: facultyObj.id,
        name: facultyObj.name,
        department: facultyObj.department,
        email: facultyObj.email
      },
      {
        teamName,
        lead: teamLead,
        members: teamMembers.split(',').map(m => m.trim()),
        proposalTitle
      }
    );

    setSuccessToast(`Challenge #${selectedChallengeToAccept.id} Accepted! Multidisciplinary team '${teamName}' formed.`);
    setTeamModalOpen(false);
    setActiveTab('active-projects');

    try {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}

    setTimeout(() => setSuccessToast(''), 3500);
  };

  return (
    <div className="space-y-6">
      
      {/* HEI Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-brand-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-purple-800/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎓</span>
              <span className="bg-purple-500/20 text-purple-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-purple-400/30">
                HEI Innovation & R&D Portal • विश्वविद्यालय अनुसंधान केंद्र
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {currentInstitution.name}
            </h1>
            <p className="text-xs sm:text-sm text-purple-200 max-w-2xl">
              Logged in as: <strong>{currentUser.name}</strong> ({currentUser.roleLabel}) • {currentInstitution.location}
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-purple-300">
              <span className="font-semibold">Core Research Expertise:</span>
              {currentInstitution.primaryExpertise.slice(0, 3).map((exp, i) => (
                <span key={i} className="bg-white/10 px-2 py-0.5 rounded text-[11px] text-white">
                  {exp}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xs px-5 py-3 rounded-2xl border border-white/10 text-center shrink-0">
            <span className="text-[10px] text-purple-200 uppercase font-semibold block">Matched Challenges</span>
            <span className="text-2xl font-bold text-amber-300 font-mono">{matchedChallenges.length}</span>
            <span className="text-[10px] text-emerald-400 block mt-0.5">High AI Synergy</span>
          </div>
        </div>
      </div>

      {successToast && (
        <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-between shadow-xs animate-in fade-in">
          <span>✓ {successToast}</span>
          <button onClick={() => setSuccessToast('')} className="text-emerald-700">✕</button>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-semibold">
        {[
          { id: 'matched', label: `Matched Challenges (${matchedChallenges.length})`, icon: Sparkles },
          { id: 'active-projects', label: `Active HEI Projects (${activeProjects.length})`, icon: Layers },
          { id: 'faculty', label: `Faculty & Expertise (${currentInstitution.faculties.length})`, icon: Users },
          { id: 'teams', label: `Student Teams (${currentInstitution.studentTeams.length})`, icon: Lightbulb },
          { id: 'industry', label: 'Industry & CSR Tie-ups', icon: Briefcase },
          { id: 'proposals', label: 'Research Proposals & Patents', icon: FileText }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition shrink-0 ${
                isActive 
                  ? 'bg-purple-900 text-white shadow-xs font-bold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: MATCHED CHALLENGES */}
      {activeTab === 'matched' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>Challenges Matched with {currentInstitution.shortName}</span>
                <span className="text-xs bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full font-bold">
                  AI Recommendation Feed
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Ranked by institutional domain expertise, laboratory capability, and geographic proximity.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {matchedChallenges.map(ch => {
              const matchScore = ch.aiAnalysis?.recommendedInstitutions?.find(r => r.institutionId === currentInstitution.id)?.matchScore || 92;
              const isAccepted = ch.assignedInstitution?.institutionId === currentInstitution.id;

              return (
                <div key={ch.id} className="bg-white rounded-2xl border border-purple-200/80 p-5 space-y-4 shadow-xs flex flex-col justify-between hover:shadow-md transition">
                  <div className="space-y-2.5">
                    
                    {/* Header Row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                          {ch.id}
                        </span>
                        <PriorityBadge priority={ch.urgency} size="sm" />
                      </div>
                      <div className="flex items-center gap-1.5 bg-purple-100 text-purple-900 px-2.5 py-1 rounded-full text-xs font-bold">
                        <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                        <span>{matchScore}% Match</span>
                      </div>
                    </div>

                    <h4 className="text-base font-bold text-slate-900">{ch.title}</h4>
                    <p className="text-xs text-slate-500">📍 {ch.village}, {ch.district}</p>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{ch.description}</p>

                    {/* Required Expertise Pill Box */}
                    <div className="bg-purple-50/60 rounded-xl p-3 border border-purple-100 text-xs">
                      <span className="text-[10px] text-purple-700 font-bold uppercase block mb-1">
                        Required Academic Expertise:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {(ch.aiAnalysis?.recommendedExpertise || []).slice(0, 3).map((exp, idx) => (
                          <span key={idx} className="bg-white text-purple-900 px-2 py-0.5 rounded text-[10px] font-medium border border-purple-200">
                            ✓ {exp}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                      <span>👥 <strong>{ch.affectedPopulation}</strong> Affected Citizens</span>
                      <StatusBadge status={ch.status} size="sm" />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectChallenge(ch.id)}
                      className="text-xs font-bold text-slate-700 hover:text-brand-900"
                    >
                      View Full Details
                    </button>

                    {isAccepted ? (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-xl flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Assigned to Your HEI</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleOpenTeamModal(ch)}
                        className="bg-purple-900 hover:bg-purple-950 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs flex items-center gap-1.5 transition"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Accept Challenge & Form Team</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: ACTIVE PROJECTS */}
      {activeTab === 'active-projects' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">
            Active Research & Innovation Projects ({activeProjects.length})
          </h3>
          <div className="space-y-4">
            {activeProjects.map(ch => (
              <div key={ch.id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-slate-500">{ch.id}</span>
                    <h4 className="text-base font-bold text-slate-900">{ch.title}</h4>
                    <p className="text-xs text-slate-500">📍 {ch.village}, {ch.district}</p>
                  </div>
                  <StatusBadge status={ch.status} size="lg" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-purple-50/50 p-3.5 rounded-xl border border-purple-100">
                  <div>
                    <span className="text-[10px] text-purple-700 uppercase font-semibold block">Faculty Mentor</span>
                    <strong className="text-slate-900">{ch.assignedInstitution?.facultyMentor?.name || "Dr. Verma"}</strong>
                    <p className="text-slate-500 text-[10px]">{ch.assignedInstitution?.facultyMentor?.department}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-purple-700 uppercase font-semibold block">Student Squad</span>
                    <strong className="text-slate-900">{ch.assignedInstitution?.studentTeam?.teamName || "Team JalSetu"}</strong>
                    <p className="text-slate-500 text-[10px]">Lead: {ch.assignedInstitution?.studentTeam?.lead}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-purple-700 uppercase font-semibold block">Corporate Sponsor</span>
                    <strong className="text-slate-900">{ch.industryCollaboration?.partnerName || "Tata Steel Foundation"}</strong>
                    <p className="text-emerald-700 font-bold text-[10px]">{ch.industryCollaboration?.grantAmount || "₹4.5 Lakhs Grant"}</p>
                  </div>
                </div>

                {/* Milestones Progress */}
                {ch.projectMilestones?.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-800 block">Milestones Progress:</span>
                    <div className="space-y-1.5">
                      {ch.projectMilestones.map(m => (
                        <div key={m.id} className="flex items-center justify-between text-xs bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <span className="truncate max-w-[320px]">• {m.title}</span>
                          <span className={`font-bold text-[11px] px-2 py-0.5 rounded ${
                            m.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {m.status} ({m.progress}%)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: FACULTY DIRECTORY */}
      {activeTab === 'faculty' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">
            {currentInstitution.shortName} Faculty Mentors & Research Specializations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentInstitution.faculties.map(fac => (
              <div key={fac.id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{fac.name}</h4>
                    <p className="text-xs text-purple-700 font-medium">{fac.department}</p>
                  </div>
                  <span className="text-xs font-bold bg-purple-100 text-purple-900 px-2.5 py-1 rounded-full">
                    {fac.activeProjects} Active Projects
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono">✉️ {fac.email}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: STUDENT SQUADS */}
      {activeTab === 'teams' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">
            Multidisciplinary Student Innovation Squads
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentInstitution.studentTeams.map(t => (
              <div key={t.id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900">{t.name}</h4>
                  <span className="text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold">
                    {t.membersCount} Members
                  </span>
                </div>
                <p className="text-xs text-slate-600"><strong>Team Lead:</strong> {t.lead}</p>
                <p className="text-xs text-slate-600"><strong>Innovation Focus:</strong> {t.domain}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: INDUSTRY TIE-UPS */}
      {activeTab === 'industry' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">
            Corporate CSR & Startup Prototyping Linkages
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {INDUSTRY_PARTNERS.map(ind => (
              <div key={ind.id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900">{ind.name}</h4>
                  <span className="text-xs text-emerald-700 font-mono font-bold">{ind.totalPledgedAmount}</span>
                </div>
                <p className="text-xs text-slate-600"><strong>Available Support:</strong> {ind.supportTypesOffered.join(', ')}</p>
                <p className="text-xs text-slate-500">Contact: {ind.contactPerson} ({ind.email})</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TEAM FORMATION MODAL */}
      {teamModalOpen && selectedChallengeToAccept && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-purple-200 space-y-5 animate-in fade-in zoom-in-95">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] text-purple-700 uppercase font-bold bg-purple-100 px-2.5 py-0.5 rounded-full">
                Multidisciplinary Team Creation
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Accept Challenge: #{selectedChallengeToAccept.id}
              </h3>
              <p className="text-xs text-slate-500">{selectedChallengeToAccept.title}</p>
            </div>

            <form onSubmit={handleAcceptAndFormTeam} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Assign Lead Faculty Mentor <span className="text-rose-600">*</span>
                </label>
                <select
                  value={selectedFaculty}
                  onChange={(e) => setSelectedFaculty(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium"
                >
                  {currentInstitution.faculties.map(f => (
                    <option key={f.id} value={f.name}>{f.name} ({f.department})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Student Innovation Squad Name <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    Student Team Lead
                  </label>
                  <input
                    type="text"
                    required
                    value={teamLead}
                    onChange={(e) => setTeamLead(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    Squad Members & Departments
                  </label>
                  <input
                    type="text"
                    required
                    value={teamMembers}
                    onChange={(e) => setTeamMembers(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Initial R&D / Technological Proposal Title
                </label>
                <input
                  type="text"
                  required
                  value={proposalTitle}
                  onChange={(e) => setProposalTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setTeamModalOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 font-bold text-white bg-purple-900 hover:bg-purple-950 rounded-xl shadow-md flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Team Assignment</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
