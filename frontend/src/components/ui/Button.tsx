import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const variantStyles: Record<string, string> = {
  primary: 'bg-primary hover:bg-[#1ea34e] text-white shadow-sm shadow-primary/20',
  secondary: 'bg-primary-dark text-white hover:bg-primary-deep',
  outline: 'bg-white border border-border text-dark hover:bg-primary-soft',
  ghost: 'text-gray hover:text-dark hover:bg-primary-soft',
  danger: 'bg-red-500 text-white hover:bg-red-600',
};

const sizeStyles: Record<string, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-8 py-4 text-base',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'font-medium rounded-lg transition-all inline-flex items-center justify-center gap-2',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
