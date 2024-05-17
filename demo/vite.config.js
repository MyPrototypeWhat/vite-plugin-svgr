/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import vitePluginSvgr from '../index'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [vitePluginSvgr()],
    build: {
      lib: {
        entry: './index.jsx',
        name: 'test',
        fileName: 'test',
      },
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: ['react', 'react-dom'],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
        },
      },
    },
  }
})
