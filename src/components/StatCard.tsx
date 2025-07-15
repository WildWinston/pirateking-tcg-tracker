import React, { ReactNode } from 'react';
interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
}
export function StatCard({
  title,
  value,
  icon
}: StatCardProps) {
  return (
    <div className="bg-zinc-900 rounded-lg p-6 flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-zinc-400">{title}</h3>
        {icon}
      </div>
      <p className="text-5xl font-bold">{value}</p>
    </div>
  );
}