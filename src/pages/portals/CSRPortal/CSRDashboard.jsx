import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useChallenges } from '../../../context/ChallengeContext';
import { StatCard } from '../../../components/common/StatCard';
import { StatusBadge } from '../../../components/common/StatusBadge';
import { PriorityBadge } from '../../../components/common/PriorityBadge';
import { 
  HeartHandshake, 
  Banknote, 
  Award, 
  FileText, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  Globe, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CSRDashboard = ({ onSelectChallenge }) => {
  const { currentUser } = useAuth();
  const { challenges, offerIndustrySupport } = useChallenges();
  const [activeTab, setActiveTab] = useState('impact-challenges'); // impact-challenges, funded, sdg-matrix, audit-reports
  const [fundingModalOpen, setFundingModalOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [pledgedAmount, setPledgedAmount] = useState('₹5,00,000');
  const [sdgPillar, setSdgPillar] = useState('SDG 6 (Clean Water & Sanitation)');
  const [successToast, setSuccessToast] = useState('');

  const highImpactChallenges = challenges.filter(c => 
    c.urgency === 'High' || c.affectedPopulation > 2000
  );

  const fundedProjects = challenges.filter(c => 
    c.csrPartner?.partnerName?.includes(currentUser?.organizationName || 'JSPL') ||
    c.csrPartner != null
  );

  const handleOpenFundingModal = (challenge) => {
    setSelectedChallenge(challenge);
    setFundingModalOpen(true);
  };

  const handleConfirmPledge = (e) => {
    e.preventDefault();
    if (!selectedChallenge) return;

    offerIndustrySupport(selectedChallenge.id, {
      partnerId: currentUser.id || 'ind_jspl_csr',
      partnerName: currentUser.organizationName || 'JSPL CSR Foundation',
      fundAmount: pledgedAmount,
      sdg: sdgPillar,
      isCsr: true
    });

    setSuccessToast(`CSR Grant Pledged! Allocated ${pledgedAmount} to Challenge #${selectedChallenge.id}`);
    setFundingModalOpen(false);
    setActiveTab('funded');

    try {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}

    setTimeout(() => setSuccessToast(''), 3500);
  };

  return (
    <div className="space-y-6">
      
      {/* CSR Header Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-brand-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-800/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🤝</span>
              <span className="bg-rose-500/20 text-rose-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-rose-400/30">
                CSR & Social Innovation Trust • सीएसआर अनुसंधान प्रकोष्ठ
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {currentUser.organizationName || 'JSPL CSR & Community Foundation'}
            </h1>
            <p className="text-xs sm:text-sm text-rose-200 max-w-2xl">
              Representative: <strong>{currentUser.name}</strong> ({currentUser.roleLabel}) • Focus: <strong>UN Sustainable Development Goals (SDGs)</strong>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center text-xs shrink-0">
            <div className="bg-white/10 p-3 rounded-2xl border border-white/10">
              <span className="text-[10px] text-rose-200 block uppercase">CSR Corpus</span>
              <strong className="text-lg font-bold text-amber-300 font-mono">₹1.50 Cr</strong>
            </div>
            <div className="bg-white/10 p-3 rounded-2xl border border-white/10">
              <span className="text-[10px] text-rose-200 block uppercase">Funded Projects</span>
              <strong className="text-lg font-bold text-emerald-400 font-mono">{fundedProjects.length}</strong>
            </div>
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
          { id: 'impact-challenges', label: `High-Impact Challenges (${highImpactChallenges.length})`, icon: Sparkles },
          { id: 'funded', label: `Our Funded Projects (${fundedProjects.length})`, icon: Banknote },
          { id: 'sdg-matrix', label: 'UN SDG Alignment', icon: Globe },
          { id: 'audit-reports', label: 'Impact Audit & Social ROI', icon: FileText }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition shrink-0 ${
                isActive 
                  ? 'bg-rose-900 text-white shadow-xs font-bold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: HIGH IMPACT CHALLENGES */}
      {activeTab === 'impact-challenges' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                High-Impact Societal Challenges for CSR Sponsorship
              </h3>
              <p className="text-xs text-slate-500">
                Pre-validated by Jharkhand Government and matched with university engineering laboratories.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {highImpactChallenges.map(ch => {
              const isFunded = ch.csrPartner != null;

              return (
                <div key={ch.id} className="bg-white rounded-2xl border border-rose-200/80 p-5 space-y-4 shadow-xs flex flex-col justify-between hover:shadow-md transition">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        {ch.id}
                      </span>
                      <PriorityBadge priority={ch.urgency} size="sm" />
                    </div>

                    <h4 className="text-base font-bold text-slate-900">{ch.title}</h4>
                    <p className="text-xs text-slate-500">📍 {ch.village}, {ch.district}</p>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{ch.description}</p>

                    <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                      <div className="bg-slate-50 p-2 rounded-lg">
                        <span className="text-[10px] text-slate-500 block">Affected Population</span>
                        <strong className="text-slate-900">{(ch.affectedPopulation || 0).toLocaleString()}+</strong>
                      </div>
                      <div className="bg-purple-50 p-2 rounded-lg">
                        <span className="text-[10px] text-purple-700 block">Assigned HEI</span>
                        <strong className="text-purple-900 truncate block">{ch.assignedInstitution?.institutionName || "BIT Mesra"}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectChallenge(ch.id)}
                      className="text-xs font-bold text-slate-700 hover:text-brand-900"
                    >
                      View Full Details
                    </button>

                    {isFunded ? (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-xl flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>CSR Funded: {ch.csrPartner.fundAllocated}</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleOpenFundingModal(ch)}
                        className="bg-rose-900 hover:bg-rose-950 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs flex items-center gap-1.5 transition"
                      >
                        <HeartHandshake className="w-3.5 h-3.5" />
                        <span>Pledge CSR Grant</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: FUNDED PROJECTS */}
      {activeTab === 'funded' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">
            Active CSR Grants & Real-time Progress ({fundedProjects.length})
          </h3>
          <div className="space-y-4">
            {fundedProjects.map(ch => (
              <div key={ch.id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-slate-500">{ch.id}</span>
                    <h4 className="text-base font-bold text-slate-900">{ch.title}</h4>
                    <p className="text-xs text-slate-500">📍 {ch.village}, {ch.district}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-700 font-mono bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 block">
                      {ch.csrPartner?.fundAllocated || "₹4.5 Lakhs"}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1 block">{ch.csrPartner?.sdgAligned || "SDG 6"}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold block">University R&D Squad:</span>
                    <strong className="text-purple-900">{ch.assignedInstitution?.institutionName || "BIT Mesra"}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold block">Status / Milestone:</span>
                    <StatusBadge status={ch.status} size="sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SDG ALIGNMENT */}
      {activeTab === 'sdg-matrix' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900">UN Sustainable Development Goals (SDG) Matrix</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 space-y-1">
              <strong className="text-blue-900 block text-sm">SDG 6: Clean Water & Sanitation</strong>
              <p className="text-slate-600">Fluoride removal and arsenic filtration projects in West Singhbhum & Sahibganj.</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
              <strong className="text-emerald-900 block text-sm">SDG 8: Decent Work & Livelihood</strong>
              <p className="text-slate-600">Tribal lac processing machines & Tussar silk value chains in Khunti.</p>
            </div>
            <div className="p-4 bg-rose-50 rounded-xl border border-rose-200 space-y-1">
              <strong className="text-rose-900 block text-sm">SDG 3: Good Health & Well-being</strong>
              <p className="text-slate-600">Solar anti-venom carriers & tele-medicine in Dumka forest belts.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: AUDIT REPORTS */}
      {activeTab === 'audit-reports' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 max-w-2xl">
          <h3 className="text-base font-bold text-slate-900">CSR Impact Audit & Statutory Certificate</h3>
          <p className="text-xs text-slate-600">
            Download certified MCA Form CSR-1 compliant utilization certificates for government and university societal projects.
          </p>
          <button
            onClick={() => alert("Downloading CSR Audit Report (PDF)...")}
            className="bg-rose-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs"
          >
            📥 Download CSR Impact Certificate (PDF)
          </button>
        </div>
      )}

      {/* CSR FUNDING MODAL */}
      {fundingModalOpen && selectedChallenge && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-rose-200 space-y-5 animate-in fade-in zoom-in-95">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] text-rose-700 uppercase font-bold bg-rose-100 px-2.5 py-0.5 rounded-full">
                CSR Grant Pledge
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Fund Challenge: #{selectedChallenge.id}
              </h3>
              <p className="text-xs text-slate-500">{selectedChallenge.title}</p>
            </div>

            <form onSubmit={handleConfirmPledge} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  CSR Grant Allocation (₹)
                </label>
                <input
                  type="text"
                  required
                  value={pledgedAmount}
                  onChange={(e) => setPledgedAmount(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Aligned UN SDG Goal
                </label>
                <select
                  value={sdgPillar}
                  onChange={(e) => setSdgPillar(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium"
                >
                  <option value="SDG 6 (Clean Water & Sanitation)">SDG 6: Clean Water & Sanitation</option>
                  <option value="SDG 3 (Good Health & Well-being)">SDG 3: Good Health & Well-being</option>
                  <option value="SDG 8 (Decent Work & Economic Growth)">SDG 8: Decent Work & Economic Growth</option>
                  <option value="SDG 11 (Sustainable Cities & Communities)">SDG 11: Sustainable Cities & Communities</option>
                  <option value="SDG 13 (Climate Action)">SDG 13: Climate Action</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setFundingModalOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 font-bold text-white bg-rose-900 hover:bg-rose-950 rounded-xl shadow-md flex items-center gap-2"
                >
                  <HeartHandshake className="w-4 h-4" />
                  <span>Confirm CSR Grant Allocation</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
