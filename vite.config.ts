import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

const pwa = VitePWA({
  registerType: 'autoUpdate',
  manifest: {
    name: 'DDTape',
    short_name: 'DTTape',
    start_url: './',
    theme_color: '#490b0d',
    description: 'This is a demo for DDTape PWA app',
    scope: '/ddtape/',
    id: '/ddtape/',
    icons: [
      {
        src: './android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: './android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ],
    display_override: ['window-controls-overlay', 'fullscreen', 'minimal-ui'],
    display: 'standalone',
    protocol_handlers: [
      {
        protocol: 'web+tea',
        url: './tea?type=%s'
      },
      {
        protocol: 'web+coffee',
        url: './coffee?type=%s'
      }
    ],
    screenshots: [
      {
        src: './desktop.jpg',
        sizes: '640x320',
        type: 'image/jpg',
        form_factor: 'wide',
        label: 'DDTape Desktop'
      },
      {
        src: './mobile.png',
        sizes: '640x320',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'DDTape Mobile'
      }
    ]
  }
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), pwa],
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
