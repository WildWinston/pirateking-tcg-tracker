import React, { useState } from 'react';
import { PlusIcon, SettingsIcon } from 'lucide-react';
import { SearchableDropdown } from './SearchableDropdown';
interface Deck {
  id: string;
  name: string;
  leader: string;
  deckUrl: string;
  notes: string;
  createdAt: string;
}

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
  decks: Deck[];
  onOpenDeckManager: () => void;
}
export function MatchForm({
  onClose,
  selectedSession,
  onCreateSession,
  decks,
  onOpenDeckManager
}: MatchFormProps) {
  const [opponentDeck, setOpponentDeck] = useState('');
  const [selectedDeck, setSelectedDeck] = useState('');
  
  // Create deck options from user's decks
  const userDeckOptions = decks.map(deck => deck.name);
  
  // One Piece TCG Deck Options
  const deckOptions = [
    'OP-01 Roronoa Zoro (Red)',
    'OP-01 Trafalgar Law (Red/Green)',
    'OP-01 Monkey D. Luffy (Red)',
    'OP-01 Kouzuki Oden (Green)',
    'OP-01 Donquixote Doflamingo (Blue)',
    'OP-01 Crocodile (Blue/Green)',
    'OP-01 Kaido (Purple)',
    'OP-01 Charlotte Linlin (Yellow)',
    'OP-02 Edward.Newgate (Red)',
    'OP-02 Monkey D. Garp (Red)',
    'OP-02 Kin\'emon (Green)',
    'OP-02 Sanji (Green/Blue)',
    'OP-02 Emporio.Ivankov (Blue)',
    'OP-02 Magellan (Purple)',
    'OP-02 Smoker (Black)',
    'OP-02 Issho (Black)',
    'OP-03 Portgas.D.Ace (Red)',
    'OP-03 Kuro (Green)',
    'OP-03 Arlong (Green/Blue)',
    'OP-03 Nami (Blue)',
    'OP-03 Rob Lucci (Black)',
    'OP-03 Charlotte Linlin (Yellow)',
    'OP-03 Charlotte Katakuri (Yellow)',
    'OP-03 Gecko Moria (Black)',
    'OP-04 Vinsmoke Reiju (Green)',
    'OP-04 Belo Betty (Red)',
    'OP-04 Donquixote Doflamingo (Green/Purple)',
    'OP-04 Monkey D. Luffy (Purple/Black)',
    'OP-04 Rebecca (Blue)',
    'OP-04 Kuzan (Black)',
    'OP-04 Sabo (Red/Black)',
    'OP-04 Eustass "Captain" Kid (Green/Yellow)',
    'OP-05 Monkey D. Luffy (Black)',
    'OP-05 Uta (Red/Purple)',
    'OP-05 Sabo (Red/Black)',
    'OP-05 Koala (Red/Green)',
    'OP-05 Rob Lucci (Black)',
    'OP-05 Enel (Yellow)',
    'OP-05 Perona (Purple)',
    'OP-05 Hody Jones (Blue)',
    'OP-06 Eustass "Captain" Kid (Green)',
    'OP-06 Marshall.D.Teach (Black)',
    'OP-06 Gecko Moria (Black)',
    'OP-06 Carrot (Yellow)',
    'OP-06 Marco (Red/Blue)',
    'OP-06 Boa Hancock (Blue/Yellow)',
    'OP-06 Vinsmoke Reiju (Green/Purple)',
    'OP-06 Monkey D. Luffy (Red/Purple)',
    'OP-07 Monkey D. Luffy (Red/Green)',
    'OP-07 Rob Lucci (Black)',
    'OP-07 Foxy (Blue)',
    'OP-07 Vegapunk (Blue/Yellow)',
    'OP-07 Kalgara (Green)',
    'OP-07 Tony Tony.Chopper (Green/Yellow)',
    'OP-07 Pudding (Yellow/Black)',
    'OP-07 Sasaki (Black/Red)',
    'OP-08 Tony Tony.Chopper (Red/Green)',
    'OP-08 Marco (Red/Blue)',
    'OP-08 Yamato (Green/Yellow)',
    'OP-08 Sengoku (Black)',
    'OP-08 Trafalgar Law (Red/Purple)',
    'OP-08 Charlotte Linlin (Yellow)',
    'OP-08 Donquixote Doflamingo (Purple/Blue)',
    'OP-08 Eustass "Captain" Kid (Red)',
    'OP-09 Monkey.D.Luffy (Red/Purple)',
    'OP-09 Kozuki Oden (Green)',
    'OP-09 Kyros (Red)',
    'OP-09 Hannyabal (Black)',
    'OP-09 Usopp (Blue/Black)',
    'OP-09 Jewelry Bonney (Green)',
    'OP-09 Yamato (Yellow)',
    'OP-09 Charlotte Katakuri (Yellow/Purple)',
    'OP-10 Caesar Clown (Green/Black)',
    'OP-10 Trafalgar Law (Green/Blue)',
    'OP-10 Eustass "Captain" Kid (Yellow)',
    'OP-10 Sugar (Purple)',
    'OP-10 Smoker (Black)',
    'OP-10 Usopp (Blue/Black)',
    'OP-10 Sabo (Red/Black)',
    'OP-10 Rosinante (Green/Yellow)',
    'OP-11 Monkey.D.Luffy (Red)',
    'OP-11 Vinsmoke Sanji (Green/Yellow)',
    'OP-11 Nami (Green)',
    'OP-11 Shanks (Red)',
    'OP-11 Borsalino (Yellow/Black)',
    'OP-11 Dracule Mihawk (Black)',
    'OP-11 Vinsmoke Ichiji (Blue)',
    'OP-11 Charlotte Smoothie (Red/Yellow)',
    'EB-01 Kouzuki Oden (Red/Green)',
    'EB-01 Hannyabal (Blue/Purple)',
    'EB-01 Kyros (Black/Yellow)',
    'EB-02 Monkey D. Luffy (Green/Purple)',
    'ST-01 Monkey D. Luffy (Red)',
    'ST-02 Eustass "Captain" Kid (Green)',
    'ST-03 Donquixote Doflamingo (Blue)',
    'ST-04 Kaido (Purple)',
    'ST-05 Monkey D. Luffy (Red)',
    'ST-06 Sakazuki (Black)',
    'ST-07 Charlotte Linlin (Yellow)',
    'ST-08 Monkey D. Luffy (Black)',
    'ST-09 Yamato (Yellow)',
    'ST-10 Monkey D. Luffy (Red/Purple)',
    'ST-11 Uta (Red/Purple)',
    'ST-12 Roronoa Zoro & Sanji (Blue/Green)',
    'ST-13 Sabo (Red/Black)',
    'ST-13 Luffy (Black/Yellow)',
    'ST-13 Ace (Blue, Yellow)',
    'ST-14 Monkey D. Luffy (Red)'
  ];

  return (
    <div className="bg-zinc-900 rounded-lg p-6 mb-6">
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
            <div className="flex items-center justify-between mb-2">
              <label className="block">Your Deck</label>
              <button
                type="button"
                onClick={onOpenDeckManager}
                className="text-orange-400 hover:text-orange-300 text-sm flex items-center gap-1"
                title="Manage Decks"
              >
                <SettingsIcon size={16} />
                Manage Decks
              </button>
            </div>
            {userDeckOptions.length > 0 ? (
              <SearchableDropdown
                options={userDeckOptions}
                value={selectedDeck}
                onChange={setSelectedDeck}
                placeholder="Select your deck..."
                label=""
              />
            ) : (
              <div className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-zinc-400">
                No decks created yet. Click "Manage Decks" to create your first deck.
              </div>
            )}
          </div>
          <div>
            <label className="block mb-2">
              Opponent Name <span className="text-zinc-500">(Optional)</span>
            </label>
            <input 
              type="text" 
              placeholder="e.g., John D." 
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white" 
            />
          </div>
          <SearchableDropdown
            options={deckOptions}
            value={opponentDeck}
            onChange={setOpponentDeck}
            placeholder="e.g., R/P Luffy"
            label="Opponent's Deck"
          />
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
    </div>
  );
}