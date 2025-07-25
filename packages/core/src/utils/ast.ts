import { generate } from '@babel/generator'
import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import * as t from '@babel/types' // 修改为导入整个命名空间

// 转换代码为添加导入语句
export function convertCodeToAddImport(code: string, importName: string, source: string) {
  try {
    // 解析代码为AST
    const ast = parse(code, {
      sourceType: 'module',
      plugins: ['jsx'] // 如果需要支持JSX，添加这个插件
    })

    if (!ast) {
      throw new Error('Failed to parse code into AST')
    }

    // 转换AST
    traverse(ast, {
      // 注意：可能需要使用 .default
      ReturnStatement(path) {
        // 将字符串拼接改为模板字符串
        const binaryExpr = path.node.argument
        if (t.isBinaryExpression(binaryExpr) && binaryExpr.operator === '+') {
          path.node.argument = t.templateLiteral(
            [t.templateElement({ raw: 'Hello ' }, true), t.templateElement({ raw: '' }, false)],
            [binaryExpr.right]
          )
        }
      }
    })

    const importDeclaration = t.importDeclaration([t.importDefaultSpecifier(t.identifier(importName))], t.stringLiteral(source))

    ast.program.body.unshift(importDeclaration)

    // 生成代码
    const output = generate(ast, {}, code)
    return output.code
  } catch (error) {
    throw new Error(`Failed to transform code: ${error.message}`)
  }
}
