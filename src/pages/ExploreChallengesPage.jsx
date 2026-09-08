import React, { useState } from 'react';
import { useChallenges } from '../context/ChallengeContext';
import { ChallengeCard } from '../components/challenges/ChallengeCard';
import { ChallengeFilters } from '../components/challenges/ChallengeFilters';
import { JharkhandMap } from '../components/map/JharkhandMap';
import { 
  Grid, 
  Map, 
  PlusCircle, 
  Layers, 
  Sparkles,
  Search
} from 'lucide-react';

export const ExploreChallengesPage = ({ onSelectChallenge }) => {
  const { filteredChallenges, challenges } = useChallenges();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-brand-50 text-brand-900 text-xs font-bold px-2.5 py-0.5 rounded-full border border-brand-200">
              Public Challenges Feed
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Explore Challenges
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Browse verified community issues in Jharkhand. Support existing challenges with <strong>"I AM ALSO AFFECTED"</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition ${
                viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>Grid View</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition ${
                viewMode === 'map' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Map className="w-4 h-4" />
              <span>Map View</span>
            </button>
          </div>
        </div>
      </div>

      {/* Multi-Dimensional Filter Toolbar */}
      <ChallengeFilters />

      {/* View Mode: Map */}
      {viewMode === 'map' && (
        <div className="space-y-4 animate-in fade-in">
          <JharkhandMap
            challenges={filteredChallenges}
            onSelectChallenge={onSelectChallenge}
            height="560px"
          />
        </div>
      )}

      {/* View Mode: Grid */}
      {viewMode === 'grid' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
            <span>Showing <strong>{filteredChallenges.length}</strong> of {challenges.length} Challenges</span>
            <span>Sorted by High Priority & Recency</span>
          </div>

          {filteredChallenges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChallenges.map(challenge => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  onSelectChallenge={onSelectChallenge}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
              <Search className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No challenges matched your filter criteria</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try selecting "All Districts" or clearing your search term to view all registered challenges.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
