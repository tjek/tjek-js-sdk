var fs = require('fs');
var path = require('path');
var stylus = require('stylus');
var nib = require('nib');
var derequire = require('browserify-derequire');
var browserify = require('browserify');
var UglifyJS = require('uglify-js');
var UglifyCSS = require('uglifycss');
var pkg = require('./package');
var environment = process.env.ENVIRONMENT;
var isProduction = environment === 'production';
var browserifySettings = {
    entries: ['./lib/coffeescript/browser.coffee'],
    extensions: ['.coffee'],
    standalone: 'SGN',
    plugin: [derequire],
    debug: true
};
var paths = {
    js: path.join(__dirname, 'dist', 'sgn-sdk.js'),
    jsMin: path.join(__dirname, 'dist', 'sgn-sdk.min.js'),
    css: path.join(__dirname, 'dist', 'sgn-sdk.css'),
    cssMin: path.join(__dirname, 'dist', 'sgn-sdk.min.css')
};
var jsStream = fs.createWriteStream(paths.js);

jsStream.on('finish', function () {
    if (isProduction) {
        fs.writeFileSync(paths.jsMin, UglifyJS.minify(fs.readFileSync(paths.js).toString()).code);
    }
});

// Create JS file.
browserify(browserifySettings)
    .transform('coffeeify')
    .bundle()
    .pipe(jsStream);

// Create CSS file.
stylus(fs.readFileSync(path.join(__dirname, 'lib', 'stylus', 'sgn.styl'), 'utf8').toString())
    .set('include css', true)
    .include(path.join(__dirname, 'lib', 'stylus'))
    .include(nib.path)
    .render(function (err, css) {
        if (!err) {
            fs.writeFileSync(paths.css, css);

            if (isProduction) {
                fs.writeFileSync(paths.cssMin, UglifyCSS.processFiles([paths.css]));
            }
        } else {
            console.log(err);
        }
    });
