/** @type {import('tailwindcss').Config} */
export default {
  // Dark Mode über die .dark-Klasse auf <html> (siehe index.html).
  // Die App ist bewusst dark-only — so bleibt der Look konsistent.
  darkMode: 'class',

  content: ['./index.html', './src/**/*.{js,jsx}'],

  theme: {
    extend: {
      /* ---------------------------------------------------------------
       * FARBSYSTEM
       * Die drei Neon-Akzente sind semantisch belegt:
       *   cyan   → Code & Snippets, primäre Aktionen
       *   violet → Notizen & Theorie
       *   green  → Klausuren, Termine, Erfolg
       * So erkennt man am Farbton sofort den Inhaltstyp.
       * ------------------------------------------------------------- */
      colors: {
        void: '#07070d',        // Seitenhintergrund (blauschwarzes Fast-Schwarz)
        panel: '#0d0e18',       // dunkle Panels (z. B. Code-Blöcke)
        line: 'rgba(255,255,255,0.08)', // Hairline-Borders
        neon: {
          cyan: '#2dd9f5',
          violet: '#a78bfa',
          green: '#4ade80',
          pink: '#f472b6',      // sparsam: Warnungen / "Klausur sehr nah"
        },
        ink: {
          hi: '#eceef6',        // Haupttext
          mid: '#9aa1b5',       // Sekundärtext
          low: '#5d6275',       // gedämpfte Labels
        },
      },

      /* Drei Schriftrollen: Display (Headlines), Body, Mono (Code/Terminal) */
      fontFamily: {
        display: ['"Chakra Petch"', 'system-ui', 'sans-serif'],
        body: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },

      /* ---------------------------------------------------------------
       * GLOW-EFFEKTE
       * Zweischichtige Drop-Shadows: ein enger, kräftiger Schein plus
       * ein weiter, weicher Halo. Werden v. a. in Hover-Zuständen
       * von Cards und Buttons eingesetzt (shadow-glow-*).
       * ------------------------------------------------------------- */
      boxShadow: {
        'glow-cyan':
          '0 0 20px -2px rgba(45,217,245,0.40), 0 0 48px -8px rgba(45,217,245,0.22)',
        'glow-violet':
          '0 0 20px -2px rgba(167,139,250,0.40), 0 0 48px -8px rgba(167,139,250,0.22)',
        'glow-green':
          '0 0 20px -2px rgba(74,222,128,0.40), 0 0 48px -8px rgba(74,222,128,0.22)',
        'glow-pink':
          '0 0 20px -2px rgba(244,114,182,0.40), 0 0 48px -8px rgba(244,114,182,0.22)',
      },

      /* Blinkender Terminal-Cursor + ruhiges Pulsieren für Status-Dots */
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.45' },
        },
      },
      animation: {
        blink: 'blink 1.1s step-end infinite',
        'pulse-soft': 'pulse-soft 2.6s ease-in-out infinite',
      },
    },
  },

  plugins: [],
};
