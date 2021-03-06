module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
        modules: 'commonjs'
      }
    ],
    [
      '@babel/preset-react'
    ],
    [
      '@babel/preset-typescript'
    ]
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    'react-refresh/babel',
    'add-module-exports'
  ]
};
