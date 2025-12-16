import React from 'react';
import { cn } from '@/lib/utils';

interface CalloutProps {
  children: React.ReactNode;
  className?: string;
  type?: 'info' | 'warning' | 'error' | 'success';
}

export function Callout({ children, className, type = 'info' }: CalloutProps) {
  return (
    <div className={cn(
      "p-4 my-6 border-l-4 rounded-r-md bg-zinc-900/50",
      type === 'info' && "border-blue-500",
      type === 'warning' && "border-yellow-500 text-yellow-200",
      type === 'error' && "border-red-500 text-red-200",
      type === 'success' && "border-green-500 text-green-200",
      className
    )}>
      {children}
    </div>
  );
}

export default Callout;
