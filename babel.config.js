module.exports = {
  preset: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3
      }
    ],
    [
      '@babel/preset-react'
    ],
  ],
  plugins: [
    'react-refresh-typescript'
  ]
};
