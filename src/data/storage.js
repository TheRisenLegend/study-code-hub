/**
 * =====================================================================
 * STORAGE-SERVICE — die einzige Stelle, an der Daten gelesen/geschrieben
 * werden. Aktuell: localStorage. 
 *
 * >>> BACKEND SPÄTER ANBINDEN <<<
 * Wenn ihr irgendwann ein echtes Backend wollt (z. B. Supabase, Firebase
 * oder eine eigene REST-API), müsst ihr NUR diese Datei anfassen:
 *   1. loadCollection / saveCollection auf `async` umstellen und intern
 *      fetch()/SDK-Calls machen.
 *   2. In App.jsx den Hook useStoredState um einen Lade-useEffect
 *      erweitern (Kommentar dort markiert die Stelle).
 * Der Rest der App bleibt unverändert — sie kennt nur diese Funktionen.
 * =====================================================================
 */

const PREFIX = 'study-code-hub:';

/** Eindeutige ID (reicht völlig für eine Freundesgruppen-App). */
export function createId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Collection laden; beim allerersten Start werden Seed-Daten geschrieben. */
export function loadCollection(key, seed) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (raw !== null) return JSON.parse(raw);
  } catch (err) {
    console.error(`[storage] Konnte "${key}" nicht lesen:`, err);
  }
  saveCollection(key, seed);
  return seed;
}

/** Collection speichern. */
export function saveCollection(key, data) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(data));
  } catch (err) {
    console.error(`[storage] Konnte "${key}" nicht speichern:`, err);
  }
}

/* =====================================================================
 * SEED-DATEN — damit die App beim ersten Start direkt "lebt".
 * Kann alles gelöscht/überschrieben werden.
 * ===================================================================== */

const h = 3_600_000; // eine Stunde in ms
const now = Date.now();

export const SEED_EXAMS = [
  { id: 'ex-gbi', subject: 'GBI', date: '2026-06-25' },
  { id: 'ex-dia', subject: 'DIA', date: '2026-06-29' },
  { id: 'ex-ana', subject: 'Analysis', date: '2026-07-01' },
  { id: 'ex-bub', subject: 'BuB', date: '2026-07-07' },
  { id: 'ex-prog2', subject: 'Prog2', date: '2026-07-09' },
];

export const SEED_NOTES = [
  {
    id: 'n-1',
    title: 'Partielle Integration – Rezept',
    subject: 'Analysis',
    content:
      'Formel: ∫ u·v\u2032 dx = u·v − ∫ u\u2032·v dx\n\n' +
      'Wahl von u nach LIATE: Logarithmus → Inverse → Algebraisch → Trigonometrisch → Exponentiell.\n' +
      'Faustregel: u so wählen, dass es beim Ableiten einfacher wird.\n\n' +
      'Beispiel: ∫ x·e^x dx  | u = x, v\u2032 = e^x\n' +
      '= x·e^x − ∫ 1·e^x dx  | ∫ e^x dx = e^x\n' +
      '= e^x·(x − 1) + C',
    updatedAt: now - 5 * h,
  },
  {
    id: 'n-2',
    title: 'BPMN: Gateways im Überblick',
    subject: 'GBI',
    content:
      'XOR (×): exklusiv — genau EIN ausgehender Pfad, Bedingung entscheidet.\n' +
      'AND (+): parallel — ALLE Pfade gleichzeitig, Join wartet auf alle.\n' +
      'OR (○): inklusiv — ein ODER mehrere Pfade, Join wartet auf alle aktivierten.\n\n' +
      'Klausur-Klassiker: Jedes öffnende Gateway braucht ein passendes schließendes (gleicher Typ!).',
    updatedAt: now - 22 * h,
  },
  {
    id: 'n-3',
    title: 'Buchungssatz-Grundmuster',
    subject: 'BuB',
    content:
      'Immer: Soll an Haben.\n\n' +
      'Aktivkonto:  Mehrung im Soll, Minderung im Haben.\n' +
      'Passivkonto: Mehrung im Haben, Minderung im Soll.\n\n' +
      'Beispiel Wareneinkauf auf Ziel:\n' +
      'Wareneingang (Aufwand, Soll) an Verbindlichkeiten a. LL. (Passiv, Haben)',
    updatedAt: now - 49 * h,
  },
];

export const SEED_SNIPPETS = [
  {
    id: 's-1',
    title: 'Comparator mit Lambda & thenComparing',
    language: 'Java',
    subject: 'Prog2',
    description: 'Liste nach Alter sortieren, bei Gleichstand nach Name.',
    code:
      'List<Student> studis = new ArrayList<>(List.of(\n' +
      '    new Student("Lena", 23),\n' +
      '    new Student("Aziz", 21)));\n' +
      '\n' +
      '// Primär nach Alter, sekundär nach Name\n' +
      'studis.sort(Comparator.comparingInt(Student::getAlter)\n' +
      '                      .thenComparing(Student::getName));',
    updatedAt: now - 2 * h,
  },
  {
    id: 's-2',
    title: 'HashMap: merge & sauber iterieren',
    language: 'Java',
    subject: 'Prog2',
    description: 'merge() legt den Key bei Bedarf an und addiert sonst — spart das if.',
    code:
      'Map<String, Integer> punkte = new HashMap<>();\n' +
      'punkte.merge("GBI", 5, Integer::sum);\n' +
      'punkte.merge("GBI", 3, Integer::sum); // GBI -> 8\n' +
      '\n' +
      'for (Map.Entry<String, Integer> e : punkte.entrySet()) {\n' +
      '    System.out.println(e.getKey() + " -> " + e.getValue());\n' +
      '}',
    updatedAt: now - 26 * h,
  },
  {
    id: 's-3',
    title: 'equals & hashCode — Standard-Muster',
    language: 'Java',
    subject: 'Prog2',
    description: 'Der Klassiker fürs Live-Coding: beide IMMER zusammen überschreiben.',
    code:
      '@Override\n' +
      'public boolean equals(Object o) {\n' +
      '    if (this == o) return true;\n' +
      '    if (!(o instanceof Student)) return false;\n' +
      '    Student s = (Student) o;\n' +
      '    return alter == s.alter && Objects.equals(name, s.name);\n' +
      '}\n' +
      '\n' +
      '@Override\n' +
      'public int hashCode() {\n' +
      '    return Objects.hash(name, alter);\n' +
      '}',
    updatedAt: now - 70 * h,
  },
];
