import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import "@/styles/variables.less";`,
        modifyVars: {
          'primary-color': '#D4AF37',
          'success-color': '#52c41a',
          'warning-color': '#faad14',
          'error-color': '#ff4d4f',
          'font-size-base': '14px',
          'border-radius-sm': '4px',
          'border-radius-md': '8px',
          'border-radius-lg': '16px'
        }
      }
    }
  }
})
