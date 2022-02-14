const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const pkg = require('./dist/shopgun-sdk/package.json');
const credentials = new AWS.SharedIniFileCredentials({profile: 'shopgun-js-sdk'});
const bucket = 'sgn-js-sdk';

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

function putVersion(version) {
    putObject({
        key: 'sgn-sdk-' + version + '.min.js',
        bodyPath: path.join(__dirname, 'dist', 'shopgun-sdk', 'sgn-sdk.min.js'),
        contentType: 'application/javascript'
    });
    putObject({
        key: 'sgn-sdk-' + version + '.min.js.map',
        bodyPath: path.join(
            __dirname,
            'dist',
            'shopgun-sdk',
            'sgn-sdk.min.js.map'
        ),
        contentType: 'application/json'
    });
    putObject({
        key: 'sgn-sdk-' + version + '.min.css',
        bodyPath: path.join(
            __dirname,
            'dist',
            'shopgun-sdk',
            'sgn-sdk.min.css'
        ),
        contentType: 'text/css'
    });
}

const versionRE = /(\d)\.(\d)\.(\d)/;

// Exact version
putVersion(pkg.version);
// Patch mask
putVersion(pkg.version.replace(versionRE, (_, maj, min) => `${maj}.${min}.x`));
// Minor mask
putVersion(pkg.version.replace(versionRE, (_, maj) => `${maj}.x.x`));
// Major mask (Regex replacement still used here to support -beta type suffixes)
putVersion(pkg.version.replace(versionRE, 'x.x.x'));
