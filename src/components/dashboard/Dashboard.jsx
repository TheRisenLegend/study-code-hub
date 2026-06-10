import { motion } from 'framer-motion';
import { Code2, FileText, Timer } from 'lucide-react';
import TerminalHero from './TerminalHero.jsx';
import StatCard from './StatCard.jsx';
import ExamCountdown from './ExamCountdown.jsx';
import RecentFeed from './RecentFeed.jsx';
import { daysUntil } from '../../utils/dates.js';

/** Gestaffeltes Einblenden der Dashboard-Sektionen */
const stagger = {
  hidden: { opacity: 0, y: 14 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 + i * 0.07, duration: 0.4, ease: 'easeOut' },
  }),
};

/**
 * Startseite: Terminal-Hero (Signature), drei Kennzahlen,
 * darunter Klausur-Countdown und der "Zuletzt im Hub"-Feed.
 */
export default function Dashboard({ notes, snippets, exams, onNavigate, onAddExam, onDeleteExam }) {
  const nextExam = exams
    .map((e) => ({ ...e, days: daysUntil(e.date) }))
    .filter((e) => e.days >= 0)
    .sort((a, b) => a.days - b.days)[0];

  return (
    <div className="space-y-6">
      <TerminalHero exams={exams} notes={notes} snippets={snippets} />

      {/* Kennzahlen — klickbar, farblich nach Inhaltstyp codiert */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <motion.div variants={stagger} initial="hidden" animate="show" custom={0}>
          <StatCard
            icon={FileText}
            value={notes.length}
            label="Notizen"
            accent="violet"
            onClick={() => onNavigate('notes')}
          />
        </motion.div>
        <motion.div variants={stagger} initial="hidden" animate="show" custom={1}>
          <StatCard
            icon={Code2}
            value={snippets.length}
            label="Code-Snippets"
            accent="cyan"
            onClick={() => onNavigate('snippets')}
          />
        </motion.div>
        <motion.div variants={stagger} initial="hidden" animate="show" custom={2}>
          <StatCard
            icon={Timer}
            value={nextExam ? `${nextExam.days}d` : '—'}
            label={nextExam ? `bis ${nextExam.subject}` : 'keine Klausur geplant'}
            accent="green"
            onClick={() => onNavigate('dashboard')}
          />
        </motion.div>
      </div>

      {/* Zwei Spalten ab lg: Klausuren | Aktivität */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <motion.div variants={stagger} initial="hidden" animate="show" custom={3}>
          <ExamCountdown exams={exams} onAdd={onAddExam} onDelete={onDeleteExam} />
        </motion.div>
        <motion.div variants={stagger} initial="hidden" animate="show" custom={4}>
          <RecentFeed notes={notes} snippets={snippets} onNavigate={onNavigate} />
        </motion.div>
      </div>
    </div>
  );
}
