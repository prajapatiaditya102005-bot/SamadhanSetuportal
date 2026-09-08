import React from 'react';
import { 
  Building2, 
  GraduationCap, 
  HeartHandshake, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export const Footer = ({ onNavigate, onSelectRole }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & State Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-700 to-jharkhand-green flex items-center justify-center text-white font-bold text-lg font-serif shadow-md">
                स
              </div>
              <div>
                <span className="text-xl font-extrabold text-white tracking-tight">
                  Samadhan <span className="text-emerald-400">Setu</span>
                </span>
                <p className="text-xs text-slate-400">Government of Jharkhand • Higher Education & Innovation Council</p>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed pr-4">
              A state-wide digital platform to crowdsource societal challenges, enable AI-powered validation, and connect grassroots problems with universities, research institutions, startups, and CSR leaders for practical, high-impact solutions.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 bg-slate-800 border border-slate-700 px-2.5 py-1 rounded text-[11px] text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                State Certified Public Innovation Gateway
              </span>
            </div>
          </div>

          {/* Col 2: Stakeholder Portals */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Role Workspaces
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectRole('citizen')} className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  Citizen Reporting Portal
                </button>
              </li>
              <li>
                <button onClick={() => onSelectRole('government')} className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  Government Triage Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onSelectRole('hei_admin')} className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  University / HEI R&D Cell
                </button>
              </li>
              <li>
                <button onClick={() => onSelectRole('faculty')} className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  Faculty Mentorship Desk
                </button>
              </li>
              <li>
                <button onClick={() => onSelectRole('student')} className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  Student Innovation Studio
                </button>
              </li>
              <li>
                <button onClick={() => onSelectRole('industry')} className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  Industry & MSME Hub
                </button>
              </li>
              <li>
                <button onClick={() => onSelectRole('csr')} className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  CSR & Research Partners
                </button>
              </li>
              <li>
                <button onClick={() => onSelectRole('admin')} className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  Platform Administration
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Institutions in Jharkhand */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Academic Network
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>BIT Mesra, Ranchi</li>
              <li>IIT (ISM) Dhanbad</li>
              <li>NIT Jamshedpur</li>
              <li>Birsa Agricultural University (BAU)</li>
              <li>Ranchi University</li>
              <li>Central University of Jharkhand (CUJ)</li>
              <li>AIIMS Deoghar</li>
            </ul>
          </div>

          {/* Col 4: Contact & State Hub */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              State Innovation Cell
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>State IT & Innovation Mission, Project Building, Dhurwa, Ranchi - 834004</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+91 651 240 1800 (Helpline)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>samadhan@jharkhand.gov.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Government of Jharkhand. Designed for Statewide Collaborative Societal Innovation.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">API Documentation</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Helpdesk</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
