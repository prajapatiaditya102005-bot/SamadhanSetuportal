import React from 'react';
import { 
  Sparkles, 
  Cpu, 
  Layers, 
  AlertTriangle, 
  CheckCircle, 
  School, 
  Briefcase, 
  Tag, 
  Copy, 
  ArrowRight,
  TrendingUp,
  ShieldAlert
} from 'lucide-react';
import { PriorityBadge } from '../common/PriorityBadge';
import { CategoryIcon } from '../common/CategoryIcon';

export const AIAnalysisCard = ({ aiAnalysis, onSelectSimilar, onAssignInstitution }) => {
  if (!aiAnalysis) return null;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-xl border border-brand-800/60 relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-brand-800/60 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-brand-600/30 text-cyan-300 rounded-xl border border-cyan-400/30">
            <Cpu className="w-5 h-5 text-cyan-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-white tracking-wide flex items-center gap-1.5">
                <span>AI Problem Triage & Match Matrix</span>
                <span className="bg-cyan-500/20 text-cyan-300 text-[10px] px-2 py-0.5 rounded-full border border-cyan-400/30 font-mono">
                  NLP Core v2.4
                </span>
              </h4>
            </div>
            <p className="text-xs text-slate-300">
              Automated NLP semantic categorization, priority heuristics, duplicate detection & HEI matching
            </p>
          </div>
        </div>

        {/* AI Confidence & Priority */}
        <div className="flex items-center gap-2">
          <div className="text-right">
            <span className="text-[10px] text-slate-300 block uppercase tracking-wider font-semibold">Triage Confidence</span>
            <span className="text-xs font-mono font-bold text-emerald-400">
              {aiAnalysis.confidence || 95.4}%
            </span>
          </div>
          <div className="h-6 w-px bg-slate-700" />
          <div className="text-right">
            <span className="text-[10px] text-slate-300 block uppercase tracking-wider font-semibold">AI Priority</span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded ${
              aiAnalysis.priority === 'High' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            }`}>
              {aiAnalysis.priority} ({aiAnalysis.priorityScore || 88}/100)
            </span>
          </div>
        </div>
      </div>

      {/* AI Key Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5 relative z-10">
        
        {/* Box 1: Category & Extracted Keywords */}
        <div className="bg-white/5 rounded-xl p-3.5 border border-white/10">
          <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1 mb-2">
            <Tag className="w-3.5 h-3.5 text-cyan-400" />
            Detected Category & Keywords
          </span>
          <div className="flex items-center gap-2 mb-2.5">
            <span className="px-2.5 py-1 rounded-md bg-brand-500/20 text-brand-200 text-xs font-bold border border-brand-400/30">
              {aiAnalysis.category}
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            {(aiAnalysis.detectedKeywords || []).map((kw, i) => (
              <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                #{kw}
              </span>
            ))}
          </div>
        </div>

        {/* Box 2: Duplicate / Cluster Alert */}
        <div className="bg-white/5 rounded-xl p-3.5 border border-white/10">
          <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1 mb-2">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            Anti-Duplicate Similarity Check
          </span>
          {aiAnalysis.similarChallengesCount > 0 ? (
            <div>
              <div className="text-xs text-amber-300 font-medium flex items-center gap-1">
                <span>⚠️ {aiAnalysis.similarChallengesCount} Similar Challenges Detected</span>
              </div>
              <p className="text-[10px] text-slate-300 mt-1 leading-snug">
                Clustered within same watershed/district zone to prevent departmental duplication.
              </p>
              {aiAnalysis.similarMatches?.length > 0 && (
                <div className="mt-2 space-y-1">
                  {aiAnalysis.similarMatches.map((sim, i) => (
                    <button
                      key={i}
                      onClick={() => onSelectSimilar && onSelectSimilar(sim.challengeId)}
                      className="w-full text-left text-[11px] text-cyan-300 hover:underline truncate block"
                    >
                      → {sim.challengeId}: {sim.title} ({sim.similarityScore}% match)
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-xs text-emerald-400 flex items-center gap-1.5 pt-1">
              <CheckCircle className="w-4 h-4" />
              <span>Unique societal problem (0 duplicates found)</span>
            </div>
          )}
        </div>

        {/* Box 3: Priority Rationale */}
        <div className="bg-white/5 rounded-xl p-3.5 border border-white/10">
          <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1 mb-2">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            Priority Rationale
          </span>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            {aiAnalysis.priorityRationale || "Assessed based on vulnerable population density and health risk indicators."}
          </p>
        </div>
      </div>

      {/* Recommended Academic & Industry Matches */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2 border-t border-brand-800/60 relative z-10">
        
        {/* Recommended HEIs */}
        <div>
          <h5 className="text-xs font-bold text-white flex items-center gap-1.5 mb-2.5">
            <School className="w-4 h-4 text-purple-400" />
            <span>Recommended Universities & HEIs:</span>
          </h5>
          <div className="space-y-2">
            {(aiAnalysis.recommendedInstitutions || []).map((inst, idx) => (
              <div 
                key={idx}
                className="bg-white/10 hover:bg-white/15 rounded-lg p-2.5 border border-white/10 flex items-center justify-between transition"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-white">{inst.institutionName}</span>
                    <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded font-mono font-bold">
                      {inst.matchScore}% Match
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-300 mt-0.5">{inst.reason}</p>
                </div>
                {onAssignInstitution && (
                  <button
                    onClick={() => onAssignInstitution(inst)}
                    className="text-[11px] bg-brand-700 hover:bg-brand-600 text-white px-2.5 py-1 rounded font-semibold shrink-0 ml-2"
                  >
                    Match HEI
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Industry / CSR Partners */}
        <div>
          <h5 className="text-xs font-bold text-white flex items-center gap-1.5 mb-2.5">
            <Briefcase className="w-4 h-4 text-cyan-400" />
            <span>Suggested Industry & Startup Partners:</span>
          </h5>
          <div className="space-y-2">
            {(aiAnalysis.recommendedIndustryPartners || []).map((ind, idx) => (
              <div 
                key={idx}
                className="bg-white/10 hover:bg-white/15 rounded-lg p-2.5 border border-white/10 flex items-center justify-between transition"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-white">{ind.partnerName}</span>
                    <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-mono font-bold">
                      {ind.matchScore}% Synergy
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-300 mt-0.5">Focus: {ind.domain}</p>
                </div>
                <span className="text-[10px] text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
                  {ind.category?.split('/')[0] || "Partner"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-4 pt-3 border-t border-brand-800/40 text-[10px] text-slate-400 italic text-center">
        * Note: AI scoring serves as an intelligent recommendation layer. Final administrative assignments pass through official departmental validation.
      </div>
    </div>
  );
};
