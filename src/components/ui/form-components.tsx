import { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

// --- BUTTON ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: ReactNode;
}

export function Button({ variant = 'primary', size = 'md', isLoading, children, className = '', disabled, ...props }: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm',
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
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}

// --- FORM INPUT ---
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function FormInput({ label, error, className = '', ...props }: FormInputProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <input
        className={`w-full px-3 py-2 bg-white border rounded-md text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 
          ${error ? 'border-red-500' : 'border-slate-200'}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}

// --- FORM SELECT ---
interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { label: string; value: string }[];
}

export function FormSelect({ label, error, options, className = '', ...props }: FormSelectProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <select
        className={`w-full px-3 py-2 bg-white border rounded-md text-sm text-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none
          ${error ? 'border-red-500' : 'border-slate-200'}`}
        {...props}
      >
        <option value="">Selecione uma opção</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}

// --- FORM SECTION ---
export function FormSection({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <div className="space-y-4 pt-6 first:pt-0">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        {description && <p className="text-sm text-slate-500">{description}</p>}
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        {children}
      </div>
    </div>
  );
}
