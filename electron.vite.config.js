import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'electron-vite';
import vue from '@vitejs/plugin-vue';

const src = path =>
  fileURLToPath(new URL(`./src/renderer/src/${path}`, import.meta.url));

export const rendererAlias = {
  '@': src(''),
  '~': src(''),
  images: src('assets/images'),
  '~atoms': src('components/atoms'),
  '~components': src('components'),
  '~composables': src('composables'),
  '~data': src('data'),
  '~globals': src('components/globals'),
  '~helpers': src('helpers'),
  '~layouts': src('layouts'),
  '~molecules': src('components/molecules'),
  '~organisms': src('components/organisms'),
  '~styles': src('styles'),
  styles: src('styles'),
  '~views': src('views')
};

export default defineConfig({
  main: {},
  preload: {
    build: {
      // sandboxed preload scripts must be CommonJS
      rollupOptions: { output: { format: 'cjs', entryFileNames: '[name].js' } }
    }
  },
  renderer: {
    plugins: [vue()],
    resolve: {
      extensions: ['.mjs', '.js', '.json', '.vue'],
      alias: rendererAlias
    },
    css: {
      preprocessorOptions: {
        scss: { silenceDeprecations: ['import', 'global-builtin'] }
      }
    }
  }
});
