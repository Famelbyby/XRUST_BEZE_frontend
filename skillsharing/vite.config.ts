import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: 'prompt',
  manifest: {
    name: 'Skill Sharing',
    short_name: 'Skill Sharing',
    description: 'Education place',
    icons: [
      {
        src: '/shared/parrot2.jpg',
        type: 'image/jpg',
      },
    ],
    theme_color: '#000000',
    background_color: '#FFFFFF',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    orientation: 'portrait',
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
})
