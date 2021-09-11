var AWS = require('aws-sdk');
var fs = require('fs');
var path = require('path');
var pkg = require('./dist/tjek-sdk/package.json');
var credentials = new AWS.SharedIniFileCredentials({profile: 'tjek-js-sdk'});
var bucket = 'tjek-js-sdk';

AWS.config.credentials = credentials;

function putObject(options) {
    new AWS.S3().putObject(
        {
            Bucket: bucket,
            Key: options.key,
            Body: fs.readFileSync(options.bodyPath).toString(),
            ACL: 'public-read',
            ContentType: options.contentType
        },
        (err) => {
            if (err) {
                console.error(err);
                console.log('Could not upload ' + options.key);
            } else {
                console.log('Uploaded ' + options.key);
            }
        }
    );
}

putObject({
    key: 'tjek-sdk-' + pkg.version + '.min.js',
    bodyPath: path.join(__dirname, 'dist', 'tjek-sdk', 'tjek-sdk.min.js'),
    contentType: 'application/javascript'
});
putObject({
    key: 'tjek-sdk-' + pkg.version + '.min.js.map',
    bodyPath: path.join(__dirname, 'dist', 'tjek-sdk', 'tjek-sdk.min.js.map'),
    contentType: 'application/json'
});
putObject({
    key: 'tjek-sdk-' + pkg.version + '.min.css',
    bodyPath: path.join(__dirname, 'dist', 'tjek-sdk', 'tjek-sdk.min.css'),
    contentType: 'text/css'
});
