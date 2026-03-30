import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fg from 'fast-glob'
import tailwindcss from '@tailwindcss/vite'

const viewEntries = fg.sync('*/*/index.html', {
  ignore: ['node_modules/**', 'dist/**', 'shared/**', 'projects/**', 'specs/**', '.github/**'],
})

const input: Record<string, string> = {
  main: resolve(import.meta.dirname, 'index.html'),
}
for (const entry of viewEntries) {
  input[entry.replace('/index.html', '')] = resolve(import.meta.dirname, entry)
}

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input,
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
            return 'vendor-react'
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      '@aton': resolve(import.meta.dirname, 'projects/aton'),
      '@dana': resolve(import.meta.dirname, 'projects/dana'),
      '@shared': resolve(import.meta.dirname, 'shared'),
    },
  },
})
