import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { rendererAlias } from './electron.vite.config.js';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    extensions: ['.mjs', '.js', '.json', '.vue'],
    alias: rendererAlias
  }
});
