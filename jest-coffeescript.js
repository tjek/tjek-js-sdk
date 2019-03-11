const coffee = require('coffeescript');
const babelJest = require('babel-jest');

module.exports = {
  process: (src, path, config) => {
    if (!/node_modules/.test(path)) {
      // CoffeeScript files need to be compiled by CoffeeScript
      // before being processed by babel
      if (coffee.helpers.isCoffee(path)) {
        src = coffee.compile(src, { bare: true });
      }
      return babelJest.process(src, path, config);
    }
    return src;
  }
};
