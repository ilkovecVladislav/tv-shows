import babel from '@rolldown/plugin-babel';
import stylex from '@stylexjs/unplugin';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    stylex.vite({
      useCSSLayers: true
    }),
    react(),
    babel({
      presets: [reactCompilerPreset()]
    })
  ]
});
