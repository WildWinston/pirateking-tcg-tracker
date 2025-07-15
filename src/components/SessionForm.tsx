import React, { useState } from 'react';
import { PlusIcon, XIcon } from 'lucide-react';

interface SessionFormProps {
  onClose: () => void;
  onSave: (session: {
    name: string;
    date: string;
    leader: string;
    deckUrl: string;
    location: string;
    tournamentType: string;
    notes: string;
  }) => void;
  editingSession?: {
    name: string;
    date: string;
    leader?: string;
    deckUrl?: string;
    location?: string;
    tournamentType?: string;
    notes?: string;
  };
}

export function SessionForm({
  onClose,
  onSave,
  editingSession
}: SessionFormProps) {
  const [formData, setFormData] = useState({
    name: editingSession?.name || '',
    date: editingSession?.date || new Date().toISOString().split('T')[0],
    leader: editingSession?.leader || '',
    deckUrl: editingSession?.deckUrl || '',
    location: editingSession?.location || '',
    tournamentType: editingSession?.tournamentType || 'local',
    notes: editingSession?.notes || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-zinc-900 rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">
          {editingSession ? 'Edit Session' : 'Create New Session'}
        </h2>
        <button 
          onClick={onClose}
          className="text-zinc-400 hover:text-white"
        >
          <XIcon size={24} />
        </button>
      </div>

      <div className="mb-6">
        <button onClick={onClose} className="text-zinc-400 hover:text-white mb-4">
          ← Back to Dashboard
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2">Session Name *</label>
            <input 
              type="text" 
              placeholder="e.g., Local Tournament - July 2025"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Date *</label>
            <input 
              type="date" 
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2">Your Leader *</label>
            <input 
              type="text" 
              placeholder="e.g., Sakazuki, R/P Law, Enel"
              value={formData.leader}
              onChange={(e) => handleInputChange('leader', e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Location</label>
            <input 
              type="text" 
              placeholder="e.g., Local Game Store, Online"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2">Deck URL</label>
            <input 
              type="url" 
              placeholder="https://decklist.example.com/your-deck"
              value={formData.deckUrl}
              onChange={(e) => handleInputChange('deckUrl', e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white"
            />
          </div>
          <div>
            <label className="block mb-2">Tournament Type</label>
            <select 
              value={formData.tournamentType}
              onChange={(e) => handleInputChange('tournamentType', e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white"
            >
              <option value="local">Local Tournament</option>
              <option value="store-championship">Store Championship</option>
              <option value="regional">Regional</option>
              <option value="national">National</option>
              <option value="casual">Casual Play</option>
              <option value="online">Online</option>
              <option value="testing">Testing Session</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-2">
            Notes <span className="text-zinc-500">(Optional)</span>
          </label>
          <textarea 
            placeholder="Add any notes about this session..."
            value={formData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white h-24"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-orange-400 hover:bg-orange-500 text-black font-medium rounded-lg py-3 flex items-center justify-center gap-2"
        >
          <PlusIcon size={18} />
          {editingSession ? 'Update Session' : 'Create Session'}
        </button>
      </form>
    </div>
  );
} 