import {build, context} from 'esbuild';
import {stylusLoader} from 'esbuild-stylus-loader';
import {writeFile} from 'fs/promises';
import nib from 'nib';
import path from 'path';
import * as url from 'url';
import packageJson from './package.json' assert {type: 'json'};

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const libDir = path.join(__dirname, 'lib');
const distDir = path.join(__dirname, 'dist');

const version = '0.0.0-unreleased.0';
const bundles = [
    {
        name: 'SGN',
        input: 'sgn-sdk.ts',
        output: path.join('shopgun-sdk', 'sgn-sdk'),
        pkg: {version, name: 'shopgun-sdk', sideEffects: false}
    },
    {
        name: 'Incito',
        input: path.join('incito-browser', 'incito.ts'),
        output: path.join('incito-browser', 'incito'),
        pkg: {version, name: 'incito-browser'}
    },
    {
        name: 'Verso',
        fileName: 'verso',
        input: path.join('verso-browser', 'verso.ts'),
        output: path.join('verso-browser', 'verso'),
        pkg: {version, name: 'verso-browser'}
    },
    {
        name: 'Tjek',
        input: 'tjek-sdk.ts',
        output: path.join('tjek-sdk', 'index'),
        pkg: {version, name: '@tjek/sdk', sideEffects: false}
    },
    {
        input: path.join('kits', 'events', 'tracker.ts'),
        output: path.join('tjek-sdk', 'events', 'tracker', 'index')
    },
    {
        input: path.join('incito-browser', 'incito.ts'),
        output: path.join('tjek-sdk', 'incito-publication', 'incito', 'index')
    },
    {
        input: path.join('kits', 'paged-publication', 'bootstrapper.ts'),
        output: path.join(
            'tjek-sdk',
            'paged-publication',
            'bootstrapper',
            'index'
        )
    }
];

const commonOptions = {
    bundle: true,
    sourcemap: true,
    target: [
        'chrome51',
        'firefox53',
        'safari11.1',
        'edge18',
        'ios11.1',
        'node12'
    ],
    loader: {'.styl': 'empty'},
    metafile: true
};
const stylus = stylusLoader({
    stylusOptions: {import: [nib.path + '/nib/index.styl']}
});

switch (process.argv[2]) {
    case 'watch': {
        const {input, output, name} = bundles[0];
        const ctx = await context({
            ...commonOptions,
            entryPoints: [path.join(libDir, input)],
            outfile: path.join(distDir, output + '.js'),
            platform: 'browser',
            globalName: name && `self[${JSON.stringify(name)}]`,
            plugins: [stylus],
            metafile: true,
            banner: {
                js: "new EventSource('/esbuild').addEventListener('change', () => location.reload());"
            }
        });

        await ctx.watch();

        const {host, port} = await ctx.serve({servedir: './', port: 3000});
        console.log(
            `Serving http://${host}:${port} - Watching ${input.replace(
                __dirname,
                ''
            )} and its imports`
        );
        break;
    }
    case 'build': {
        const buildResults = await Promise.all(
            bundles
                .map(({name, input, output}) => [
                    name &&
                        build({
                            ...commonOptions,
                            entryPoints: [path.join(libDir, input)],
                            outfile: path.join(distDir, output + '.js'),
                            platform: 'browser',
                            globalName: `self[${JSON.stringify(name)}]`,
                            plugins: [stylus]
                        }),
                    name &&
                        build({
                            ...commonOptions,
                            entryPoints: [path.join(libDir, input)],
                            minify: true,
                            outfile: path.join(distDir, output + '.min.js'),
                            platform: 'browser',
                            globalName: `self[${JSON.stringify(name)}]`,
                            plugins: [stylus]
                        }),
                    build({
                        ...commonOptions,
                        entryPoints: [path.join(libDir, input)],
                        packages: 'external',
                        outfile: path.join(distDir, output + '.cjs.js'),
                        format: 'cjs',
                        mainFields: ['main']
                    }),
                    build({
                        ...commonOptions,
                        entryPoints: [path.join(libDir, input)],
                        packages: 'external',
                        outfile: path.join(distDir, output + '.es.js'),
                        format: 'esm',
                        mainFields: ['module', 'main']
                    })
                ])
                .flat()
                .filter(Boolean)
        );

        const modulePackageJsons = {};

        for (const {warnings, errors, metafile} of buildResults) {
            if (warnings.length) {
                for (const warning of warnings) console.warn(warning);
            }
            if (errors.length) {
                for (const error of errors) console.error(error);
                break;
            }
            for (const [path, output] of Object.entries(metafile.outputs)) {
                if (!output.entryPoint) continue;
                const moduleDir = path.match(/dist\/(.+)\//)[1];

                const bundle = bundles.find(
                    (bundle) =>
                        bundle.input === output.entryPoint.replace('lib/', '')
                );
                if (!(moduleDir in modulePackageJsons)) {
                    modulePackageJsons[moduleDir] = {...bundle.pkg};
                }
                const moduleJson = modulePackageJsons[moduleDir];

                const fileName = path.match(/dist\/(.+)\/(.+)/)[2];
                if (fileName.endsWith('.cjs.js')) moduleJson.main = fileName;
                if (fileName.endsWith('.es.js')) {
                    moduleJson.module = fileName;
                    moduleJson['jsnext:main'] = fileName;
                }

                const externalsSet = new Set();
                for (const impor of output.imports) {
                    if (impor.external) externalsSet.add(impor.path);
                }

                for (const external of externalsSet) {
                    if (!moduleJson.dependencies) moduleJson.dependencies = {};
                    moduleJson.dependencies[external] =
                        packageJson.dependencies[external];
                }
            }
        }
        for (const [moduleDir, pkg] of Object.entries(modulePackageJsons)) {
            await writeFile(
                path.join(distDir, moduleDir, 'package.json'),
                JSON.stringify(pkg, null, 2)
            );
        }
        break;
    }
}
