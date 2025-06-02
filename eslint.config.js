import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import reactImport from 'eslint-plugin-import'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      'plugin:react/recommended',
      'plugin:import/recommended',
      'plugin:import/typescript'
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      'react': react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'import': reactImport
    },
    rules: {
      ...reactHooksPreparation.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],
      'react/prop-types': 'off', // Tắt prop-types vì dùng TypeScript
      'import/order': [
        'error',
        {
          'groups': [
            'builtin', // Node.js built-in modules (e.g., fs, path)
            'external', // External libraries (e.g., react, axios)
            'internal', // Internal project modules
            ['parent', 'sibling'], // Parent or sibling modules
            'index' // Index files
          ],
          'pathGroups': [
            {
              'pattern': 'react',
              'group': 'external',
              'position': 'before'
            },
            {
              'pattern': '@/**', // Aliases like @/components, @/hooks
              'group': 'internal',
              'position': 'after'
            },
            {
              'pattern': './**.component', // Component files
              'group': 'internal',
              'position': 'after'
            },
            {
              'pattern': './**.hook', // Hook files
              'group': 'internal',
              'position': 'after'
            }
          ],
          'pathGroupsExcludedImportTypes': ['react'],
          'newlines-between': 'always', // Add newline between groups
          'alphabetize': {
            'order': 'asc', // Sort alphabetically within groups
            'caseInsensitive': true
          }
        }
      ]
    },
    settings: {
      'react': {
        'version': 'detect' // Tự động phát hiện phiên bản React
      },
      'import/resolver': {
        'typescript': {
          'alwaysTryTypes': true, // Hỗ trợ alias trong TypeScript
          'project': './tsconfig.json' // Đường dẫn đến file tsconfig.json
        }
      }
    }
  }
);