import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isLibrary = mode === 'library';
  
  return {
    plugins: [react(), tailwindcss()],
    build: isLibrary ? {
      lib: {
        entry: path.resolve(process.cwd(), 'src/index.ts'),
        name: 'ReactFormBuilder',
        formats: ['es', 'cjs'],
        fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`
      },
      rollupOptions: {
        external: [
          'react',
          'react-dom',
          'react/jsx-runtime',
          '@heroui/react',
          '@dnd-kit/core',
          '@dnd-kit/sortable',
          '@dnd-kit/utilities',
          'framer-motion',
          'lucide-react',
          'uuid',
          '@types/uuid'
        ],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react/jsx-runtime': 'jsxRuntime'
          }
        }
      },
      sourcemap: true,
      emptyOutDir: true
    } : undefined
  }
})
