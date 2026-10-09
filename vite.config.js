// vite.config.js
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

const SITES = {
    development: {
        title: 'GBSS GEARS - DEV',
        ogTitle: 'GBSS GEARS - Development',
        description:
            'GBSS GEARS - internal system for GBSS employees to record clock time, file leave and submit tickets. This is a development environment for authorized users only.',
        url: 'https://dev-gears.gbss.com.au/',
    },
    production: {
        title: 'GBSS GEARS',
        ogTitle: 'GBSS GEARS',
        description:
            'GBSS GEARS - internal system for GBSS employees to record clock time, file leave and submit tickets. For authorized users only.',
        url: 'https://gears.gbss.com.au/',
    },
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), 'VITE_')
    // Anything other than "development" is treated as production
    const site = env.VITE_APP_ENV === 'development' ? SITES.development : SITES.production

    return {
        plugins: [
            react(),
            tailwindcss(),
            {
                name: 'html-meta-by-env',
                transformIndexHtml: (html) =>
                    html
                        .replaceAll('{{TITLE}}', site.title)
                        .replaceAll('{{OG_TITLE}}', site.ogTitle)
                        .replaceAll('{{DESCRIPTION}}', site.description)
                        .replaceAll('{{URL}}', site.url),
            },
        ],
        resolve: {
            alias: {
                '@': '/src',
            },
        },
        esbuild: {
            drop: process.env.NODE_ENV === 'production' ? ['debugger'] : [],
        },
    }
})