import { exec } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import pc from 'picocolors'

import { logger, resolveApp } from '@nyx-cli/shared'

import { convertCodeToAddImport } from './ast'
import { gitCheck } from './gitCheck'
import { renderTemplates } from './renderTemplates'

// 创建目录
async function createFolder(rootDirectory: string, options: Record<string, any>) {
  console.log('options', options)
  // 检查目录是否存在
  if (fs.existsSync(rootDirectory)) {
    logger.error(pc.red('目录已存在'))
    return
  }

  // 创建目录
  fs.mkdirSync(rootDirectory, { recursive: true })
}

export async function createApp(projectName: string, options: Record<string, any>) {
  // 记录开始时间
  const startTime = new Date().getTime()
  logger.info(pc.bgCyan('开始创建项目'))

  // 获取到项目的根目录的绝对路径
  const rootDirectory = resolveApp(projectName)

  await createFolder(rootDirectory, options)

  // 初始化 Git 仓库
  if (gitCheck(rootDirectory)) exec('git init', { cwd: rootDirectory })

  // 渲染模板
  renderTemplates({ useVue: true }, rootDirectory)

  // 修改代码
  const TEMPLATE_PATH = ['core', 'src', 'templates', 'basic', 'src', 'main.jsx']
  const filePath = path.join(__dirname, '..', '..', ...TEMPLATE_PATH)
  const outputFile = path.join(rootDirectory, 'main.jsx')
  const code = fs.readFileSync(filePath, 'utf-8')
  const newCode = convertCodeToAddImport(code, 'Router', 'vue-router')
  fs.writeFileSync(outputFile, newCode)

  // 记录结束时间
  const endTime = new Date().getTime()

  const diffTime = (endTime - startTime) / 1000
  console.log('✅ ', pc.green(`Add packages in ${diffTime}s`))
}
