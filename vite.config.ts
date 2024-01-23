import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import vike from 'vike/plugin'
import { UserConfig } from 'vite'

export default {
  resolve: {
    alias: {
      '_generated': resolve(__dirname, './generated'),
      '_shared': resolve(__dirname, './app/shared'),
    }
  },
  optimizeDeps: { include: ['cross-fetch', 'react/jsx-runtime'] },
  plugins: [react(), vike()],
} satisfies UserConfig