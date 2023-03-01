import {
    CloudFrontClient,
    CreateInvalidationCommand
} from '@aws-sdk/client-cloudfront';
import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';
import * as url from 'url';
import pkg from './dist/shopgun-sdk/package.json' assert {type: 'json'};
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const s3Client = new S3Client();
const cfClient = new CloudFrontClient();

const bucket = 'sgn-js-sdk';
const distribution = 'EKE7310HEBVSP';

const putObject = async ({key, bodyPath, contentType}) => {
    try {
        const result = await s3Client.send(
            new PutObjectCommand({
                Bucket: bucket,
                Key: key,
                Body: fs.readFileSync(bodyPath).toString(),
                ACL: 'public-read',
                ContentType: contentType
            })
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
    console.log(
        'CloudFront: Submitting for invalidation: ' +
            new Intl.ListFormat().format(Items)
    );
    await cfClient.send(
        new CreateInvalidationCommand({
            DistributionId: distribution,
            InvalidationBatch: {
                CallerReference: String(Date.now()),
                Paths: {Quantity: Items.length, Items}
            }
        })
    );
    console.log(
        'CloudFront: Invalidation In Progress: ' +
            new Intl.ListFormat().format(Items)
    );
} catch (invalidationError) {
    console.error(invalidationError);
    console.log(
        'CloudFront: Could not invalidate ' +
            new Intl.ListFormat().format(Items)
    );
}
