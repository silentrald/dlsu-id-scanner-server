module.exports = {
  'env' : { 'es2021' : true, 'node' : true },
  'extends' : [ 'eslint:recommended', 'plugin:@typescript-eslint/recommended' ],
  'overrides' : [],
  'parser' : '@typescript-eslint/parser',
  'parserOptions' : { 'ecmaVersion' : 'latest', 'sourceType' : 'module' },
  'plugins' : [ '@typescript-eslint' ],
  'rules' : {
    'indent' : [ 'error', 2 ],
    'linebreak-style' : [ 'error', 'unix' ],
    'quotes' : [ 'error', 'single' ],
    'semi' : [ 'error', 'always' ],
    'no-unused-vars': 'off',
    'array-bracket-spacing': [ 'error', 'always' ],
    'object-curly-spacing': [ 'error', 'always' ],
    'comma-dangle': [ 'error', 'only-multiline' ],
    '@typescript-eslint/no-unused-vars': [ 'error', { 'argsIgnorePattern': '^_' } ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off'
  }
};
