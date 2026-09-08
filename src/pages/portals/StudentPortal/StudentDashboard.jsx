import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useChallenges } from '../../../context/ChallengeContext';
import { StatCard } from '../../../components/common/StatCard';
import { StatusBadge } from '../../../components/common/StatusBadge';
import { LifecycleTimeline } from '../../../components/challenges/LifecycleTimeline';
import { 
  Lightbulb, 
  Users, 
  CheckSquare, 
  Upload, 
  Send, 
  MessageSquare, 
  Layers, 
  FileCode2, 
  Sparkles, 
  Award, 
  ExternalLink,
  Plus,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const StudentDashboard = ({ onSelectChallenge }) => {
  const { currentUser } = useAuth();
  const { challenges, updateProjectMilestone, submitSolutionProposal, addComment } = useChallenges();
  const [activeTab, setActiveTab] = useState('project'); // project, tasks, prototype, submit-solution, mentor-feedback, browse
  
  // Student's active project (defaults to Chaibasa Fluoride project for demo persona Abhishek Pandey)
  const myAssignedProject = challenges.find(c => 
    c.assignedInstitution?.studentTeam?.lead?.includes('Abhishek') ||
    c.id === 'CH-JH-2026-001'
  ) || challenges[0];

  // Kanban tasks
  const [tasks, setTasks] = useState([
    { id: 1, title: "Collect Jhinkpani borewell water samples", stage: "Done", tag: "Field Survey" },
    { id: 2, title: "Perform spectrophotometric fluoride test", stage: "Done", tag: "Lab Chemistry" },
    { id: 3, title: "CAD 3D Model of Gravity Laterite Filter", stage: "Done", tag: "CAD Modeling" },
    { id: 4, title: "Fabricate 500 LPH Stainless Steel Column with MSME Hub", stage: "In Progress", tag: "Hardware Fabrication" },
    { id: 5, title: "Assemble IoT TDS/pH water quality sensor node", stage: "In Progress", tag: "Electronics & IoT" },
    { id: 6, title: "Dokata Middle School on-ground installation", stage: "To Do", tag: "Deployment" }
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskTag, setNewTaskTag] = useState('Engineering');

  // Solution submission form state
  const [solutionAbstract, setSolutionAbstract] = useState('');
  const [prototypeUrl, setPrototypeUrl] = useState('');
  const [costEstimate, setCostEstimate] = useState('₹18,500 per 500 LPH Community Unit');
  const [timeToDeploy, setTimeToDeploy] = useState('30 Days');
  const [successToast, setSuccessToast] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    setTasks(prev => [...prev, { id: Date.now(), title: newTaskTitle, stage: 'To Do', tag: newTaskTag }]);
    setNewTaskTitle('');
  };

  const handleUpdateTaskStage = (taskId, newStage) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, stage: newStage } : t));
  };

  const handleUpdateMilestoneProgress = (milestoneId, progress) => {
    updateProjectMilestone(myAssignedProject.id, milestoneId, progress, progress >= 100 ? 'Completed' : 'In Progress');
    setSuccessToast(`Milestone progress updated to ${progress}%!`);
    setTimeout(() => setSuccessToast(''), 3000);
  };

  const handleSubmitSolution = (e) => {
    e.preventDefault();
    submitSolutionProposal(myAssignedProject.id, {
      proposalTitle: myAssignedProject.assignedInstitution?.studentTeam?.proposalTitle || "Community Water Filter Prototype",
      solutionAbstract,
      prototypeLink: prototypeUrl || "https://github.com/samadhan-setu-prototypes/jalsetu-chaibasa",
      costEstimate,
      timelineMonths: timeToDeploy
    });

    setSuccessToast("Solution & Prototype submitted for Faculty and State Government review!");

    try {
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    } catch (err) {}

    setTimeout(() => setSuccessToast(''), 3500);
  };

  return (
    <div className="space-y-6">
      
      {/* Student Welcome Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-brand-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-800/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚀</span>
              <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-400/30">
                Student Innovation Studio • छात्र नवाचार मंच
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {currentUser.name}
            </h1>
            <p className="text-xs sm:text-sm text-amber-200 max-w-2xl">
              Institution: <strong>{currentUser.institutionName || 'BIT Mesra'}</strong> • Active Project: <strong>#{myAssignedProject.id}</strong>
            </p>
            <div className="flex items-center gap-3 pt-1 text-xs text-slate-300">
              <span>👥 Squad Size: <strong>5 Members</strong></span>
              <span>•</span>
              <span>🏆 Hackathon Credits: <strong className="text-amber-300 font-mono">850 Points</strong></span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10 text-center shrink-0">
            <span className="text-[10px] text-amber-200 uppercase font-semibold block">Prototype Stage</span>
            <span className="text-lg font-bold text-emerald-400">Benchtop Testing 65%</span>
            <span className="text-[10px] text-slate-300 block mt-0.5">Funded by Tata Steel CSR</span>
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
          { id: 'project', label: 'My Assigned Project', icon: Layers },
          { id: 'tasks', label: `Kanban Tasks (${tasks.length})`, icon: CheckSquare },
          { id: 'prototype', label: 'Prototype & Milestones', icon: FileCode2 },
          { id: 'submit-solution', label: 'Submit Final Solution', icon: Send },
          { id: 'mentor-feedback', label: 'Mentor & Industry Guidance', icon: MessageSquare }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition shrink-0 ${
                isActive 
                  ? 'bg-amber-900 text-white shadow-xs font-bold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: MY ASSIGNED PROJECT */}
      {activeTab === 'project' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {myAssignedProject.id}
                </span>
                <h2 className="text-lg font-bold text-slate-900 mt-1">{myAssignedProject.title}</h2>
                <p className="text-xs text-slate-500">📍 {myAssignedProject.village}, {myAssignedProject.district}</p>
              </div>
              <StatusBadge status={myAssignedProject.status} size="lg" />
            </div>

            <LifecycleTimeline currentStatus={myAssignedProject.status} />

            {/* Team & Mentors Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-100">
                <span className="text-[10px] text-amber-800 font-bold uppercase block mb-1">Our Student Squad:</span>
                <strong className="text-slate-900 text-sm block">{myAssignedProject.assignedInstitution?.studentTeam?.teamName || "Team JalSetu"}</strong>
                <p className="text-slate-600 text-[11px] mt-1">Lead: {currentUser.name}</p>
              </div>

              <div className="bg-indigo-50/60 p-4 rounded-xl border border-indigo-100">
                <span className="text-[10px] text-indigo-800 font-bold uppercase block mb-1">Faculty Lead:</span>
                <strong className="text-slate-900 text-sm block">{myAssignedProject.assignedInstitution?.facultyMentor?.name || "Dr. Alok Kumar Verma"}</strong>
                <p className="text-slate-600 text-[11px] mt-1">{myAssignedProject.assignedInstitution?.facultyMentor?.department}</p>
              </div>

              <div className="bg-cyan-50/60 p-4 rounded-xl border border-cyan-100">
                <span className="text-[10px] text-cyan-800 font-bold uppercase block mb-1">Industry Sponsor:</span>
                <strong className="text-slate-900 text-sm block">{myAssignedProject.industryCollaboration?.partnerName || "Tata Steel Foundation"}</strong>
                <p className="text-emerald-700 font-bold text-[11px] mt-1">{myAssignedProject.industryCollaboration?.grantAmount || "₹4.5 Lakhs Grant"}</p>
              </div>
            </div>

            {/* Problem Abstract */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs text-slate-700 leading-relaxed">
              <strong className="text-slate-900 block mb-1">Problem Ground Reality:</strong>
              {myAssignedProject.description}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: KANBAN TASK BOARD */}
      {activeTab === 'tasks' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Sprint Task Board (Kanban)</h3>
              <p className="text-xs text-slate-500">Track tasks across hardware fabrication, software algorithms, and field tests.</p>
            </div>
            
            {/* Quick Add Task */}
            <form onSubmit={handleAddTask} className="flex items-center gap-2">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="+ Add new task..."
                className="px-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
              <button
                type="submit"
                className="bg-amber-800 text-white font-bold text-xs px-3 py-1.5 rounded-xl hover:bg-amber-900"
              >
                Add
              </button>
            </form>
          </div>

          {/* Kanban Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Column 1: To Do */}
            <div className="bg-slate-100/80 rounded-2xl p-4 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                <span>TO DO</span>
                <span className="bg-slate-200 px-2 py-0.5 rounded-full">{tasks.filter(t => t.stage === 'To Do').length}</span>
              </div>
              <div className="space-y-2">
                {tasks.filter(t => t.stage === 'To Do').map(task => (
                  <div key={task.id} className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-2 shadow-2xs">
                    <p className="font-semibold text-slate-900">{task.title}</p>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">{task.tag}</span>
                      <button
                        onClick={() => handleUpdateTaskStage(task.id, 'In Progress')}
                        className="text-[10px] font-bold text-amber-700 hover:underline"
                      >
                        Start →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: In Progress */}
            <div className="bg-amber-50/80 rounded-2xl p-4 space-y-3 border border-amber-200/60">
              <div className="flex justify-between items-center text-xs font-bold text-amber-900">
                <span>IN PROGRESS</span>
                <span className="bg-amber-200 px-2 py-0.5 rounded-full">{tasks.filter(t => t.stage === 'In Progress').length}</span>
              </div>
              <div className="space-y-2">
                {tasks.filter(t => t.stage === 'In Progress').map(task => (
                  <div key={task.id} className="bg-white p-3 rounded-xl border border-amber-200 text-xs space-y-2 shadow-2xs">
                    <p className="font-semibold text-slate-900">{task.title}</p>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                      <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-mono">{task.tag}</span>
                      <button
                        onClick={() => handleUpdateTaskStage(task.id, 'Done')}
                        className="text-[10px] font-bold text-emerald-700 hover:underline"
                      >
                        Complete ✓
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Done */}
            <div className="bg-emerald-50/80 rounded-2xl p-4 space-y-3 border border-emerald-200/60">
              <div className="flex justify-between items-center text-xs font-bold text-emerald-900">
                <span>COMPLETED</span>
                <span className="bg-emerald-200 px-2 py-0.5 rounded-full">{tasks.filter(t => t.stage === 'Done').length}</span>
              </div>
              <div className="space-y-2">
                {tasks.filter(t => t.stage === 'Done').map(task => (
                  <div key={task.id} className="bg-white p-3 rounded-xl border border-emerald-200 text-xs space-y-1 shadow-2xs">
                    <p className="font-semibold text-slate-900 line-through text-slate-500">{task.title}</p>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono inline-block">{task.tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PROTOTYPE & MILESTONES */}
      {activeTab === 'prototype' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
          <h3 className="text-base font-bold text-slate-900">Hardware & Algorithm Milestones</h3>
          <div className="space-y-3">
            {(myAssignedProject.projectMilestones || []).map(m => (
              <div key={m.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>{m.title}</span>
                  <span className={`px-2 py-0.5 rounded text-[11px] ${
                    m.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {m.status} ({m.progress}%)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={m.progress}
                    onChange={(e) => handleUpdateMilestoneProgress(m.id, parseInt(e.target.value))}
                    className="w-full accent-amber-600"
                  />
                  <span className="font-mono font-bold w-12 text-right">{m.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SUBMIT FINAL SOLUTION */}
      {activeTab === 'submit-solution' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 max-w-3xl">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Submit Technological Solution & Prototype Demo
            </h3>
            <p className="text-xs text-slate-500">
              Upload your engineering blueprint, GitHub code repo, CAD diagrams, and cost breakdown for academic accreditation and state pilot deployment.
            </p>
          </div>

          <form onSubmit={handleSubmitSolution} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Solution Abstract & Technological Mechanism <span className="text-rose-600">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={solutionAbstract}
                onChange={(e) => setSolutionAbstract(e.target.value)}
                placeholder="Explain the technical principle, adsorbent material used, filtration rate (e.g. 500 LPH), solar power rating, and community maintenance protocol..."
                className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  GitHub / CAD Model / Demo Video Link
                </label>
                <input
                  type="url"
                  value={prototypeUrl}
                  onChange={(e) => setPrototypeUrl(e.target.value)}
                  placeholder="https://github.com/jalsetu-bit/chaibasa-filter"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Estimated Unit Fabrication Cost (₹)
                </label>
                <input
                  type="text"
                  value={costEstimate}
                  onChange={(e) => setCostEstimate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                />
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                type="submit"
                className="bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Solution for Field Pilot</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 5: MENTOR FEEDBACK */}
      {activeTab === 'mentor-feedback' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900">Faculty & Industry Mentor Advice Feed</h3>
          <div className="space-y-3">
            {(myAssignedProject.comments || []).map(c => (
              <div key={c.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="flex justify-between items-center font-bold text-slate-900">
                  <span>{c.authorName} ({c.role})</span>
                  <span className="text-[10px] text-slate-400 font-mono">{c.date}</span>
                </div>
                <p className="text-slate-700 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
