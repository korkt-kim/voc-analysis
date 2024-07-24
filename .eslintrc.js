module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  globals: {
    process: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@next/next/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  plugins: ['@typescript-eslint', 'simple-import-sort', 'import'],
  parser: '@typescript-eslint/parser',
  rules: {
    curly: 2,
    eqeqeq: 2,
    'comma-dangle': 0,
    'prefer-const': 1,

    'no-undef': 0,
    'no-console': 1,
    'no-redeclare': 0,
    'no-unused-vars': 0,
    'no-use-before-define': 0,

    'nonblock-statement-body-position': 2,
    'simple-import-sort/imports': 2,
    'simple-import-sort/exports': 2,

    'import/no-unresolved': 0,
    'import/no-default-export': 2,

    'react/jsx-key': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,

    '@next/next/no-html-link-for-pages': 0,

    '@tanstack/query/exhaustive-deps': 1,

    '@typescript-eslint/no-unused-vars': [
      1,
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/no-redeclare': [2, { builtinGlobals: false }],
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/explicit-function-return-type': 0,

    'no-restricted-imports': [
      2,
      {
        patterns: [
          {
            group: ['lodash'],
            message: 'lodash-es 사용할 것',
          },
          {
            group: ['schema'],
            message: 'api/*/index 에 있는 export * as *Schema 사용할 것',
          },
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['src/pages{/**,}/*.{ts,tsx}'],
      rules: {
        'import/no-default-export': 0,
        'import/prefer-default-export': 2,
      },
    },
    {
      files: ['next.config.mjs'],
      rules: {
        'import/no-default-export': 0,
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
}
