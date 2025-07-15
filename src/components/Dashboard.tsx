import React from 'react';
import { StatCard } from './StatCard';
import { TrendingUpIcon, CrosshairIcon, TrophyIcon, FrownIcon } from 'lucide-react';
interface DashboardProps {
  stats: {
    winRate: number;
    totalMatches: number;
    wins: number;
    losses: number;
  };
}
export function Dashboard({
  stats
}: DashboardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard title="Win Rate" value={`${stats.winRate}%`} icon={<TrendingUpIcon className="text-orange-400" />} />
      <StatCard title="Total Matches" value={stats.totalMatches.toString()} icon={<CrosshairIcon className="text-orange-400" />} />
      <StatCard title="Wins" value={stats.wins.toString()} icon={<TrophyIcon className="text-orange-400" />} />
      <StatCard title="Losses" value={stats.losses.toString()} icon={<FrownIcon className="text-red-400" />} />
    </div>
  );
}