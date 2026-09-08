import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useChallenges } from '../../../context/ChallengeContext';
import { StatCard } from '../../../components/common/StatCard';
import { StatusBadge } from '../../../components/common/StatusBadge';
import { PriorityBadge } from '../../../components/common/PriorityBadge';
import { SUPPORT_TYPES, INDUSTRY_PARTNERS } from '../../../data/industryPartnersData';
import { 
  Briefcase, 
  Handshake, 
  Banknote, 
  Cpu, 
  Building, 
  FlaskConical, 
  Factory, 
  Truck, 
  ShoppingBag, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const IndustryDashboard = ({ onSelectChallenge }) => {
  const { currentUser } = useAuth();
  const { challenges, offerIndustrySupport } = useChallenges();
  const [activeTab, setActiveTab] = useState('opportunities'); // opportunities, active-partnerships, pilots, tech-transfer, csr-funds
  
  // Modal for Offering Support
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [selectedChallengeToSupport, setSelectedChallengeToSupport] = useState(null);
  const [selectedSupportTypes, setSelectedSupportTypes] = useState(['Funding', 'Testing']);
  const [grantPledged, setGrantPledged] = useState('₹4,00,000');
  const [mentorName, setMentorName] = useState(currentUser?.name || 'Siddharth Kaushik');
  const [supportNotes, setSupportNotes] = useState('');
  const [successToast, setSuccessToast] = useState('');

  const currentPartner = INDUSTRY_PARTNERS.find(p => p.id === currentUser?.id) || INDUSTRY_PARTNERS[0];

  // Validated challenges open for industry tie-up
  const openOpportunities = challenges.filter(c => 
    c.status === 'Validated' || c.status === 'Assigned to Institution' || c.status === 'In Progress' || c.status === 'Solution Proposed'
  );

  const activeCollaborations = challenges.filter(c => 
    c.industryCollaboration?.partnerName?.includes(currentPartner.name) ||
    c.industryCollaboration?.partnerId === currentPartner.id
  );

  const toggleSupportType = (typeId) => {
    setSelectedSupportTypes(prev => 
      prev.includes(typeId) ? prev.filter(t => t !== typeId) : [...prev, typeId]
    );
  };

  const handleOpenSupportModal = (challenge) => {
    setSelectedChallengeToSupport(challenge);
    setSupportModalOpen(true);
  };

  const handleConfirmSupport = (e) => {
    e.preventDefault();
    if (!selectedChallengeToSupport) return;

    offerIndustrySupport(selectedChallengeToSupport.id, {
      partnerId: currentPartner.id,
      partnerName: currentPartner.name,
      supportTypes: selectedSupportTypes,
      grantAmount: grantPledged,
      mentorName,
      isCsr: false
    });

    setSuccessToast(`Support commitment registered! Partnership established with HEI for Challenge #${selectedChallengeToSupport.id}`);
    setSupportModalOpen(false);
    setActiveTab('active-partnerships');

    try {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}

    setTimeout(() => setSuccessToast(''), 3500);
  };

  return (
    <div className="space-y-6">
      
      {/* Industry Banner */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-brand-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-cyan-800/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏭</span>
              <span className="bg-cyan-500/20 text-cyan-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-cyan-400/30">
                Industry & Startup Collaboration Hub • उद्योग एवं नवाचार साझेदारी
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {currentPartner.name}
            </h1>
            <p className="text-xs sm:text-sm text-cyan-200 max-w-2xl">
              Representative: <strong>{currentUser.name}</strong> • Sector: <strong>{currentPartner.category}</strong> • HQ: {currentPartner.headquarters}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10 text-center shrink-0">
            <span className="text-[10px] text-cyan-200 uppercase font-semibold block">Total Grants Disbursed</span>
            <span className="text-xl font-bold text-emerald-400 font-mono">{currentPartner.totalPledgedAmount}</span>
            <span className="text-[10px] text-slate-300 block mt-0.5">Across {activeCollaborations.length} Live Projects</span>
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
          { id: 'opportunities', label: `Validated Opportunities (${openOpportunities.length})`, icon: Sparkles },
          { id: 'active-partnerships', label: `Active Collaborations (${activeCollaborations.length})`, icon: Handshake },
          { id: 'pilots', label: 'Field Pilot Testing', icon: Truck },
          { id: 'tech-transfer', label: 'Technology Transfer', icon: Cpu }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition shrink-0 ${
                isActive 
                  ? 'bg-cyan-900 text-white shadow-xs font-bold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: VALIDATED OPPORTUNITIES */}
      {activeTab === 'opportunities' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Validated Societal Challenges & University R&D Projects
              </h3>
              <p className="text-xs text-slate-500">
                Support academic engineering squads through prototyping funding, lab testing, CNC manufacturing, or pilot deployments.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {openOpportunities.map(ch => {
              const hasCollaboration = ch.industryCollaboration?.partnerName?.includes(currentPartner.name);

              return (
                <div key={ch.id} className="bg-white rounded-2xl border border-cyan-200/80 p-5 space-y-4 shadow-xs flex flex-col justify-between hover:shadow-md transition">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        {ch.id}
                      </span>
                      <StatusBadge status={ch.status} size="sm" />
                    </div>

                    <h4 className="text-base font-bold text-slate-900">{ch.title}</h4>
                    <p className="text-xs text-slate-500">📍 {ch.village}, {ch.district}</p>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{ch.description}</p>

                    {/* Academic Team Tag */}
                    {ch.assignedInstitution && (
                      <div className="bg-purple-50 p-2.5 rounded-xl border border-purple-100 text-xs">
                        <span className="text-[10px] text-purple-700 font-bold uppercase block">Engaged HEI:</span>
                        <strong className="text-purple-950">{ch.assignedInstitution.institutionName}</strong>
                        <p className="text-[11px] text-purple-800">Team: {ch.assignedInstitution.studentTeam?.teamName || "Innovation Squad"}</p>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectChallenge(ch.id)}
                      className="text-xs font-bold text-slate-700 hover:text-brand-900"
                    >
                      View Details
                    </button>

                    {hasCollaboration ? (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-xl flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Active Partner</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleOpenSupportModal(ch)}
                        className="bg-cyan-900 hover:bg-cyan-950 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs flex items-center gap-1.5 transition"
                      >
                        <Handshake className="w-3.5 h-3.5" />
                        <span>Offer Support & Sponsor</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: ACTIVE COLLABORATIONS */}
      {activeTab === 'active-partnerships' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">
            Active Industry-University Collaborations ({activeCollaborations.length})
          </h3>
          <div className="space-y-4">
            {activeCollaborations.map(ch => (
              <div key={ch.id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-slate-500">{ch.id}</span>
                    <h4 className="text-base font-bold text-slate-900">{ch.title}</h4>
                    <p className="text-xs text-slate-500">📍 {ch.village}, {ch.district}</p>
                  </div>
                  <span className="font-bold font-mono text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 text-xs">
                    {ch.industryCollaboration?.grantAmount || "₹4.5 Lakhs"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl">
                  <div>
                    <span className="text-[10px] text-slate-500 font-semibold block uppercase">Support Offered:</span>
                    <p className="font-bold text-slate-900">{ch.industryCollaboration?.supportOffered?.join(', ') || "Funding, Testing, Deployment"}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-semibold block uppercase">Assigned Technical Mentor:</span>
                    <p className="font-bold text-slate-900">{ch.industryCollaboration?.mentorAssigned || currentUser.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PILOTS */}
      {activeTab === 'pilots' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900">Field Pilot Testing Infrastructure</h3>
          <p className="text-xs text-slate-500">
            Providing on-ground operational testing facilities across Jharkhand industrial townships and rural watershed zones.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-cyan-50/50 rounded-xl border border-cyan-100 space-y-1">
              <strong className="text-cyan-950 block">Jamshedpur Rural Water Testing Bay</strong>
              <p className="text-slate-600">Equipped with Ion Chromatography & Flow Cytometry for community fluoride/arsenic filters.</p>
            </div>
            <div className="p-4 bg-cyan-50/50 rounded-xl border border-cyan-100 space-y-1">
              <strong className="text-cyan-950 block">Tupudana MSME Mechanical Fabrication Workshop</strong>
              <p className="text-slate-600">CNC laser cutting and sheet metal casing for agricultural processing machinery.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: TECH TRANSFER */}
      {activeTab === 'tech-transfer' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900">Technology Transfer & Commercialization</h3>
          <p className="text-xs text-slate-500">
            Licensing agreements and commercial scale-up pipelines for tested university intellectual property.
          </p>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <p className="font-bold text-slate-900">Laterite-Biochar Fluoride Filter License (BIT Mesra)</p>
            <p className="text-slate-600 mt-1">Status: Open for non-exclusive commercialization for Panchayati Raj decentralized water units.</p>
          </div>
        </div>
      )}

      {/* OFFER SUPPORT MODAL */}
      {supportModalOpen && selectedChallengeToSupport && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-cyan-200 space-y-5 animate-in fade-in zoom-in-95">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] text-cyan-800 uppercase font-bold bg-cyan-100 px-2.5 py-0.5 rounded-full">
                Industry Sponsorship Pledge
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Collaborate on Challenge: #{selectedChallengeToSupport.id}
              </h3>
              <p className="text-xs text-slate-500">{selectedChallengeToSupport.title}</p>
            </div>

            <form onSubmit={handleConfirmSupport} className="space-y-4 text-xs">
              
              {/* Select Support Dimensions */}
              <div>
                <label className="block font-bold text-slate-800 mb-2">
                  Select Types of Support Offered (Choose 1 or more):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {SUPPORT_TYPES.map(st => {
                    const isChecked = selectedSupportTypes.includes(st.id);
                    return (
                      <button
                        type="button"
                        key={st.id}
                        onClick={() => toggleSupportType(st.id)}
                        className={`p-2.5 rounded-xl border text-left transition ${
                          isChecked
                            ? 'bg-cyan-900 text-white font-bold border-cyan-900 shadow-2xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <span className="block text-[11px] font-bold">{st.id}</span>
                        <span className="text-[9px] opacity-80 block truncate">{st.label.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    Grant / Prototyping Pledge (₹)
                  </label>
                  <input
                    type="text"
                    required
                    value={grantPledged}
                    onChange={(e) => setGrantPledged(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    Corporate Technical Mentor Assigned
                  </label>
                  <input
                    type="text"
                    required
                    value={mentorName}
                    onChange={(e) => setMentorName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Collaboration Scope & Facilities Provided
                </label>
                <textarea
                  rows={2}
                  value={supportNotes}
                  onChange={(e) => setSupportNotes(e.target.value)}
                  placeholder="e.g. Providing ₹4.5 Lakhs for batch materials, access to Jamshedpur water lab, and deployment assistance in 3 pilot schools..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSupportModalOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 font-bold text-white bg-cyan-900 hover:bg-cyan-950 rounded-xl shadow-md flex items-center gap-2"
                >
                  <Handshake className="w-4 h-4" />
                  <span>Confirm Collaboration Agreement</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
