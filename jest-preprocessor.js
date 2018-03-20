var coffee = require('coffeescript');
var babel = require("@babel/core");

module.exports = {
    process: function (src, path) {
        if (path.endsWith('.coffee')) {
            var es6 = coffee.compile(src, { bare: true });
            const babelresult = babel.transformSync(es6);
            const js = babelresult.code;
            return js;
        }

        return src;
    }
};
