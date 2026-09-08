import React from 'react';
import { 
  MapPin, 
  Users, 
  School, 
  Briefcase, 
  ArrowRight, 
  Sparkles,
  Calendar,
  MessageSquare,
  FileText
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { PriorityBadge } from '../common/PriorityBadge';
import { CategoryIcon } from '../common/CategoryIcon';
import { AlsoAffectedButton } from './AlsoAffectedButton';

export const ChallengeCard = ({ challenge, onSelectChallenge }) => {
  const isHighPriority = challenge.urgency === 'High';

  return (
    <div className={`bg-white rounded-2xl border transition-all duration-300 hover:shadow-lg flex flex-col justify-between overflow-hidden relative ${
      isHighPriority ? 'border-rose-200/80 shadow-xs' : 'border-slate-200 shadow-xs'
    }`}>
      
      {/* Top Banner Tag */}
      <div className="p-4 sm:p-5 pb-3">
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <CategoryIcon category={challenge.category} />
            <span className="text-xs font-bold text-slate-700">{challenge.category}</span>
            <span className="text-[10px] text-slate-400 font-mono">#{challenge.id}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <PriorityBadge priority={challenge.urgency} size="sm" />
            <StatusBadge status={challenge.status} size="sm" />
          </div>
        </div>

        {/* Title */}
        <h3 
          onClick={() => onSelectChallenge(challenge.id)}
          className="text-base sm:text-lg font-bold text-slate-900 hover:text-brand-800 transition cursor-pointer line-clamp-2 leading-snug"
        >
          {challenge.title}
        </h3>

        {/* Location & Date */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mt-2">
          <span className="flex items-center gap-1 font-medium text-slate-700">
            <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span>{challenge.village ? `${challenge.village}, ` : ''}{challenge.district}</span>
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>{challenge.submissionDate}</span>
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
          {challenge.description}
        </p>

        {/* AI Match & Affected Counts Row */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
          <div className="bg-slate-50 rounded-xl p-2 border border-slate-100">
            <span className="text-[10px] text-slate-500 block uppercase font-medium">Affected Population</span>
            <span className="font-bold text-slate-900 text-sm">
              {(challenge.affectedPopulation || 0).toLocaleString()}+
            </span>
          </div>
          <div className="bg-rose-50/60 rounded-xl p-2 border border-rose-100">
            <span className="text-[10px] text-rose-700 block uppercase font-medium">Citizens Endorsed</span>
            <span className="font-bold text-rose-800 text-sm">
              {(challenge.supportingCitizensCount || 1).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Assigned HEI or Industry Badge */}
        {(challenge.assignedInstitution || challenge.industryCollaboration) && (
          <div className="mt-3 space-y-1.5 text-[11px]">
            {challenge.assignedInstitution && (
              <div className="flex items-center gap-1.5 text-purple-900 bg-purple-50/80 px-2.5 py-1 rounded-lg border border-purple-200">
                <School className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span className="truncate"><strong>HEI:</strong> {challenge.assignedInstitution.institutionName}</span>
              </div>
            )}
            {challenge.industryCollaboration && (
              <div className="flex items-center gap-1.5 text-cyan-900 bg-cyan-50/80 px-2.5 py-1 rounded-lg border border-cyan-200">
                <Briefcase className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                <span className="truncate"><strong>Partner:</strong> {challenge.industryCollaboration.partnerName}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Actions Bar */}
      <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
        <AlsoAffectedButton challenge={challenge} size="sm" />

        <button
          onClick={() => onSelectChallenge(challenge.id)}
          className="inline-flex items-center gap-1 text-xs font-bold text-brand-900 hover:text-brand-700 bg-white hover:bg-slate-100 border border-slate-200 px-3 py-2 rounded-xl transition shadow-2xs"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
