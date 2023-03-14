module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: [
    'react'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off '
  },
  "no-restrited-imports": "off",
  "@typescript-eslint/no-restricted-imports": [
    "warn",
    {
      "name": "react-redux",
      "importNames": ["useSelector", "useDispatch"],
      "message": "Use typed hooks `useAppDispatch` and `useAppSelector` instead."
    }
  ],
}
