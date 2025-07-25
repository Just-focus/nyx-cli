import js from '@eslint/js'
import importSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['**/dist/**']
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    name: 'main',
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
    },
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
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
)
