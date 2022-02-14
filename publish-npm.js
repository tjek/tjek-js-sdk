#!/usr/bin/env node
'use strict';

const glob = require('glob');
const {promises: fs, createReadStream} = require('fs');

const chalk = require('chalk');
const path = require('path');
const {prompt} = require('inquirer');
const {spawn} = require('child_process');
const {isBinaryFile} = require('isbinaryfile');
const jsdiff = require('diff');
const ora = require('ora');
const libnpm = require('libnpm');

const semver = require('semver');

const tmp = require('tmp-promise');
const tar = require('tar');
const zlib = require('zlib');
const recursive = require('recursive-readdir');

const {fromBuffer: fileType} = require('file-type');

if (!process.env.GOOD) {
    throw new Error('Please use `npm run publish` to publish to npm.');
}

class NotFoundError extends Error {}

// Use heuristics to detect if buffer is binary file.
const isBinary = async (buffer) =>
    (await isBinaryFile(buffer, buffer.length)) || !!(await fileType(buffer));

const run = (...args) =>
    new Promise((resolve, reject) => {
        let stdout = '',
            stderr = '';
        const cp = spawn(...args);
        cp.stdout.on('data', (chunk) => (stdout += chunk));
        cp.stderr.on('data', (chunk) => (stderr += chunk));
        cp.on('error', reject).on('close', (code) =>
            code === 0 ? resolve(stdout.trim()) : reject(stderr)
        );
    });
async function npmPack(pkg, cwd) {
    let pack;
    try {
        pack = path.join(cwd, await run('npm', ['pack', pkg], {cwd}));
    } catch (error) {
        if (error.startsWith('npm ERR! code E404')) {
            throw new NotFoundError(`${pkg} Not Found on NPM`);
        }
        throw error;
    }
    return pack;
}
async function extract(pkg) {
    const tmpDir = tmp.dirSync().name;
    const pack = await npmPack(pkg, tmpDir);
    const extractedDir = path.resolve(tmpDir, 'extracted');

    await fs.mkdir(extractedDir);
    return await new Promise((resolve, reject) =>
        createReadStream(pack)
            .pipe(zlib.createUnzip())
            .pipe(tar.extract({cwd: extractedDir, strip: 1}))
            .on('error', reject)
            .on('close', () => resolve(extractedDir))
    );
}

const DIFF_FILE_SIZE_LIMIT = 4000 || 4000000 || 4000 || 4000000;
async function getFiles(filesPath) {
    if (!filesPath) return {};
    const files = await recursive(filesPath);

    const results = await Promise.all(
        files.map(async (filePath) => [filePath, await fs.readFile(filePath)])
    );
    const obj = {};
    for (const [fullPath, buf] of results) {
        const relPath = path.relative(filesPath, fullPath);
        const isBin = await isBinary(buf);

        obj[relPath] = {
            relPath,
            fullPath,
            contents: isBin ? buf : buf.toString('utf-8'),
            isBinary: isBin
        };
    }

    return obj;
}

async function diff(oldPath, newPath) {
    const [oldFiles, newFiles] = await Promise.all([
        getFiles(oldPath),
        getFiles(newPath)
    ]);

    const keys = [
        ...new Set([...Object.keys(oldFiles), ...Object.keys(newFiles)].sort())
    ];

    return Object.fromEntries(
        await Promise.all(
            keys.map(async (key) => {
                await new Promise((y) => setTimeout(y, 1));
                const oldFile = oldFiles[key] || {};
                const newFile = newFiles[key] || {};
                if (oldFile.contents)
                    oldFile.contents = oldFile.contents.replaceAll(
                        / {2}"version": "(.+)",\n/gi,
                        ''
                    );
                if (newFile.contents)
                    newFile.contents = newFile.contents.replaceAll(
                        / {2}"version": "(.+)",\n/gi,
                        ''
                    );

                // Files are straight up equal.
                if (oldFile.contents === newFile.contents) return [key, null];

                // Start with assumption that there's no binary diff.
                let binDiff = false;

                // 1+ file is binary.
                if (oldFile.isBinary || newFile.isBinary) {
                    // Binary diff if 1 file is missing, not binary, or 2 files differe.
                    binDiff =
                        !oldFile ||
                        !oldFile.isBinary ||
                        !newFile ||
                        !newFile.isBinary ||
                        !oldFile.contents.equals(newFile.contents);

                    // If found binary files, but no diff, then legitimately no diff.
                    if (!binDiff) return [key, null];
                }

                if (
                    (oldFile.contents && oldFile.contents.length) >
                        DIFF_FILE_SIZE_LIMIT ||
                    (newFile.contents && newFile.contents.length) >
                        DIFF_FILE_SIZE_LIMIT
                ) {
                    binDiff = true;
                }

                return [
                    key,
                    jsdiff.createPatch(
                        key,
                        binDiff ? '' : oldFile.contents || '',
                        binDiff ? '' : newFile.contents || '',
                        (oldFiles['package.json'] || newFiles['package.json'])
                            .name,
                        (newFiles['package.json'] || oldFiles['package.json'])
                            .name
                    ) + (binDiff ? 'Binary files differ\n' : '')
                ];
            })
        )
    );
}

