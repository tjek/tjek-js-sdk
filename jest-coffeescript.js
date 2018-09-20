const coffee = require('coffeescript');

module.exports = {
    process: function (src, path) {
        if (path.endsWith('.coffee')) {
            return coffee.compile(src, { bare: true });
        }

        return src;
    }
};