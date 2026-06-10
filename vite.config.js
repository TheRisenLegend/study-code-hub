import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],

  // GitHub Pages serviert die App unter https://<user>.github.io/<repo-name>/
  // → base muss beim Build dem Repo-Namen entsprechen.
  // Lokal (npm run dev) bleibt es '/', damit alles normal unter localhost läuft.
  // WICHTIG: Wenn dein Repo anders heißt, hier anpassen!
  base: command === 'build' ? '/study-code-hub/' : '/',
}));
