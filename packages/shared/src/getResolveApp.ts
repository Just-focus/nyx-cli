import fs from 'node:fs'
import path from 'node:path'

// 当前应用程序的根目录路径
const appDirectory: string = fs.realpathSync(process.cwd())

// 解析相对路径并返回绝对路径
export function resolveApp(relativePath: string) {
  return path.resolve(appDirectory, relativePath)
}
