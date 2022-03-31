import { resolve } from 'path'

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(configEnv => {
  const envDir = resolve(__dirname, './env')

  const env = loadEnv(configEnv.mode, envDir, ['DEV_', 'VITE_'])

  const PORT = Number(env.DEV_PORT || 8888)

  return {
    envDir,
    define: {
      'process.env.NODE_ENV': `"${configEnv.mode}"`,
    },
    plugins: [
      tsconfigPaths(),
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
    ],
    resolve: {
      alias: {
        'react/jsx-runtime.js': '@emotion/react/jsx-runtime',
      },
    },
    build: {
      sourcemap: true,
    },
    server: {
      port: PORT,
      host: env.DEV_HOST || '0.0.0.0',
    },
  }
})
