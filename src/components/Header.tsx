import React from 'react';
import { PlusIcon } from 'lucide-react';
interface HeaderProps {
  onNewSession: () => void;
}
export function Header({
  onNewSession
}: HeaderProps) {
  return <header className="w-full bg-zinc-950 border-b border-zinc-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <svg className="w-6 h-6 text-orange-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor" />
            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1" />
          </svg>
          <h1 className="text-2xl font-bold">PirateKing</h1>
        </div>
        <button onClick={onNewSession} className="bg-orange-400 hover:bg-orange-500 text-black font-medium rounded-lg px-4 py-2 flex items-center gap-2">
          <PlusIcon size={18} />
          New Match
        </button>
      </div>
    </header>;
}