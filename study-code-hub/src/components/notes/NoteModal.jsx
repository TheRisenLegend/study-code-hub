import { useState } from 'react';
import Modal from '../ui/Modal.jsx';
import NeonButton from '../ui/NeonButton.jsx';

/**
 * Erstellen/Bearbeiten einer Notiz in einem Formular.
 * `note` = null → neue Notiz; sonst Bearbeitung.
 * Vorhandene Fächer werden als <datalist>-Vorschläge angeboten.
 */
export default function NoteModal({ note, subjects, onSave, onClose }) {
  const [title, setTitle] = useState(note?.title ?? '');
  const [subject, setSubject] = useState(note?.subject ?? '');
  const [content, setContent] = useState(note?.content ?? '');

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({
      ...(note ?? {}),
      title: title.trim(),
      subject: subject.trim() || 'Allgemein',
      content: content.trim(),
    });
    onClose();
  };

  return (
    <Modal title={note ? 'Notiz bearbeiten' : 'Neue Notiz'} onClose={onClose}>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label htmlFor="note-title" className="field-label">Titel</label>
          <input
            id="note-title"
            className="field"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="z. B. Kurvendiskussion – Ablauf"
            autoFocus
          />
        </div>

        <div>
          <label htmlFor="note-subject" className="field-label">Fach</label>
          <input
            id="note-subject"
            className="field"
            list="subject-options"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="z. B. Analysis"
          />
          <datalist id="subject-options">
            {subjects.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
        </div>

        <div>
          <label htmlFor="note-content" className="field-label">Inhalt</label>
          <textarea
            id="note-content"
            className="field min-h-36 resize-y leading-relaxed"
            rows={7}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Zusammenfassung, Formeln, Merksätze …"
          />
        </div>

        <div className="flex justify-end gap-2 pt-1">
          <NeonButton type="button" variant="ghost" onClick={onClose}>
            Abbrechen
          </NeonButton>
          <NeonButton type="submit">Notiz speichern</NeonButton>
        </div>
      </form>
    </Modal>
  );
}
