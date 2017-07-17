var AWS = require('aws-sdk');
var fs = require('fs');
var path = require('path');
var pkg = require('./package');
var credentials = new AWS.SharedIniFileCredentials({ profile: 'shopgun-js-sdk' });
var bucket = 'sgn-js-sdk';

AWS.config.credentials = credentials;

new AWS.S3().putObject({
    Bucket: bucket,
    Key: 'sgn-sdk-' + pkg.version + '.min.js',
    Body: fs.readFileSync(path.join(__dirname, 'dist', 'sgn-sdk.min.js')).toString(),
    ACL: 'public-read',
    ContentType: 'application/javascript'
}, function (err, data) {
    console.log('js', err, data);
});

new AWS.S3().putObject({
    Bucket: bucket,
    Key: 'sgn-sdk-' + pkg.version + '.min.css',
    Body: fs.readFileSync(path.join(__dirname, 'dist', 'sgn-sdk.min.css')).toString(),
    ACL: 'public-read',
    ContentType: 'text/css'
}, function (err, data) {
    console.log('css', err, data);
});
