import React, { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { MatchForm } from './components/MatchForm';
import { SessionForm } from './components/SessionForm';
import { DeckPerformance } from './components/DeckPerformance';
import { SessionsSection } from './components/SessionsSection';
import { FilterBar } from './components/FilterBar';
import { MatchDetails } from './components/MatchDetails';
import { calculateFilteredStats, type Match } from './utils/statsCalculator';
export function App() {
  const [showMatchForm, setShowMatchForm] = useState(false);
  const [showSessionForm, setShowSessionForm] = useState(false);
  const [editingSession, setEditingSession] = useState<{
    name: string;
    date: string;
    matches: number;
    active: boolean;
    leader?: string;
    deckUrl?: string;
    location?: string;
    tournamentType?: string;
    notes?: string;
  } | undefined>(undefined);
  const [selectedSession, setSelectedSession] = useState<{
    name: string;
    date: string;
    matches: number;
    active: boolean;
    leader?: string;
    deckUrl?: string;
    location?: string;
    tournamentType?: string;
    notes?: string;
  } | undefined>(undefined);
  const [selectedFilter, setSelectedFilter] = useState<{
    type: 'all' | 'session' | 'leader';
    value: string;
  }>({ type: 'all', value: '' });
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  // Mock data
  const stats = {
    winRate: 60,
    totalMatches: 5,
    wins: 3,
    losses: 2
  };
  const deckPerformance = [{
    name: 'R/P Law',
    winRate: 100
  }, {
    name: 'Sakazuki',
    winRate: 66
  }, {
    name: 'Enel',
    winRate: 0
  }, {
    name: 'R/P Luffy',
    winRate: 75
  }, {
    name: 'Moria',
    winRate: 50
  }];
  const [sessions, setSessions] = useState([{
    name: 'Welcome Session',
    date: new Date().toISOString().split('T')[0],
    matches: 0,
    active: true,
    leader: '',
    deckUrl: '',
    location: '',
    tournamentType: 'casual',
    notes: 'Get started by creating your first session!'
  }]);
  const [matchHistory, setMatchHistory] = useState<Match[]>([]);

  const handleSessionClick = (session: { name: string; date: string; matches: number; active: boolean; leader?: string; deckUrl?: string; location?: string; tournamentType?: string; notes?: string }) => {
    setSelectedSession(session);
    setShowMatchForm(true);
  };

  const handleNewMatch = () => {
    setSelectedSession(undefined);
    setShowMatchForm(true);
  };

  const handleCreateSession = () => {
    setEditingSession(undefined);
    setShowSessionForm(true);
    setShowMatchForm(false);
  };

  const handleEditSession = (session: { name: string; date: string; matches: number; active: boolean; leader?: string; deckUrl?: string; location?: string; tournamentType?: string; notes?: string }) => {
    setEditingSession(session);
    setShowSessionForm(true);
    setShowMatchForm(false);
  };

  const handleSaveSession = (sessionData: { name: string; date: string; leader: string; deckUrl: string; location: string; tournamentType: string; notes: string }) => {
    if (editingSession) {
      // Update existing session
      setSessions(prev => prev.map(s => 
        s.name === editingSession.name 
          ? { ...s, ...sessionData }
          : s
      ));
    } else {
      // Create new session
      const newSession = {
        ...sessionData,
        matches: 0,
        active: true
      };
      setSessions(prev => [newSession, ...prev]);
    }
    setShowSessionForm(false);
    setEditingSession(undefined);
  };

  const handleViewStats = (sessionName: string) => {
    setSelectedFilter({ type: 'session', value: sessionName });
  };

  // Calculate filtered stats
  const { stats: filteredStats, deckPerformance: filteredDeckPerformance, filteredMatches } = calculateFilteredStats(
    sessions,
    matchHistory,
    selectedFilter
  );

  // Get the session name for match history display
  const getSessionDisplayName = () => {
    if (selectedFilter.type === 'session') {
      return selectedFilter.value;
    }
    if (selectedFilter.type === 'leader') {
      return `Leader: ${selectedFilter.value}`;
    }
    return 'All Sessions';
  };
      return <div className="flex flex-col w-full min-h-screen bg-black text-white">
      <Header onNewSession={handleNewMatch} />
      <main className="flex-1 p-4 max-w-7xl mx-auto w-full">
        {showSessionForm ? (
          <SessionForm 
            onClose={() => setShowSessionForm(false)} 
            onSave={handleSaveSession}
            editingSession={editingSession}
          />
        ) : showMatchForm ? (
          <MatchForm 
            onClose={() => setShowMatchForm(false)} 
            selectedSession={selectedSession}
            onCreateSession={handleCreateSession}
          />
        ) : (
          <>
            <FilterBar 
              sessions={sessions}
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter}
            />
            <Dashboard stats={filteredStats} />
            <DeckPerformance deckData={filteredDeckPerformance} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
              <SessionsSection 
                sessions={sessions} 
                onSessionClick={handleSessionClick}
                onEditSession={handleEditSession}
                onViewStats={handleViewStats}
              />
              <div className="bg-zinc-900 rounded-lg p-6">
                <h2 className="text-3xl font-bold mb-1">Match History</h2>
                <p className="text-zinc-400 mb-6">
                  Matches for "{getSessionDisplayName()}"
                </p>
                <div className="grid grid-cols-4 text-zinc-400 pb-2 border-b border-zinc-800">
                  <div>Rnd</div>
                  <div>Opponent</div>
                  <div>Deck</div>
                  <div>Outcome</div>
                </div>
                {filteredMatches.map((match, index) => <div 
                    key={index} 
                    onClick={() => setSelectedMatch(match)}
                    className="grid grid-cols-4 py-4 border-b border-zinc-800 cursor-pointer hover:bg-zinc-800 transition-colors"
                  >
                    <div>{match.round}</div>
                    <div>{match.opponent}</div>
                    <div>{match.deck}</div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-sm ${match.outcome === 'win' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                        {match.outcome}
                      </span>
                    </div>
                  </div>)}
              </div>
            </div>
          </>
        )}
      </main>
      
      {selectedMatch && (
        <MatchDetails 
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
        />
      )}
    </div>;
}