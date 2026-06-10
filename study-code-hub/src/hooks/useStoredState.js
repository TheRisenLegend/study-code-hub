import { useEffect, useState } from 'react';
import { loadCollection, saveCollection } from '../data/storage.js';

/**
 * Wie useState, aber mit automatischer Persistenz über den Storage-Service.
 *
 * @param {string} key   Name der Collection ('notes', 'snippets', 'exams')
 * @param {Array}  seed  Startdaten beim allerersten App-Start
 *
 * >>> BACKEND SPÄTER ANBINDEN <<<
 * Sobald storage.js async wird, hier den Initialwert auf [] setzen und
 * die Daten in einem useEffect per `await loadCollection(...)` nachladen.
 */
export function useStoredState(key, seed) {
  const [value, setValue] = useState(() => loadCollection(key, seed));

  // Jede Änderung sofort wegschreiben
  useEffect(() => {
    saveCollection(key, value);
  }, [key, value]);

  return [value, setValue];
}
