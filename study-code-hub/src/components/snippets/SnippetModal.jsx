import { useState } from 'react';
import Modal from '../ui/Modal.jsx';
import NeonButton from '../ui/NeonButton.jsx';

const LANGUAGES = ['Java', 'Python', 'SQL', 'JavaScript', 'Bash', 'Sonstiges'];

/**
 * Erstellen/Bearbeiten eines Code-Snippets.
 * `snippet` = null → neues Snippet; sonst Bearbeitung.
 */
export default function SnippetModal({ snippet, subjects, onSave, onClose }) {
  const [title, setTitle] = useState(snippet?.title ?? '');
  const [language, setLanguage] = useState(snippet?.language ?? 'Java');
  const [subject, setSubject] = useState(snippet?.subject ?? '');
  const [description, setDescription] = useState(snippet?.description ?? '');
  const [code, setCode] = useState(snippet?.code ?? '');

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim() || !code.trim()) return;
    onSave({
      ...(snippet ?? {}),
      title: title.trim(),
      language,
      subject: subject.trim() || 'Allgemein',
      description: description.trim(),
      code: code.replace(/\s+$/, ''), // trailing whitespace am Ende kappen
    });
    onClose();
  };

  return (
    <Modal title={snippet ? 'Snippet bearbeiten' : 'Neues Snippet'} onClose={onClose}>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label htmlFor="sn-title" className="field-label">Titel</label>
          <input
            id="sn-title"
            className="field"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="z. B. Stream: Liste filtern & mappen"
            autoFocus
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="sn-lang" className="field-label">Sprache</label>
            <select
              id="sn-lang"
              className="field [color-scheme:dark]"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {LANGUAGES.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="sn-subject" className="field-label">Fach</label>
            <input
              id="sn-subject"
              className="field"
              list="snippet-subject-options"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="z. B. Prog2"
            />
            <datalist id="snippet-subject-options">
              {subjects.map((s) => (
                <option key={s} value={s} />
              ))}
            </datalist>
          </div>
        </div>

        <div>
          <label htmlFor="sn-desc" className="field-label">Beschreibung (optional)</label>
          <input
            id="sn-desc"
            className="field"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Wofür ist das gut?"
          />
        </div>

        <div>
          <label htmlFor="sn-code" className="field-label">Code</label>
          <textarea
            id="sn-code"
            className="field min-h-44 resize-y font-mono text-[13px] leading-relaxed"
            rows={9}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={'public static void main(String[] args) {\n    // ...\n}'}
            spellCheck={false}
          />
        </div>

        <div className="flex justify-end gap-2 pt-1">
          <NeonButton type="button" variant="ghost" onClick={onClose}>
            Abbrechen
          </NeonButton>
          <NeonButton type="submit">Snippet speichern</NeonButton>
        </div>
      </form>
    </Modal>
  );
}
