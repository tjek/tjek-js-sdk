var AWS = require('aws-sdk');
var fs = require('fs');
var path = require('path');
var pkg = require('./package');
var credentials = new AWS.SharedIniFileCredentials({ profile: 'shopgun-js-sdk' });
var bucket = 'sgn-js-sdk';

AWS.config.credentials = credentials;

function putObject (options) {
    new AWS.S3().putObject({
        Bucket: bucket,
        Key: options.key,
        Body: fs.readFileSync(options.bodyPath).toString(),
        ACL: 'public-read',
        ContentType: options.contentType
    }, function (err, data) {
        if (err) {
            console.log('Could not upload ' + options.key);
        } else {
            console.log('Uploaded ' + options.key);
        }
    });
}

putObject({
    key: 'sgn-sdk-' + pkg.version + '.min.js',
    bodyPath: path.join(__dirname, 'dist', 'sgn-sdk.min.js'),
    contentType: 'application/javascript'
});

putObject({
    key: 'sgn-sdk-' + pkg.version + '.min.css',
    bodyPath: path.join(__dirname, 'dist', 'sgn-sdk.min.css'),
    contentType: 'text/css'
});

putObject({
    key: 'sgn-sdk-dev.js',
    bodyPath: path.join(__dirname, 'dist', 'sgn-sdk.js'),
    contentType: 'application/javascript'
});

putObject({
    key: 'sgn-sdk-dev.css',
    bodyPath: path.join(__dirname, 'dist', 'sgn-sdk.css'),
    contentType: 'text/css'
});
