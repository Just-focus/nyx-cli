import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'], // 你的入口文件
  format: ['cjs'], // 如果需要同时支持两种格式
  dts: true, // 生成类型声明
  clean: true, // 清理 dist 目录
  bundle: true, // 打包所有依赖
  splitting: false,
  sourcemap: true,
  minify: false,
  // 特别注意 monorepo 依赖
  noExternal: ['@nyx-cli/core'] // 确保核心包被打包进来
})
