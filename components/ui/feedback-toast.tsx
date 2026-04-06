import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Zap } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose?: () => void;
}

export const FeedbackToast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible && onClose) {
      const timer = setTimeout(onClose, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const isSuccess = message.includes('✓') || message.toLowerCase().includes('success') || message.toLowerCase().includes('copied');
  const isError = message.toLowerCase().includes('fail') || message.toLowerCase().includes('error');

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9, x: 20 }}
          animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
          exit={{ opacity: 0, y: 20, scale: 0.9, x: 20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-zinc-900/95 backdrop-blur-xl text-white text-sm font-medium rounded-xl shadow-2xl border border-white/10"
        >
          {isSuccess ? (
            <div className="flex items-center gap-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20"
              >
                <Check className="size-3 text-emerald-400" />
              </motion.div>
              <span className="text-emerald-400">{message}</span>
            </div>
          ) : isError ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-red-500/20">
                <X className="size-3 text-red-400" />
              </div>
              <span className="text-red-400">{message}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-500/20">
                <Zap className="size-3 text-indigo-400" />
              </div>
              <span>{message}</span>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Hook for managing toast state
export const useToast = () => {
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: '',
    visible: false
  });

  const showToast = (message: string) => {
    setToast({ message, visible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, visible: false }));
  };

  return { toast, showToast, hideToast };
};