/**
 * Kleine Mono-Pill für Fächer, Sprachen & Co.
 * Farbe folgt der Semantik der App: cyan=Code, violet=Notizen, green=Termine.
 */
const COLORS = {
  cyan: 'border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan',
  violet: 'border-neon-violet/30 bg-neon-violet/10 text-neon-violet',
  green: 'border-neon-green/30 bg-neon-green/10 text-neon-green',
  pink: 'border-neon-pink/30 bg-neon-pink/10 text-neon-pink',
  neutral: 'border-line bg-white/5 text-ink-mid',
};

export default function Badge({ color = 'neutral', className = '', children }) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-md border px-2 py-0.5',
        'font-mono text-[11px] font-medium tracking-wide',
        COLORS[color],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  );
}
