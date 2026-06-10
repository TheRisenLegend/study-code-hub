import { motion } from 'framer-motion';

/**
 * Button mit Neon-Charakter.
 *
 * Varianten:
 *   primary → gefüllt in Cyan, glüht beim Hover (Haupt-Aktionen)
 *   ghost   → transparente Glass-Optik (Sekundär-Aktionen)
 *   danger  → dezentes Pink für Löschen
 */
const VARIANTS = {
  primary:
    'bg-neon-cyan text-[#06222a] font-semibold hover:shadow-glow-cyan ' +
    'hover:brightness-110 border border-transparent',
  ghost:
    'glass text-ink-hi hover:border-neon-cyan/40 hover:text-neon-cyan ' +
    'hover:shadow-glow-cyan/50',
  danger:
    'border border-neon-pink/30 bg-neon-pink/10 text-neon-pink ' +
    'hover:bg-neon-pink/20 hover:shadow-glow-pink',
};

export default function NeonButton({
  variant = 'primary',
  className = '',
  children,
  ...rest
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5',
        'text-sm transition-all duration-300 select-none',
        VARIANTS[variant],
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
