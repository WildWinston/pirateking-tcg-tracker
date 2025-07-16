import React, { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { MatchForm } from './components/MatchForm';
import { SessionForm } from './components/SessionForm';
import { DeckPerformance } from './components/DeckPerformance';
import { SessionsSection } from './components/SessionsSection';
import { FilterBar } from './components/FilterBar';
import { MatchDetails } from './components/MatchDetails';
import { ConfirmationModal } from './components/ConfirmationModal';
import { DeckManager } from './components/DeckManager';
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
  const [deleteMatchModal, setDeleteMatchModal] = useState<{
    isOpen: boolean;
    match: Match | null;
  }>({ isOpen: false, match: null });
  
  const [showDeckManager, setShowDeckManager] = useState(false);
  const [decks, setDecks] = useState<Array<{
    id: string;
    name: string;
    leader: string;
    deckUrl: string;
    notes: string;
    createdAt: string;
  }>>([]);
  
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

  const handleDeleteSession = (sessionName: string) => {
    setSessions(prev => prev.filter(s => s.name !== sessionName));
    // Also remove matches associated with this session
    setMatchHistory(prev => prev.filter(match => match.session !== sessionName));
  };

  const handleDeleteMatch = (match: Match) => {
    setMatchHistory(prev => prev.filter(m => 
      !(m.round === match.round && m.opponent === match.opponent && m.deck === match.deck && m.outcome === match.outcome)
    ));
  };

  const handleSaveDeck = (deckData: { name: string; leader: string; deckUrl: string; notes: string }) => {
    const newDeck = {
      ...deckData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setDecks(prev => [newDeck, ...prev]);
  };

  const handleUpdateDeck = (id: string, deckData: { name: string; leader: string; deckUrl: string; notes: string }) => {
    setDecks(prev => prev.map(deck => 
      deck.id === id 
        ? { ...deck, ...deckData }
        : deck
    ));
  };

  const handleDeleteDeck = (id: string) => {
    setDecks(prev => prev.filter(deck => deck.id !== id));
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

  return (
    <div className="flex flex-col w-full min-h-screen bg-black text-white">
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
            decks={decks}
            onOpenDeckManager={() => setShowDeckManager(true)}
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
                onDeleteSession={handleDeleteSession}
              />
              <div className="bg-zinc-900 rounded-lg p-6">
                <h2 className="text-3xl font-bold mb-1">Match History</h2>
                <p className="text-zinc-400 mb-6">
                  Matches for "{getSessionDisplayName()}"
                </p>
                <div className="grid grid-cols-5 text-zinc-400 pb-2 border-b border-zinc-800">
                  <div>Rnd</div>
                  <div>Opponent</div>
                  <div>Deck</div>
                  <div>Outcome</div>
                  <div>Actions</div>
                </div>
                {filteredMatches.map((match, index) => <div 
                    key={index} 
                    className="grid grid-cols-5 py-4 border-b border-zinc-800 hover:bg-zinc-800 transition-colors"
                  >
                    <div 
                      className="cursor-pointer"
                      onClick={() => setSelectedMatch(match)}
                    >
                      {match.round}
                    </div>
                    <div 
                      className="cursor-pointer"
                      onClick={() => setSelectedMatch(match)}
                    >
                      {match.opponent}
                    </div>
                    <div 
                      className="cursor-pointer"
                      onClick={() => setSelectedMatch(match)}
                    >
                      {match.deck}
                    </div>
                    <div 
                      className="cursor-pointer"
                      onClick={() => setSelectedMatch(match)}
                    >
                      <span className={`px-3 py-1 rounded-full text-sm ${match.outcome === 'win' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                        {match.outcome}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteMatchModal({ isOpen: true, match });
                        }}
                        className="p-1 rounded text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                        title="Delete Match"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
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
      
      <ConfirmationModal
        isOpen={deleteMatchModal.isOpen}
        onClose={() => setDeleteMatchModal({ isOpen: false, match: null })}
        onConfirm={() => {
          if (deleteMatchModal.match) {
            handleDeleteMatch(deleteMatchModal.match);
          }
        }}
        title="Delete Match"
        message={`Are you sure you want to delete this match? This will permanently remove the match record. This action cannot be undone.`}
        confirmText="Delete Match"
        cancelText="Cancel"
        type="danger"
      />
      
      <DeckManager
        isOpen={showDeckManager}
        onClose={() => setShowDeckManager(false)}
        decks={decks}
        onSaveDeck={handleSaveDeck}
        onUpdateDeck={handleUpdateDeck}
        onDeleteDeck={handleDeleteDeck}
      />
    </div>
  );
}