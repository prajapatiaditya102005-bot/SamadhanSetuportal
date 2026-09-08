import React from 'react';
import { 
  Users, 
  Landmark, 
  School, 
  Briefcase, 
  Lightbulb, 
  HeartHandshake, 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  TrendingUp, 
  MapPin, 
  Cpu, 
  Layers, 
  ArrowRight 
} from 'lucide-react';
import { StatCard } from '../components/common/StatCard';
import { INSTITUTIONS } from '../data/institutionsData';
import { INDUSTRY_PARTNERS } from '../data/industryPartnersData';

export const HowItWorksView = ({ onNavigate }) => {
  const steps = [
    {
      num: "01",
      title: "Citizen Reports Problem",
      desc: "A resident reports a local issue with map location, photo evidence, and affected population count.",
      role: "Citizen"
    },
    {
      num: "02",
      title: "AI Triage & Duplicate Check",
      desc: "AI classifies category, priority, checks duplicates, and matches university expertise.",
      role: "AI Engine"
    },
    {
      num: "03",
      title: "Government Validation",
      desc: "Department officers verify the issue and assign nodal department and priority.",
      role: "Government"
    },
    {
      num: "04",
      title: "University Team Formation",
      desc: "Universities (BIT Mesra, IIT ISM, NIT JSR, BAU) assign faculty mentors and student teams.",
      role: "University"
    },
    {
      num: "05",
      title: "Industry & CSR Support",
      desc: "Industry partners (Tata Steel, BCCL, JSPL) sponsor prototyping and testing.",
      role: "Industry & CSR"
    },
    {
      num: "06",
      title: "Prototype & Field Pilot",
      desc: "The developed solution is tested and deployed in the affected village or ward.",
      role: "Joint Team"
    },
    {
      num: "07",
      title: "Community Impact & Verification",
      desc: "Citizens and authorities verify the resolution outcome on the ground.",
      role: "Community"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-brand-800 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
          Collaboration Workflow
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          How Samadhan Setu Works
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
          Connecting grassroots community problems with university researchers and industry partners.
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((s, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col sm:flex-row items-start gap-5 shadow-xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-900 to-jharkhand-green text-white font-black text-lg flex items-center justify-center shrink-0 shadow-md">
              {s.num}
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base font-bold text-slate-900">{s.title}</h3>
                <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-200">
                  {s.role}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-brand-50 border border-brand-200 rounded-3xl p-8 text-center space-y-4">
        <h3 className="text-xl font-bold text-brand-950">Explore active challenges across Jharkhand</h3>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => onNavigate('challenges')}
            className="bg-brand-900 hover:bg-brand-950 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md"
          >
            Explore Active Challenges →
          </button>
        </div>
      </div>
    </div>
  );
};

export const SolutionsView = ({ onNavigate, onSelectChallenge }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-900">
          Academic Research & Technological Solutions
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Patented innovations, indigenous hardware prototypes, and software tools built by Jharkhand universities for grassroots challenges.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">Water Filtration</span>
          <h3 className="text-base font-bold text-slate-900">
            Laterite-Biochar Fluoride Adsorption Filter
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Developed by BIT Mesra Team JalSetu for West Singhbhum. Achieves 91.2% fluoride adsorption from groundwater at under ₹18,500 per community unit.
          </p>
          <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
            <span className="text-purple-800 font-bold">BIT Mesra R&D</span>
            <span className="text-emerald-700 font-bold">Field Pilot Active</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <span className="text-[10px] bg-orange-100 text-orange-800 font-bold px-2 py-0.5 rounded">Agri-Processing</span>
          <h3 className="text-base font-bold text-slate-900">
            Portable Solar-Assisted Sticklac Scraper
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Developed by BAU Ranchi with KrishiJharkhand. Reduces lac processing time from 8 hours per quintal to 45 minutes with zero seed damage.
          </p>
          <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
            <span className="text-purple-800 font-bold">BAU Ranchi</span>
            <span className="text-emerald-700 font-bold">Scaled to 12 SHGs</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <span className="text-[10px] bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded">Clean Air & Mining</span>
          <h3 className="text-base font-bold text-slate-900">
            Solar Ultrasonic Coal Dust Misting Cannon
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Developed by IIT ISM Dhanbad with BCCL CSR. Employs eco-friendly plant lignin bio-surfactants to cut airborne PM2.5 by 64% in haul corridors.
          </p>
          <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
            <span className="text-purple-800 font-bold">IIT ISM Dhanbad</span>
            <span className="text-emerald-700 font-bold">BCCL Colliery Pilot</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export const ImpactView = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-900">
          Statewide Social Impact Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Real-time measurement of community empowerment, public fund savings, and SDG milestones across Jharkhand.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Communities Impacted" value="1,85,000+" subtitle="Across 18 Districts" color="green" icon={Users} />
        <StatCard title="Public Funds Optimized" value="₹3.80 Cr" subtitle="Via University Prototypes" color="brand" icon={TrendingUp} />
        <StatCard title="Corporate CSR Disbursed" value="₹1.48 Cr" subtitle="Direct R&D Sponsorship" color="cyan" icon={Briefcase} />
        <StatCard title="Patents & Prototypes" value="14 Filed" subtitle="Indigenous IP Generated" color="purple" icon={Award} />
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-slate-900">Verified On-Ground Impact Case Studies</h3>
        <div className="space-y-3 divide-y divide-slate-100 text-xs">
          <div className="pt-3">
            <div className="flex justify-between items-center font-bold text-slate-900">
              <span>Chas Municipal Single-Use Plastic Drainage Interceptor Gates</span>
              <span className="text-emerald-700 font-mono">18 Tons Diverted</span>
            </div>
            <p className="text-slate-600 mt-1">Interception of plastic waste prevented urban flooding in Chas township, with plastic upcycled into municipal park paver tiles.</p>
          </div>
          <div className="pt-3">
            <div className="flex justify-between items-center font-bold text-slate-900">
              <span>Patratu Thermal Fly Ash Soil Neutralization</span>
              <span className="text-emerald-700 font-mono">350 Acres Restored</span>
            </div>
            <p className="text-slate-600 mt-1">Bio-humic amendment developed by BIT Mesra neutralized pH from 9.4 down to 7.1, improving paddy harvest yield by 32%.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AboutView = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
          Mission & Vision
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-2">
          About Samadhan Setu
        </h1>
      </div>

      <p>
        <strong>Samadhan Setu (समाधान सेतु)</strong> is Jharkhand’s flagship collaborative problem-solving platform. Initiated under the State Higher Education and Innovation Mission, it bridges the gap between grassroots citizens facing everyday societal problems and higher education institutions possessing research capabilities.
      </p>

      <h3 className="text-base font-bold text-slate-900 pt-2">The Core Philosophy</h3>
      <p>
        Traditional grievance mechanisms often result in bureaucratic queues or standard vendor procurements that do not solve root causes. Samadhan Setu transforms every validated citizen grievance into an applied innovation challenge for engineering students, faculty mentors, and startup innovators—funded by corporate CSR and supported by local MSME manufacturing hubs.
      </p>

      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
        <h4 className="font-bold text-slate-900">Ecosystem Stakeholder Roles:</h4>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
          <li><strong>Citizens:</strong> Report local problems with GPS pins and vote on existing challenges to consolidate community voice.</li>
          <li><strong>Government Departments:</strong> Validate grievances, set policy priority, and facilitate administrative clearances.</li>
          <li><strong>Universities & HEIs:</strong> Form multidisciplinary squads to design low-cost hardware and software solutions.</li>
          <li><strong>Industry & Startups:</strong> Sponsor prototype grants, provide fabrication testing, and scale products statewide.</li>
          <li><strong>CSR Partners:</strong> Allocate statutory CSR funds to high-impact SDG aligned projects with verifiable impact audits.</li>
        </ul>
      </div>
    </div>
  );
};