async function npmDiff(packageJsonPath, tag) {
    const pkg = {
        ...JSON.parse(await fs.readFile(packageJsonPath, 'utf-8')),
        version: undefined
    };
    let oldFiles = null;
    const nameTag = `${pkg.name}@${tag}`;
    const ind = ora(`Downloading ${nameTag} from NPM`).start();
    try {
        oldFiles = await extract(nameTag);
        ind.succeed(`Downloaded ${nameTag} from NPM`);
    } catch (error) {
        if (!(error instanceof NotFoundError)) {
            ind.fail(error.message);
            throw error;
        } else {
            ind.warn(`${chalk.blue(pkg.name)} has not yet been published`);
        }
    }
    const newFiles =
        //        oldFiles ||
        await extract(
            path.resolve(packageJsonPath.replace('package.json', ''))
        );

    ind.start(
        `Diffing local ${pkg.name} with ${
            oldFiles ? 'NPM' : 'nothing'
        } ${nameTag}`
    );
    const diffObj = await diff(oldFiles, newFiles);
    ind.succeed(
        `Diffed local ${pkg.name} with ${
            oldFiles ? 'NPM' : 'nothing'
        } ${nameTag}`
    );

    return diffObj;
}

const DIFF_HEADER_LINES = 4;
const colorDiff = (diff = '') =>
    diff
        .split('\n')
        .map((line, i) => {
            if (i < DIFF_HEADER_LINES) return chalk.bold(line);
            if (/^@/.test(line)) return chalk.cyan(line);
            if (/^-/.test(line)) return chalk.red(line);
            if (/^\+/.test(line)) return chalk.green(line);
            return line;
        })
        .join('\n');

// TODO: Add diff viewing to the publish wizard?
// eslint-disable-next-line no-unused-vars
const printDiffPackage = (diffObj) =>
    Object.values(diffObj)
        .filter(Boolean)
        .map(colorDiff)
        .forEach((coloredDiff) => {
            if (coloredDiff.length) process.stdout.write(coloredDiff + '\n');
        });

