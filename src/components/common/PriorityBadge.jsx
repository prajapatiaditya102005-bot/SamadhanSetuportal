import React from 'react';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';

export const PriorityBadge = ({ priority, size = "md" }) => {
  const getPriorityStyle = (p) => {
    switch ((p || '').toLowerCase()) {
      case 'high':
      case 'critical':
      case 'emergency':
        return {
          bg: 'bg-rose-50 text-rose-700 border-rose-200 ring-1 ring-rose-300',
          icon: <AlertTriangle className="w-3 h-3 text-rose-600" />,
          label: 'High Priority'
        };
      case 'medium':
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          icon: <AlertCircle className="w-3 h-3 text-amber-600" />,
          label: 'Medium Priority'
        };
      case 'low':
      default:
        return {
          bg: 'bg-slate-50 text-slate-600 border-slate-200',
          icon: <Info className="w-3 h-3 text-slate-500" />,
          label: 'Standard Priority'
        };
    }
  };

  const config = getPriorityStyle(priority);
  const sizeClasses = size === "sm" ? "text-[10px] px-2 py-0.5" : "text-xs px-2.5 py-1";

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium border ${config.bg} ${sizeClasses}`}>
      {config.icon}
      <span>{config.label}</span>
    </span>
  );
};
