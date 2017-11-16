var coffee = require('coffeescript');

module.exports = {
    process: function (src, path) {
        if (path.endsWith('.coffee')) {
            var js = coffee.compile(src, { bare: true });

            return js;
        }

        return src;
    }
};
