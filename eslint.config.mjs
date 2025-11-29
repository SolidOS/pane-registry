import globals from 'globals'
import neostandard from 'neostandard'

export default [
  ...neostandard(),
  {
    ignores: [
      'node_modules/**',
      'coverage/**'
    ],
  },
  {
    files: ['src/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
      }
    },
    rules: {
      // Code style - match TypeScript settings
      semi: ['error', 'never'],
      quotes: ['error', 'single'],

      // Strict checking - match TypeScript strictness
      'no-console': 'warn',
      'no-unused-vars': 'error', // Match TypeScript noUnusedLocals: true
      'no-undef': 'error',
      strict: ['error', 'global'], // Match TypeScript alwaysStrict: true

      // Additional strictness to match TypeScript behavior
      'no-implicit-globals': 'error',
      'prefer-const': 'error', // Encourage immutability
      'no-var': 'error', // Use let/const only
      'no-redeclare': 'error'
    }
  },
  {
    files: ['**/__tests__/**/*.js', '**/*.test.js', '**/*.spec.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
      }
    },
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      'no-console': 'off',
      'no-unused-vars': 'warn',
    }
  }
]
