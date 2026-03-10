import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string;
  change: string;
  up: boolean;
  icon: LucideIcon;
  color: string;
}

export default function StatsCard({ label, value, change, up, icon: Icon, color }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl border border-border p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
        <span
          className={`flex items-center gap-0.5 text-xs font-medium ${
            up ? 'text-green-600' : 'text-red-500'
          }`}
        >
          {up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {change}
        </span>
      </div>
      <p className="text-2xl font-bold text-dark mt-3">{value}</p>
      <p className="text-sm text-gray mt-0.5">{label}</p>
    </div>
  );
}
