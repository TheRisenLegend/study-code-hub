import { motion } from 'framer-motion';

/**
 * Glas-Karte mit optionalem Neon-Glow beim Hover.
 *
 * @param {'cyan'|'violet'|'green'|'pink'|null} glow  Hover-Glow-Farbe
 * @param {boolean} lift     Karte hebt sich beim Hover leicht an
 * @param {string}  className zusätzliche Tailwind-Klassen
 */
const GLOW = {
  cyan: 'hover:shadow-glow-cyan hover:border-neon-cyan/40',
  violet: 'hover:shadow-glow-violet hover:border-neon-violet/40',
  green: 'hover:shadow-glow-green hover:border-neon-green/40',
  pink: 'hover:shadow-glow-pink hover:border-neon-pink/40',
};

export default function GlassCard({
  glow = null,
  lift = false,
  className = '',
  children,
  ...rest
}) {
  return (
    <motion.div
      className={[
        'glass rounded-2xl transition-[box-shadow,border-color,transform] duration-300',
        glow ? GLOW[glow] : '',
        lift ? 'hover:-translate-y-0.5' : '',
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
