import { execSync } from 'node:child_process'

// 检查系统全局是否安装了 Git
const hasGit = (): boolean => {
  try {
    execSync('git --version')
    return true // Git已安装
  } catch {
    return false // Git未安装
  }
}

// 检查项目是否已经有 Git 环境
const hasProjectGit = (cwd: string): boolean => {
  try {
    execSync('git status', { stdio: 'ignore', cwd })
    return true // 项目目录下有 Git 仓库
  } catch {
    return false // 项目目录下没有 Git 仓库
  }
}

// 检查项目的根目录是否存在 Git 环境
export function gitCheck(rootDirectory: string) {
  if (!hasGit()) return false
  return !hasProjectGit(rootDirectory)
}
