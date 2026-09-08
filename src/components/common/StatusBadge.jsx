import React from 'react';
import { 
  Send, 
  Cpu, 
  FileSearch, 
  CheckCircle2, 
  School, 
  Users, 
  FileCode2, 
  TestTube2, 
  CheckCheck, 
  Award,
  XCircle
} from 'lucide-react';

export const StatusBadge = ({ status, size = "md" }) => {
  const getStatusConfig = (st) => {
    switch (st) {
      case 'Submitted':
        return {
          bg: 'bg-slate-100 text-slate-700 border-slate-300',
          icon: <Send className="w-3 h-3 text-slate-500" />,
          label: 'Submitted'
        };
      case 'AI Analysis':
        return {
          bg: 'bg-cyan-50 text-cyan-700 border-cyan-300 animate-pulse',
          icon: <Cpu className="w-3 h-3 text-cyan-600" />,
          label: 'AI Triaging'
        };
      case 'Under Validation':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-300',
          icon: <FileSearch className="w-3 h-3 text-amber-600" />,
          label: 'Under Govt Validation'
        };
      case 'Validated':
        return {
          bg: 'bg-blue-50 text-blue-800 border-blue-300',
          icon: <CheckCircle2 className="w-3 h-3 text-blue-600" />,
          label: 'Govt Validated'
        };
      case 'Assigned to Institution':
        return {
          bg: 'bg-purple-50 text-purple-800 border-purple-300',
          icon: <School className="w-3 h-3 text-purple-600" />,
          label: 'HEI Matched'
        };
      case 'In Progress':
        return {
          bg: 'bg-indigo-50 text-indigo-800 border-indigo-300',
          icon: <Users className="w-3 h-3 text-indigo-600" />,
          label: 'Team In Action'
        };
      case 'Solution Proposed':
        return {
          bg: 'bg-teal-50 text-teal-800 border-teal-300',
          icon: <FileCode2 className="w-3 h-3 text-teal-600" />,
          label: 'Solution Proposed'
        };
      case 'Pilot Testing':
        return {
          bg: 'bg-orange-50 text-orange-800 border-orange-300',
          icon: <TestTube2 className="w-3 h-3 text-orange-600" />,
          label: 'Pilot Testing'
        };
      case 'Implemented':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
          icon: <CheckCheck className="w-3 h-3 text-emerald-600" />,
          label: 'Implemented'
        };
      case 'Impact Measured':
        return {
          bg: 'bg-green-100 text-green-900 border-green-400 font-bold',
          icon: <Award className="w-3 h-3 text-green-700" />,
          label: 'Impact Verified'
        };
      case 'Rejected':
        return {
          bg: 'bg-rose-50 text-rose-700 border-rose-300',
          icon: <XCircle className="w-3 h-3 text-rose-500" />,
          label: 'Rejected'
        };
      default:
        return {
          bg: 'bg-slate-100 text-slate-700 border-slate-300',
          icon: <Send className="w-3 h-3" />,
          label: st || 'Active'
        };
    }
  };

  const config = getStatusConfig(status);
  const sizeClasses = size === "sm" ? "text-[10px] px-2 py-0.5" : size === "lg" ? "text-sm px-3.5 py-1.5" : "text-xs px-2.5 py-1";

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium border shadow-xs ${config.bg} ${sizeClasses}`}>
      {config.icon}
      <span>{config.label}</span>
    </span>
  );
};
