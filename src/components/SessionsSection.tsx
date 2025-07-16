import React, { useState } from 'react';
import { ChevronRightIcon, DownloadIcon, Trash2Icon } from 'lucide-react';
import { ConfirmationModal } from './ConfirmationModal';
interface SessionsSectionProps {
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
  onSessionClick: (session: { name: string; date: string; matches: number; active: boolean; leader?: string; deckUrl?: string; location?: string; tournamentType?: string; notes?: string }) => void;
  onEditSession: (session: { name: string; date: string; matches: number; active: boolean; leader?: string; deckUrl?: string; location?: string; tournamentType?: string; notes?: string }) => void;
  onViewStats: (sessionName: string) => void;
  onDeleteSession: (sessionName: string) => void;
}
export function SessionsSection({
  sessions,
  onSessionClick,
  onEditSession,
  onViewStats,
  onDeleteSession
}: SessionsSectionProps) {
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    sessionName: string;
  }>({ isOpen: false, sessionName: '' });

  const handleDeleteClick = (e: React.MouseEvent, sessionName: string) => {
    e.stopPropagation();
    setDeleteModal({ isOpen: true, sessionName });
  };

  const handleConfirmDelete = () => {
    onDeleteSession(deleteModal.sessionName);
  };
  return <div className="bg-zinc-900 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold mb-1">Sessions</h2>
          <p className="text-zinc-400">Your game sessions.</p>
        </div>
        <button className="flex items-center gap-2 border border-zinc-700 rounded-lg px-4 py-2 hover:bg-zinc-800">
          <DownloadIcon size={18} />
          Export
        </button>
      </div>
      <div className="space-y-3">
        {sessions.map((session, index) => <div 
            key={index} 
            className={`p-4 rounded-lg transition-colors ${session.active ? 'bg-orange-400 bg-opacity-30' : 'hover:bg-zinc-800'}`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1 cursor-pointer" onClick={() => onSessionClick(session)}>
                <h3 className={`font-medium text-lg ${session.active ? 'text-orange-300' : 'text-white'}`}>
                  {session.name}
                </h3>
                <p className={`${session.active ? 'text-orange-200' : 'text-zinc-400'} text-sm`}>
                  {session.matches} matches • {session.date}
                </p>
                {session.leader && (
                  <p className={`${session.active ? 'text-orange-200' : 'text-zinc-400'} text-sm`}>
                    Leader: {session.leader}
                  </p>
                )}
                {session.location && (
                  <p className={`${session.active ? 'text-orange-200' : 'text-zinc-400'} text-sm`}>
                    Location: {session.location}
                  </p>
                )}
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewStats(session.name);
                  }}
                  className={`p-2 rounded-lg ${session.active ? 'bg-orange-500 hover:bg-orange-600' : 'bg-zinc-700 hover:bg-zinc-600'}`}
                  title="View Stats"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditSession(session);
                  }}
                  className={`p-2 rounded-lg ${session.active ? 'bg-orange-500 hover:bg-orange-600' : 'bg-zinc-700 hover:bg-zinc-600'}`}
                  title="Edit Session"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={(e) => handleDeleteClick(e, session.name)}
                  className={`p-2 rounded-lg ${session.active ? 'bg-red-500 hover:bg-red-600' : 'bg-zinc-700 hover:bg-red-600'}`}
                  title="Delete Session"
                >
                  <Trash2Icon className="w-4 h-4" />
                </button>
                <div className="cursor-pointer" onClick={() => onSessionClick(session)}>
                  <ChevronRightIcon className={`${session.active ? 'text-orange-300' : 'text-zinc-400'}`} />
                </div>
              </div>
            </div>
            {session.deckUrl && (
              <div className="mt-2">
                <a 
                  href={session.deckUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`text-sm ${session.active ? 'text-orange-300 hover:text-orange-200' : 'text-blue-400 hover:text-blue-300'} underline`}
                >
                  View Deck List →
                </a>
              </div>
            )}
          </div>)}
      </div>
      
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, sessionName: '' })}
        onConfirm={handleConfirmDelete}
        title="Delete Session"
        message={`Are you sure you want to delete "${deleteModal.sessionName}"? This will permanently remove the session and all its associated matches. This action cannot be undone.`}
        confirmText="Delete Session"
        cancelText="Cancel"
        type="danger"
      />
    </div>;
}