import React from 'react';
import { FilterIcon, XIcon } from 'lucide-react';

interface FilterBarProps {
  sessions: {
    name: string;
    date: string;
    matches: number;
    active: boolean;
    leader?: string;
    deckUrl?: string;
    location?: string;
    tournamentType?: string;
    notes?: string;
  }[];
  selectedFilter: {
    type: 'all' | 'session' | 'leader';
    value: string;
  };
  onFilterChange: (filter: { type: 'all' | 'session' | 'leader'; value: string }) => void;
}

export function FilterBar({
  sessions,
  selectedFilter,
  onFilterChange
}: FilterBarProps) {
  // Get unique leaders from sessions
  const leaders = Array.from(new Set(sessions.map(s => s.leader).filter(Boolean)));

  const handleFilterChange = (type: 'all' | 'session' | 'leader', value: string) => {
    onFilterChange({ type, value });
  };

  const clearFilter = () => {
    onFilterChange({ type: 'all', value: '' });
  };

  return (
    <div className="bg-zinc-900 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-4 mb-4">
        <FilterIcon className="text-orange-400" size={20} />
        <h3 className="text-lg font-medium">Filter Statistics</h3>
        {selectedFilter.type !== 'all' && (
          <button
            onClick={clearFilter}
            className="text-zinc-400 hover:text-white text-sm flex items-center gap-1"
          >
            <XIcon size={16} />
            Clear Filter
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => handleFilterChange('all', '')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedFilter.type === 'all'
              ? 'bg-orange-400 text-black'
              : 'bg-zinc-800 text-white hover:bg-zinc-700'
          }`}
        >
          All Data
        </button>

        <div className="relative">
          <select
            value={selectedFilter.type === 'session' ? selectedFilter.value : ''}
            onChange={(e) => handleFilterChange('session', e.target.value)}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700 appearance-none pr-8"
          >
            <option value="">Filter by Session</option>
            {sessions.map((session, index) => (
              <option key={index} value={session.name}>
                {session.name}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="relative">
          <select
            value={selectedFilter.type === 'leader' ? selectedFilter.value : ''}
            onChange={(e) => handleFilterChange('leader', e.target.value)}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700 appearance-none pr-8"
          >
            <option value="">Filter by Leader</option>
            {leaders.map((leader, index) => (
              <option key={index} value={leader}>
                {leader}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {selectedFilter.type !== 'all' && (
        <div className="mt-3 p-3 bg-orange-400 bg-opacity-20 border border-orange-400 rounded-lg">
          <p className="text-orange-300 text-sm">
            Showing data for: <span className="font-medium">{selectedFilter.value}</span>
          </p>
        </div>
      )}
    </div>
  );
} 