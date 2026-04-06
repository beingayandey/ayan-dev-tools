import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from './button';
import { useToast } from '@/context/toast-context';

interface CopyButtonProps {
  text: string;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  className = '',
  size = 'default'
}) => {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      showToast('Copied ✓');

      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
      showToast('Failed to copy');
    }
  };

  const sizeClasses = {
    sm: 'size-4',
    default: 'size-4',
    lg: 'size-5'
  };

  return (
    <Button
      variant="ghost"
      size={size === 'sm' ? 'icon-sm' : size === 'lg' ? 'icon-lg' : 'icon'}
      onClick={handleCopy}
      className={`transition-all duration-200 hover:scale-105 active:scale-95 ${className}`}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
    >
      {copied ? (
        <Check className={`${sizeClasses[size]} text-green-500`} />
      ) : (
        <Copy className={`${sizeClasses[size]} text-muted-foreground hover:text-foreground`} />
      )}
    </Button>
  );
};