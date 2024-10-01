import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'


export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@/': `${path.resolve(__dirname, 'src')}/`
        }
    },
    server: {
        port: 8080
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler'
            }
        }
    },
    test: {
        globals: true,
        environment: "jsdom",
    },
})
