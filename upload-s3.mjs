import {
    CloudFrontClient,
    CreateInvalidationCommand
} from '@aws-sdk/client-cloudfront';
import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
import {readFile} from 'fs/promises';
import path from 'path';
import * as url from 'url';
import pkg from './dist/shopgun-sdk/package.json' assert {type: 'json'};
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const s3Client = new S3Client({region: 'eu-west-1'});
const cfClient = new CloudFrontClient({region: 'eu-west-1'});

const bucket = 'sgn-js-sdk';
const distribution = 'EKE7310HEBVSP';

const putObject = async ({key, body, bodyPath, contentType}) => {
    try {
        const result = await s3Client.send(
            new PutObjectCommand({
                Bucket: bucket,
                Key: key,
                Body: body || (await readFile(bodyPath, 'utf-8')),
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
    const publicationViewerHtml = (
        await readFile(
            path.join(__dirname, 'embed', 'publication-viewer.html'),
            'utf-8'
        )
    ).replace('x.x.x', version);

    await Promise.all([
        version === 'x.x.x' &&
            putObject({
                key: 'embed/publication-viewer.html',
                body: publicationViewerHtml,
                contentType: 'text/html; charset=utf-8'
            }),
        putObject({
            key: 'embed/publication-viewer-' + version + '.html',
            body: publicationViewerHtml,
            contentType: 'text/html; charset=utf-8'
        }),
        putObject({
            key: 'sgn-sdk-' + version + '.js',
            bodyPath: path.join(__dirname, 'dist', 'shopgun-sdk', 'sgn-sdk.js'),
            contentType: 'application/javascript'
        }),
        putObject({
            key: 'sgn-sdk-' + version + '.js.map',
            bodyPath: path.join(
                __dirname,
                'dist',
                'shopgun-sdk',
                'sgn-sdk.min.js.map'
            ),
            contentType: 'application/json'
        }),
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
            key: 'sgn-sdk-' + version + '.css',
            bodyPath: path.join(
                __dirname,
                'dist',
                'shopgun-sdk',
                'sgn-sdk.css'
            ),
            contentType: 'text/css'
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
        '/embed/publication-viewer.html',
        '/embed/publication-viewer-' + version + '.html',
        '/sgn-sdk-' + version + '.js',
        '/sgn-sdk-' + version + '.js.map',
        '/sgn-sdk-' + version + '.min.js',
        '/sgn-sdk-' + version + '.min.js.map',
        '/sgn-sdk-' + version + '.css',
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
)
    .flat()
    .filter((value, index, array) => array.indexOf(value) === index);

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
