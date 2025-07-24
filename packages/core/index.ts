import { build } from './src/commands/build'
import { create } from './src/commands/create'
import { registerCommand } from './src/register'

// 注册核心命令
export const registerCoreCommands = () => {
  registerCommand(create)
  registerCommand(build)
}
