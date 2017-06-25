var fs = require('fs');
var path = require('path');
var stylus = require('stylus');
var nib = require('nib');
var derequire = require('browserify-derequire');
var browserify = require('browserify');
var settings = {
    browser: {
        entries: ['./lib/coffeescript/browser.coffee'],
        extensions: ['.coffee'],
        standalone: 'SGN',
        plugin: [derequire],
        debug: true
    }
};

// Create JS file.
browserify(settings.browser)
    .transform('coffeeify')
    .bundle()
    .pipe(fs.createWriteStream(path.join(__dirname, 'dist', 'sgn.js')));

// Create CSS file.
fs.readFile(path.join(__dirname, 'lib', 'stylus', 'sgn.styl'), 'utf8', function (err, contents) {
    stylus(contents)
        .set('include css', true)
        .include(path.join(__dirname, 'lib', 'stylus'))
        .include(nib.path)
        .render(function (err, css) {
            if (!err) {
                fs.writeFileSync(path.join(__dirname, 'dist', 'sgn.css'), css);
            } else {
                console.log(err);
            }
        });
});
