import React, { useState } from 'react';
import { PlusIcon, XIcon, EditIcon, Trash2Icon } from 'lucide-react';
import { SearchableDropdown } from './SearchableDropdown';
import { ConfirmationModal } from './ConfirmationModal';

interface Deck {
  id: string;
  name: string;
  leader: string;
  deckUrl: string;
  notes: string;
  createdAt: string;
}

interface DeckManagerProps {
  isOpen: boolean;
  onClose: () => void;
  decks: Deck[];
  onSaveDeck: (deck: Omit<Deck, 'id' | 'createdAt'>) => void;
  onUpdateDeck: (id: string, deck: Omit<Deck, 'id' | 'createdAt'>) => void;
  onDeleteDeck: (id: string) => void;
}

export function DeckManager({
  isOpen,
  onClose,
  decks,
  onSaveDeck,
  onUpdateDeck,
  onDeleteDeck
}: DeckManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingDeck, setEditingDeck] = useState<Deck | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; deckId: string; deckName: string }>({
    isOpen: false,
    deckId: '',
    deckName: ''
  });

  const [formData, setFormData] = useState({
    name: '',
    leader: '',
    deckUrl: '',
    notes: ''
  });

  // One Piece TCG Deck Options (same as opponent deck list)
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

  const handleNewDeck = () => {
    setEditingDeck(null);
    setFormData({
      name: '',
      leader: '',
      deckUrl: '',
      notes: ''
    });
    setShowForm(true);
  };

  const handleEditDeck = (deck: Deck) => {
    setEditingDeck(deck);
    setFormData({
      name: deck.name,
      leader: deck.leader,
      deckUrl: deck.deckUrl,
      notes: deck.notes
    });
    setShowForm(true);
  };

  const handleDeleteDeck = (deckId: string, deckName: string) => {
    setDeleteModal({ isOpen: true, deckId, deckName });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDeck) {
      onUpdateDeck(editingDeck.id, formData);
    } else {
      onSaveDeck(formData);
    }
    setShowForm(false);
    setEditingDeck(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingDeck(null);
    setFormData({
      name: '',
      leader: '',
      deckUrl: '',
      notes: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden border border-zinc-700">
        <div className="flex items-center justify-between p-6 border-b border-zinc-700">
          <h2 className="text-2xl font-bold text-white">Deck Manager</h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <XIcon size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {showForm ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">
                  {editingDeck ? 'Edit Deck' : 'Create New Deck'}
                </h3>
                <button
                  onClick={handleCancel}
                  className="text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-white">Deck Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., My Sakazuki Deck"
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white"
                      required
                    />
                  </div>
                  <SearchableDropdown
                    options={deckOptions}
                    value={formData.leader}
                    onChange={(value) => setFormData(prev => ({ ...prev, leader: value }))}
                    placeholder="Select a leader..."
                    label="Leader *"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-white">
                    Deck URL <span className="text-zinc-500">(Optional)</span>
                  </label>
                  <input
                    type="url"
                    value={formData.deckUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, deckUrl: e.target.value }))}
                    placeholder="https://decklist.example.com/your-deck"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-white">
                    Notes <span className="text-zinc-500">(Optional)</span>
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Add notes about your deck strategy, key cards, etc..."
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white h-32 resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 px-4 py-2 border border-zinc-600 rounded-lg text-white hover:bg-zinc-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-orange-400 hover:bg-orange-500 text-black font-medium rounded-lg transition-colors"
                  >
                    {editingDeck ? 'Update Deck' : 'Create Deck'}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">Your Decks</h3>
                <button
                  onClick={handleNewDeck}
                  className="bg-orange-400 hover:bg-orange-500 text-black font-medium rounded-lg px-4 py-2 flex items-center gap-2"
                >
                  <PlusIcon size={18} />
                  New Deck
                </button>
              </div>

              {decks.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-zinc-400 mb-4">No decks created yet</p>
                  <button
                    onClick={handleNewDeck}
                    className="bg-orange-400 hover:bg-orange-500 text-black font-medium rounded-lg px-6 py-3 flex items-center gap-2 mx-auto"
                  >
                    <PlusIcon size={18} />
                    Create Your First Deck
                  </button>
                </div>
              ) : (
                <div className="grid gap-4">
                  {decks.map((deck) => (
                    <div key={deck.id} className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="text-lg font-medium text-white mb-1">{deck.name}</h4>
                          <p className="text-zinc-400 text-sm mb-2">{deck.leader}</p>
                          {deck.deckUrl && (
                            <a
                              href={deck.deckUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 text-sm underline"
                            >
                              View Deck List →
                            </a>
                          )}
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEditDeck(deck)}
                            className="p-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-white"
                            title="Edit Deck"
                          >
                            <EditIcon size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteDeck(deck.id, deck.name)}
                            className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
                            title="Delete Deck"
                          >
                            <Trash2Icon size={16} />
                          </button>
                        </div>
                      </div>
                      {deck.notes && (
                        <div className="mt-3 p-3 bg-zinc-700 rounded-lg">
                          <p className="text-zinc-300 text-sm">{deck.notes}</p>
                        </div>
                      )}
                      <div className="mt-3 text-zinc-500 text-xs">
                        Created: {new Date(deck.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, deckId: '', deckName: '' })}
        onConfirm={() => {
          onDeleteDeck(deleteModal.deckId);
          setDeleteModal({ isOpen: false, deckId: '', deckName: '' });
        }}
        title="Delete Deck"
        message={`Are you sure you want to delete "${deleteModal.deckName}"? This action cannot be undone.`}
        confirmText="Delete Deck"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
} 