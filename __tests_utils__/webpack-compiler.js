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
const statOrig = memFs.stat.bind(memFs);
const readFileOrig = memFs.readFile.bind(memFs);
memFs.stat = (_path, cb) => {
    statOrig(_path, (err, result) => {
        if (err) {
            return fs.stat(_path, cb);
        } else {
            return cb(err, result);
        }
    });
};
memFs.readFile = (path, cb) => {
    readFileOrig(path, (err, result) => {
        if (err) {
            return fs.readFile(path, cb);
        } else {
            return cb(err, result);
        }
    });
};

module.exports = async function compile(code, config = {}) {
    // Setup webpack
    //create a directory structure in MemoryFS that matches
    //the real filesystem
    const rootDir = root.toString();
    //write code snippet to memoryfs
    const outputName = `file.js`;
    const entry = path.join(rootDir, outputName);
    const rootExists = memFs.existsSync(rootDir);
    if (!rootExists) {
        memFs.mkdirpSync(rootDir);
    }
    memFs.writeFileSync(entry, code);
    //point webpack to memoryfs for the entry file
    const compiler = webpack({
        entry,
        ...config,
        output: {filename: outputName, ...config.output}
    });
    compiler.run = thenify(compiler.run);

    //direct webpack to use memoryfs for file input
    compiler.inputFileSystem = memFs;

    //direct webpack to output to memoryfs rather than to disk
    compiler.outputFileSystem = memFs;
    const stats = await compiler.run();
    //remove entry from memory. we're done with it
    memFs.unlinkSync(entry);
    const errors = stats.compilation.errors;
    if (errors?.length > 0) {
        //if there are errors, throw the first one
        throw errors[0];
    }
    //retrieve the output of the compilation
    const res = memFs
        .readFileSync(path.join(rootDir, 'dist', outputName))
        .toString();
    return res;
};
