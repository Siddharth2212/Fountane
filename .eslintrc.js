module.exports = {
  root: true,
  extends: '@react-native-community',
  env: {
    es6: true,
  },
  rules: {
    'no-dupe-else-if': 'error',
    'no-empty': 'error',
    'no-unreachable': 'error',
    'no-console': [
      'error',
      {
        allow: ['error'],
      },
    ],
    'no-template-curly-in-string': 'error',
    'no-cond-assign': 'error',
    'no-constant-condition': 'error',
  },
};
