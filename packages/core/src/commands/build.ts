import { Command } from 'commander'

export const build = (program: Command) => {
  const buildCommand = program
    .createCommand('build')
    .description('build project')
    .action(() => {
      console.log('build project')
    })
  return buildCommand
}
