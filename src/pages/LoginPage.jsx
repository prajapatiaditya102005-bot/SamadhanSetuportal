import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { DEMO_ROLES } from '../data/demoUsers';
import { JHARKHAND_DISTRICTS } from '../data/districtsData';
import { 
  Users, 
  Landmark, 
  School, 
  GraduationCap, 
  Lightbulb, 
  Briefcase, 
  HeartHandshake, 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  Mail, 
  Phone,
  User,
  MapPin,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  KeyRound
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const LoginPage = ({ initialRole, onNavigate, onLoginSuccess }) => {
  const { switchRole, login, currentRole } = useAuth();
  
  // Selected role state
  const [selectedRoleId, setSelectedRoleId] = useState(initialRole || currentRole || 'citizen');
  
  // Mode: 'login' or 'register' (applicable for citizen)
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  
  // Clean fresh inputs (NOT pre-filled / fixed)
  const [mobileOrEmail, setMobileOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Citizen Registration Form state (fresh / empty)
  const [regFullName, setRegFullName] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regDistrict, setRegDistrict] = useState('Ranchi');
  const [regCityVillage, setRegCityVillage] = useState('');
  
  // UI Messages
  const [toastMessage, setToastMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Synchronize when initialRole changes
  useEffect(() => {
    if (initialRole) {
      setSelectedRoleId(initialRole);
    }
  }, [initialRole]);

  // Clear inputs when role changes for a fresh login form
  useEffect(() => {
    setMobileOrEmail('');
    setPassword('');
    setErrorMessage('');
    setToastMessage('');
  }, [selectedRoleId]);

  const selectedRoleObj = DEMO_ROLES.find(r => r.roleId === selectedRoleId) || DEMO_ROLES[0];

  const getRoleIcon = (roleId) => {
    switch (roleId) {
      case 'citizen': return <Users className="w-5 h-5 text-blue-600" />;
      case 'government': return <Landmark className="w-5 h-5 text-emerald-600" />;
      case 'hei_admin': return <School className="w-5 h-5 text-purple-600" />;
      case 'faculty': return <GraduationCap className="w-5 h-5 text-indigo-600" />;
      case 'student': return <Lightbulb className="w-5 h-5 text-amber-600" />;
      case 'industry': return <Briefcase className="w-5 h-5 text-cyan-600" />;
      case 'csr': return <HeartHandshake className="w-5 h-5 text-rose-600" />;
      case 'admin': return <ShieldCheck className="w-5 h-5 text-slate-800" />;
      default: return <Users className="w-5 h-5" />;
    }
  };

  const triggerSuccessCelebration = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  // Helper to auto-fill demo credentials if the user explicitly wants convenience
  const handleAutoFillDemo = () => {
    const rObj = DEMO_ROLES.find(r => r.roleId === selectedRoleId) || DEMO_ROLES[0];
    setMobileOrEmail(rObj.sampleUser.email);
    setPassword('demo@123');
    setToastMessage(`Filled demo credentials for ${rObj.sampleUser.name}`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Handle Citizen Login
  const handleCitizenLogin = (e) => {
    e.preventDefault();
    if (!mobileOrEmail.trim()) {
      setErrorMessage('Please enter your Full Name, Mobile Number, or Email.');
      return;
    }
    if (!password.trim()) {
      setErrorMessage('Please enter your Password.');
      return;
    }

    const inputVal = mobileOrEmail.trim();
    const registeredCitizens = storageService.getRegisteredCitizens();
    
    // Check if input matches an already registered citizen
    const matchedCitizen = registeredCitizens.find(c => 
      (c.phone && c.phone.replace(/\D/g, '') === inputVal.replace(/\D/g, '')) ||
      (c.email && c.email.toLowerCase() === inputVal.toLowerCase()) ||
      (c.name && c.name.toLowerCase() === inputVal.toLowerCase())
    );

    let userName = 'Citizen';
    let userEmail = inputVal.includes('@') ? inputVal : `${inputVal.replace(/\s+/g, '').toLowerCase()}@citizen.samadhansetu.in`;
    let userPhone = /^\+?\d[\d\s-]{7,}$/.test(inputVal) ? inputVal : '+91 94311 00000';
    let userDistrict = 'Ranchi';
    let userVillage = 'Ranchi';

    if (matchedCitizen) {
      userName = matchedCitizen.name;
      userEmail = matchedCitizen.email;
      userPhone = matchedCitizen.phone;
      userDistrict = matchedCitizen.district || 'Ranchi';
      userVillage = matchedCitizen.village || 'Ranchi';
    } else {
      // If matches sample citizen email or demo credentials
      const sampleCit = DEMO_ROLES.find(r => r.roleId === 'citizen');
      if (sampleCit && (sampleCit.sampleUser.email.toLowerCase() === inputVal.toLowerCase() || inputVal.toLowerCase().includes('ramesh'))) {
        userName = sampleCit.sampleUser.name;
        userDistrict = sampleCit.sampleUser.district || 'Ranchi';
        userVillage = sampleCit.sampleUser.village || 'Kanke, Ranchi';
      } else if (inputVal.includes('@')) {
        // Parse name from email handle (e.g. arushi.prajapati@gmail.com -> Arushi Prajapati)
        const emailName = inputVal.split('@')[0].replace(/[\._\d]/g, ' ').trim();
        if (emailName.length >= 2) {
          userName = emailName.replace(/\b\w/g, l => l.toUpperCase());
        }
      } else if (!/^\d+$/.test(inputVal.replace(/[\s\+\-]/g, ''))) {
        // Plain text name entered
        userName = inputVal.replace(/\b\w/g, l => l.toUpperCase());
      } else {
        userName = 'Citizen User';
      }
    }

    login('citizen', {
      name: userName,
      email: userEmail,
      phone: userPhone,
      roleLabel: `Citizen | ${userDistrict}`,
      district: userDistrict,
      village: userVillage,
      isRegistered: true
    });

    triggerSuccessCelebration();

    if (onLoginSuccess) {
      onLoginSuccess('citizen');
    } else if (onNavigate) {
      onNavigate('portal');
    }
  };

  // Handle Citizen Registration
  const handleCitizenRegister = (e) => {
    e.preventDefault();
    if (!regFullName.trim()) {
      setErrorMessage('Please enter your Full Name.');
      return;
    }
    if (!regMobile.trim() && !regEmail.trim()) {
      setErrorMessage('Please enter your Mobile Number or Email address.');
      return;
    }
    if (!regPassword.trim()) {
      setErrorMessage('Please enter a Password.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setErrorMessage('Passwords do not match. Please verify.');
      return;
    }

    const userName = regFullName.trim();
    const userDistrict = regDistrict || 'Ranchi';
    const userVillage = regCityVillage.trim() || `${userDistrict} HQ`;

    const newCitizen = {
      id: `usr_cit_${Date.now()}`,
      name: userName,
      email: regEmail.trim() || `${regMobile.trim()}@citizen.samadhansetu.in`,
      phone: regMobile.trim() || '+91 94311 00000',
      district: userDistrict,
      village: userVillage,
      role: 'citizen',
      roleLabel: `Citizen | ${userDistrict}`,
      isRegistered: true,
      submittedChallengesCount: 0,
      supportedChallengesCount: 0,
      resolvedCount: 0,
      inProgressCount: 0
    };

    // Persist registered citizen
    storageService.saveRegisteredCitizen(newCitizen);

    login('citizen', newCitizen);

    triggerSuccessCelebration();

    if (onLoginSuccess) {
      onLoginSuccess('citizen');
    } else if (onNavigate) {
      onNavigate('portal');
    }
  };

  // Handle Other Roles Login
  const handleOtherRoleLogin = (e) => {
    e.preventDefault();
    if (!mobileOrEmail.trim()) {
      setErrorMessage('Please enter your Official Email or ID.');
      return;
    }
    if (!password.trim()) {
      setErrorMessage('Please enter your Password.');
      return;
    }

    login(selectedRoleId, {
      email: mobileOrEmail.trim(),
      name: selectedRoleObj.sampleUser.name
    });

    triggerSuccessCelebration();

    if (onLoginSuccess) {
      onLoginSuccess(selectedRoleId);
    } else if (onNavigate) {
      onNavigate('portal');
    }
  };

  const handleForgotPassword = () => {
    if (!mobileOrEmail.trim()) {
      setErrorMessage('Please enter your Mobile Number or Email first to receive a password reset link.');
      return;
    }
    setToastMessage(`A password reset link has been sent to ${mobileOrEmail.trim()}.`);
    setTimeout(() => setToastMessage(''), 4500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      
      {/* Page Title & Heading */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Login to Samadhan Setu
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
          Jharkhand State Societal Innovation & Problem Solving Platform
        </p>
      </div>

      {/* Selected Role Pill / Selector Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-100 shrink-0">
              {getRoleIcon(selectedRoleId)}
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Selected Role:
              </span>
              <span className="text-base font-extrabold text-slate-900">
                {selectedRoleObj.roleName}
              </span>
            </div>
          </div>

          <span className={`self-start sm:self-center text-xs font-bold px-3 py-1 rounded-full ${selectedRoleObj.badgeColor}`}>
            {selectedRoleObj.hindiTitle}
          </span>
        </div>

        {/* Quick Role Switcher Chips */}
        <div className="pt-2 border-t border-slate-100">
          <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
            Switch Role:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {DEMO_ROLES.map((r) => (
              <button
                key={r.roleId}
                type="button"
                onClick={() => {
                  setSelectedRoleId(r.roleId);
                  setAuthMode('login');
                }}
                className={`text-xs px-2.5 py-1 rounded-lg font-bold transition ${
                  selectedRoleId === r.roleId
                    ? 'bg-brand-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {r.roleName.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="bg-blue-50 border border-blue-200 text-blue-900 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-between shadow-xs animate-in fade-in">
          <span>ℹ️ {toastMessage}</span>
          <button onClick={() => setToastMessage('')} className="text-blue-700 font-bold ml-2">✕</button>
        </div>
      )}

      {/* Error Alert */}
      {errorMessage && (
        <div className="bg-rose-50 border border-rose-200 text-rose-900 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button onClick={() => setErrorMessage('')} className="text-rose-700 font-bold ml-2">✕</button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. CITIZEN LOGIN & REGISTRATION FORMS (CLEAN & FRESH)                     */}
      {/* ========================================================================= */}
      {selectedRoleId === 'citizen' ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 max-w-xl mx-auto space-y-6">
          
          {/* Mode Tabs: Login vs Register */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => {
                setAuthMode('login');
                setErrorMessage('');
              }}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition text-center ${
                authMode === 'login' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Citizen Login
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('register');
                setErrorMessage('');
              }}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition text-center ${
                authMode === 'register' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Create New Account
            </button>
          </div>

          {/* 1A. CITIZEN FRESH LOGIN TAB */}
          {authMode === 'login' && (
            <form onSubmit={handleCitizenLogin} className="space-y-4">
              
              {/* Full Name / Mobile Number / Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name, Mobile Number, or Email <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    value={mobileOrEmail}
                    onChange={(e) => {
                      setMobileOrEmail(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    placeholder="Enter your Name, 10-digit mobile, or email"
                    className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-700 font-medium placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">
                    Password <span className="text-rose-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-[11px] font-bold text-brand-700 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    placeholder="Enter your password"
                    className="w-full pl-9 pr-10 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-700 font-mono placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-extrabold text-sm py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2"
                >
                  <span>Login to Citizen Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Demo Fill Helper */}
              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={handleAutoFillDemo}
                  className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-brand-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg font-medium transition"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Fill Demo Credentials (Ramesh Kumar)</span>
                </button>
              </div>

              {/* Toggle to Register */}
              <div className="pt-3 text-center border-t border-slate-100">
                <p className="text-xs text-slate-600">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('register');
                      setErrorMessage('');
                    }}
                    className="font-bold text-[#1a73e8] hover:underline"
                  >
                    Create New Account
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* 1B. NEW CITIZEN REGISTRATION TAB (FRESH / EMPTY) */}
          {authMode === 'register' && (
            <form onSubmit={handleCitizenRegister} className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    value={regFullName}
                    onChange={(e) => {
                      setRegFullName(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    placeholder="Enter your full name"
                    className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-700 font-medium placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Mobile Number & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="tel"
                      required
                      value={regMobile}
                      onChange={(e) => {
                        setRegMobile(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      placeholder="10-digit mobile number"
                      className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-700 font-medium placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => {
                        setRegEmail(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      placeholder="e.g. name@example.com"
                      className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-700 font-medium placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              {/* Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Password <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => {
                        setRegPassword(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      placeholder="Create a password"
                      className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-700 font-mono placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Confirm Password <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="password"
                      required
                      value={regConfirmPassword}
                      onChange={(e) => {
                        setRegConfirmPassword(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      placeholder="Confirm password"
                      className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-700 font-mono placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              {/* District & City/Village */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    District <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={regDistrict}
                    onChange={(e) => setRegDistrict(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-700 font-semibold bg-white"
                  >
                    {JHARKHAND_DISTRICTS.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name} ({d.hindiName})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    City / Village / Block
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      value={regCityVillage}
                      onChange={(e) => setRegCityVillage(e.target.value)}
                      placeholder="e.g. Kanke / Morabadi / Chas"
                      className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-700 font-medium placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Registration */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-jharkhand-green hover:bg-jharkhand-darkgreen text-white font-extrabold text-sm py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Create Account & Open Dashboard</span>
                </button>
              </div>

              {/* Toggle to Login */}
              <div className="pt-3 text-center border-t border-slate-100">
                <p className="text-xs text-slate-600">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setErrorMessage('');
                    }}
                    className="font-bold text-[#1a73e8] hover:underline"
                  >
                    Back to Login
                  </button>
                </p>
              </div>
            </form>
          )}
        </div>
      ) : (
        /* ======================================================================= */
        /* 2. NON-CITIZEN ROLE LOGIN FORM (FRESH INPUTS WITH OPTIONAL AUTOFILL)     */
        /* ======================================================================= */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 max-w-xl mx-auto space-y-6">
          
          <div className="space-y-1">
            <h2 className="text-lg font-black text-slate-900">
              {selectedRoleObj.roleName} Login
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              {selectedRoleObj.description}
            </p>
          </div>

          <form onSubmit={handleOtherRoleLogin} className="space-y-4">
            
            {/* Official Email / ID */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Official Email / ID <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  required
                  value={mobileOrEmail}
                  onChange={(e) => {
                    setMobileOrEmail(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder={`Enter official ${selectedRoleObj.roleName.split(' ')[0]} email/ID`}
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-700 font-medium placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">
                  Password <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-[11px] font-bold text-brand-700 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="Enter password"
                  className="w-full pl-9 pr-10 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-700 font-mono placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-brand-900 hover:bg-brand-950 text-white font-extrabold text-sm py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                <span>Login as {selectedRoleObj.roleName.split(' ')[0]}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Demo Fill Helper */}
            <div className="pt-2 flex justify-center">
              <button
                type="button"
                onClick={handleAutoFillDemo}
                className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-brand-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg font-medium transition"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Fill Demo Credentials ({selectedRoleObj.sampleUser.name})</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Back to Home Link */}
      <div className="text-center pt-2">
        <button
          onClick={() => onNavigate && onNavigate('landing')}
          className="text-xs font-bold text-slate-500 hover:text-slate-800 transition underline"
        >
          ← Back to Homepage
        </button>
      </div>

    </div>
  );
};
