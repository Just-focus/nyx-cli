import { program } from 'commander'

import { registerCoreCommands } from '@nyx-cli/core'

export function runCLI() {
  registerCoreCommands()

  program.parse()
}
