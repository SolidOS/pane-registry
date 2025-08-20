import { defineConfig } from 'eslint/config'
import globals from 'globals'
import neostandard from 'neostandard'

import globals from 'globals'
import neostandard from 'neostandard'


export default [
  ...neostandard(),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },

    rules: {
      'no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }]
    }
  }
])
