import React from 'react';
import { LIFECYCLE_STAGES } from '../../data/sampleChallenges';
import { CheckCircle2, Circle, Clock, ArrowRight } from 'lucide-react';

export const LifecycleTimeline = ({ currentStatus, onStageClick }) => {
  const currentIndex = LIFECYCLE_STAGES.findIndex(s => s.id === currentStatus);
  const activeStep = currentIndex !== -1 ? currentIndex + 1 : 1;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
        <div>
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span>Project Lifecycle & Impact Stepper</span>
            <span className="text-xs bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full font-semibold border border-brand-200">
              Stage {activeStep} of {LIFECYCLE_STAGES.length}: {currentStatus}
            </span>
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparent end-to-end tracking: from citizen submission to university research, pilot testing, and measured impact.
          </p>
        </div>
      </div>

      {/* Responsive Horizontal / Scrollable Stepper */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[760px] flex items-center justify-between relative">
          
          {/* Background Track Line */}
          <div className="absolute top-4 left-4 right-4 h-1 bg-slate-200 -z-0" />
          
          {/* Active Fill Line */}
          <div 
            className="absolute top-4 left-4 h-1 bg-jharkhand-green transition-all duration-500 -z-0"
            style={{ width: `${Math.max(0, ((activeStep - 1) / (LIFECYCLE_STAGES.length - 1)) * 100)}%` }}
          />

          {LIFECYCLE_STAGES.map((stage, idx) => {
            const isCompleted = idx < activeStep - 1;
            const isCurrent = idx === activeStep - 1;
            const isPending = idx > activeStep - 1;

            return (
              <div 
                key={stage.id}
                onClick={() => onStageClick && onStageClick(stage.id)}
                className={`flex flex-col items-center text-center group ${onStageClick ? 'cursor-pointer' : ''} px-1`}
                style={{ width: `${100 / LIFECYCLE_STAGES.length}%` }}
              >
                {/* Node Circle */}
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 z-10 ${
                    isCompleted 
                      ? 'bg-jharkhand-green text-white ring-4 ring-emerald-100 shadow-sm'
                      : isCurrent
                      ? 'bg-brand-900 text-white ring-4 ring-brand-100 scale-110 shadow-md animate-pulse'
                      : 'bg-white text-slate-400 border-2 border-slate-300'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : isCurrent ? (
                    <span>{stage.step}</span>
                  ) : (
                    <span className="text-[11px]">{stage.step}</span>
                  )}
                </div>

                {/* Stage Name */}
                <div className="mt-2">
                  <span className={`block text-[11px] leading-tight font-bold ${
                    isCurrent ? 'text-brand-900' : isCompleted ? 'text-slate-800' : 'text-slate-400'
                  }`}>
                    {stage.label}
                  </span>
                  <span className="text-[9px] text-slate-500 hidden sm:block mt-0.5">
                    {stage.role}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
