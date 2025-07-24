import { Command } from 'commander'
import { spawn } from 'node:child_process'

import { logger } from '@nyx-cli/shared'

export function serve(program: Command) {
  return program
    .createCommand('serve')
    .description('serve project')
    .action(() => {
      const command = 'npm'
      const arguments_ = ['run', 'dev']

      const child = spawn(command, arguments_, {
        stdio: 'inherit'
      })

      child.on('close', code => {
        logger.info(`child process exited with code ${code}`)
      })
    })
}
