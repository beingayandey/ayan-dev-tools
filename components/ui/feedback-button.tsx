"use client";

import React, { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './button';

interface FeedbackButtonProps {
  /** Default action label */
  label: string;
  /** Success label shown after click */
  successLabel?: string;
  /** Whether the action is currently processing */
  isLoading?: boolean;
  /** Custom success callback */
  onSuccess?: () => void | Promise<void>;
  /** Auto-revert delay in ms (default: 2000) */
  revertDelay?: number;
  /** Show checkmark icon */
  showIcon?: boolean;
  /** Button variant (passed through) */
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  /** Button size (passed through) */
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg';
  /** Additional className */
  className?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Click handler */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Button ref */
  asChild?: boolean;
}

export const FeedbackButton: React.FC<FeedbackButtonProps> = ({
  label,
  successLabel = 'Done ✓',
  isLoading = false,
  onSuccess,
  revertDelay = 2000,
  showIcon = true,
  variant = 'default',
  className = '',
  ...props
}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isLoading || isPending) return;

    setIsPending(true);

    try {
      if (onSuccess) {
        await onSuccess();
      }

      setIsSuccess(true);

      // Auto-revert after delay
      setTimeout(() => {
        setIsSuccess(false);
      }, revertDelay);
    } catch (err) {
      console.error('Action failed:', err);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button
      variant={variant}
      onClick={handleClick}
      disabled={isLoading || isPending || isSuccess}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isLoading || isPending ? (
          <motion.span
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <Loader2 className="size-4 animate-spin" />
            <span>Processing...</span>
          </motion.span>
        ) : isSuccess ? (
          <motion.span
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="flex items-center gap-2 text-emerald-400"
          >
            {showIcon && <Check className="size-4" />}
            <span className="font-semibold">{successLabel}</span>
          </motion.span>
        ) : (
          <motion.span
            key="default"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.8 }}
            className="flex items-center gap-2"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
};
