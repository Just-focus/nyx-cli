import type { Command } from 'commander'
import { program } from 'commander'

type Function_ = (p: Command) => Command

export function registerCommand(function_: Function_) {
  program.addCommand(function_(program))
}
