import { cn } from '@/utils/cn';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusStyles: Record<string, string> = {
  Completed: 'bg-green-50 text-green-700',
  Processing: 'bg-amber-50 text-amber-700',
  Failed: 'bg-red-50 text-red-700',
  Active: 'bg-green-50 text-green-700',
  Test: 'bg-amber-50 text-amber-700',
  CSV: 'bg-blue-50 text-blue-700',
  JSON: 'bg-amber-50 text-amber-700',
};

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        statusStyles[status] || 'bg-gray-50 text-gray-700',
        className,
      )}
    >
      {status}
    </span>
  );
}
