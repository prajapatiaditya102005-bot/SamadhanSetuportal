import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useChallenges } from '../../../context/ChallengeContext';
import { StatCard } from '../../../components/common/StatCard';
import { StatusBadge } from '../../../components/common/StatusBadge';
import { PriorityBadge } from '../../../components/common/PriorityBadge';
import { AIAnalysisCard } from '../../../components/ai/AIAnalysisCard';
import { LifecycleTimeline } from '../../../components/challenges/LifecycleTimeline';
import { GOVERNMENT_DEPARTMENTS, JHARKHAND_DISTRICTS } from '../../../data/districtsData';
import { INSTITUTIONS } from '../../../data/institutionsData';
import { INDUSTRY_PARTNERS } from '../../../data/industryPartnersData';
import { 
  Landmark, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Layers, 
  Building2, 
  School, 
  Briefcase, 
  MapPin, 
  BarChart3, 
  FileText, 
  Clock, 
  Sparkles,
  ArrowRight,
  Send,
  Eye
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const GovernmentDashboard = ({ onSelectChallenge }) => {
  const { currentUser } = useAuth();
  const { challenges, validateChallenge, updateLifecycleStatus } = useChallenges();
  const [activeTab, setActiveTab] = useState('overview'); // overview, validation-queue, priority, district-wise, department-wise, hei-industry, project-monitoring, reports
  const [selectedValidationChallenge, setSelectedValidationChallenge] = useState(null);
  const [assignedDept, setAssignedDept] = useState(GOVERNMENT_DEPARTMENTS[0].name);
  const [priorityOverride, setPriorityOverride] = useState('High');
  const [officerComments, setOfficerComments] = useState('');
  const [successToast, setSuccessToast] = useState('');

  // Calculations & Analytics
  const totalChallenges = challenges.length;
  const pendingValidation = challenges.filter(c => c.status === 'Submitted' || c.status === 'AI Analysis' || c.status === 'Under Validation');
  const validatedChallenges = challenges.filter(c => c.status !== 'Submitted' && c.status !== 'AI Analysis' && c.status !== 'Under Validation' && c.status !== 'Rejected');
  const highPriority = challenges.filter(c => c.urgency === 'High');
  const activeProjects = challenges.filter(c => c.status === 'In Progress' || c.status === 'Solution Proposed' || c.status === 'Pilot Testing');
  const implementedCount = challenges.filter(c => c.status === 'Implemented' || c.status === 'Impact Measured').length;

  const handleValidate = (challengeId, isApprove) => {
    validateChallenge(challengeId, isApprove ? 'validate' : 'reject', {
      officerName: currentUser?.name || "Joint Secretary, Govt of Jharkhand",
      department: assignedDept,
      priority: priorityOverride,
      comments: officerComments || (isApprove ? "Grievance validated by Departmental Field Cell. Authorized for university research allocation." : "Grievance closed as covered under standard municipal maintenance scheme.")
    });

    setSuccessToast(isApprove ? `Challenge #${challengeId} Validated & Allocated to ${assignedDept}` : `Challenge #${challengeId} Rejected with official note`);
    setSelectedValidationChallenge(null);
    setOfficerComments('');

    try {
      if (isApprove) {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      }
    } catch (e) {}

    setTimeout(() => setSuccessToast(''), 3500);
  };

  return (
    <div className="space-y-6">
      
      {/* Government Portal Header */}
      <div className="bg-gradient-to-r from-slate-900 via-brand-950 to-jharkhand-navy text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-brand-800/50 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏛️</span>
              <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                Government Department Command Portal • झारखण्ड शासन
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              State Societal Grievance & Innovation Triage
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Nodal Officer: <strong>{currentUser.name}</strong> • {currentUser.department || 'Drinking Water & Sanitation / Rural Development'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="bg-white/10 backdrop-blur-xs px-4 py-2.5 rounded-2xl border border-white/10 text-center">
              <span className="text-[10px] text-slate-300 uppercase font-semibold block">Pending Triage</span>
              <span className="text-xl font-bold text-amber-300 font-mono">{pendingValidation.length} Challenges</span>
            </div>
            <button
              onClick={() => setActiveTab('validation-queue')}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-md transition"
            >
              Open Validation Queue →
            </button>
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
          { id: 'overview', label: 'Executive Overview', icon: BarChart3 },
          { id: 'validation-queue', label: `Validation Queue (${pendingValidation.length})`, icon: CheckCircle2 },
          { id: 'priority', label: `High-Priority (${highPriority.length})`, icon: AlertTriangle },
          { id: 'district-wise', label: 'District-wise Monitoring', icon: MapPin },
          { id: 'department-wise', label: 'Department Allocations', icon: Landmark },
          { id: 'hei-industry', label: 'University & Industry Links', icon: School },
          { id: 'project-monitoring', label: `Active Projects (${activeProjects.length})`, icon: Layers },
          { id: 'reports', label: 'Impact Reports & Social ROI', icon: FileText },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition shrink-0 ${
                isActive 
                  ? 'bg-brand-900 text-white shadow-xs font-bold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: EXECUTIVE OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Crowdsourced Challenges"
              value={totalChallenges}
              subtitle="Across 24 districts"
              icon={Layers}
              color="brand"
              trend={{ value: "+14%", label: "growth this month" }}
            />
            <StatCard
              title="Pending Govt Validation"
              value={pendingValidation.length}
              subtitle="Requires Nodal Sign-off"
              icon={Clock}
              color="amber"
            />
            <StatCard
              title="Active Academic Projects"
              value={activeProjects.length}
              subtitle="With BIT, IIT-ISM, NIT & BAU"
              icon={School}
              color="purple"
            />
            <StatCard
              title="Solutions Implemented"
              value={implementedCount}
              subtitle="On-ground societal impact"
              icon={CheckCircle2}
              color="green"
              trend={{ value: "100%", label: "audit verified" }}
            />
          </div>

          {/* Quick Queue Spotlight */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Incoming Challenges Awaiting Departmental Validation
                </h3>
                <p className="text-xs text-slate-500">
                  AI has triaged keywords, priority heuristics, and HEI match scores. Official departmental approval unlocks university prototyping grants.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('validation-queue')}
                className="text-xs font-bold text-brand-900 hover:underline flex items-center gap-1"
              >
                <span>View Full Queue ({pendingValidation.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {pendingValidation.slice(0, 3).map(ch => (
                <div key={ch.id} className="py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        {ch.id}
                      </span>
                      <PriorityBadge priority={ch.urgency} size="sm" />
                      <span className="text-xs text-slate-500">📍 {ch.village}, {ch.district}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{ch.title}</h4>
                    <p className="text-xs text-slate-600 line-clamp-1">{ch.description}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setSelectedValidationChallenge(ch);
                        setActiveTab('validation-queue');
                      }}
                      className="bg-brand-900 hover:bg-brand-950 text-white font-bold text-xs px-4 py-2 rounded-xl"
                    >
                      Review & Validate →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Statewide Distribution Charts Simulation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* District Breakdown */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
                <span>Challenges Distribution by District</span>
                <span className="text-xs text-slate-500 font-normal">Statewide Heatmap</span>
              </h3>
              <div className="space-y-2.5">
                {JHARKHAND_DISTRICTS.slice(0, 6).map(dist => {
                  const distChallenges = challenges.filter(c => c.district?.toLowerCase().includes(dist.name.toLowerCase()));
                  const pct = Math.min(100, Math.round((distChallenges.length / totalChallenges) * 100));
                  return (
                    <div key={dist.id} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-800">{dist.name} ({dist.hindiName})</span>
                        <span className="font-bold text-slate-900">{distChallenges.length} challenges ({pct}%)</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-brand-700 to-jharkhand-green rounded-full" 
                          style={{ width: `${Math.max(12, pct)}%` }} 
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* University & Industry Participation */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
              <h3 className="text-sm font-bold text-slate-900">
                University & Industry Engagement Snapshot
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-purple-50/70 border border-purple-200 rounded-xl p-3.5">
                  <School className="w-5 h-5 text-purple-700 mb-1" />
                  <span className="text-[10px] text-purple-700 uppercase font-semibold">Participating HEIs</span>
                  <p className="text-lg font-bold text-purple-950">7 Premier Universities</p>
                  <p className="text-[11px] text-purple-800 mt-1">BIT Mesra, IIT ISM, NIT JSR, BAU, CUJ, AIIMS</p>
                </div>
                <div className="bg-cyan-50/70 border border-cyan-200 rounded-xl p-3.5">
                  <Briefcase className="w-5 h-5 text-cyan-700 mb-1" />
                  <span className="text-[10px] text-cyan-700 uppercase font-semibold">Industry & CSR Partners</span>
                  <p className="text-lg font-bold text-cyan-950">12 Corporate / MSMEs</p>
                  <p className="text-[11px] text-cyan-800 mt-1">Tata Steel, BCCL, JSPL, KrishiJharkhand, Adani</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-800 block mb-2">Total CSR Grants Pledged:</span>
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-950">₹1,48,50,000 Pledged Statewide</span>
                  <span className="text-[10px] bg-emerald-200 text-emerald-800 font-mono font-bold px-2 py-0.5 rounded">
                    Direct R&D Funding
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: VALIDATION QUEUE */}
      {activeTab === 'validation-queue' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Departmental Validation & Allocation Triage Queue
              </h3>
              <p className="text-xs text-slate-500">
                Review submitted citizen challenges, verify feasibility, adjust priority tiers, and officially allocate nodal departments.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* List of Pending */}
            <div className="lg:col-span-1 space-y-3 max-h-[680px] overflow-y-auto pr-1">
              {pendingValidation.map(ch => {
                const isSelected = selectedValidationChallenge?.id === ch.id;
                return (
                  <div
                    key={ch.id}
                    onClick={() => setSelectedValidationChallenge(ch)}
                    className={`p-4 rounded-2xl border transition cursor-pointer text-xs space-y-2 ${
                      isSelected
                        ? 'bg-brand-50 border-brand-700 shadow-md ring-2 ring-brand-700/20'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-slate-700">{ch.id}</span>
                      <PriorityBadge priority={ch.urgency} size="sm" />
                    </div>
                    <h4 className="font-bold text-slate-900 line-clamp-2">{ch.title}</h4>
                    <p className="text-slate-500 text-[11px]">📍 {ch.village}, {ch.district}</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 border-t border-slate-100">
                      <span>{ch.supportingCitizensCount} Endorsements</span>
                      <span className="font-bold text-brand-800">{ch.category}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Detailed Review & Decision Pane */}
            <div className="lg:col-span-2">
              {selectedValidationChallenge ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-sm">
                  
                  {/* Title & Metadata */}
                  <div className="border-b border-slate-200 pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-brand-900 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                        {selectedValidationChallenge.id}
                      </span>
                      <StatusBadge status={selectedValidationChallenge.status} />
                    </div>
                    <h2 className="text-lg font-bold text-slate-900">{selectedValidationChallenge.title}</h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Submitted by <strong>{selectedValidationChallenge.submittedBy?.name}</strong> on {selectedValidationChallenge.submissionDate} • 📍 {selectedValidationChallenge.village}, {selectedValidationChallenge.district}
                    </p>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 uppercase mb-1">Citizen Ground Report:</h4>
                    <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                      {selectedValidationChallenge.description}
                    </p>
                  </div>

                  {/* Embedded AI Triage Card */}
                  <AIAnalysisCard aiAnalysis={selectedValidationChallenge.aiAnalysis} />

                  {/* Official Action Form */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Landmark className="w-4 h-4 text-brand-800" />
                      <span>Official Departmental Action:</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Assign Nodal Department
                        </label>
                        <select
                          value={assignedDept}
                          onChange={(e) => setAssignedDept(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium text-slate-800"
                        >
                          {GOVERNMENT_DEPARTMENTS.map(dept => (
                            <option key={dept.id} value={dept.name}>{dept.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Approve / Override Priority Tier
                        </label>
                        <select
                          value={priorityOverride}
                          onChange={(e) => setPriorityOverride(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium text-slate-800"
                        >
                          <option value="High">High (Immediate Mission Allocation)</option>
                          <option value="Medium">Medium (Standard Innovation Cycle)</option>
                          <option value="Low">Low (Scheduled Cycle)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Official Departmental Directive / Remarks
                      </label>
                      <textarea
                        rows={3}
                        value={officerComments}
                        onChange={(e) => setOfficerComments(e.target.value)}
                        placeholder="e.g. Field verification approved. Assigned to University Innovation Consortium for decentralized solution prototyping..."
                        className="w-full p-2.5 text-xs rounded-xl border border-slate-300 bg-white"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        onClick={() => handleValidate(selectedValidationChallenge.id, false)}
                        className="bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Reject Challenge</span>
                      </button>
                      <button
                        onClick={() => handleValidate(selectedValidationChallenge.id, true)}
                        className="bg-jharkhand-green hover:bg-jharkhand-darkgreen text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md transition flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Approve Validation & Route to HEI</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-slate-300 mx-auto" />
                  <h4 className="text-sm font-bold text-slate-700">Select a Challenge from the left</h4>
                  <p className="text-xs max-w-sm mx-auto">
                    Click any pending challenge to view full citizen attachments, map coordinates, AI suggestions, and issue official validation directives.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: HIGH PRIORITY CHALLENGES */}
      {activeTab === 'priority' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">
              High-Priority Statewide Challenges ({highPriority.length})
            </h3>
            <span className="text-xs text-rose-700 font-bold bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              Immediate Mission Mode
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {highPriority.map(ch => (
              <div key={ch.id} className="bg-white rounded-2xl border border-rose-200 p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-700">{ch.id}</span>
                  <StatusBadge status={ch.status} />
                </div>
                <h4 className="text-base font-bold text-slate-900">{ch.title}</h4>
                <p className="text-xs text-slate-600 line-clamp-2">{ch.description}</p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span className="text-slate-500">📍 {ch.village}, {ch.district}</span>
                  <button
                    onClick={() => onSelectChallenge(ch.id)}
                    className="font-bold text-brand-900 hover:underline flex items-center gap-1"
                  >
                    <span>View Project</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: DISTRICT-WISE MONITORING */}
      {activeTab === 'district-wise' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900">
            District-wise Challenge & Resolution Matrix
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {JHARKHAND_DISTRICTS.map(dist => {
              const distChallenges = challenges.filter(c => c.district?.toLowerCase().includes(dist.name.toLowerCase()));
              const distActive = distChallenges.filter(c => c.status === 'In Progress' || c.status === 'Solution Proposed');
              const distDone = distChallenges.filter(c => c.status === 'Implemented' || c.status === 'Impact Measured');

              return (
                <div key={dist.id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900">{dist.name}</h4>
                      <span className="text-xs text-slate-500">{dist.hindiName} • {dist.division}</span>
                    </div>
                    <span className="font-mono text-sm font-bold bg-slate-100 px-2 py-1 rounded">
                      {distChallenges.length} Total
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
                    <div className="bg-purple-50 p-2 rounded-lg">
                      <span className="text-[10px] text-purple-700 block">In R&D</span>
                      <strong className="text-purple-900">{distActive.length} Projects</strong>
                    </div>
                    <div className="bg-emerald-50 p-2 rounded-lg">
                      <span className="text-[10px] text-emerald-700 block">Resolved</span>
                      <strong className="text-emerald-900">{distDone.length} Deployed</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 5: DEPARTMENT ALLOCATIONS */}
      {activeTab === 'department-wise' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900">
            Government Department Nodal Allocations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {GOVERNMENT_DEPARTMENTS.map(dept => {
              const matchedChallenges = challenges.filter(c => 
                c.validationDetails?.assignedDepartment === dept.name ||
                c.category === dept.name.split(' ')[0]
              );

              return (
                <div key={dept.id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-brand-50 text-brand-800 rounded-xl">
                        <Landmark className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{dept.name}</h4>
                        <span className="text-[10px] text-slate-500">{dept.ministry}</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold bg-brand-100 text-brand-900 px-2.5 py-1 rounded-full">
                      {matchedChallenges.length} Active
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                    {matchedChallenges.slice(0, 2).map(c => (
                      <div key={c.id} className="flex justify-between items-center text-slate-700">
                        <span className="truncate max-w-[280px]">• {c.title}</span>
                        <StatusBadge status={c.status} size="sm" />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 6: HEI & INDUSTRY LINKS */}
      {activeTab === 'hei-industry' && (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-slate-900">
            University & Industry Innovation Partnerships
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Universities */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
              <h4 className="font-bold text-sm text-purple-950 flex items-center gap-2">
                <School className="w-4 h-4 text-purple-700" />
                <span>Empanelled Universities & Research Labs</span>
              </h4>
              <div className="space-y-3">
                {INSTITUTIONS.map(inst => (
                  <div key={inst.id} className="p-3 bg-purple-50/50 rounded-xl border border-purple-100 text-xs space-y-1">
                    <div className="flex justify-between items-center font-bold text-slate-900">
                      <span>{inst.name}</span>
                      <span className="text-purple-700 font-mono">{inst.activeChallengesCount} Projects</span>
                    </div>
                    <p className="text-slate-600 text-[11px]">Specialization: {inst.primaryExpertise.join(', ')}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Industry / CSR */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
              <h4 className="font-bold text-sm text-cyan-950 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-cyan-700" />
                <span>Industry Partners & CSR Innovation Funds</span>
              </h4>
              <div className="space-y-3">
                {INDUSTRY_PARTNERS.map(ind => (
                  <div key={ind.id} className="p-3 bg-cyan-50/50 rounded-xl border border-cyan-100 text-xs space-y-1">
                    <div className="flex justify-between items-center font-bold text-slate-900">
                      <span>{ind.name}</span>
                      <span className="text-emerald-700 font-bold font-mono">{ind.totalPledgedAmount}</span>
                    </div>
                    <p className="text-slate-600 text-[11px]">Focus: {ind.focusDomains.join(', ')}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: PROJECT MONITORING */}
      {activeTab === 'project-monitoring' && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900">
            Active Multi-Stakeholder Projects ({activeProjects.length})
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

                <LifecycleTimeline currentStatus={ch.status} />

                {/* Stakeholder Triad Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-3 rounded-xl">
                  <div>
                    <span className="text-[10px] text-slate-500 font-semibold block uppercase">University Team:</span>
                    <strong className="text-purple-900">{ch.assignedInstitution?.institutionName || "BIT Mesra"}</strong>
                    <p className="text-[10px] text-slate-500">{ch.assignedInstitution?.facultyMentor?.name}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-semibold block uppercase">Industry / CSR Sponsor:</span>
                    <strong className="text-cyan-900">{ch.industryCollaboration?.partnerName || "Tata Steel CSR"}</strong>
                    <p className="text-[10px] text-slate-500">{ch.industryCollaboration?.grantAmount || "₹4.5 Lakhs"}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-semibold block uppercase">Govt Department:</span>
                    <strong className="text-emerald-900">{ch.validationDetails?.assignedDepartment || "Drinking Water & Sanitation"}</strong>
                    <p className="text-[10px] text-slate-500">{ch.validationDetails?.validatedBy}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: REPORTS */}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 max-w-3xl">
          <h3 className="text-base font-bold text-slate-900">
            Jharkhand Statewide Societal Innovation Audit Report (FY 2025-26)
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Summary of crowdsourced challenges, academic research translations, and public expenditure efficiency realized through Samadhan Setu.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 block">Total Reported</span>
              <strong className="text-lg text-slate-900">{totalChallenges}</strong>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="text-[10px] text-emerald-700 block">Citizens Impacted</span>
              <strong className="text-lg text-emerald-900">1,85,000+</strong>
            </div>
            <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
              <span className="text-[10px] text-purple-700 block">Academic Patents / Prototypes</span>
              <strong className="text-lg text-purple-900">14 Filed</strong>
            </div>
            <div className="p-3 bg-cyan-50 rounded-xl border border-cyan-200">
              <span className="text-[10px] text-cyan-700 block">Public Funds Saved</span>
              <strong className="text-lg text-cyan-900">₹3.8 Crores</strong>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
            <button
              onClick={() => alert("Downloading State Societal Innovation Audit (PDF)...")}
              className="bg-brand-900 hover:bg-brand-950 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs"
            >
              📥 Download Full Official Audit Report (PDF)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
