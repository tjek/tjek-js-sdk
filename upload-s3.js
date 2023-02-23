import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import pkg from './dist/shopgun-sdk/package.json' assert {type: 'json'};
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const bucket = 'sgn-js-sdk';
const distribution = 'EKE7310HEBVSP';

const putObject = async ({key, bodyPath, contentType}) => {
    try {
        const result = await new Promise((resolve, reject) =>
            new AWS.S3().putObject(
                {
                    Bucket: bucket,
                    Key: key,
                    Body: fs.readFileSync(bodyPath).toString(),
                    ACL: 'public-read',
                    ContentType: contentType
                },
                (error, result) => (error ? reject(error) : resolve(result))
            )
        );
        console.log('S3: Uploaded https://js-sdk.tjek.com/' + key);

        return result;
    } catch (uploadError) {
        console.error(uploadError);
        throw new Error('S3: Could not upload ' + key);
    }
};

const putVersion = async (version) => {
    await Promise.all([
        putObject({
            key: 'sgn-sdk-' + version + '.min.js',
            bodyPath: path.join(
                __dirname,
                'dist',
                'shopgun-sdk',
                'sgn-sdk.min.js'
            ),
            contentType: 'application/javascript'
        }),
        putObject({
            key: 'sgn-sdk-' + version + '.min.js.map',
            bodyPath: path.join(
                __dirname,
                'dist',
                'shopgun-sdk',
                'sgn-sdk.min.js.map'
            ),
            contentType: 'application/json'
        }),
        putObject({
            key: 'sgn-sdk-' + version + '.min.css',
            bodyPath: path.join(
                __dirname,
                'dist',
                'shopgun-sdk',
                'sgn-sdk.min.css'
            ),
            contentType: 'text/css'
        })
    ]);

    return [
        '/sgn-sdk-' + version + '.min.js',
        '/sgn-sdk-' + version + '.min.js.map',
        '/sgn-sdk-' + version + '.min.css'
    ];
};

const versionRE = /(\d+)\.(\d+)\.(\d+)/;

const Items = (
    await Promise.all([
        // Exact version
        putVersion(pkg.version),
        // Patch mask
        putVersion(
            pkg.version.replace(versionRE, (_, maj, min) => `${maj}.${min}.x`)
        ),
        // Minor mask
        putVersion(pkg.version.replace(versionRE, (_, maj) => `${maj}.x.x`)),
        // Major mask
        putVersion(pkg.version.replace(versionRE, 'x.x.x'))
    ])
).flat();

try {
    await new Promise((resolve, reject) =>
        new AWS.CloudFront().createInvalidation(
            {
                DistributionId: distribution,
                InvalidationBatch: {
                    CallerReference: String(Date.now()),
                    Paths: {Quantity: Items.length, Items}
                }
            },
            (error, result) => (error ? reject(error) : resolve(result))
        )
    );
    console.log(
        'CloudFront: Invalidation In Progress: ' +
            new Intl.ListFormat().format(Items)
    );
} catch (invalidationError) {
    console.error(invalidationError);
    console.log('CloudFront: Could not invalidate ' + JSON.stringify(Items));
}
