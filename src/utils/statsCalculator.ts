export interface Session {
  name: string;
  date: string;
  matches: number;
  active: boolean;
  leader?: string;
  deckUrl?: string;
  location?: string;
  tournamentType?: string;
  notes?: string;
}

export interface Match {
  round: string;
  opponent: string;
  deck: string;
  outcome: 'win' | 'loss';
  session?: string;
  leader?: string;
  opponentName?: string;
  deckUrl?: string;
  dieRoll?: 'win' | 'loss';
  playOrder?: 'first' | 'second';
  matchDuration?: string;
  tournamentType?: string;
  notes?: string;
  date?: string;
}

export interface Stats {
  winRate: number;
  totalMatches: number;
  wins: number;
  losses: number;
}

export interface DeckPerformance {
  name: string;
  winRate: number;
}

export function calculateFilteredStats(
  sessions: Session[],
  matches: Match[],
  filter: { type: 'all' | 'session' | 'leader'; value: string }
): { stats: Stats; deckPerformance: DeckPerformance[]; filteredMatches: Match[] } {
  let filteredMatches = matches;

  // Apply filters
  if (filter.type === 'session') {
    filteredMatches = matches.filter(match => match.session === filter.value);
  } else if (filter.type === 'leader') {
    filteredMatches = matches.filter(match => match.leader === filter.value);
  }

  // Sort matches by round in descending order (R10 > R9 > R8 > etc.)
  filteredMatches.sort((a, b) => {
    const getRoundNumber = (round: string) => {
      const match = round.match(/R(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    };
    
    const roundA = getRoundNumber(a.round);
    const roundB = getRoundNumber(b.round);
    
    return roundB - roundA; // Descending order
  });

  // Calculate stats
  const wins = filteredMatches.filter(match => match.outcome === 'win').length;
  const losses = filteredMatches.filter(match => match.outcome === 'loss').length;
  const totalMatches = wins + losses;
  const winRate = totalMatches > 0 ? Math.round((wins / totalMatches) * 100) : 0;

  // Calculate deck performance
  const deckStats = new Map<string, { wins: number; total: number }>();
  
  filteredMatches.forEach(match => {
    const deck = match.deck;
    if (!deckStats.has(deck)) {
      deckStats.set(deck, { wins: 0, total: 0 });
    }
    const stats = deckStats.get(deck)!;
    stats.total++;
    if (match.outcome === 'win') {
      stats.wins++;
    }
  });

  const deckPerformance: DeckPerformance[] = Array.from(deckStats.entries()).map(([name, stats]) => ({
    name,
    winRate: stats.total > 0 ? Math.round((stats.wins / stats.total) * 100) : 0
  }));

  return {
    stats: { winRate, totalMatches, wins, losses },
    deckPerformance,
    filteredMatches
  };
} 