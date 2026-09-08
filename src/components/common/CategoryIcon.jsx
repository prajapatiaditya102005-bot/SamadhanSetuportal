import React from 'react';
import { 
  Droplets, 
  HeartPulse, 
  Sprout, 
  GraduationCap, 
  TreePine, 
  Zap, 
  Trash2, 
  Briefcase, 
  Building2, 
  Accessibility, 
  Landmark, 
  HelpCircle 
} from 'lucide-react';

export const CategoryIcon = ({ category, className = "w-4 h-4", showLabel = false }) => {
  const getIcon = () => {
    switch (category) {
      case 'Water':
        return <Droplets className={`${className} text-blue-600`} />;
      case 'Healthcare':
        return <HeartPulse className={`${className} text-rose-600`} />;
      case 'Agriculture':
        return <Sprout className={`${className} text-emerald-600`} />;
      case 'Education':
        return <GraduationCap className={`${className} text-amber-600`} />;
      case 'Environment':
        return <TreePine className={`${className} text-teal-600`} />;
      case 'Energy':
        return <Zap className={`${className} text-yellow-500`} />;
      case 'Sanitation':
        return <Trash2 className={`${className} text-slate-600`} />;
      case 'Rural Livelihood':
        return <Briefcase className={`${className} text-orange-600`} />;
      case 'Urban Infrastructure':
        return <Building2 className={`${className} text-indigo-600`} />;
      case 'Accessibility':
        return <Accessibility className={`${className} text-purple-600`} />;
      case 'Public Services':
        return <Landmark className={`${className} text-cyan-600`} />;
      default:
        return <HelpCircle className={`${className} text-slate-500`} />;
    }
  };

  return (
    <span className="inline-flex items-center gap-1.5">
      {getIcon()}
      {showLabel && <span className="font-medium text-slate-700">{category}</span>}
    </span>
  );
};
