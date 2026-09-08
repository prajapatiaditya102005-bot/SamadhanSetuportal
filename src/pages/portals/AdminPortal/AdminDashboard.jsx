import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useChallenges } from '../../../context/ChallengeContext';
import { StatCard } from '../../../components/common/StatCard';
import { StatusBadge } from '../../../components/common/StatusBadge';
import { PriorityBadge } from '../../../components/common/PriorityBadge';
import { INSTITUTIONS } from '../../../data/institutionsData';
import { INDUSTRY_PARTNERS } from '../../../data/industryPartnersData';
import { DEMO_ROLES } from '../../../data/demoUsers';
import { CATEGORIES } from '../../../data/districtsData';
import { 
  ShieldCheck, 
  Users, 
  Building2, 
  School, 
  Cpu, 
  Layers, 
  Settings, 
  CheckCircle2, 
  XCircle, 
  Sliders, 
  Activity,
  AlertTriangle,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const AdminDashboard = ({ onSelectChallenge }) => {
  const { currentUser } = useAuth();
  const { challenges, updateLifecycleStatus, resetDemoData } = useChallenges();
  const [activeTab, setActiveTab] = useState('overview'); // overview, users, verification, ai-moderation, categories, settings
  const [successToast, setSuccessToast] = useState('');

  // AI Threshold Tuning Simulation State
  const [aiConfidenceThreshold, setAiConfidenceThreshold] = useState(85);
  const [duplicateSimilarityThreshold, setDuplicateSimilarityThreshold] = useState(70);
  const [autoTriageEnabled, setAutoTriageEnabled] = useState(true);

  const handleVerify = (name) => {
    setSuccessToast(`Institution / Partner '${name}' verified & accredited on state network.`);
    setTimeout(() => setSuccessToast(''), 3000);
  };

  const handleResetSystemData = () => {
    if (window.confirm("Are you sure you want to reset the platform database to default Jharkhand challenges?")) {
      resetDemoData();
      setSuccessToast("Platform database reset to baseline state.");
      setTimeout(() => setSuccessToast(''), 3000);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Admin Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-700 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🛡️</span>
              <span className="bg-slate-800 text-emerald-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-slate-700">
                State Platform Administrator • मुख्य प्रणाली नियंत्रक
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Samadhan Setu Master Command & Control
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Administrator: <strong>{currentUser.name}</strong> • State IT & e-Governance Center, Project Building, Ranchi
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleResetSystemData}
              className="bg-rose-950 hover:bg-rose-900 text-rose-200 border border-rose-800 font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Database</span>
            </button>
          </div>
        </div>
      </div>

      {successToast && (
        <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-between shadow-xs animate-in fade-in">
          <span>✓ {successToast}</span>
          <button onClick={() => setSuccessToast('')} className="text-emerald-700">✕</button>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-semibold">
        {[
          { id: 'overview', label: 'Ecosystem Analytics', icon: Activity },
          { id: 'users', label: 'Role & User Directory', icon: Users },
          { id: 'verification', label: 'HEI & Industry KYC', icon: ShieldCheck },
          { id: 'ai-moderation', label: 'AI Moderation & Weights', icon: Cpu },
          { id: 'categories', label: 'Category Master', icon: Layers },
          { id: 'settings', label: 'System Settings', icon: Settings }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition shrink-0 ${
                isActive 
                  ? 'bg-slate-900 text-white shadow-xs font-bold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total System Users"
              value="4,850+"
              subtitle="Citizens, Govt, HEI, Industry"
              icon={Users}
              color="brand"
            />
            <StatCard
              title="Verified HEIs"
              value={INSTITUTIONS.length}
              subtitle="Premier Jharkhand Universities"
              icon={School}
              color="purple"
            />
            <StatCard
              title="Industry / CSR Partners"
              value={INDUSTRY_PARTNERS.length}
              subtitle="Corporate Innovators"
              icon={Building2}
              color="cyan"
            />
            <StatCard
              title="System Health"
              value="99.98%"
              subtitle="API Response < 85ms"
              icon={Activity}
              color="green"
            />
          </div>

          {/* Quick Verification Queue */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Pending Partner Accreditations (KYC)
            </h3>
            <div className="divide-y divide-slate-100">
              <div className="py-3 flex items-center justify-between text-xs">
                <div>
                  <strong className="text-slate-900 block text-sm">Birla Institute of Technology (BIT) Mesra</strong>
                  <span className="text-slate-500">Deemed University • Mesra, Ranchi • AISHE Code: U-0024</span>
                </div>
                <button
                  onClick={() => handleVerify("BIT Mesra")}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verify HEI</span>
                </button>
              </div>

              <div className="py-3 flex items-center justify-between text-xs">
                <div>
                  <strong className="text-slate-900 block text-sm">Tata Steel Foundation (Jamshedpur)</strong>
                  <span className="text-slate-500">CSR Trust • Reg: CSR00004921 • Jamshedpur HQ</span>
                </div>
                <button
                  onClick={() => handleVerify("Tata Steel Foundation")}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verify Partner</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ROLE DIRECTORY */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">Platform Role Access & Permission Matrix</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DEMO_ROLES.map(role => (
              <div key={role.roleId} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <strong className="text-slate-900 text-sm">{role.roleName}</strong>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${role.badgeColor}`}>
                    {role.hindiTitle}
                  </span>
                </div>
                <p className="text-slate-600">{role.description}</p>
                <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-slate-500">
                  <span>Demo Account: {role.sampleUser.name}</span>
                  <span className="font-mono">{role.sampleUser.email}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: VERIFICATION */}
      {activeTab === 'verification' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">Institutional Accreditation Registry</h3>
          <div className="space-y-3">
            {INSTITUTIONS.map(inst => (
              <div key={inst.id} className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                <div>
                  <strong className="text-slate-900 block text-sm">{inst.name}</strong>
                  <span className="text-slate-500">{inst.type} • {inst.location}</span>
                </div>
                <span className="bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-lg flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Accredited</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: AI MODERATION */}
      {activeTab === 'ai-moderation' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 max-w-2xl text-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">NLP Triage Engine Parameter Tuning</h3>
              <p className="text-slate-500">Calibrate automatic classification heuristics and duplicate clustering thresholds.</p>
            </div>
            <Sparkles className="w-5 h-5 text-purple-600" />
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>Minimum AI Classification Confidence Gate:</span>
                <span className="font-mono text-brand-900">{aiConfidenceThreshold}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="98"
                value={aiConfidenceThreshold}
                onChange={(e) => setAiConfidenceThreshold(parseInt(e.target.value))}
                className="w-full accent-slate-800"
              />
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>Anti-Duplicate Similarity Cluster Threshold:</span>
                <span className="font-mono text-brand-900">{duplicateSimilarityThreshold}%</span>
              </div>
              <input
                type="range"
                min="40"
                max="90"
                value={duplicateSimilarityThreshold}
                onChange={(e) => setDuplicateSimilarityThreshold(parseInt(e.target.value))}
                className="w-full accent-slate-800"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-bold text-slate-800">Automated Institution Matching Dispatch:</span>
              <button
                onClick={() => setAutoTriageEnabled(!autoTriageEnabled)}
                className={`px-3 py-1.5 rounded-lg font-bold ${
                  autoTriageEnabled ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {autoTriageEnabled ? "Active (Enabled)" : "Manual Only"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: CATEGORIES */}
      {activeTab === 'categories' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">Challenge Taxonomy & Category Master</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            {CATEGORIES.map(c => (
              <div key={c.id} className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                <strong className="text-slate-900 block">{c.label}</strong>
                <p className="text-slate-500 text-[11px]">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: SETTINGS */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 max-w-2xl text-xs">
          <h3 className="text-base font-bold text-slate-900">State Gateway System Settings</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <div>
                <strong className="text-slate-900 block">OpenStreetMap Tile Server</strong>
                <span className="text-slate-500">Standard HTTPS Tile Cache (Jharkhand Bounds)</span>
              </div>
              <span className="text-emerald-700 font-bold font-mono">Connected</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <div>
                <strong className="text-slate-900 block">State SMS Gateway (CDAC)</strong>
                <span className="text-slate-500">Citizen grievance status notification webhook</span>
              </div>
              <span className="text-emerald-700 font-bold font-mono">Active</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
