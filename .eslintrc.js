module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ['airbnb', 'react-app', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react', 'prettier'],
  rules: {
    'react/state-in-constructor': 0,
    'prettier/prettier': ['error', { singleQuote: true, parser: 'flow' }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false
      }
    ],
    'react/jsx-props-no-spreading': 0,
    'react/state-in-constructor': 0,
    'no-plusplus': [0, { allowForLoopAfterthoughts: true }],
    'no-param-reassign': [2, { props: false }]
  }
};
