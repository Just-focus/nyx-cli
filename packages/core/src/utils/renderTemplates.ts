import ejs from 'ejs'
import fs from 'node:fs'
import path from 'node:path'

// 渲染模板
export const renderTemplates = (options: Record<string, any>, rootDirectory: string) => {
  const TEMPLATE_PATH = ['core', 'src', 'templates', 'basic']
  const templateDir = path.join(__dirname, '..', '..', ...TEMPLATE_PATH)

  // 确保目标目录存在
  const ensureDirectoryExistence = (filePath: string) => {
    const dirname = path.dirname(filePath)
    if (fs.existsSync(dirname)) return true
    ensureDirectoryExistence(dirname)
    fs.mkdirSync(dirname)
  }

  // 递归遍历模板目录
  const walk = (dir: string, fileCallback: (file: string, fullPath: string) => void) => {
    const files = fs.readdirSync(dir)
    for (const file of files) {
      const fullPath = path.join(dir, file)
      const stat = fs.statSync(fullPath)
      if (stat.isDirectory()) {
        walk(fullPath, fileCallback)
      } else {
        fileCallback(file, fullPath)
      }
    }
  }

  walk(templateDir, (file, fullPath) => {
    if (path.extname(file) === '.ejs') {
      const content = fs.readFileSync(fullPath, 'utf-8')
      const rendered = ejs.render(content, options)

      // 计算相对路径
      const relativePath = path.relative(templateDir, fullPath)
      const outputFile = path.join(rootDirectory, relativePath.replace(/\.ejs$/, ''))

      // 确保目录存在
      ensureDirectoryExistence(outputFile)

      // 写入文件
      fs.writeFileSync(outputFile, rendered)
      console.log(`Generated: ${outputFile}`)
    }
  })
}
