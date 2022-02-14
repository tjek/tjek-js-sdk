// This implemenation llifted from https://stackoverflow.com/q/38779924

const webpack = require('webpack');
const {createFsFromVolume, Volume} = require('memfs');
const thenify = require('thenify');
const path = require('path');
const memFs = createFsFromVolume(new Volume());
const fs = require('fs');
const root = require('app-root-path');
/*
 * Provide webpack with an instance of MemoryFS for
 * in-memory compilation. We're currently overriding
 * #stat and #readFile. Webpack will ask MemoryFS for the
 * entry file, which it will find successfully. However,
 * all dependencies are on the real filesystem, so any require
 * or import statements will fail. When that happens, our wrapper
 * functions will then check fs for the requested file.
 */
const stat = memFs.stat.bind(memFs);
const readFile = memFs.readFile.bind(memFs);
memFs.stat = (path, cb) =>
    stat(path, (err, res) => (err ? fs.stat(path, cb) : cb(err, res)));

memFs.readFile = (path, cb) =>
    readFile(path, (err, res) => (err ? fs.readFile(path, cb) : cb(err, res)));

const filename = 'file.js';
module.exports = async function compile(code, config = {}) {
    // Setup webpack
    //create a directory structure in MemoryFS that matches
    //the real filesystem
    const rootDir = root.toString();
    if (!memFs.existsSync(rootDir)) memFs.mkdirpSync(rootDir);

    const entry = path.join(rootDir, filename);
    //write code snippet to memoryfs
    memFs.writeFileSync(entry, code);
    //point webpack to memoryfs for the entry file
    const compiler = webpack({
        entry,
        ...config,
        output: {filename, ...config.output}
    });
    compiler.run = thenify(compiler.run);

    //direct webpack to use memoryfs
    compiler.inputFileSystem = compiler.outputFileSystem = memFs;

    const errors = (await compiler.run()).compilation.errors;
    //if there are errors, throw the first one
    if (errors?.length) throw errors[0];

    //retrieve the output of the compilation
    return memFs.readFileSync(path.join(rootDir, 'dist', filename), 'utf8');
};
