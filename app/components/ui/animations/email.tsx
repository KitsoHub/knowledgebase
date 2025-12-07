// components/ui/animations.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, CheckCircle2, XCircle } from 'lucide-react';


export const EmailSendingAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 4000);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative w-full max-w-md">
        <div className="flex items-center justify-between mb-4 gap-9">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-md font-medium text-gray-700">IKMS to </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-md font-medium text-gray-700">IKMS Email Server </span>
            <div className="w-6 h-6 bg-green-500 rounded-full animate-pulse delay-500" />
          </div>
        </div>

        <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-green-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: progress }}
              transition={{ duration: 0.3, ease: 'linear' }}
              className="text-blue-500"
            >
              <Mail className="h-8 w-8" />
            </motion.div>
          </div>
        </div>

        <div className="mt-4 text-center text-md text-gray-600">
          {progress < 100 ? (
            <span>Sending feedback ({Math.round(progress)}%)</span>
          ) : (
            <span>Processing your feedback...</span>
          )}
        </div>
      </div>
    </div>
  );
};

// Success Popup Animation
export const SuccessPopup = ({
  message = 'Thank you! Your feedback has been received.',
  onClose
}: {
  message?: string;
  onClose: () => void
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 right-4 z-50 max-w-sm w-full"
      >
        <div className="bg-white rounded-xl shadow-lg border border-green-200 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4">
            <div className="flex items-center space-x-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', bounce: 0.5 }}
              >
                <CheckCircle2 className="h-6 w-6 text-white" />
              </motion.div>
              <h3 className="text-lg font-bold text-white">Success!</h3>
            </div>
          </div>
          <div className="p-4">
            <p className="text-gray-700">{message}</p>
            <div className="mt-3 flex justify-end">
              <button
                onClick={onClose}
                className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// Error Popup Animation
export const ErrorPopup = ({
  message = 'Failed to submit feedback. Please try again.',
  onClose
}: {
  message?: string;
  onClose: () => void
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 10000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 right-4 z-50 max-w-sm w-full"
      >
        <div className="bg-white rounded-xl shadow-lg border border-red-200 overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-rose-600 p-4">
            <div className="flex items-center space-x-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', bounce: 0.5 }}
              >
                <XCircle className="h-6 w-6 text-white" />
              </motion.div>
              <h3 className="text-lg font-bold text-white">Error</h3>
            </div>
          </div>
          <div className="p-4">
            <p className="text-gray-700">{message}</p>
            <div className="mt-3 flex justify-end">
              <button
                onClick={onClose}
                className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
