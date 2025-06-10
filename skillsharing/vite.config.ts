import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { viteStaticCopy } from 'vite-plugin-static-copy';
//import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';

// const manifestForPlugin: Partial<VitePWAOptions> = {
//     registerType: 'autoUpdate',
//     manifest: {
//         name: 'Skill Sharing',
//         short_name: 'Skill Sharing',
//         description: 'Education place',
//         icons: [
//             {
//                 src: '/shared/parrot.png',
//                 sizes: '192x192',
//                 type: 'image/png',
//                 purpose: 'maskable',
//             },
//         ],
//         theme_color: '#FFFFFF',
//         background_color: '#FFFFFF',
//         display: 'fullscreen',
//         scope: 'https://skill-sharing.ru/',
//         start_url: 'https://skill-sharing.ru/',
//         orientation: 'portrait',
//     },
//     workbox: {
//         cleanupOutdatedCaches: true,
//         globPatterns: ['**/*.{js,css,html,ico,png,svg,json,vue,txt,woff2}'],
//     },
// };

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        viteStaticCopy({
            targets: [
                {
                    src: './manifest.webmanifest',
                    dest: '',
                },
            ],
        }),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    react: ['react', 'react-dom'],
                },
            },
        },
    },
});
