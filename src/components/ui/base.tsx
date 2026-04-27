import { ReactNode } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({ variant = 'primary', size = 'md', children, className = '', ...props }: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-slate-900 text-white hover:bg-slate-800',
    outline: 'border border-slate-200 bg-transparent hover:bg-slate-100 text-slate-900',
    ghost: 'hover:bg-slate-100 text-slate-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 py-2 text-sm',
    lg: 'h-12 px-6 text-base',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
}

export function Badge({ children, variant = 'active' }: { children: ReactNode, variant?: 'active' | 'inactive' }) {
  const styles = variant === 'active' 
    ? 'bg-green-100 text-green-700 border-green-200' 
    : 'bg-slate-100 text-slate-600 border-slate-200';
    
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${styles}`}>
      {children}
    </span>
  );
}

export function Card({ children, className = '' }: { children: ReactNode, className?: string }) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm ${className}`}>
      {children}
    </div>
  );
}