async function publish() {
    console.clear();
    const {tag} = await prompt([
        {
            type: 'list',
            name: 'tag',
            message: 'How would you like to publish today?',
            choices: [
                {name: '🧪 Publish prerelease (`beta`)', value: 'beta'},
                {name: '🚀 Release for real (`latest`)', value: 'latest'}
            ]
        }
    ]);
    const packageJsonPaths = glob.sync('./dist/*/package.json');

    const packageDiffs = {};
    for (const packageJsonPath of packageJsonPaths) {
        const pkg = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
        let npmPkg;
        try {
            npmPkg = await libnpm.manifest(`${pkg.name}@${tag}`);
        } catch {}
        const diffObj = await npmDiff(packageJsonPath, tag);
        printDiffPackage(diffObj);
        packageDiffs[packageJsonPath] = [
            npmPkg || {...pkg, version: undefined},
            diffObj,
            Object.values(diffObj).reduce(
                (memo, diff) => {
                    if (diff) {
                        memo.changeCount++;
                        const [
                            {
                                hunks: [hunk]
                            }
                        ] = jsdiff.parsePatch(diff);
                        if (hunk) {
                            memo.addCount = memo.addCount + hunk.newLines;
                            memo.removeCount = memo.removeCount + hunk.oldLines;
                        }
                    }
                    return memo;
                },
                {addCount: 0, removeCount: 0, changeCount: 0}
            )
        ];
    }
    if (
        !Object.values(packageDiffs).find(([, , {changeCount}]) => changeCount)
    ) {
        ora().info(`There are no changes to be published`);
        process.exit();
    }

    const answers = await prompt([
        {
            type: 'checkbox',
            name: 'packagesToPublish',
            message: 'Which would you like to publish today?',
            validate: (packagesToPublish) =>
                packagesToPublish.length ? true : 'Please pick at least one',
            choices: Object.entries(packageDiffs).map(
                ([
                    packageJsonPath,
                    [pkg, , {addCount, removeCount, changeCount}]
                ]) => {
                    let disabled = !changeCount;
                    let name = `${chalk.blue.bold(
                        pkg.name
                    )} (currently ${chalk.blue.bold(
                        pkg.version || 'unpublished'
                    )})`;
                    if (changeCount) {
                        name += ': ' + chalk.bold`${changeCount} changed files`;
                    } else {
                        disabled = 'No changes.';
                    }
                    if (addCount || removeCount) {
                        name += ` with ${chalk.bold`${addCount} additions`} and ${chalk.bold`${removeCount} deletions`}`;
                    }
                    return {name, value: packageJsonPath, disabled};
                }
            )
        }
    ]);
    if (!answers.packagesToPublish.length) {
        ora().info(`You've chosen not to publish anything`);
        process.exit();
    }
    const answers2 = await prompt(
        answers.packagesToPublish.map((packageJsonPath) => {
            const [pkg] = packageDiffs[packageJsonPath];
            const version = pkg.version || '0.0.0';
            const pre = tag === 'beta';
            return {
                type: 'list',
                name: packageJsonPath,
                message: `What is the scope of the changes to ${chalk.blue(
                    pkg.name
                )}? (currently ${chalk.bold(pkg.version || 'unpublished')})`,
                choices: [
                    pre && {
                        name: `Prerelease (beta): ${semver.inc(
                            version,
                            'prerelease',
                            'beta'
                        )}`,
                        value: String(semver.inc(version, 'prerelease', 'beta'))
                    },
                    {
                        name: `Patch (Bug fix): ${semver.inc(
                            version,
                            pre ? 'prepatch' : 'patch',
                            pre ? 'beta' : undefined
                        )}`,
                        value: String(
                            semver.inc(
                                version,
                                pre ? 'prepatch' : 'patch',
                                pre ? 'beta' : undefined
                            )
                        )
                    },
                    {
                        name: `Minor (Features add): ${semver.inc(
                            version,
                            pre ? 'preminor' : 'minor',
                            pre ? 'beta' : undefined
                        )}`,
                        value: String(
                            semver.inc(
                                version,
                                pre ? 'preminor' : 'minor',
                                pre ? 'beta' : undefined
                            )
                        )
                    },
                    {
                        name: `Major (Breaking changes): ${semver.inc(
                            version,
                            pre ? 'premajor' : 'major',
                            pre ? 'beta' : undefined
                        )}`,
                        value: String(
                            semver.inc(
                                version,
                                pre ? 'premajor' : 'major',
                                pre ? 'beta' : undefined
                            )
                        )
                    }
                ].filter(Boolean)
            };
        })
    );
    const targetVersions = Object.entries(answers2['']).map(
        ([packageJsonPath, {json: version}]) => [
            '.' + packageJsonPath + '.json',
            version
        ]
    );
    const cwd = process.cwd();
    for (const [packageJsonPath, version] of targetVersions) {
        process.chdir(packageJsonPath.replace('/package.json', ''));

        const [{name}] = packageDiffs[packageJsonPath];
        const nextVersion = await run('npm', ['version', version]);
        const pubInd = ora(`Publishing ${name}@${tag} ${nextVersion}`).start();
        await run('npm', ['publish', '--access', 'public', `--tag=${tag}`]);
        pubInd.succeed(`Published ${name}@${tag} ${nextVersion}`);

        process.chdir(cwd);
    }

    const {uploadS3} = await prompt([
        {
            type: 'confirm',
            name: 'uploadS3',
            message: 'Would you like to upload sgn-sdk to S3? (Requires auth)',
            default: false
        }
    ]);

    if (uploadS3) {
        const s3Ind = ora(`Uploading to S3`).start();
        console.log(await run('node', ['./upload-s3.js']));
        s3Ind.succeed(`Uploaded to S3`);
    }
}

publish().catch((e) => {
    console.error(e);
    console.log('oops');
    process.exit(1);
});
