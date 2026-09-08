import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useChallenges } from '../../../context/ChallengeContext';
import { StatCard } from '../../../components/common/StatCard';
import { StatusBadge } from '../../../components/common/StatusBadge';
import { LifecycleTimeline } from '../../../components/challenges/LifecycleTimeline';
import { 
  GraduationCap, 
  Users, 
  CheckCircle2, 
  MessageSquare, 
  FileText, 
  Upload, 
  Briefcase, 
  Layers, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const FacultyDashboard = ({ onSelectChallenge }) => {
  const { currentUser } = useAuth();
  const { challenges, updateProjectMilestone, addComment } = useChallenges();
  const [activeTab, setActiveTab] = useState('projects'); // projects, teams, milestones, proposals, documents, industry
  const [feedbackInput, setFeedbackInput] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [successToast, setSuccessToast] = useState('');

  // Mentored challenges
  const mentoredChallenges = challenges.filter(c => 
    c.assignedInstitution?.facultyMentor?.name?.toLowerCase().includes(currentUser?.name?.toLowerCase() || '') ||
    c.status === 'In Progress' ||
    c.status === 'Solution Proposed' ||
    c.status === 'Pilot Testing'
  );

  const activeProject = selectedProjectId ? challenges.find(c => c.id === selectedProjectId) : mentoredChallenges[0];

  const handleApproveMilestone = (challengeId, milestoneId) => {
    updateProjectMilestone(challengeId, milestoneId, 100, 'Completed');
    setSuccessToast(`Milestone approved! Milestone marked as Completed (100%).`);

    try {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
    } catch (e) {}

    setTimeout(() => setSuccessToast(''), 3000);
  };

  const handleSendFacultyFeedback = (challengeId) => {
    if (!feedbackInput.trim()) return;
    addComment(challengeId, feedbackInput, currentUser.name, `Faculty Mentor (${currentUser.domainSpecialization || 'BIT Mesra'})`);
    setFeedbackInput('');
    setSuccessToast(`Faculty feedback sent to student innovation squad.`);
    setTimeout(() => setSuccessToast(''), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Faculty Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-brand-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-800/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👩‍🏫</span>
              <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-indigo-400/30">
                Faculty Mentorship Desk • प्राध्यापक शोध प्रकोष्ठ
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {currentUser.name}
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200 max-w-2xl">
              {currentUser.roleLabel} • Specialization: <strong>{currentUser.domainSpecialization || 'Environmental Hydrology & Water Treatment'}</strong>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center text-xs shrink-0">
            <div className="bg-white/10 p-3 rounded-2xl border border-white/10">
              <span className="text-[10px] text-indigo-200 block uppercase">Mentored Squads</span>
              <strong className="text-xl font-bold text-amber-300 font-mono">{mentoredChallenges.length}</strong>
            </div>
            <div className="bg-white/10 p-3 rounded-2xl border border-white/10">
              <span className="text-[10px] text-indigo-200 block uppercase">Patents / Papers</span>
              <strong className="text-xl font-bold text-emerald-400 font-mono">24</strong>
            </div>
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
          { id: 'projects', label: `Mentored Projects (${mentoredChallenges.length})`, icon: Layers },
          { id: 'milestones', label: 'Milestone Approvals', icon: CheckCircle2 },
          { id: 'proposals', label: 'Proposal Reviews', icon: FileText },
          { id: 'documents', label: 'Research Papers & Specs', icon: Upload },
          { id: 'industry', label: 'Industry Mentors Link', icon: Briefcase }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition shrink-0 ${
                isActive 
                  ? 'bg-indigo-900 text-white shadow-xs font-bold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: MENTORED PROJECTS */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left list */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900">Assigned Student Squads</h3>
              {mentoredChallenges.map(ch => {
                const isSelected = activeProject?.id === ch.id;
                return (
                  <div
                    key={ch.id}
                    onClick={() => setSelectedProjectId(ch.id)}
                    className={`p-4 rounded-2xl border transition cursor-pointer text-xs space-y-2 ${
                      isSelected
                        ? 'bg-indigo-50 border-indigo-700 shadow-md ring-2 ring-indigo-700/20'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-slate-700">{ch.id}</span>
                      <StatusBadge status={ch.status} size="sm" />
                    </div>
                    <h4 className="font-bold text-slate-900 line-clamp-2">{ch.title}</h4>
                    <p className="text-indigo-800 font-semibold text-[11px]">
                      Team: {ch.assignedInstitution?.studentTeam?.teamName || "Team JalSetu"}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Right details */}
            <div className="lg:col-span-2">
              {activeProject ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-xs">
                  <div className="border-b border-slate-200 pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded">
                        {activeProject.id}
                      </span>
                      <StatusBadge status={activeProject.status} />
                    </div>
                    <h2 className="text-lg font-bold text-slate-900">{activeProject.title}</h2>
                    <p className="text-xs text-slate-500 mt-1">📍 {activeProject.village}, {activeProject.district}</p>
                  </div>

                  <LifecycleTimeline currentStatus={activeProject.status} />

                  {/* Student Team Abstract */}
                  <div className="bg-indigo-50/60 rounded-2xl p-4 border border-indigo-100 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-indigo-700">Student Solution Proposal:</span>
                      <span className="font-bold text-indigo-900">{activeProject.assignedInstitution?.studentTeam?.teamName}</span>
                    </div>
                    <h4 className="font-bold text-slate-900">
                      {activeProject.assignedInstitution?.studentTeam?.proposalTitle || "Biochar Adsorption Filter Design"}
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      Lead: <strong>{activeProject.assignedInstitution?.studentTeam?.lead}</strong> • Members: {activeProject.assignedInstitution?.studentTeam?.members?.join(', ')}
                    </p>
                  </div>

                  {/* Milestones Approval Table */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Technical Milestones & Verification:
                    </h4>
                    <div className="space-y-2">
                      {(activeProject.projectMilestones || []).map(m => (
                        <div key={m.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                          <div>
                            <p className="font-bold text-slate-900">{m.title}</p>
                            <p className="text-slate-500 text-[11px]">Due: {m.dueDate} • Current Progress: {m.progress}%</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {m.status === 'Completed' ? (
                              <span className="bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-lg flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Approved</span>
                              </span>
                            ) : (
                              <button
                                onClick={() => handleApproveMilestone(activeProject.id, m.id)}
                                className="bg-indigo-800 hover:bg-indigo-900 text-white font-bold px-3 py-1.5 rounded-lg shadow-2xs"
                              >
                                Approve Milestone ✓
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Faculty Direct Guidance Box */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                    <h4 className="text-xs font-bold text-slate-800 uppercase">
                      Post Mentor Feedback & Academic Advice:
                    </h4>
                    <textarea
                      rows={2}
                      value={feedbackInput}
                      onChange={(e) => setFeedbackInput(e.target.value)}
                      placeholder="e.g. Ensure laterite adsorption bed height is tested for 20 L/hr hydraulic flow rate before assembling the full container..."
                      className="w-full p-2.5 text-xs rounded-xl border border-slate-300 bg-white"
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleSendFacultyFeedback(activeProject.id)}
                        className="bg-indigo-900 text-white font-bold text-xs px-4 py-2 rounded-xl"
                      >
                        Submit Feedback to Students
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MILESTONES */}
      {activeTab === 'milestones' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900">Milestone Review & Quality Gate</h3>
          <p className="text-xs text-slate-500">
            Faculty approvals are required before student prototypes move to field testing with industry sponsors.
          </p>
          <div className="space-y-3">
            {mentoredChallenges.map(ch => (
              <div key={ch.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between items-center font-bold text-slate-900">
                  <span>{ch.title}</span>
                  <StatusBadge status={ch.status} size="sm" />
                </div>
                <p className="text-slate-600">Active Squad: {ch.assignedInstitution?.studentTeam?.teamName}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PROPOSALS */}
      {activeTab === 'proposals' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900">Submitted R&D Proposals</h3>
          <div className="space-y-3 text-xs">
            {mentoredChallenges.map(ch => (
              <div key={ch.id} className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 space-y-2">
                <div className="flex justify-between items-center font-bold text-indigo-950">
                  <span>{ch.assignedInstitution?.studentTeam?.proposalTitle || "Societal Solution Proposal"}</span>
                  <span className="text-indigo-700 font-mono">Challenge #{ch.id}</span>
                </div>
                <p className="text-slate-600">{ch.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: DOCUMENTS */}
      {activeTab === 'documents' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900">Research Documents & Standards</h3>
          <div className="p-8 border-2 border-dashed border-slate-300 rounded-2xl text-center space-y-2 cursor-pointer hover:bg-slate-50">
            <Upload className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-xs font-bold text-slate-800">Upload Research Papers, CAD Schematics, or BIS Standards</p>
            <p className="text-[11px] text-slate-500">Supported: .pdf, .dwg, .docx, .zip</p>
          </div>
        </div>
      )}

      {/* TAB 5: INDUSTRY MENTORS */}
      {activeTab === 'industry' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">Industry Technical Advisors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mentoredChallenges.filter(c => c.industryCollaboration).map(ch => (
              <div key={ch.id} className="bg-white rounded-2xl border border-cyan-200 p-5 space-y-3 text-xs">
                <div className="flex justify-between items-center font-bold text-cyan-950">
                  <span>{ch.industryCollaboration.partnerName}</span>
                  <span className="text-emerald-700">{ch.industryCollaboration.grantAmount}</span>
                </div>
                <p className="text-slate-600">Assigned Advisor: <strong>{ch.industryCollaboration.mentorAssigned}</strong></p>
                <p className="text-slate-500">Project: {ch.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
