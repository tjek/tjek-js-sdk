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
var jsPath = path.join(__dirname, 'dist', 'sgn-sdk.js');
var jsProdPath = path.join(__dirname, 'dist', 'sgn-sdk-' + pkg.version + '.min.js');
var cssPath = path.join(__dirname, 'dist', 'sgn-sdk.css');
var cssProdPath = path.join(__dirname, 'dist', 'sgn-sdk-' + pkg.version + '.min.css');
var jsStream = fs.createWriteStream(jsPath);

jsStream.on('finish', function () {
    if (isProduction) {
        fs.writeFileSync(jsProdPath, UglifyJS.minify(fs.readFileSync(jsPath).toString()).code);
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
            fs.writeFileSync(cssPath, css);

            if (isProduction) {
                fs.writeFileSync(cssProdPath, UglifyCSS.processFiles([cssPath]));
            }
        } else {
            console.log(err);
        }
    });
