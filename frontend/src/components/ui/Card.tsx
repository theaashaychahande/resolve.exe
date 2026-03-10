import { cn } from '@/utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-border',
        hover && 'hover:shadow-md transition-shadow',
        className,
      )}
    >
      {children}
    </div>
  );
}
