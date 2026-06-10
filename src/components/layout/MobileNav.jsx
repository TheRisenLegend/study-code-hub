import { motion } from 'framer-motion';

const ACCENT = {
  cyan: 'text-neon-cyan',
  violet: 'text-neon-violet',
  green: 'text-neon-green',
};

/**
 * Bottom-Tab-Bar für Smartphones (unter md).
 * Glass-Optik, daumenfreundlich, mit Safe-Area-Padding für Geräte
 * mit Gesten-Leiste. Der aktive Tab bekommt einen gleitenden Unterstrich.
 */
export default function MobileNav({ items, view, onNavigate }) {
  return (
    <nav className="glass-strong fixed inset-x-3 bottom-3 z-40 flex justify-around rounded-2xl px-2 pb-[max(0.4rem,env(safe-area-inset-bottom))] pt-1.5 md:hidden">
      {items.map(({ id, label, icon: Icon, accent }) => {
        const active = view === id;
        return (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={[
              'relative flex flex-col items-center gap-0.5 rounded-xl px-4 py-1.5',
              'text-[10px] font-medium tracking-wide transition-colors duration-300',
              active ? ACCENT[accent] : 'text-ink-low',
            ].join(' ')}
          >
            <Icon size={20} strokeWidth={active ? 2.2 : 1.8} />
            {label}
            {active && (
              <motion.span
                layoutId="mobilenav-indicator"
                className="absolute -bottom-0.5 h-[3px] w-6 rounded-full bg-current"
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
