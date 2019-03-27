module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['> 3%', 'IE 11'],
          node: 8
        },
        corejs: 2,
        useBuiltIns: 'usage',
        exclude: ['transform-typeof-symbol']
      }
    ]
  ]
};
