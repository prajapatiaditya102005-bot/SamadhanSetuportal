import React, { useState } from 'react';
import { useChallenges } from '../context/ChallengeContext';
import { useAuth } from '../context/AuthContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { PriorityBadge } from '../components/common/PriorityBadge';
import { CategoryIcon } from '../components/common/CategoryIcon';
import { AIAnalysisCard } from '../components/ai/AIAnalysisCard';
import { LifecycleTimeline } from '../components/challenges/LifecycleTimeline';
import { AlsoAffectedButton } from '../components/challenges/AlsoAffectedButton';
import { JharkhandMap } from '../components/map/JharkhandMap';
import { 
  MapPin, 
  Calendar, 
  Users, 
  School, 
  Briefcase, 
  ArrowLeft, 
  MessageSquare, 
  Share2, 
  FileText, 
  CheckCircle2, 
  Upload, 
  Send,
  Building2,
  Heart
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ChallengeDetailPage = ({ challengeId, onBack, onSelectChallenge }) => {
  const { challenges, addComment, validateChallenge, acceptChallengeByHEI, offerIndustrySupport, updateProjectMilestone } = useChallenges();
  const { currentUser, currentRole } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState(currentUser?.name || '');
  const [successToast, setSuccessToast] = useState('');

  const challenge = challenges.find(c => c.id === challengeId) || challenges[0];

  if (!challenge) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Challenge Not Found</h2>
        <button onClick={onBack} className="text-brand-900 font-bold hover:underline">
          ← Back to Challenges
        </button>
      </div>
    );
  }

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    addComment(
      challenge.id,
      newComment,
      commentAuthor || currentUser?.name || "Verified Citizen",
      currentUser?.roleLabel || "Community Contributor"
    );

    setNewComment('');
    setSuccessToast("Comment added to community record.");
    setTimeout(() => setSuccessToast(''), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-8">
      
      {/* Top Back Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl transition shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Challenges Feed</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-slate-500">ID: {challenge.id}</span>
          <StatusBadge status={challenge.status} />
        </div>
      </div>

      {successToast && (
        <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-between shadow-xs animate-in fade-in">
          <span>✓ {successToast}</span>
          <button onClick={() => setSuccessToast('')} className="text-emerald-700">✕</button>
        </div>
      )}

      {/* Main Challenge Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        
        {/* Title & Top Metadata */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <CategoryIcon category={challenge.category} showLabel={true} />
            <PriorityBadge priority={challenge.urgency} />
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Reported on {challenge.submissionDate}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 leading-snug">
            {challenge.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
            <span className="flex items-center gap-1 font-bold text-slate-900">
              <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{challenge.village ? `${challenge.village}, ` : ''}{challenge.block ? `${challenge.block} Block, ` : ''}{challenge.district}</span>
            </span>
            <span>•</span>
            <span>Submitted by: <strong>{challenge.submittedBy?.name}</strong> ({challenge.submittedBy?.role})</span>
          </div>
        </div>

        {/* 10-Step Visual Lifecycle Stepper */}
        <LifecycleTimeline currentStatus={challenge.status} />

        {/* Problem Description & Attached Photos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          <div className="lg:col-span-2 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                Problem Description & Root Cause:
              </h3>
              <p className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-100 text-slate-800 leading-relaxed whitespace-pre-line">
                {challenge.description}
              </p>
            </div>

            {/* Document Attachments */}
            {challenge.documents?.length > 0 && (
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase">Supporting Petitions & Lab Reports:</h4>
                <div className="flex flex-wrap gap-2">
                  {challenge.documents.map((doc, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-800 px-3 py-1.5 rounded-lg font-mono text-xs border border-slate-200">
                      <FileText className="w-3.5 h-3.5 text-brand-700" />
                      <span>{doc}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Key Population Stats & "I AM ALSO AFFECTED" Endorsement Box */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-rose-50/80 to-rose-100/60 rounded-2xl p-5 border border-rose-200 space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] text-rose-700 uppercase font-bold tracking-wider block">
                  Community Endorsement Hub
                </span>
                <h3 className="text-base font-bold text-rose-950">
                  Are you also affected?
                </h3>
                <p className="text-xs text-rose-800">
                  Join <strong>{(challenge.supportingCitizensCount || 1).toLocaleString()}</strong> verified local residents backing this challenge.
                </p>
              </div>

              <div className="pt-1">
                <AlsoAffectedButton challenge={challenge} size="lg" />
              </div>
            </div>

            {/* Affected Metrics Summary Card */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Estimated Affected Population:</span>
                <strong className="text-slate-900 font-bold text-sm">{(challenge.affectedPopulation || 0).toLocaleString()}+</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Supporting Endorsements:</span>
                <strong className="text-rose-700 font-bold text-sm">{(challenge.supportingCitizensCount || 1).toLocaleString()}</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Anti-Duplicate Clustering:</span>
                <span className="text-emerald-700 font-bold">Verified Single Hub</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI TRIAGE ANALYSIS CARD */}
      <AIAnalysisCard 
        aiAnalysis={challenge.aiAnalysis} 
        onSelectSimilar={(id) => onSelectChallenge(id)}
      />

      {/* MULTI-STAKEHOLDER COLLABORATION MATRIX */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-lg font-bold text-slate-900">
            Institutional R&D & Industry Collaboration Matrix
          </h3>
          <p className="text-xs text-slate-500">
            Coordinated response across University Labs, Industry CSR Sponsors, and State Nodal Officials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Box 1: University / HEI */}
          <div className="bg-purple-50/60 rounded-2xl p-5 border border-purple-100 space-y-3 text-xs">
            <div className="flex items-center gap-2">
              <School className="w-5 h-5 text-purple-700" />
              <h4 className="font-bold text-purple-950 text-sm">Assigned University</h4>
            </div>
            {challenge.assignedInstitution ? (
              <div className="space-y-1.5 text-slate-700">
                <p className="font-bold text-slate-900">{challenge.assignedInstitution.institutionName}</p>
                <p>Dept: {challenge.assignedInstitution.assignedDepartment}</p>
                <p>Faculty Mentor: <strong>{challenge.assignedInstitution.facultyMentor?.name}</strong></p>
                <p>Student Squad: <strong>{challenge.assignedInstitution.studentTeam?.teamName}</strong></p>
              </div>
            ) : (
              <p className="text-slate-500 italic">
                Awaiting HEI acceptance. Suggested: {challenge.aiAnalysis?.recommendedInstitutions?.[0]?.institutionName || "BIT Mesra"}.
              </p>
            )}
          </div>

          {/* Box 2: Industry / CSR */}
          <div className="bg-cyan-50/60 rounded-2xl p-5 border border-cyan-100 space-y-3 text-xs">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-cyan-700" />
              <h4 className="font-bold text-cyan-950 text-sm">Industry & CSR Partner</h4>
            </div>
            {challenge.industryCollaboration || challenge.csrPartner ? (
              <div className="space-y-1.5 text-slate-700">
                <p className="font-bold text-slate-900">{challenge.industryCollaboration?.partnerName || challenge.csrPartner?.partnerName}</p>
                <p>Grant Pledged: <strong className="text-emerald-700">{challenge.industryCollaboration?.grantAmount || challenge.csrPartner?.fundAllocated}</strong></p>
                <p>Support: {challenge.industryCollaboration?.supportOffered?.join(', ') || "Direct CSR Prototyping Grant"}</p>
              </div>
            ) : (
              <p className="text-slate-500 italic">
                Open for Industry collaboration. Suggested: {challenge.aiAnalysis?.recommendedIndustryPartners?.[0]?.partnerName || "Tata Steel CSR"}.
              </p>
            )}
          </div>

          {/* Box 3: Government Department */}
          <div className="bg-emerald-50/60 rounded-2xl p-5 border border-emerald-100 space-y-3 text-xs">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-700" />
              <h4 className="font-bold text-emerald-950 text-sm">Government Nodal Dept</h4>
            </div>
            {challenge.validationDetails ? (
              <div className="space-y-1.5 text-slate-700">
                <p className="font-bold text-slate-900">{challenge.validationDetails.assignedDepartment}</p>
                <p>Validated By: <strong>{challenge.validationDetails.validatedBy}</strong></p>
                <p>Priority Tier: <span className="font-bold text-rose-700">{challenge.validationDetails.govtPriorityScore}</span></p>
              </div>
            ) : (
              <p className="text-slate-500 italic">
                Pending State Nodal review in the Government Validation Queue.
              </p>
            )}
          </div>
        </div>

        {/* Milestones Progress (If Active) */}
        {challenge.projectMilestones?.length > 0 && (
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-900 uppercase">
              Project Technical Milestones & Field Verification:
            </h4>
            <div className="space-y-2">
              {challenge.projectMilestones.map(m => (
                <div key={m.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900">{m.title}</span>
                    <span className="text-[11px] text-slate-500 block">Due: {m.dueDate}</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg font-bold text-[11px] ${
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

      {/* COMMUNITY COMMENTS & EVIDENCE FEED */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-brand-700" />
              <span>Community Discussion & Citizen Testimonials ({challenge.comments?.length || 0})</span>
            </h3>
            <p className="text-xs text-slate-500">
              Direct voice of local residents, school teachers, panchayat heads, and researchers.
            </p>
          </div>
        </div>

        {/* Add Comment Form */}
        <form onSubmit={handlePostComment} className="space-y-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <label className="block font-bold text-slate-800">
            Add Your Ground Observation / Voice:
          </label>
          <textarea
            rows={3}
            required
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Describe local impact, suggest indigenous ideas, or request updates..."
            className="w-full p-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-700"
          />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <input
              type="text"
              value={commentAuthor}
              onChange={(e) => setCommentAuthor(e.target.value)}
              placeholder="Your Name (e.g. Rameshwar Mahto)"
              className="w-full sm:w-64 p-2 rounded-lg border border-slate-300 bg-white"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-brand-900 hover:bg-brand-950 text-white font-bold px-5 py-2 rounded-xl shadow-xs flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post Comment</span>
            </button>
          </div>
        </form>

        {/* Comments Stream */}
        <div className="space-y-3 divide-y divide-slate-100">
          {(challenge.comments || []).map(c => (
            <div key={c.id} className="pt-3.5 space-y-1 text-xs">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <strong className="text-slate-900 text-sm">{c.authorName}</strong>
                  <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-semibold">
                    {c.role}
                  </span>
                </div>
                <span className="text-slate-400 text-[10px] font-mono">{c.date}</span>
              </div>
              <p className="text-slate-700 leading-relaxed pt-0.5">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
