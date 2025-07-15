import React from 'react';
interface DeckPerformanceProps {
  deckData: {
    name: string;
    winRate: number;
  }[];
}
export function DeckPerformance({
  deckData
}: DeckPerformanceProps) {
  const maxValue = 100;
  return (
    <div className="bg-zinc-900 rounded-lg p-6 mb-6">
      <h2 className="text-3xl font-bold mb-1">Deck Performance</h2>
      <p className="text-zinc-400 mb-6">Win rate by deck archetype.</p>
      <div className="h-80 flex items-end gap-8 mt-4">
        {deckData.map((deck, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="w-full bg-purple-400 rounded-t-sm" style={{
              height: `${deck.winRate / maxValue * 100}%`
            }}></div>
            <div className="mt-2 text-center">{deck.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}