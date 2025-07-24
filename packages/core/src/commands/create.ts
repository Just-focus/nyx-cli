import { Command } from 'commander'
import pc from 'picocolors'
import prompt from 'prompts'

import { logger } from '@nyx-cli/shared'

export const create = (program: Command) => {
  return program
    .createCommand('create')
    .description('create project')
    .argument('<project-name>', 'project name')
    .option('-t, --template <template>', 'template name')
    .action(async (projectName, options) => {
      let { template } = options

      if (!template) {
        const templateRes = await prompt({
          type: 'select',
          name: 'template',
          message: '请选择模板',
          choices: [
            {
              title: 'vue3-ts',
              value: 'vue3-ts'
            }
          ]
        })
        template = templateRes.template
      }

      logger.info('create project', projectName, template)
      logger.info(pc.bgCyan('开始创建项目'))
    })
}
