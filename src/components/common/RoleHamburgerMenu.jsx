import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Users, 
  Landmark, 
  School, 
  GraduationCap, 
  Lightbulb, 
  Building2, 
  HeartHandshake, 
  ShieldCheck, 
  ChevronRight,
  LogIn
} from 'lucide-react';

export const ROLE_MENU_ITEMS = [
  {
    id: 'citizen',
    label: '1. Citizen',
    shortTitle: 'Citizen',
    tag: 'Community',
    icon: Users,
    color: 'text-blue-600 bg-blue-50 border-blue-200 hover:bg-blue-100/70',
    dot: 'bg-blue-500'
  },
  {
    id: 'government',
    label: '2. Government',
    shortTitle: 'Government',
    tag: 'Administration',
    icon: Landmark,
    color: 'text-emerald-600 bg-emerald-50 border-emerald-200 hover:bg-emerald-100/70',
    dot: 'bg-emerald-500'
  },
  {
    id: 'hei_admin',
    label: '3. Higher Education / HEI',
    shortTitle: 'Higher Education / HEI',
    tag: 'Universities',
    icon: School,
    color: 'text-purple-600 bg-purple-50 border-purple-200 hover:bg-purple-100/70',
    dot: 'bg-purple-500'
  },
  {
    id: 'faculty',
    label: '4. Faculty / Mentor',
    shortTitle: 'Faculty / Mentor',
    tag: 'Mentorship',
    icon: GraduationCap,
    color: 'text-indigo-600 bg-indigo-50 border-indigo-200 hover:bg-indigo-100/70',
    dot: 'bg-indigo-500'
  },
  {
    id: 'student',
    label: '5. Student',
    shortTitle: 'Student',
    tag: 'Innovation Squad',
    icon: Lightbulb,
    color: 'text-amber-600 bg-amber-50 border-amber-200 hover:bg-amber-100/70',
    dot: 'bg-amber-500'
  },
  {
    id: 'industry',
    label: '6. Industry / Startup / MSME',
    shortTitle: 'Industry / Startup / MSME',
    tag: 'Prototyping & Scale',
    icon: Building2,
    color: 'text-cyan-600 bg-cyan-50 border-cyan-200 hover:bg-cyan-100/70',
    dot: 'bg-cyan-500'
  },
  {
    id: 'csr',
    label: '7. CSR / Research Partner',
    shortTitle: 'CSR / Research Partner',
    tag: 'Funding & Grants',
    icon: HeartHandshake,
    color: 'text-rose-600 bg-rose-50 border-rose-200 hover:bg-rose-100/70',
    dot: 'bg-rose-500'
  },
  {
    id: 'admin',
    label: '8. Platform Admin',
    shortTitle: 'Platform Admin',
    tag: 'Governance',
    icon: ShieldCheck,
    color: 'text-slate-800 bg-slate-100 border-slate-300 hover:bg-slate-200',
    dot: 'bg-slate-800'
  }
];

export const RoleHamburgerMenu = ({ onSelectRole, currentRole }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleRoleClick = (roleId) => {
    setIsOpen(false);
    if (onSelectRole) {
      onSelectRole(roleId);
    }
  };

  return (
    <div className="relative inline-flex items-center">
      {/* ☰ Three-line Hamburger Button placed directly beside the logo */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Role Login Menu"
        title="Select Role Login (☰)"
        className={`p-2 rounded-xl transition-all flex items-center justify-center ${
          isOpen
            ? 'bg-brand-900 text-white shadow-sm'
            : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 bg-slate-50 border border-slate-200 shadow-2xs'
        }`}
      >
        <Menu className="w-5 h-5 stroke-[2.5]" />
      </button>

      {/* Backdrop overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 transition-opacity animate-in fade-in duration-200"
        />
      )}

      {/* Slide-out / Dropdown Role Panel */}
      {isOpen && (
        <div 
          className="fixed sm:absolute top-14 sm:top-full mt-1.5 left-2 sm:left-0 w-[calc(100vw-16px)] sm:w-84 max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-brand-950 via-slate-900 to-jharkhand-navy text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base font-black">☰ Role Portals</span>
              <span className="text-[10px] bg-emerald-500/30 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-400/30">
                8 Roles
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
              title="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-2 text-[11px] text-slate-500 px-3.5 pt-2.5 pb-1 font-semibold uppercase tracking-wider">
            Select Role to Open Login Page:
          </div>

          {/* Role List */}
          <div className="p-2 space-y-1 max-h-[75vh] overflow-y-auto divide-y divide-slate-100/60">
            {ROLE_MENU_ITEMS.map((role) => {
              const Icon = role.icon;
              const isCurrent = currentRole === role.id;

              return (
                <button
                  key={role.id}
                  onClick={() => handleRoleClick(role.id)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between group ${
                    isCurrent
                      ? 'bg-brand-50/80 border-brand-300 text-brand-950 font-bold shadow-2xs'
                      : 'border-transparent hover:border-slate-200 hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${role.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold leading-tight group-hover:text-brand-900 transition flex items-center gap-1.5">
                        <span>{role.shortTitle}</span>
                        {isCurrent && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {role.tag}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-slate-400 group-hover:text-brand-800 transition">
                    <span className="text-[10px] font-semibold text-slate-400 group-hover:text-brand-700 hidden sm:inline">
                      Login
                    </span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer Note */}
          <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Samadhan Setu Gateway</span>
            <span className="text-[10px] font-mono text-slate-400">Jharkhand</span>
          </div>
        </div>
      )}
    </div>
  );
};
