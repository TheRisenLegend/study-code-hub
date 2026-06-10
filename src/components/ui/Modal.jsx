import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

/**
 * Overlay-Modal in Glass-Optik.
 * Wird vom Parent in <AnimatePresence> gerendert, damit auch das
 * Schließen animiert ist. Schließt per ESC, Backdrop-Klick oder X.
 */
export default function Modal({ title, onClose, children }) {
  // ESC zum Schließen
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Abgedunkelter, geblurrter Hintergrund */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <motion.div
        role="dialog"
        aria-modal="true"
        className="glass-strong relative w-full max-w-lg rounded-2xl p-6 shadow-glow-cyan/30"
        initial={{ opacity: 0, scale: 0.95, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 8 }}
        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold tracking-wide">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Schließen"
            className="rounded-lg p-1.5 text-ink-mid transition-colors hover:bg-white/5 hover:text-neon-pink"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}
