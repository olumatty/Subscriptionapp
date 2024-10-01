import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),

    VitePWA({
      registerType:"autoUpdate",
      manifest:{
        name:'SubscriptionTracker',
        short_name:'sub_track',
        description: 'A description of your app',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons:[
          {
            src:"https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/github-copilot-icon.png",
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/github-copilot-icon.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ]
      }
    })
  ],
})
