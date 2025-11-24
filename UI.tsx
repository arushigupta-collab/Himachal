import React, { ReactNode, useState } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false, 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gov-accent disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gov-blue text-white hover:bg-blue-800 border border-transparent",
    secondary: "bg-gov-accent text-gov-dark hover:bg-yellow-500 border border-transparent",
    outline: "bg-transparent text-gov-blue border-2 border-gov-blue hover:bg-blue-50",
    danger: "bg-gov-danger text-white hover:bg-red-700 border border-transparent",
    ghost: "bg-transparent text-gov-blue hover:bg-gray-100"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-3 text-lg"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="mb-4 w-full">
      {label && <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>}
      <input 
        className={`w-full px-4 py-2 border rounded focus:ring-2 focus:ring-gov-blue focus:border-gov-blue outline-none transition-shadow ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
        {...props}
      />
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: string[];
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({ label, options, placeholder, className = '', ...props }) => {
  return (
    <div className="mb-4 w-full">
      {label && <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>}
      <select 
        className={`w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gov-blue focus:border-gov-blue outline-none bg-white ${className}`}
        {...props}
      >
        {placeholder && <option value="" disabled selected>{placeholder}</option>}
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="mb-4 w-full">
      {label && <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>}
      <textarea 
        className={`w-full px-4 py-2 border rounded focus:ring-2 focus:ring-gov-blue focus:border-gov-blue outline-none transition-shadow ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
        {...props}
      />
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
};

export const Card: React.FC<{ children: ReactNode; className?: string; onClick?: () => void }> = ({ children, className = '', onClick }) => (
  <div 
    className={`bg-white rounded-lg shadow-md p-6 border border-gray-100 ${onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''} ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

export const Badge: React.FC<{ type: 'success' | 'warning' | 'info' | 'danger'; children: ReactNode }> = ({ type, children }) => {
  const styles = {
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    info: "bg-blue-100 text-blue-800",
    danger: "bg-red-100 text-red-800",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[type]}`}>
      {children}
    </span>
  );
};

export const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: ReactNode }> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export const Accordion: React.FC<{ items: { title: string; content: string }[] }> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            className="w-full px-6 py-4 text-left flex justify-between items-center bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gov-blue"
            onClick={() => toggle(index)}
            aria-expanded={activeIndex === index}
          >
            <span className="font-semibold text-gray-900">{item.title}</span>
            <span className="text-gov-blue text-xl transform transition-transform duration-200" style={{ transform: activeIndex === index ? 'rotate(180deg)' : 'rotate(0deg)' }}>
              &#x2304;
            </span>
          </button>
          {activeIndex === index && (
            <div className="px-6 py-4 bg-gray-50 text-gray-700 text-sm leading-relaxed border-t border-gray-100">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};