import { defineConfig } from 'eslint/config'
import globals from 'globals'

export default defineConfig([{
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
}])
