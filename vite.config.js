import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl'
import fs from 'fs/promises';

const isCodeSandbox = 'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env

export default defineConfig(({ mode }) => {
    // Load env file from the client directory (where vite.config.js is)
    const env = loadEnv(mode, process.cwd(), '')
    
    return {
        define: {
            'import.meta.env.VITE_MODE': JSON.stringify(env.VITE_MODE)
        },
        plugins:
        [
            react(),
            glsl()
        ],
        root: 'src/',
        publicDir: "../public/",
        base: './',
        server:
        {
            host: true,
            open: !isCodeSandbox // Open if it's not a CodeSandbox
        },
        esbuild: {
            loader: 'jsx',
            include: /src\/.*\.jsx?$/,
            exclude: [],
        },
        build:
        {
            outDir: '../dist',
            emptyOutDir: true,
            sourcemap: true
        },
        optimizeDeps: {
            esbuildOptions: {
                plugins: [
                    {
                        name: 'load-js-files-as-jsx',
                        setup(build) {
                            build.onLoad(
                                { filter: /src\\.*\.js$/ },
                                async (args) => ({
                                    loader: 'jsx',
                                    contents: await fs.readFile(args.path, 'utf8'),
                                })
                            );
                        },
                    },
                ],
            },
        },
    }
})