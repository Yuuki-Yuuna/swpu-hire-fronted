import { appTools, defineConfig } from '@modern-js/app-tools'

export default defineConfig({
  runtime: {
    router: true
  },
  plugins: [
    appTools({ bundler: 'rspack' }) // Set to 'webpack' to enable webpack
  ],
  tools: {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:9000',
          changeOrigin: true
        }
      }
    }
  }
})
