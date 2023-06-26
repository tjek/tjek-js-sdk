// This implemenation llifted from https://stackoverflow.com/q/38779924

import root from 'app-root-path';
import fs from 'fs';
import {createFsFromVolume} from 'memfs';
import {Volume} from 'memfs/lib/volume';
import path from 'path';
import webpack, {Configuration, Stats} from 'webpack';

const memFs = createFsFromVolume(new Volume());

/*
 * Provide webpack with an instance of MemoryFS for
 * in-memory compilation. We're currently overriding
 * #stat and #readFile. Webpack will ask MemoryFS for the
 * entry file, which it will find successfully. However,
 * all dependencies are on the real filesystem, so any require
 * or import statements will fail. When that happens, our wrapper
 * functions will then check fs for the requested file.
 */
const stat: Volume['stat'] = memFs.stat.bind(memFs);
const readFile: Volume['readFile'] = memFs.readFile.bind(memFs);

// @ts-expect-error Whiny tiny mismatch in a private property
memFs.stat = (
    path: string,
    callback: (err: NodeJS.ErrnoException | null, stats: fs.Stats) => void
) =>
    stat(path, (err, res) =>
        err || !res
            ? fs.stat(path, callback)
            : callback(err || null, res as fs.Stats)
    );

// @ts-expect-error
memFs.readFile = (
    path: string,
    cb: (err: NodeJS.ErrnoException | null, data: Buffer) => void
) =>
    readFile(path, (err, res) =>
        err || !res ? fs.readFile(path, cb) : cb(err || null, res as Buffer)
    );

const filename = 'file.js';
export default async function compile(
    code: string,
    config: Configuration = {}
): Promise<string> {
    // Setup webpack
    //create a directory structure in MemoryFS that matches
    //the real filesystem
    const rootDir = root.toString();
    if (!memFs.existsSync(rootDir)) memFs.mkdirSync(rootDir, {recursive: true});

    const entry = path.join(rootDir, filename);
    //write code snippet to memoryfs
    memFs.writeFileSync(entry, code);
    //point webpack to memoryfs for the entry file
    const compiler = webpack({
        entry,
        ...config,
        output: {filename, ...config.output}
    });

    //direct webpack to use memoryfs
    compiler.inputFileSystem = compiler.outputFileSystem = memFs;

    const errors = (
        await new Promise<Stats>((y, n) =>
            compiler.run((e, r) => (e || !r ? n(e) : y(r)))
        )
    ).compilation.errors;

    //if there are errors, throw the first one
    if (errors?.length) throw errors[0];

    //retrieve the output of the compilation
    return String(
        memFs.readFileSync(path.join(rootDir, 'dist', filename), 'utf8')
    );
}
