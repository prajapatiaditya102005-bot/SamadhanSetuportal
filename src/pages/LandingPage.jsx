import React from 'react';
import { useChallenges } from '../context/ChallengeContext';
import { useAuth } from '../context/AuthContext';
import { StatCard } from '../components/common/StatCard';
import { ChallengeCard } from '../components/challenges/ChallengeCard';
import { JharkhandMap } from '../components/map/JharkhandMap';
import { DEMO_ROLES } from '../data/demoUsers';
import { INSTITUTIONS } from '../data/institutionsData';
import { INDUSTRY_PARTNERS } from '../data/industryPartnersData';
import { 
  Users, 
  Landmark, 
  School, 
  Lightbulb, 
  Briefcase, 
  HeartHandshake, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  MapPin, 
  PlusCircle, 
  Award,
  Layers,
  ChevronRight
} from 'lucide-react';

export const LandingPage = ({ onNavigate, onSelectChallenge, onOpenReportModal }) => {
  const { challenges } = useChallenges();
  const { switchRole } = useAuth();

  const totalReported = challenges.length;
  const totalValidated = challenges.filter(c => c.status !== 'Submitted' && c.status !== 'AI Analysis' && c.status !== 'Rejected').length;
  const totalSolutions = challenges.filter(c => c.status === 'Implemented' || c.status === 'Impact Measured').length;
  const totalAffected = challenges.reduce((acc, c) => acc + (c.affectedPopulation || 0), 0);

  const spotlightChallenges = challenges.slice(0, 3);

  const handleQuickRoleEnter = (roleId) => {
    switchRole(roleId);
    onNavigate('portal');
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20 bg-gradient-to-b from-brand-50/70 via-white to-slate-50 border-b border-slate-200">
        
        {/* Subtle Decorative Elements */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-72 bg-gradient-to-r from-blue-200/30 via-emerald-100/40 to-amber-100/30 blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-100/80 border border-emerald-300 text-emerald-900 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-jharkhand-green animate-ping" />
            <span>Government of Jharkhand • Problem Solving Platform</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight max-w-4xl mx-auto leading-[1.15]">
            Connecting Societal Challenges with <span className="bg-gradient-to-r from-brand-900 via-brand-700 to-jharkhand-green bg-clip-text text-transparent">Solutions & Impact</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed">
            A state platform connecting citizens, government, universities, and industry to solve community challenges across Jharkhand.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => handleQuickRoleEnter('citizen')}
              className="w-full sm:w-auto bg-jharkhand-green hover:bg-jharkhand-darkgreen text-white font-extrabold text-sm px-8 py-4 rounded-2xl shadow-lg hover:shadow-emerald-900/20 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Users className="w-5 h-5" />
              <span>Citizen Portal</span>
            </button>

            <button
              onClick={() => onNavigate('challenges')}
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 font-bold text-sm px-8 py-4 rounded-2xl shadow-xs transition flex items-center justify-center gap-2"
            >
              <span>Explore Challenges</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>

          {/* Interactive Ecosystem Visual Flow */}
          <div className="pt-10 max-w-5xl mx-auto">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-xl space-y-4">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block">
                How It Works • 7-Step Collaboration Model
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center text-xs">
                
                {/* Step 1 */}
                <div className="bg-blue-50/80 p-3 rounded-2xl border border-blue-100 space-y-1">
                  <div className="w-7 h-7 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">1</div>
                  <strong className="text-blue-950 block text-[11px]">Citizen</strong>
                  <p className="text-[10px] text-blue-700">Reports problem</p>
                </div>

                {/* Step 2 */}
                <div className="bg-cyan-50/80 p-3 rounded-2xl border border-cyan-100 space-y-1">
                  <div className="w-7 h-7 mx-auto rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold text-xs">2</div>
                  <strong className="text-cyan-950 block text-[11px]">AI Triage</strong>
                  <p className="text-[10px] text-cyan-700">Scores & checks duplicates</p>
                </div>

                {/* Step 3 */}
                <div className="bg-emerald-50/80 p-3 rounded-2xl border border-emerald-100 space-y-1">
                  <div className="w-7 h-7 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">3</div>
                  <strong className="text-emerald-950 block text-[11px]">Government</strong>
                  <p className="text-[10px] text-emerald-700">Validates & approves</p>
                </div>

                {/* Step 4 */}
                <div className="bg-purple-50/80 p-3 rounded-2xl border border-purple-100 space-y-1">
                  <div className="w-7 h-7 mx-auto rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs">4</div>
                  <strong className="text-purple-950 block text-[11px]">University</strong>
                  <p className="text-[10px] text-purple-700">Forms student & faculty squad</p>
                </div>

                {/* Step 5 */}
                <div className="bg-indigo-50/80 p-3 rounded-2xl border border-indigo-100 space-y-1">
                  <div className="w-7 h-7 mx-auto rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">5</div>
                  <strong className="text-indigo-950 block text-[11px]">Industry / CSR</strong>
                  <p className="text-[10px] text-indigo-700">Funds & supports prototyping</p>
                </div>

                {/* Step 6 */}
                <div className="bg-amber-50/80 p-3 rounded-2xl border border-amber-100 space-y-1">
                  <div className="w-7 h-7 mx-auto rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs">6</div>
                  <strong className="text-amber-950 block text-[11px]">Prototype</strong>
                  <p className="text-[10px] text-amber-700">Builds & tests solution</p>
                </div>

                {/* Step 7 */}
                <div className="bg-green-100 p-3 rounded-2xl border border-green-300 space-y-1">
                  <div className="w-7 h-7 mx-auto rounded-full bg-green-700 text-white flex items-center justify-center font-bold text-xs">7</div>
                  <strong className="text-green-950 block text-[11px]">Social Impact</strong>
                  <p className="text-[10px] text-green-800">Field implementation</p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REALISTIC DEMO STATISTICS COUNTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <StatCard
            title="Challenges Reported"
            value={totalReported}
            subtitle="Grassroots Grievances"
            icon={Layers}
            color="brand"
          />
          <StatCard
            title="Challenges Validated"
            value={totalValidated}
            subtitle="Govt Approved"
            icon={CheckCircle2}
            color="green"
          />
          <StatCard
            title="Universities Active"
            value={INSTITUTIONS.length}
            subtitle="BIT, IIT ISM, NIT, BAU"
            icon={School}
            color="purple"
          />
          <StatCard
            title="Industry Partners"
            value={INDUSTRY_PARTNERS.length}
            subtitle="Tata, BCCL, JSPL, MSMEs"
            icon={Briefcase}
            color="cyan"
          />
          <StatCard
            title="Solutions Developed"
            value={totalSolutions}
            subtitle="Tested & Deployed"
            icon={Lightbulb}
            color="amber"
          />
          <StatCard
            title="Citizens Impacted"
            value="1.85 Lakhs+"
            subtitle="Across Jharkhand"
            icon={Users}
            color="rose"
          />
        </div>
      </section>

      {/* 3. ROLE WORKSPACES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-brand-800 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Role Portals
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Access Your Dedicated Portal
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
            Choose your role to open your specific workspace, tools, and actions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DEMO_ROLES.map(role => (
            <div
              key={role.roleId}
              onClick={() => handleQuickRoleEnter(role.roleId)}
              className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xs hover:shadow-lg transition cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{role.sampleUser.avatar || "👤"}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${role.badgeColor}`}>
                    {role.hindiTitle}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-900 transition">
                  {role.roleName}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {role.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-900 group-hover:translate-x-1 transition">
                <span>Open Portal</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. LIVE JHARKHAND PROBLEMS MAP & SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Challenges Across Jharkhand
            </h2>
            <p className="text-xs text-slate-500">
              Live problems reported across districts.
            </p>
          </div>
          <button
            onClick={() => onNavigate('challenges')}
            className="text-xs font-bold text-brand-900 hover:underline flex items-center gap-1 self-start"
          >
            <span>View All {challenges.length} Challenges</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <JharkhandMap
              challenges={challenges}
              onSelectChallenge={onSelectChallenge}
              height="440px"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Priority Spotlight:</span>
            </h3>
            <div className="space-y-3">
              {spotlightChallenges.map(ch => (
                <div
                  key={ch.id}
                  onClick={() => onSelectChallenge(ch.id)}
                  className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-brand-300 transition cursor-pointer text-xs space-y-1.5 shadow-2xs"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-mono font-bold text-slate-600">{ch.id}</span>
                    <span className="text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded text-[10px]">
                      {ch.urgency}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 line-clamp-1">{ch.title}</h4>
                  <p className="text-slate-500 text-[11px]">📍 {ch.village}, {ch.district}</p>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                    <span>{ch.supportingCitizensCount} Supports</span>
                    <span className="font-bold text-brand-800">View →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. "I AM ALSO AFFECTED" FEATURE HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-rose-900 via-brand-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="bg-rose-500/20 text-rose-300 text-xs font-bold px-3 py-1 rounded-full border border-rose-400/30">
              Community Endorsement
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Facing the same issue? Vote <span className="text-rose-400">"I AM ALSO AFFECTED"</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Support existing problems instead of filing duplicate reports. High community support helps prioritize solutions faster.
            </p>
          </div>

          <button
            onClick={() => onNavigate('challenges')}
            className="bg-white hover:bg-slate-100 text-rose-950 font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-lg transition shrink-0"
          >
            Explore & Support Challenges →
          </button>
        </div>
      </section>
    </div>
  );
};
