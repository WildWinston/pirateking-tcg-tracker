import React from 'react';
import { XIcon, ClockIcon, MapPinIcon, TrophyIcon, UserIcon, LinkIcon } from 'lucide-react';

interface MatchDetailsProps {
  match: {
    round: string;
    opponent: string;
    deck: string;
    outcome: 'win' | 'loss';
    session?: string;
    leader?: string;
    deckUrl?: string;
    opponentName?: string;
    dieRoll?: 'win' | 'loss';
    playOrder?: 'first' | 'second';
    matchDuration?: string;
    tournamentType?: string;
    notes?: string;
    date?: string;
  };
  onClose: () => void;
}

export function MatchDetails({
  match,
  onClose
}: MatchDetailsProps) {
  const getOutcomeColor = (outcome: 'win' | 'loss') => {
    return outcome === 'win' ? 'text-green-400' : 'text-red-400';
  };

  const getOutcomeBgColor = (outcome: 'win' | 'loss') => {
    return outcome === 'win' ? 'bg-green-600' : 'bg-red-600';
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-zinc-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-bold">Match Details</h2>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white p-2"
            >
              <XIcon size={24} />
            </button>
          </div>

          {/* Match Header */}
          <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-orange-400">{match.round}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getOutcomeBgColor(match.outcome)} text-white`}>
                  {match.outcome.toUpperCase()}
                </span>
              </div>
              {match.date && (
                <div className="text-zinc-400 text-sm">
                  {formatDate(match.date)}
                </div>
              )}
            </div>
            
            {match.session && (
              <div className="text-zinc-300 mb-2">
                <strong>Session:</strong> {match.session}
              </div>
            )}
          </div>

          {/* Match Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Your Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-orange-400 flex items-center gap-2">
                <UserIcon size={20} />
                Your Information
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-zinc-400 text-sm mb-1">Leader/Deck</label>
                  <div className="text-white font-medium">{match.leader || 'N/A'}</div>
                </div>

                {match.deckUrl && (
                  <div>
                    <label className="block text-zinc-400 text-sm mb-1">Deck URL</label>
                    <a 
                      href={match.deckUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 underline flex items-center gap-1"
                    >
                      <LinkIcon size={16} />
                      View Deck List
                    </a>
                  </div>
                )}

                {match.tournamentType && (
                  <div>
                    <label className="block text-zinc-400 text-sm mb-1">Tournament Type</label>
                    <div className="text-white">{match.tournamentType}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Opponent Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-orange-400 flex items-center gap-2">
                <TrophyIcon size={20} />
                Opponent Information
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-zinc-400 text-sm mb-1">Opponent Name</label>
                  <div className="text-white font-medium">{match.opponentName || 'N/A'}</div>
                </div>

                <div>
                  <label className="block text-zinc-400 text-sm mb-1">Opponent's Deck</label>
                  <div className="text-white">{match.deck}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Match Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {match.dieRoll && (
              <div className="p-3 bg-zinc-800 rounded-lg">
                <label className="block text-zinc-400 text-sm mb-1">Die Roll</label>
                <div className={`font-medium ${getOutcomeColor(match.dieRoll)}`}>
                  {match.dieRoll.toUpperCase()}
                </div>
              </div>
            )}

            {match.playOrder && (
              <div className="p-3 bg-zinc-800 rounded-lg">
                <label className="block text-zinc-400 text-sm mb-1">Play Order</label>
                <div className="text-white font-medium capitalize">
                  {match.playOrder}
                </div>
              </div>
            )}

            {match.matchDuration && (
              <div className="p-3 bg-zinc-800 rounded-lg">
                <label className="block text-zinc-400 text-sm mb-1 flex items-center gap-1">
                  <ClockIcon size={14} />
                  Duration
                </label>
                <div className="text-white font-medium">
                  {match.matchDuration}
                </div>
              </div>
            )}
          </div>

          {/* Notes */}
          {match.notes && (
            <div className="mb-6">
              <label className="block text-zinc-400 text-sm mb-2">Notes</label>
              <div className="p-4 bg-zinc-800 rounded-lg text-white whitespace-pre-wrap">
                {match.notes}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white font-medium rounded-lg py-3 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                // TODO: Implement edit functionality
                console.log('Edit match:', match);
              }}
              className="flex-1 bg-orange-400 hover:bg-orange-500 text-black font-medium rounded-lg py-3 transition-colors"
            >
              Edit Match
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 