import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Code2, Plus, Search } from 'lucide-react';
import SnippetCard from './SnippetCard.jsx';
import SnippetModal from './SnippetModal.jsx';
import NeonButton from '../ui/NeonButton.jsx';
import EmptyState from '../ui/EmptyState.jsx';

/**
 * Code-Snippets-Bereich: Suche + Sprach-Filter + 2-spaltiges Grid (ab lg).
 */
export default function SnippetsView({ snippets, onUpsert, onDelete }) {
  const [query, setQuery] = useState('');
  const [langFilter, setLangFilter] = useState('Alle');
  const [modal, setModal] = useState({ open: false, snippet: null });

  const languages = useMemo(
    () => [...new Set(snippets.map((s) => s.language))].sort(),
    [snippets]
  );
  const subjects = useMemo(
    () => [...new Set(snippets.map((s) => s.subject))].sort(),
    [snippets]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return snippets
      .filter((s) => langFilter === 'Alle' || s.language === langFilter)
      .filter(
        (s) =>
          !q ||
          s.title.toLowerCase().includes(q) ||
          s.code.toLowerCase().includes(q) ||
          s.subject.toLowerCase().includes(q) ||
          (s.description ?? '').toLowerCase().includes(q)
      )
      .sort((a, b) => b.updatedAt - a.updatedAt);
  }, [snippets, query, langFilter]);

  const remove = (id) => {
    if (window.confirm('Snippet wirklich löschen?')) onDelete(id);
  };

  return (
    <div className="space-y-5">
      {/* Kopfzeile */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-wide">Code-Snippets</h1>
          <p className="mt-1 text-sm text-ink-mid">
            {snippets.length} {snippets.length === 1 ? 'Snippet' : 'Snippets'} · copy &amp; lernen
          </p>
        </div>
        <NeonButton onClick={() => setModal({ open: true, snippet: null })}>
          <Plus size={16} /> Neues Snippet
        </NeonButton>
      </div>

      {/* Suche */}
      <div className="relative">
        <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-low" />
        <input
          className="field pl-10 font-mono"
          placeholder="suchen … (auch im Code)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Snippets durchsuchen"
        />
      </div>

      {/* Sprach-Filter */}
      {languages.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {['Alle', ...languages].map((l) => {
            const active = langFilter === l;
            return (
              <button
                key={l}
                onClick={() => setLangFilter(l)}
                className={[
                  'rounded-lg border px-3 py-1 font-mono text-xs transition-all duration-300',
                  active
                    ? 'border-neon-cyan/50 bg-neon-cyan/15 text-neon-cyan shadow-glow-cyan'
                    : 'border-line bg-white/[0.03] text-ink-mid hover:border-neon-cyan/30 hover:text-ink-hi',
                ].join(' ')}
              >
                {l}
              </button>
            );
          })}
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Code2}
          title={snippets.length === 0 ? 'Noch keine Snippets hier.' : 'Nichts gefunden.'}
          hint={
            snippets.length === 0
              ? 'Teil mit „Neues Snippet" den ersten Code mit der Crew.'
              : 'Anderen Suchbegriff probieren oder Filter zurücksetzen.'
          }
        />
      ) : (
        <motion.div layout className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <AnimatePresence>
            {filtered.map((snippet, i) => (
              <motion.div
                key={snippet.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0, transition: { delay: i * 0.04, duration: 0.35 } }}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.18 } }}
              >
                <SnippetCard
                  snippet={snippet}
                  onEdit={(s) => setModal({ open: true, snippet: s })}
                  onDelete={remove}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Erstellen/Bearbeiten */}
      <AnimatePresence>
        {modal.open && (
          <SnippetModal
            snippet={modal.snippet}
            subjects={subjects}
            onSave={onUpsert}
            onClose={() => setModal({ open: false, snippet: null })}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
