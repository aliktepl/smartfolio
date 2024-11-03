import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
/* For shadcn/ui */
import path from "path"


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  /* For shadcn/ui */
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
