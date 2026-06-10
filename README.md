# Study & Code Hub

Zentrales Dashboard für eine kleine Lerngruppe: Vorlesungsnotizen, Zusammenfassungen
und Code-Snippets (Java, Datenstrukturen, Algorithmen) teilen — plus Klausur-Countdown.

**Stack:** React 18 + Vite · Tailwind CSS · Framer Motion · LocalStorage (Backend-ready)

---

## Lokal starten

```bash
# 1. Abhängigkeiten installieren
npm install

# 2. Dev-Server starten (http://localhost:5173)
npm run dev

# 3. Produktions-Build erzeugen (Ordner: dist/)
npm run build
```

`npm run preview` serviert den fertigen Build lokal zum Gegentesten.

## Deploy auf GitHub Pages

1. In `vite.config.js` die `base` an deinen Repo-Namen anpassen
   (aktuell `/study-code-hub/` — heißt dein Repo anders, hier ändern).
2. Repo auf GitHub pushen.
3. Einmalig deployen:

```bash
npm run deploy
```

Das baut die App und pusht `dist/` auf den Branch `gh-pages`. Danach in den
Repo-Settings unter *Pages* den Branch `gh-pages` als Quelle wählen.

## Daten & späteres Backend

Alle Daten (Notizen, Snippets, Klausuren) liegen aktuell im **LocalStorage**
des Browsers — jeder im Freundeskreis hat also erstmal seinen eigenen Stand.

Die einzige Stelle, an der gespeichert und geladen wird, ist
**`src/data/storage.js`**. Dort sind `loadCollection()` und `saveCollection()`
bewusst als Austauschpunkt gebaut: Wer später ein echtes Backend
(Supabase, Firebase, eigene REST-API …) anbinden will, ersetzt nur diese
zwei Funktionen durch `fetch`-Calls — der Rest der App bleibt unangetastet,
weil alle Komponenten nur über den Hook `useStoredState` darauf zugreifen.

Beim allerersten Start werden Beispieldaten (Seeds) geladen: echte
Klausurtermine SS26 und ein paar Java-Snippets aus Prog2.

## Projektstruktur

```
src/
├── App.jsx                  # Routing (State-basiert), globaler Daten-State
├── main.jsx                 # Einstieg, MotionConfig (reduced motion)
├── index.css                # Tailwind-Layer, Grid-Hintergrund, Glass-Klassen
├── data/storage.js          # LocalStorage + Seeds → Backend-Andockstelle
├── hooks/useStoredState.js  # useState mit automatischer Persistenz
├── utils/dates.js           # Countdown, deutsche Datums-Formatierung
└── components/
    ├── layout/              # Sidebar (Desktop) + MobileNav (Bottom-Tabs)
    ├── ui/                  # GlassCard, NeonButton, Modal, Badge, EmptyState
    ├── dashboard/           # TerminalHero, StatCards, Countdown, Feed
    ├── notes/               # Notizen: Grid, Card, Editor-Modal
    └── snippets/            # Snippets: Grid, Code-Card mit Copy, Editor-Modal
```

## Warum kein React Router?

Die Navigation läuft über simplen State (`view`) statt URL-Routing. Das macht
das Hosting auf GitHub Pages trivial (keine 404-Probleme bei Reload auf
Unterseiten) und reicht für drei Views völlig aus. Wer später echte URLs
will, kann `HashRouter` nachrüsten, ohne die Views umzubauen.
