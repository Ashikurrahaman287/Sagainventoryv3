import { defineConfig } from 'vite'
import path from 'path'

// Dynamically load vite-plugin-node if available. This avoids hard failure during
// type checks / builds when the plugin isn't installed in the environment.
let nodePlugin = [] as any[]
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { VitePluginNode } = require('vite-plugin-node')
  nodePlugin = VitePluginNode({
    adapter: 'express',
    appPath: './start.ts',
    exportName: 'app',
  })
} catch (err) {
  // plugin not installed; proceed without it (useful for typecheck environments)
}

export default defineConfig({
  plugins: [
    ...nodePlugin,
  ],
  build: {
    target: 'node16',
    outDir: 'dist',
    minify: false,
    emptyOutDir: true,
    rollupOptions: {
      input: 'start.ts',
      output: {
        format: 'esm'
      }
    }
  },
  optimizeDeps: {
    exclude: ['@shared/schema']
  },
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../shared'),
      '@': path.resolve(__dirname, 'src')  // ✅ এইটা add করো
    }
  }
})
