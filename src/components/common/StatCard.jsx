import React from 'react';

export const StatCard = ({ title, value, subtitle, icon: Icon, trend, color = "brand" }) => {
  const colorMap = {
    brand: "bg-blue-50/70 border-blue-200 text-brand-900 icon-bg-blue-100 text-blue-700",
    green: "bg-emerald-50/70 border-emerald-200 text-emerald-950 icon-bg-emerald-100 text-emerald-700",
    amber: "bg-amber-50/70 border-amber-200 text-amber-950 icon-bg-amber-100 text-amber-700",
    purple: "bg-purple-50/70 border-purple-200 text-purple-950 icon-bg-purple-100 text-purple-700",
    cyan: "bg-cyan-50/70 border-cyan-200 text-cyan-950 icon-bg-cyan-100 text-cyan-700",
    rose: "bg-rose-50/70 border-rose-200 text-rose-950 icon-bg-rose-100 text-rose-700",
    indigo: "bg-indigo-50/70 border-indigo-200 text-indigo-950 icon-bg-indigo-100 text-indigo-700",
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">{value}</h3>
          {subtitle && <p className="text-xs text-slate-600 mt-1">{subtitle}</p>}
        </div>
        {Icon && (
          <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 border border-slate-200">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-brand-700" />
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-1.5 text-xs">
          <span className="text-emerald-600 font-semibold">{trend.value}</span>
          <span className="text-slate-500">{trend.label}</span>
        </div>
      )}
    </div>
  );
};
