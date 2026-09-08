import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useChallenges } from '../../../context/ChallengeContext';
import { JharkhandMap } from '../../../components/map/JharkhandMap';
import { ReportProblemForm } from './ReportProblemForm';
import { RoleHamburgerMenu } from '../../../components/common/RoleHamburgerMenu';
import { 
  Home, 
  ClipboardList, 
  LayoutGrid, 
  LayoutDashboard,
  MapPin, 
  Heart, 
  Bell, 
  User, 
  ArrowRight, 
  Check, 
  Users, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Building2, 
  ChevronRight, 
  Filter, 
  FileText, 
  ShieldCheck, 
  Search, 
  ExternalLink, 
  ThumbsUp, 
  Award, 
  Zap, 
  Trash2, 
  HelpCircle, 
  Menu, 
  X 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CitizenDashboard = ({ onSelectChallenge, onSelectRole }) => {
  const { currentUser } = useAuth();
  const { challenges, supportChallenge } = useChallenges();

  const isRegisteredCitizen = Boolean(
    currentUser?.name &&
    currentUser.name.trim() !== '' &&
    !['citizen', 'guest', 'anonymous citizen'].includes(currentUser.name.trim().toLowerCase())
  );
  const displayName = isRegisteredCitizen ? currentUser.name : 'Citizen';
  const displayLocation = isRegisteredCitizen && currentUser?.district && currentUser.district !== 'Jharkhand' 
    ? `Citizen | ${currentUser.district}` 
    : 'Citizen | Jharkhand';

  const [activeNav, setActiveNav] = useState('dashboard'); // 'dashboard', 'report', 'my-problems', 'nearby', 'supported', 'notifications', 'profile'
  const [dashboardMenuOpen, setDashboardMenuOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [votedChallenges, setVotedChallenges] = useState({});
  const [myProblemsFilter, setMyProblemsFilter] = useState('All');
  const [successToast, setSuccessToast] = useState('');

  // Extract reference challenges for table and area cards
  const recentTableChallenges = [
    challenges.find(c => c.id === 'SSP-2026-0012') || {
      id: 'SSP-2026-0012',
      title: 'Drinking water shortage in village',
      location: 'Kanke, Ranchi',
      district: 'Ranchi',
      village: 'Kanke, Ranchi',
      status: 'Under Validation',
      urgency: 'High'
    },
    challenges.find(c => c.id === 'SSP-2026-0008') || {
      id: 'SSP-2026-0008',
      title: 'Broken street lights',
      location: 'Harmu, Ranchi',
      district: 'Ranchi',
      village: 'Harmu, Ranchi',
      status: 'In Progress',
      urgency: 'Medium'
    },
    challenges.find(c => c.id === 'SSP-2026-0005') || {
      id: 'SSP-2026-0005',
      title: 'Garbage dumping near school',
      location: 'Morabadi, Ranchi',
      district: 'Ranchi',
      village: 'Morabadi, Ranchi',
      status: 'Solution Proposed',
      urgency: 'High'
    },
    challenges.find(c => c.id === 'SSP-2026-0002') || {
      id: 'SSP-2026-0002',
      title: 'Poor road condition',
      location: 'Khelgaon, Ranchi',
      district: 'Ranchi',
      village: 'Khelgaon, Ranchi',
      status: 'Resolved',
      urgency: 'Medium'
    }
  ];

  // Challenges in Your Area
  const areaChallenges = [
    challenges.find(c => c.id === 'SSP-2026-0015') || {
      id: 'SSP-2026-0015',
      title: 'Irregular drinking water supply in Kanke Block',
      location: 'Kanke, Ranchi',
      district: 'Ranchi',
      village: 'Kanke, Ranchi',
      affectedCount: 234,
      commentsCount: 12,
      category: 'Water',
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?w=400&auto=format&fit=crop&q=80'
    },
    challenges.find(c => c.id === 'SSP-2026-0016') || {
      id: 'SSP-2026-0016',
      title: 'Garbage not collected regularly',
      location: 'Harmu, Ranchi',
      district: 'Ranchi',
      village: 'Harmu, Ranchi',
      affectedCount: 189,
      commentsCount: 8,
      category: 'Sanitation',
      image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400&auto=format&fit=crop&q=80'
    }
  ];

  // My Problems list
  const currentUserName = currentUser?.name?.toLowerCase() || '';
  const currentUserEmail = currentUser?.email?.toLowerCase() || '';
  const isCustomUser = currentUser?.name && currentUser.name !== 'Citizen';

  const mySubmittedList = challenges.filter(c => {
    if (isCustomUser) {
      return (
        (c.submittedBy?.name && c.submittedBy.name.toLowerCase().includes(currentUserName)) ||
        (c.submittedBy?.email && c.submittedBy.email.toLowerCase() === currentUserEmail) ||
        c.submittedBy?.id === currentUser.id
      );
    }
    return c.id.startsWith('SSP-2026-00');
  });

  const filteredMyProblems = myProblemsFilter === 'All' 
    ? mySubmittedList 
    : mySubmittedList.filter(c => c.status.toLowerCase().includes(myProblemsFilter.toLowerCase()));

  // "I Am Also Affected" Click Handler with State Persistence & Confetti
  const handleVoteAlsoAffected = (chId, defaultCount) => {
    if (votedChallenges[chId]) return;

    setVotedChallenges(prev => ({
      ...prev,
      [chId]: true
    }));

    supportChallenge(chId, {
      userName: currentUser.name || "Citizen",
      village: currentUser.village || currentUser.district || "Jharkhand",
      note: "I am also facing this problem in our area."
    }, currentUser);

    setSuccessToast("Support registered! 'I Am Also Affected' count updated.");

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {}

    setTimeout(() => setSuccessToast(''), 3000);
  };

  // Status Badge Component matching reference image
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Under Validation':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-amber-100/80 text-amber-900 border border-amber-200">
            <span className="text-amber-600 font-bold">⚡</span>
            <span>Under Validation</span>
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-sky-100/80 text-sky-900 border border-sky-200">
            <span className="text-sky-600 font-bold">✓</span>
            <span>In Progress</span>
          </span>
        );
      case 'Solution Proposed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-purple-100/80 text-purple-900 border border-purple-200">
            <span className="text-purple-600 font-bold">⚙</span>
            <span>Solution Proposed</span>
          </span>
        );
      case 'Resolved':
      case 'Implemented':
      case 'Impact Measured':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-emerald-100/80 text-emerald-900 border border-emerald-200">
            <span className="text-emerald-600 font-bold">✓</span>
            <span>Resolved</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
            <span>●</span>
            <span>{status}</span>
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-800 -mx-4 sm:-mx-6 lg:-mx-8 -my-8 flex flex-col">
      
      {/* ========================================================================= */}
      {/* 1. TOP HEADER (MATCHING EXACT REFERENCE IMAGE)                           */}
      {/* ========================================================================= */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* LEFT: Logo & Platform Identity */}
          <div className="flex items-center gap-3 sm:gap-3.5">
            
            {/* ☰ Three-line Hamburger Button directly beside the logo */}
            <RoleHamburgerMenu 
              onSelectRole={(roleId) => {
                if (onSelectRole) {
                  onSelectRole(roleId);
                }
              }}
              currentRole="citizen"
            />

            {/* Mobile Sidebar Toggle (for left navigation drawer) */}
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 border border-slate-200"
              title="Toggle Citizen Sidebar"
            >
              <LayoutGrid className="w-5 h-5 text-slate-700" />
            </button>

            {/* Stylized Logo: Green & Blue Community Icon */}
            <div 
              onClick={() => setActiveNav('dashboard')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-emerald-500 via-teal-600 to-sky-600 flex items-center justify-center text-white shadow-md shrink-0">
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 stroke-white stroke-2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>

              <div>
                <h1 className="text-xl sm:text-2xl font-black text-brand-950 tracking-tight leading-none">
                  Samadhan Setu
                </h1>
              </div>
            </div>
          </div>

          {/* RIGHT: Dashboard Menu, Notifications & User Profile */}
          <div className="flex items-center gap-2 sm:gap-3.5">
            
            {/* Dashboard Dropdown Menu Option (Contains all 7 Citizen Navigation Options) */}
            <div className="relative">
              <button
                onClick={() => setDashboardMenuOpen(!dashboardMenuOpen)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-xs ${
                  dashboardMenuOpen || activeNav === 'dashboard'
                    ? 'bg-[#1a73e8] text-white shadow-md'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200'
                }`}
                title="Citizen Dashboard Menu"
              >
                <Home className={`w-4 h-4 ${dashboardMenuOpen || activeNav === 'dashboard' ? 'text-white' : 'text-[#1a73e8]'}`} />
                <span>Dashboard</span>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${dashboardMenuOpen ? '-rotate-90' : 'rotate-90'}`} />
              </button>

              {/* Dropdown Menu with all 7 options */}
              {dashboardMenuOpen && (
                <>
                  <div 
                    onClick={() => setDashboardMenuOpen(false)}
                    className="fixed inset-0 z-40"
                  />

                  <div className="absolute right-0 mt-2 w-64 sm:w-72 bg-[#0c233c] text-slate-200 rounded-2xl shadow-2xl border border-slate-700/80 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 overflow-hidden">
                    
                    <div className="px-4 py-2 border-b border-slate-700/50 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Citizen Options</span>
                      <span className="text-[10px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full font-bold border border-sky-400/30">
                        {activeNav.toUpperCase()}
                      </span>
                    </div>

                    <div className="p-2 space-y-1 text-sm font-medium">
                      
                      {/* 1. Dashboard */}
                      <button
                        onClick={() => {
                          setActiveNav('dashboard');
                          setDashboardMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition text-xs font-bold ${
                          activeNav === 'dashboard'
                            ? 'bg-[#1a73e8] text-white shadow-md'
                            : 'text-slate-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <Home className="w-4 h-4 shrink-0" />
                        <span>Dashboard</span>
                      </button>

                      {/* 2. Report a Problem */}
                      <button
                        onClick={() => {
                          setReportModalOpen(true);
                          setDashboardMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition text-xs font-bold ${
                          activeNav === 'report'
                            ? 'bg-[#1a73e8] text-white shadow-md'
                            : 'text-slate-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <ClipboardList className="w-4 h-4 shrink-0 text-slate-400" />
                        <span>Report a Problem</span>
                      </button>

                      {/* 3. My Problems */}
                      <button
                        onClick={() => {
                          setActiveNav('my-problems');
                          setDashboardMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition text-xs font-bold ${
                          activeNav === 'my-problems'
                            ? 'bg-[#1a73e8] text-white shadow-md'
                            : 'text-slate-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <LayoutGrid className="w-4 h-4 shrink-0 text-slate-400" />
                        <span>My Problems</span>
                      </button>

                      {/* 4. Nearby Problems */}
                      <button
                        onClick={() => {
                          setActiveNav('nearby');
                          setDashboardMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition text-xs font-bold ${
                          activeNav === 'nearby'
                            ? 'bg-[#1a73e8] text-white shadow-md'
                            : 'text-slate-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <MapPin className="w-4 h-4 shrink-0 text-slate-400" />
                        <span>Nearby Problems</span>
                      </button>

                      {/* 5. Supported Problems */}
                      <button
                        onClick={() => {
                          setActiveNav('supported');
                          setDashboardMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition text-xs font-bold ${
                          activeNav === 'supported'
                            ? 'bg-[#1a73e8] text-white shadow-md'
                            : 'text-slate-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <Heart className="w-4 h-4 shrink-0 text-slate-400" />
                        <span>Supported Problems</span>
                      </button>

                      {/* 6. Notifications */}
                      <button
                        onClick={() => {
                          setActiveNav('notifications');
                          setDashboardMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition text-xs font-bold ${
                          activeNav === 'notifications'
                            ? 'bg-[#1a73e8] text-white shadow-md'
                            : 'text-slate-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Bell className="w-4 h-4 shrink-0 text-slate-400" />
                          <span>Notifications</span>
                        </div>
                        <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          3
                        </span>
                      </button>

                      {/* 7. Profile */}
                      <button
                        onClick={() => {
                          setActiveNav('profile');
                          setDashboardMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition text-xs font-bold ${
                          activeNav === 'profile'
                            ? 'bg-[#1a73e8] text-white shadow-md'
                            : 'text-slate-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <User className="w-4 h-4 shrink-0 text-slate-400" />
                        <span>Profile</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Notification Bell with Red Badge "3" */}
            <div className="relative">
              <button 
                onClick={() => setActiveNav('notifications')}
                className="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition relative"
                title="Notifications"
              >
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                  3
                </span>
              </button>
            </div>

            {/* Vertical Divider */}
            <div className="h-8 w-px bg-slate-200 hidden sm:block" />

            {/* User Profile Info */}
            <div 
              onClick={() => setActiveNav('profile')}
              className="flex items-center gap-3 cursor-pointer group p-1 sm:p-1.5 rounded-xl hover:bg-slate-50 transition"
            >
              {/* Circular Avatar */}
              <div className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0 overflow-hidden ring-2 ring-sky-100">
                <User className="w-5 h-5" />
              </div>

              {/* Name & Subtitle */}
              <div className="hidden sm:block text-left">
                <p className="text-sm font-bold text-slate-900 leading-tight group-hover:text-sky-600 transition">
                  {displayName}
                </p>
                <p className="text-[11px] text-slate-500 font-medium">
                  {displayLocation}
                </p>
              </div>

              {/* Down Arrow */}
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition rotate-90 hidden sm:block" />
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. MAIN CONTENT AREA (FULL-WIDTH CLEAN LAYOUT)                            */}
      {/* ========================================================================= */}
      <div className="flex-1 w-full mx-auto flex flex-col">
        <main className="w-full max-w-[1520px] mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
          
          {/* Toast Notification */}
          {successToast && (
            <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-between shadow-xs animate-in fade-in">
              <span>✓ {successToast}</span>
              <button onClick={() => setSuccessToast('')} className="text-emerald-700">✕</button>
            </div>
          )}

          {/* ===================================================================== */}
          {/* SUB-VIEW 1: MAIN CITIZEN DASHBOARD (PIXEL PERFECT REFERENCE MATCH)    */}
          {/* ===================================================================== */}
          {activeNav === 'dashboard' && (
            <div className="space-y-6">
              
              {/* ----------------------------------------------------------------- */}
              {/* ROW 1: WELCOME HERO CARD (LEFT) + MAKE A DIFFERENCE CARD (RIGHT)  */}
              {/* ----------------------------------------------------------------- */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Welcome Hero Card (8 Cols / Left ~68%) */}
                <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col sm:flex-row justify-between relative group">
                  
                  {/* Left Text Content */}
                  <div className="p-6 sm:p-8 space-y-3 z-10 flex-1 max-w-lg">
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                      {isRegisteredCitizen ? `Welcome, ${currentUser.name}!` : 'Welcome to Samadhan Setu!'}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Your voice matters. Report local problems and help build a better Jharkhand.
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => setReportModalOpen(true)}
                        className="bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition transform hover:-translate-y-0.5 flex items-center gap-2"
                      >
                        <span>+ Report a Problem</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Right Nature / Waterfall Landscape Image with Text Overlay */}
                  <div 
                    className="sm:w-72 md:w-80 h-44 sm:h-auto bg-cover bg-center relative flex items-center justify-center p-6 text-center"
                    style={{
                      backgroundImage: `linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.2) 20%, rgba(0,0,0,0.3) 100%), url('https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&auto=format&fit=crop&q=80')`
                    }}
                  >
                    <div className="z-10 space-y-1">
                      <p className="text-white font-black text-base sm:text-lg leading-snug drop-shadow-lg">
                        “Together for a<br />
                        Stronger Jharkhand”
                      </p>
                    </div>
                  </div>
                </div>

                {/* Make a Difference Card (4 Cols / Right ~32%) */}
                <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-7 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      {/* Community Group Blue Icon */}
                      <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                        <Users className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 leading-tight">
                        Make a Difference
                      </h3>
                    </div>
                    
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Not facing a new problem?<br />
                      Support an existing challenge that affects you.
                    </p>
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => setActiveNav('nearby')}
                    className="w-full bg-white hover:bg-sky-50 text-[#1a73e8] border border-sky-300 font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-2"
                  >
                    <span>Explore Nearby Problems</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* ----------------------------------------------------------------- */}
              {/* ROW 2: FOUR STATISTIC CARDS (MATCHING REFERENCE EXACT ICONS/NUM)  */}
              {/* ----------------------------------------------------------------- */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                
                {/* Card 1: Problems Reported (Blue Icon) */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center gap-4 hover:shadow-md transition">
                  <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                    <ClipboardList className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                      12
                    </h4>
                    <p className="text-xs text-slate-500 font-medium leading-tight mt-0.5">
                      Problems Reported<br />by you
                    </p>
                  </div>
                </div>

                {/* Card 2: Total Citizens Supported (Green Icon) */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center gap-4 hover:shadow-md transition">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                      847
                    </h4>
                    <p className="text-xs text-slate-500 font-medium leading-tight mt-0.5">
                      Total Citizens<br />Supported
                    </p>
                  </div>
                </div>

                {/* Card 3: Problems Resolved (Purple Icon) */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center gap-4 hover:shadow-md transition">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                      5
                    </h4>
                    <p className="text-xs text-slate-500 font-medium leading-tight mt-0.5">
                      Problems Resolved<br />in your area
                    </p>
                  </div>
                </div>

                {/* Card 4: In Progress (Orange Icon) */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center gap-4 hover:shadow-md transition">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                      7
                    </h4>
                    <p className="text-xs text-slate-500 font-medium leading-tight mt-0.5">
                      In Progress<br />under solution
                    </p>
                  </div>
                </div>
              </div>

              {/* ----------------------------------------------------------------- */}
              {/* ROW 3: RECENT PROBLEMS TABLE (LEFT) + NEARBY PROBLEMS MAP (RIGHT)  */}
              {/* ----------------------------------------------------------------- */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Your Recent Problems Table (7 Cols / Left ~58%) */}
                <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">
                      Your Recent Problems
                    </h3>
                    <button
                      onClick={() => setActiveNav('my-problems')}
                      className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
                    >
                      <span>View All</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Responsive Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                          <th className="pb-3 pr-2">ID</th>
                          <th className="pb-3 pr-4">Problem Title</th>
                          <th className="pb-3 pr-4">Location</th>
                          <th className="pb-3 pr-4">Status</th>
                          <th className="pb-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {recentTableChallenges.map((row) => (
                          <tr key={row.id} className="hover:bg-slate-50/80 transition">
                            <td className="py-3.5 pr-2 font-mono font-bold text-slate-700 whitespace-nowrap">
                              {row.id}
                            </td>
                            <td className="py-3.5 pr-4 font-semibold text-slate-900 max-w-[200px] truncate">
                              {row.title}
                            </td>
                            <td className="py-3.5 pr-4 text-slate-500 whitespace-nowrap">
                              {row.village || row.location}
                            </td>
                            <td className="py-3.5 pr-4 whitespace-nowrap">
                              {renderStatusBadge(row.status)}
                            </td>
                            <td className="py-3.5 text-right whitespace-nowrap">
                              <button
                                onClick={() => onSelectChallenge(row.id)}
                                className="text-sky-600 hover:text-sky-800 font-bold hover:underline"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Nearby Problems Map (5 Cols / Right ~42%) */}
                <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">
                      Nearby Problems
                    </h3>
                    <button
                      onClick={() => setActiveNav('nearby')}
                      className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
                    >
                      <span>View Map</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Leaflet Map with Ranchi Coordinates */}
                  <div className="flex-1 min-h-[220px]">
                    <JharkhandMap
                      challenges={challenges}
                      onSelectChallenge={onSelectChallenge}
                      height="210px"
                      showLegend={true}
                      center={[23.3650, 85.3300]}
                      zoom={12}
                    />
                  </div>
                </div>
              </div>

              {/* ----------------------------------------------------------------- */}
              {/* ROW 4: CHALLENGES IN AREA + PROBLEM STATUS FLOW + NOTIFICATIONS   */}
              {/* ----------------------------------------------------------------- */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
                
                {/* 1. Challenges in Your Area (5 Cols / Left ~42%) */}
                <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">
                      Challenges in Your Area
                    </h3>
                    <button
                      onClick={() => setActiveNav('nearby')}
                      className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
                    >
                      <span>View All</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Challenge Cards List */}
                  <div className="space-y-4">
                    {areaChallenges.map((ch) => {
                      const isVoted = votedChallenges[ch.id];
                      const totalSupporters = isVoted ? ch.affectedCount + 1 : ch.affectedCount;

                      return (
                        <div key={ch.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition space-y-3">
                          <div className="flex items-start gap-3.5">
                            {/* Thumbnail */}
                            <img
                              src={ch.image}
                              alt={ch.title}
                              className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 border border-slate-200"
                            />
                            
                            {/* Info */}
                            <div className="space-y-1 min-w-0 flex-1">
                              <h4 
                                onClick={() => onSelectChallenge(ch.id)}
                                className="text-sm font-bold text-slate-900 hover:text-sky-600 transition cursor-pointer leading-snug line-clamp-2"
                              >
                                {ch.title}
                              </h4>
                              <p className="text-[11px] text-slate-500 font-medium">
                                📍 {ch.village || ch.location}
                              </p>
                              <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-0.5">
                                <span className="flex items-center gap-1 font-semibold text-slate-700">
                                  <Users className="w-3.5 h-3.5 text-slate-400" />
                                  <span>{totalSupporters} citizens affected</span>
                                </span>
                                <span className="flex items-center gap-1">
                                  <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                                  <span>{ch.commentsCount || 10} comments</span>
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* "I Am Also Affected" Button */}
                          <div className="flex justify-end pt-1">
                            <button
                              onClick={() => handleVoteAlsoAffected(ch.id, ch.affectedCount)}
                              disabled={isVoted}
                              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                                isVoted
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                                  : 'bg-white hover:bg-sky-50 text-[#1a73e8] border border-sky-300 shadow-2xs'
                              }`}
                            >
                              {isVoted ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>✓ I Am Affected</span>
                                </>
                              ) : (
                                <>
                                  <ThumbsUp className="w-3.5 h-3.5" />
                                  <span>I Am Also Affected</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Problem Status Flow (3 Cols / Center ~25%) */}
                <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">
                    Problem Status Flow
                  </h3>

                  {/* Vertical Timeline Matching Reference Design */}
                  <div className="relative pl-5 space-y-3.5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 text-xs">
                    
                    {/* Stage 1: Submitted */}
                    <div className="relative">
                      <span className="absolute -left-5 top-1 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-white" />
                      <div>
                        <p className="font-bold text-slate-900 leading-tight">Submitted</p>
                        <p className="text-[11px] text-slate-500">Your problem has been submitted</p>
                      </div>
                    </div>

                    {/* Stage 2: AI Analysis */}
                    <div className="relative">
                      <span className="absolute -left-5 top-1 w-3 h-3 rounded-full bg-sky-500 ring-4 ring-white" />
                      <div>
                        <p className="font-bold text-slate-900 leading-tight">AI Analysis</p>
                        <p className="text-[11px] text-slate-500">Our system is analyzing the problem</p>
                      </div>
                    </div>

                    {/* Stage 3: Under Validation (CURRENT ACTIVE STAGE IN REFERENCE) */}
                    <div className="relative">
                      <span className="absolute -left-5 top-1 w-3 h-3 rounded-full bg-amber-500 ring-4 ring-amber-100 animate-pulse" />
                      <div className="bg-amber-50/70 p-2 rounded-xl border border-amber-200">
                        <p className="font-bold text-amber-900 leading-tight">Under Validation</p>
                        <p className="text-[10px] text-amber-800 font-medium">Being reviewed by authorities</p>
                      </div>
                    </div>

                    {/* Stage 4: Assigned to Institution */}
                    <div className="relative opacity-60">
                      <span className="absolute -left-5 top-1 w-3 h-3 rounded-full bg-slate-300 ring-4 ring-white" />
                      <div>
                        <p className="font-semibold text-slate-700 leading-tight">Assigned to Institution</p>
                      </div>
                    </div>

                    {/* Stage 5: In Progress */}
                    <div className="relative opacity-60">
                      <span className="absolute -left-5 top-1 w-3 h-3 rounded-full bg-slate-300 ring-4 ring-white" />
                      <div>
                        <p className="font-semibold text-slate-700 leading-tight">In Progress</p>
                      </div>
                    </div>

                    {/* Stage 6: Solution Proposed */}
                    <div className="relative opacity-60">
                      <span className="absolute -left-5 top-1 w-3 h-3 rounded-full bg-slate-300 ring-4 ring-white" />
                      <div>
                        <p className="font-semibold text-slate-700 leading-tight">Solution Proposed</p>
                      </div>
                    </div>

                    {/* Stage 7: Pilot Testing */}
                    <div className="relative opacity-60">
                      <span className="absolute -left-5 top-1 w-3 h-3 rounded-full bg-slate-300 ring-4 ring-white" />
                      <div>
                        <p className="font-semibold text-slate-700 leading-tight">Pilot Testing</p>
                      </div>
                    </div>

                    {/* Stage 8: Implemented */}
                    <div className="relative opacity-60">
                      <span className="absolute -left-5 top-1 w-3 h-3 rounded-full bg-slate-300 ring-4 ring-white" />
                      <div>
                        <p className="font-semibold text-slate-700 leading-tight">Implemented</p>
                      </div>
                    </div>

                    {/* Stage 9: Impact Measured */}
                    <div className="relative opacity-60">
                      <span className="absolute -left-5 top-1 w-3 h-3 rounded-full bg-slate-300 ring-4 ring-white" />
                      <div>
                        <p className="font-semibold text-slate-700 leading-tight">Impact Measured</p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* 3. Messages & Notifications (4 Cols / Right ~33%) */}
                <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">
                      Messages & Notifications
                    </h3>
                    <button
                      onClick={() => setActiveNav('notifications')}
                      className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
                    >
                      <span>View All</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Notifications Feed */}
                  <div className="space-y-3.5 divide-y divide-slate-100 text-xs">
                    
                    {/* Item 1: Under Validation */}
                    <div className="pt-2 flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="font-semibold text-slate-900 leading-snug">
                            Your problem SSP-2026-0012 is under validation.
                          </p>
                          <p className="text-[11px] text-slate-400">2 hours ago</p>
                        </div>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0 mt-1.5" />
                    </div>

                    {/* Item 2: Supported */}
                    <div className="pt-3 flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                          <Users className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="font-semibold text-slate-900 leading-snug">
                            45 new citizens supported your problem "Drinking water shortage".
                          </p>
                          <p className="text-[11px] text-slate-400">1 day ago</p>
                        </div>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0 mt-1.5" />
                    </div>

                    {/* Item 3: Resolved */}
                    <div className="pt-3 flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="font-semibold text-slate-900 leading-snug">
                            Problem SSP-2026-0002 has been resolved.
                          </p>
                          <p className="text-[11px] text-slate-400">3 days ago</p>
                        </div>
                      </div>
                    </div>

                    {/* Item 4: Comment */}
                    <div className="pt-3 flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="font-semibold text-slate-900 leading-snug">
                            New comment on your problem "Garbage dumping near school".
                          </p>
                          <p className="text-[11px] text-slate-400">4 days ago</p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ===================================================================== */}
          {/* SUB-VIEW 2: MY PROBLEMS PAGE                                          */}
          {/* ===================================================================== */}
          {activeNav === 'my-problems' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">My Reported Problems</h2>
                  <p className="text-xs text-slate-500">Track real-time status of all grievances submitted by you in Ranchi.</p>
                </div>
                <button
                  onClick={() => setReportModalOpen(true)}
                  className="bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs"
                >
                  + Report New Problem
                </button>
              </div>

              {/* Filter Chips */}
              <div className="flex flex-wrap gap-2 text-xs">
                {['All', 'Under Validation', 'In Progress', 'Solution Proposed', 'Resolved'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setMyProblemsFilter(st)}
                    className={`px-3.5 py-1.5 rounded-xl font-bold transition ${
                      myProblemsFilter === st
                        ? 'bg-[#1a73e8] text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              {/* Problems Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredMyProblems.map((ch) => (
                  <div key={ch.id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xs hover:shadow-md transition">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {ch.id}
                      </span>
                      {renderStatusBadge(ch.status)}
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{ch.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2">{ch.description}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
                      <span>📍 {ch.village || ch.location || 'Kanke, Ranchi'}</span>
                      <button
                        onClick={() => onSelectChallenge(ch.id)}
                        className="font-bold text-sky-600 hover:underline flex items-center gap-1"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* SUB-VIEW 3: NEARBY PROBLEMS & MAP                                     */}
          {/* ===================================================================== */}
          {activeNav === 'nearby' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-2xl font-black text-slate-900">Nearby Problems in Ranchi</h2>
                <p className="text-xs text-slate-500">Discover and endorse existing challenges in Kanke, Harmu, Morabadi, and Doranda.</p>
              </div>

              <JharkhandMap
                challenges={challenges}
                onSelectChallenge={onSelectChallenge}
                height="420px"
                showLegend={true}
                center={[23.3650, 85.3300]}
                zoom={12}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {areaChallenges.map((ch) => {
                  const isVoted = votedChallenges[ch.id];
                  const totalSupporters = isVoted ? ch.affectedCount + 1 : ch.affectedCount;

                  return (
                    <div key={ch.id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xs">
                      <div className="flex items-start gap-3.5">
                        <img src={ch.image} alt={ch.title} className="w-20 h-20 rounded-xl object-cover border border-slate-200 shrink-0" />
                        <div className="space-y-1">
                          <h4 className="font-bold text-sm text-slate-900">{ch.title}</h4>
                          <p className="text-xs text-slate-500">📍 {ch.village || ch.location}</p>
                          <p className="text-xs text-slate-700">👥 <strong>{totalSupporters}</strong> citizens affected</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                        <button onClick={() => onSelectChallenge(ch.id)} className="text-xs font-bold text-slate-600 hover:underline">
                          View Details
                        </button>
                        <button
                          onClick={() => handleVoteAlsoAffected(ch.id, ch.affectedCount)}
                          disabled={isVoted}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                            isVoted
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                              : 'bg-white hover:bg-sky-50 text-[#1a73e8] border border-sky-300'
                          }`}
                        >
                          {isVoted ? "✓ I Am Affected" : "👍 I Am Also Affected"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* SUB-VIEW 4: SUPPORTED PROBLEMS                                        */}
          {/* ===================================================================== */}
          {activeNav === 'supported' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-2xl font-black text-slate-900">Challenges You Supported</h2>
                <p className="text-xs text-slate-500">Problems where you clicked "I Am Also Affected" to consolidate community demand.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {areaChallenges.map((ch) => (
                  <div key={ch.id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                        ✓ Endorsed by You
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-600">{ch.id}</span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900">{ch.title}</h4>
                    <p className="text-xs text-slate-500">📍 {ch.village || ch.location}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* SUB-VIEW 5: NOTIFICATIONS FULL FEED                                  */}
          {/* ===================================================================== */}
          {activeNav === 'notifications' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-2xl font-black text-slate-900">Notifications & Alerts</h2>
                <p className="text-xs text-slate-500">Real-time alerts regarding your reported problems and community updates.</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100">
                <div className="p-4 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-purple-600" />
                    <div>
                      <strong className="text-slate-900 block text-sm">Your problem SSP-2026-0012 is under validation.</strong>
                      <span className="text-slate-400">2 hours ago • Drinking Water & Sanitation Dept</span>
                    </div>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                </div>

                <div className="p-4 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-sky-600" />
                    <div>
                      <strong className="text-slate-900 block text-sm">45 new citizens supported your problem "Drinking water shortage".</strong>
                      <span className="text-slate-400">1 day ago • Kanke Ward 3</span>
                    </div>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                </div>

                <div className="p-4 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <div>
                      <strong className="text-slate-900 block text-sm">Problem SSP-2026-0002 has been resolved.</strong>
                      <span className="text-slate-400">3 days ago • Khelgaon PaveTech Pilot</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* SUB-VIEW 6: PROFILE                                                   */}
          {/* ===================================================================== */}
          {activeNav === 'profile' && (
            <div className="space-y-6 max-w-2xl">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-2xl font-black text-slate-900">Citizen Profile</h2>
                <p className="text-xs text-slate-500">
                  {isRegisteredCitizen && currentUser?.district 
                    ? `Registered citizen in ${currentUser.district}, Jharkhand.` 
                    : 'Citizen guest identity. Register or Login to save your custom profile.'}
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 text-xs">
                <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                  <div className="w-16 h-16 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-2xl shadow-sm">
                    <User className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {displayName}
                    </h3>
                    <p className="text-slate-500">
                      {displayLocation}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-400 block font-semibold">Email:</span>
                    <strong className="text-slate-900 text-sm">
                      {isRegisteredCitizen && currentUser?.email ? currentUser.email : 'citizen@samadhansetu.in'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Phone:</span>
                    <strong className="text-slate-900 text-sm">
                      {isRegisteredCitizen && currentUser?.phone ? currentUser.phone : '+91 94311 00000'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">District:</span>
                    <strong className="text-slate-900 text-sm">
                      {isRegisteredCitizen && currentUser?.district ? currentUser.district : 'Jharkhand'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Block / Ward / Village:</span>
                    <strong className="text-slate-900 text-sm">
                      {isRegisteredCitizen ? (currentUser?.village || currentUser?.block || `${currentUser.district} HQ`) : 'Local Ward'}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ========================================================================= */}
      {/* 3. REPORT A PROBLEM MODAL FORM                                            */}
      {/* ========================================================================= */}
      <ReportProblemForm
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        onSuccess={(newCh) => {
          setActiveNav('dashboard');
        }}
      />
    </div>
  );
};
