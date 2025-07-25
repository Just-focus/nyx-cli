import { Command } from 'commander'

import { createApp } from '../utils/createApp'

export const create = (program: Command) => {
  return program
    .createCommand('create')
    .description('Create a directory for your project files')
    .argument('<project-name>', 'project name')
    .option('-t, --template <template>', 'template name')
    .action((projectName: string, options: Record<string, any>) => {
      createApp(projectName, options)
    })
}
