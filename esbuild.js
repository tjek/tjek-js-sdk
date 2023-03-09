import {analyzeMetafile, build, context} from 'esbuild';
import {stylusLoader} from 'esbuild-stylus-loader';
import nib from 'nib';
import path from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const libDir = path.join(__dirname, 'lib');
const distDir = path.join(__dirname, 'dist');

const bundles = [
    {
        name: 'SGN',
        input: 'sgn-sdk.ts',
        output: path.join('shopgun-sdk', 'sgn-sdk')
    },
    {
        name: 'Incito',
        input: path.join('incito-browser', 'incito.ts'),
        output: path.join('incito-browser', 'incito')
    },
    {
        name: 'Verso',
        fileName: 'verso',
        input: path.join('verso-browser', 'verso.ts'),
        output: path.join('verso-browser', 'index')
    },
    {
        name: 'Tjek',
        input: 'tjek-sdk.ts',
        output: path.join('tjek-sdk', 'index')
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
    plugins: [
        stylusLoader({stylusOptions: {import: [nib.path + '/nib/index.styl']}})
    ]
};

switch (process.argv[2]) {
    case 'watch': {
        const {input, output, name} = bundles[0];
        const ctx = await context({
            ...commonOptions,
            entryPoints: [path.join(libDir, input)],
            outfile: path.join(distDir, output + '.js'),
            platform: 'browser',
            globalName: `self[${JSON.stringify(name)}]`,
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
                    build({
                        ...commonOptions,
                        entryPoints: [path.join(libDir, input)],
                        outfile: path.join(distDir, output + '.js'),
                        platform: 'browser',
                        globalName: `self[${JSON.stringify(name)}]`,
                        metafile: true
                    }),
                    build({
                        ...commonOptions,
                        entryPoints: [path.join(libDir, input)],
                        minify: true,
                        outfile: path.join(distDir, output + '.min.js'),
                        platform: 'browser',
                        globalName: `self[${JSON.stringify(name)}]`
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
        );
        console.log(
            (
                await Promise.all(
                    buildResults.map(
                        async ({metafile}) =>
                            metafile &&
                            (await analyzeMetafile(metafile, {color: true}))
                    )
                )
            )
                .join('\n')
                .trim()
        );

        break;
    }
}
