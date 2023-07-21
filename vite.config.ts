import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import postcssToviewport from 'postcss-px-to-viewport';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  Components({
    resolvers: [VantResolver()],
  })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'c': path.resolve(__dirname, './src/components'),
      'v': path.resolve(__dirname, './src/view'),
      'u': path.resolve(__dirname, './src/utils'),
    },
  },
  css: {
    postcss: {
      plugins: [
        postcssToviewport({
          viewportWidth: 375,
          unitPrecision: 5,
          viewportUnit: 'vw',
          selectorBlackList: ['ignore', 'hairlines'],
          minPixelValue: 1,
          mediaQuery: false,
        }),
      ],
    },
  }
})
