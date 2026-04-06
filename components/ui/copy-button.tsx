import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
      className={`hover:scale-105 active:scale-95 ${className}`}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.div
            key="check"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 45 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <Check className={`${sizeClasses[size]} text-emerald-500`} />
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.15 }}
          >
            <Copy className={`${sizeClasses[size]} text-muted-foreground hover:text-foreground`} />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
};