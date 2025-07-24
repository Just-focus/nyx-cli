import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import globals from 'globals'
import importSort from 'eslint-plugin-simple-import-sort'

export default tseslint.config({
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  files: ['**/*.ts'],
  ignores: ['*.js', '**/dist/*'],
  rules: {
    'unicorn/no-array-reduce': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^\\w'], // 表示 node 内置模块
          ['^@\\w'], // 表示以 @ 开头的路径
          ['^@/'], // 表示以 @ 开头的自定义识别路径
          ['^\\u0000'],
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$']
        ]
      }
    ],
    'simple-import-sort/exports': 'error'
  },
  languageOptions: {
    parser: tseslint.parser,
    globals: {
      ...globals.node
    },
    parserOptions: {
      tsconfigRootDir: import.meta.dirname // __dirname for commonJs
    }
  },
  plugins: {
    'simple-import-sort': importSort
  }
})
