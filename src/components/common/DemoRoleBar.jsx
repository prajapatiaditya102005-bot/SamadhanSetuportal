import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Users, 
  Building2, 
  GraduationCap, 
  Lightbulb, 
  Briefcase, 
  HeartHandshake, 
  ShieldCheck, 
  Sparkles,
  ChevronDown,
  RefreshCw,
  Landmark
} from 'lucide-react';
import { useChallenges } from '../../context/ChallengeContext';

export const DemoRoleBar = ({ onNavigatePortal }) => {
  const { currentRole, switchRole, availableRoles } = useAuth();
  const { resetDemoData } = useChallenges();
  const [isOpen, setIsOpen] = useState(false);
  const [resetNotice, setResetNotice] = useState(false);

  const getRoleIcon = (roleId) => {
    switch (roleId) {
      case 'citizen': return <Users className="w-4 h-4" />;
      case 'government': return <Landmark className="w-4 h-4" />;
      case 'hei_admin': return <GraduationCap className="w-4 h-4" />;
      case 'faculty': return <GraduationCap className="w-4 h-4 text-indigo-300" />;
      case 'student': return <Lightbulb className="w-4 h-4 text-amber-300" />;
      case 'industry': return <Briefcase className="w-4 h-4 text-cyan-300" />;
      case 'csr': return <HeartHandshake className="w-4 h-4 text-rose-300" />;
      case 'admin': return <ShieldCheck className="w-4 h-4 text-emerald-300" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const handleRoleSelect = (roleId) => {
    switchRole(roleId);
    if (onNavigatePortal) {
      onNavigatePortal(roleId);
    }
    setIsOpen(false);
  };

  const handleReset = () => {
    resetDemoData();
    setResetNotice(true);
    setTimeout(() => setResetNotice(false), 2500);
  };

  const currentRoleObj = availableRoles.find(r => r.roleId === currentRole) || availableRoles[0];

  return (
    <aside aria-label="Judge demo switcher" className="bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white border-b border-brand-800/40 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-1.5 flex flex-wrap items-center justify-between gap-2 text-xs">
        
        {/* Left: Hackathon / Judge Demo Tag */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-semibold border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Judge / Evaluator Role Switcher:</span>
          </span>
          <span className="hidden md:inline text-slate-300">
            Click any persona to test distinct permissions & workspaces:
          </span>
        </div>

        {/* Center / Desktop Role Quick Pills */}
        <div className="hidden lg:flex items-center gap-1 overflow-x-auto py-0.5">
          {availableRoles.map(role => {
            const isActive = currentRole === role.roleId;
            return (
              <button
                key={role.roleId}
                onClick={() => handleRoleSelect(role.roleId)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-jharkhand-green text-white shadow-sm ring-1 ring-white/30 font-bold scale-105'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
                title={role.description}
              >
                {getRoleIcon(role.roleId)}
                <span>{role.roleName.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Right / Mobile Dropdown + Reset Data Button */}
        <div className="flex items-center gap-2">
          {/* Mobile Selector */}
          <div className="relative lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-1.5 bg-brand-800 text-white px-3 py-1 rounded border border-brand-700 font-medium"
            >
              {getRoleIcon(currentRole)}
              <span>{currentRoleObj.roleName.split('/')[0]}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-1 w-64 bg-slate-900 border border-slate-700 rounded-lg shadow-xl p-1 z-50">
                {availableRoles.map(role => (
                  <button
                    key={role.roleId}
                    onClick={() => handleRoleSelect(role.roleId)}
                    className={`w-full text-left px-3 py-2 rounded flex items-center gap-2 text-xs transition ${
                      currentRole === role.roleId ? 'bg-brand-700 text-white font-bold' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {getRoleIcon(role.roleId)}
                    <div>
                      <div className="font-medium">{role.roleName}</div>
                      <div className="text-[10px] text-slate-400">{role.hindiTitle}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Reset Demo Data Button */}
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-2 py-1 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded border border-slate-700 transition"
            title="Reset database to initial realistic Jharkhand challenges"
          >
            <RefreshCw className="w-3 h-3 text-emerald-400" />
            <span className="hidden sm:inline">Reset Demo Data</span>
          </button>

          {resetNotice && (
            <span className="text-emerald-400 font-medium animate-fade-in text-[11px]">
              ✓ Data Restored
            </span>
          )}
        </div>
      </div>
    </aside>
  );
};
