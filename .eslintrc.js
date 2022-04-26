module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  settings: {
    'import/resolver': {
      typescript: {}
    }
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'no-undef': 0,
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 1,
    'consistent-return': 0,
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function'
      }
    ],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'import/extensions': [
      2,
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ],
    'import/prefer-default-export': 0,
    'react/jsx-props-no-spreading': 0,
    'no-shadow': 0,
    'react/require-default-props': 0,
    'react/button-has-type': 0
  }
};
