import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Compass, 
  Layers, 
  Lightbulb, 
  TrendingUp, 
  Info, 
  LogIn, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  Shield, 
  CheckCircle2, 
  ChevronRight,
  ExternalLink,
  Sparkles,
  MapPin,
  LayoutDashboard
} from 'lucide-react';
import { RoleHamburgerMenu } from './RoleHamburgerMenu';
import { DEMO_ROLES } from '../../data/demoUsers';

export const Navbar = ({ currentView, onNavigate, onSelectRole }) => {
  const { currentUser, currentRole, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const roleMeta = DEMO_ROLES.find(r => r.roleId === currentRole) || DEMO_ROLES[0];

  const sampleNotifications = [
    { id: 1, title: "AI Triage Completed", time: "10m ago", desc: "Fluoride Challenge in Jhinkpani matched with BIT Mesra (94% Match)", read: false },
    { id: 2, title: "Milestone Verified", time: "2h ago", desc: "Prototype CAD design approved by Faculty Lead Dr. Verma", read: false },
    { id: 3, title: "CSR Funding Allocated", time: "1d ago", desc: "Tata Steel Foundation pledged ₹4.5 Lakhs for Water Filter Deployment", read: true }
  ];

  const handleNav = (view) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top micro bar for official Jharkhand styling */}
      <div className="bg-gradient-to-r from-jharkhand-darkgreen via-brand-900 to-jharkhand-navy text-white text-[11px] py-1 px-4 sm:px-8 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="font-semibold tracking-wide flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            झारखण्ड सरकार | Government of Jharkhand
          </span>
          <span className="hidden md:inline text-slate-300">
            • State Higher Education & Societal Innovation Network
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-slate-200 text-[10px]">
            Toll-Free Grievance Helpline: <strong className="text-amber-300 font-mono">1800-345-6541</strong>
          </span>
          <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded text-white font-mono">
            Ranchi HQ
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Platform Name with Hamburger ☰ */}
          <div className="flex items-center gap-3 sm:gap-3.5">
            {/* ☰ Three-line Hamburger Button directly beside the logo */}
            <RoleHamburgerMenu 
              onSelectRole={(roleId) => {
                if (onSelectRole) {
                  onSelectRole(roleId);
                } else {
                  handleNav('login');
                }
              }}
              currentRole={currentRole}
            />

            {/* Logo & Platform Name */}
            <div 
              onClick={() => handleNav('landing')} 
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-brand-900 via-brand-700 to-jharkhand-green flex items-center justify-center text-white shadow-md group-hover:scale-105 transition transform">
                <span className="font-bold text-lg font-serif">स</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  Samadhan <span className="text-jharkhand-green">Setu</span>
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-200">
                  झारखण्ड
                </span>
              </div>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => handleNav('landing')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                currentView === 'landing' ? 'text-brand-900 bg-brand-50 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav('challenges')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                currentView === 'challenges' ? 'text-brand-900 bg-brand-50 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Challenges
            </button>
            <button
              onClick={() => handleNav('how-it-works')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                currentView === 'how-it-works' ? 'text-brand-900 bg-brand-50 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              How It Works
            </button>
            <button
              onClick={() => handleNav('solutions')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                currentView === 'solutions' ? 'text-brand-900 bg-brand-50 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Solutions
            </button>
            <button
              onClick={() => handleNav('impact')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                currentView === 'impact' ? 'text-brand-900 bg-brand-50 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Impact
            </button>
            <button
              onClick={() => handleNav('about')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                currentView === 'about' ? 'text-brand-900 bg-brand-50 font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              About
            </button>
          </nav>

          {/* Right Action Buttons & Role Hub */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Dashboard Shortcut Option near Bell */}
            <button
              onClick={() => handleNav('portal')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                currentView === 'portal'
                  ? 'bg-sky-50 text-[#1a73e8] border border-sky-200 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
              }`}
              title="Open Dashboard"
            >
              <LayoutDashboard className="w-4 h-4 text-[#1a73e8]" />
              <span className="hidden sm:inline">Dashboard</span>
            </button>

            {/* Notification Bell with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg relative transition"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">Notifications</span>
                    <span className="text-[10px] bg-brand-100 text-brand-800 px-1.5 py-0.5 rounded-full font-semibold">2 New</span>
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                    {sampleNotifications.map(n => (
                      <div key={n.id} className="p-3 hover:bg-slate-50 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-800">{n.title}</span>
                          <span className="text-[10px] text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-slate-600 text-[11px] mt-0.5">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Portal Workspace Button */}
            <button
              onClick={() => handleNav('portal')}
              className="flex items-center gap-2 bg-brand-900 hover:bg-brand-950 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-xs transition"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="max-w-[120px] sm:max-w-none truncate">
                {roleMeta.roleName.split(' ')[0]} Portal
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            </button>

            {/* Login / Role Selector Trigger */}
            <button
              onClick={() => handleNav('login')}
              className="p-1.5 text-slate-600 hover:text-brand-900 hover:bg-slate-100 rounded-lg text-xs font-semibold flex items-center gap-1"
              title="Role Login / Switcher"
            >
              <LogIn className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          <div className="p-2.5 bg-slate-50 rounded-lg mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">{currentUser.avatar || "👤"}</span>
              <div>
                <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                <p className="text-[10px] text-slate-500">{roleMeta.roleName}</p>
              </div>
            </div>
            <button
              onClick={() => handleNav('portal')}
              className="text-[11px] bg-brand-800 text-white px-2.5 py-1 rounded font-bold"
            >
              Open Portal
            </button>
          </div>

          <button
            onClick={() => handleNav('landing')}
            className="w-full text-left px-3 py-2 rounded-md text-xs font-semibold text-slate-700 hover:bg-slate-100"
          >
            Home
          </button>
          <button
            onClick={() => handleNav('challenges')}
            className="w-full text-left px-3 py-2 rounded-md text-xs font-semibold text-slate-700 hover:bg-slate-100"
          >
            Explore Challenges
          </button>
          <button
            onClick={() => handleNav('how-it-works')}
            className="w-full text-left px-3 py-2 rounded-md text-xs font-semibold text-slate-700 hover:bg-slate-100"
          >
            How It Works
          </button>
          <button
            onClick={() => handleNav('solutions')}
            className="w-full text-left px-3 py-2 rounded-md text-xs font-semibold text-slate-700 hover:bg-slate-100"
          >
            Solutions & R&D
          </button>
          <button
            onClick={() => handleNav('impact')}
            className="w-full text-left px-3 py-2 rounded-md text-xs font-semibold text-slate-700 hover:bg-slate-100"
          >
            Impact Analytics
          </button>
          <button
            onClick={() => handleNav('login')}
            className="w-full text-left px-3 py-2 rounded-md text-xs font-bold text-brand-800 bg-brand-50"
          >
            Switch Role / Login
          </button>
        </div>
      )}
    </header>
  );
};
