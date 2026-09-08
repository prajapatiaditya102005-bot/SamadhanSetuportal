import React from 'react';
import { Search, Filter, RefreshCw, MapPin, Tag, Layers } from 'lucide-react';
import { JHARKHAND_DISTRICTS, CATEGORIES } from '../../data/districtsData';
import { LIFECYCLE_STAGES } from '../../data/sampleChallenges';
import { useChallenges } from '../../context/ChallengeContext';

export const ChallengeFilters = () => {
  const { 
    filterDistrict, 
    setFilterDistrict, 
    filterCategory, 
    setFilterCategory, 
    filterStatus, 
    setFilterStatus, 
    searchQuery, 
    setSearchQuery 
  } = useChallenges();

  const handleResetFilters = () => {
    setFilterDistrict('all');
    setFilterCategory('all');
    setFilterStatus('all');
    setSearchQuery('');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs mb-6 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search problems, keywords (e.g. fluoride, lac, road, solar, triage)..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-700 bg-slate-50/50"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-700"
            >
              Clear
            </button>
          )}
        </div>

        {/* District Selector */}
        <div className="flex items-center gap-1.5 min-w-[170px]">
          <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
          <select
            value={filterDistrict}
            onChange={(e) => setFilterDistrict(e.target.value)}
            className="w-full p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-700 font-medium text-slate-700"
          >
            <option value="all">All 24 Districts</option>
            {JHARKHAND_DISTRICTS.map(d => (
              <option key={d.id} value={d.name}>{d.name} ({d.hindiName})</option>
            ))}
          </select>
        </div>

        {/* Category Selector */}
        <div className="flex items-center gap-1.5 min-w-[170px]">
          <Tag className="w-4 h-4 text-slate-500 shrink-0" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-700 font-medium text-slate-700"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map(c => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </div>

        {/* Status Selector */}
        <div className="flex items-center gap-1.5 min-w-[170px]">
          <Layers className="w-4 h-4 text-slate-500 shrink-0" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full p-2.5 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-700 font-medium text-slate-700"
          >
            <option value="all">All Lifecycle Stages</option>
            {LIFECYCLE_STAGES.map(s => (
              <option key={s.id} value={s.id}>{s.step}. {s.label}</option>
            ))}
          </select>
        </div>

        {/* Reset Filters */}
        <button
          onClick={handleResetFilters}
          className="p-2.5 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition text-xs font-semibold flex items-center justify-center shrink-0"
          title="Reset All Filters"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
