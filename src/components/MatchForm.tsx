import React from 'react';
import { PlusIcon } from 'lucide-react';
interface MatchFormProps {
  onClose: () => void;
  selectedSession?: {
    name: string;
    date: string;
    matches: number;
    active: boolean;
    leader?: string;
    deckUrl?: string;
    location?: string;
    tournamentType?: string;
    notes?: string;
  };
  onCreateSession: () => void;
}
export function MatchForm({
  onClose,
  selectedSession,
  onCreateSession
}: MatchFormProps) {
  return <div className="bg-zinc-900 rounded-lg p-6 mb-6">
      <h2 className="text-3xl font-bold mb-1">Log a New Match</h2>
      <p className="text-zinc-400 mb-6">
        {selectedSession 
          ? `Adding to session: "${selectedSession.name}" (Round ${selectedSession.matches + 1})`
          : "Select a session or create a new one"
        }
      </p>
              <div className="mb-6">
          <button onClick={onClose} className="text-zinc-400 hover:text-white mb-4">
            ← Back to Dashboard
          </button>
        </div>
        {selectedSession && (
          <div className="mb-6 p-4 bg-orange-400 bg-opacity-20 border border-orange-400 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-orange-300">{selectedSession.name}</h3>
                <p className="text-orange-200 text-sm">{selectedSession.date} • {selectedSession.matches} matches</p>
              </div>
              <button 
                onClick={() => onClose()} 
                className="text-orange-300 hover:text-white"
              >
                Change Session
              </button>
            </div>
          </div>
        )}
        {!selectedSession && (
          <div className="mb-6">
            <label className="block mb-2">Select Session</label>
            <select className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white mb-4">
              <option value="">Choose a session...</option>
              <option value="local-tournament">Local Tournament - 7/6/2025</option>
              <option value="online-weekly">Online Weekly</option>
              <option value="store-championship">Store Championship</option>
            </select>
            <div className="text-center">
              <button 
                type="button"
                onClick={onCreateSession}
                className="text-orange-400 hover:text-orange-300 text-sm"
              >
                + Create New Session
              </button>
            </div>
          </div>
        )}
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2">Your Deck</label>
            <input 
              type="text" 
              placeholder="e.g., Sakazuki" 
              defaultValue={selectedSession?.leader || ''}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white" 
            />
          </div>
          <div>
            <label className="block mb-2">
              Decklist URL <span className="text-zinc-500">(Optional)</span>
            </label>
            <input 
              type="text" 
              placeholder="https://decklist.example" 
              defaultValue={selectedSession?.deckUrl || ''}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white" 
            />
          </div>
          <div>
            <label className="block mb-2">Opponent's Deck</label>
            <input type="text" placeholder="e.g., R/P Luffy" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white" />
          </div>
          <div>
            <label className="block mb-2">
              Opponent Name <span className="text-zinc-500">(Optional)</span>
            </label>
            <input type="text" placeholder="e.g., John D." className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-4">Die Roll</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" name="dieRoll" className="text-orange-400" />
                <span>Win</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="dieRoll" className="text-orange-400" />
                <span>Loss</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block mb-4">Play Order</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" name="playOrder" className="text-orange-400" />
                <span>First</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="playOrder" className="text-orange-400" />
                <span>Second</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block mb-4">Outcome</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" name="outcome" className="text-orange-400" />
                <span>Win</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="outcome" className="text-orange-400" />
                <span>Loss</span>
              </label>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2">
              Match Duration <span className="text-zinc-500">(Optional)</span>
            </label>
            <input type="text" placeholder="e.g., 25 minutes" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white" />
          </div>
          <div>
            <label className="block mb-2">
              Tournament Type <span className="text-zinc-500">(Optional)</span>
            </label>
            <select 
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white"
              defaultValue={
                selectedSession?.name.includes('Local Tournament') ? 'local' :
                selectedSession?.name.includes('Store Championship') ? 'store-championship' :
                selectedSession?.name.includes('Online') ? 'online' : ''
              }
            >
              <option value="">Select tournament type</option>
              <option value="local">Local Tournament</option>
              <option value="store-championship">Store Championship</option>
              <option value="regional">Regional</option>
              <option value="national">National</option>
              <option value="casual">Casual Play</option>
              <option value="online">Online</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block mb-2">
            Notes <span className="text-zinc-500">(Optional)</span>
          </label>
          <textarea placeholder="Add any notes about the match here..." className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white h-24"></textarea>
        </div>
        <button type="button" className="w-full bg-orange-400 hover:bg-orange-500 text-black font-medium rounded-lg py-3 flex items-center justify-center gap-2">
          <PlusIcon size={18} />
          Log Match
        </button>
      </form>
    </div>;
}