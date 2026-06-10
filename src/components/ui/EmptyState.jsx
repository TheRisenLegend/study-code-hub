/**
 * Leerer Zustand = Einladung zum Handeln, kein trauriges Loch.
 */
export default function EmptyState({ icon: Icon, title, hint }) {
  return (
    <div className="glass flex flex-col items-center gap-3 rounded-2xl px-6 py-14 text-center">
      {Icon && (
        <div className="rounded-2xl border border-line bg-white/5 p-4 text-ink-low">
          <Icon size={28} strokeWidth={1.5} />
        </div>
      )}
      <p className="font-display font-medium text-ink-hi">{title}</p>
      {hint && <p className="max-w-xs text-sm text-ink-mid">{hint}</p>}
    </div>
  );
}
