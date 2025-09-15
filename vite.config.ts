import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

function ssrVirtualEntry() {
  return {
    name: 'ssr-virtual-entry',
    resolveId(id: string) {
      if (id === 'virtual:ssr-entry') {
        return 'virtual:ssr-entry';
      }
    },
    load(id: string) {
      if (id === 'virtual:ssr-entry') {
        return `export { render } from '/src/entry-server.tsx'`;
      }
    },
  };
}

export default defineConfig(({ command }) => ({
  plugins: [react(), ssrVirtualEntry()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist/client',
    ssr: command === 'build' ? 'src/ssr-entry.ts' : undefined,
  },
}));