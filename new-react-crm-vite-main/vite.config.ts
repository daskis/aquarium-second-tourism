import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import svgx from "@svgx/vite-plugin-react"
export default defineConfig({
    plugins: [react(), svgx()],
    resolve: {
        alias: {
            "@": "/src"
        }
    }
})