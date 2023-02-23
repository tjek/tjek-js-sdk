import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import CleanCSS from 'clean-css';
import {EOL} from 'os';
import path from 'path';
import copy from 'rollup-plugin-copy';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import {terser} from 'rollup-plugin-terser';
import {createFilter} from 'rollup-pluginutils';
import stylus from 'stylus';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const libDir = path.join(__dirname, 'lib');
const distDir = path.join(__dirname, 'dist');

const version = '0.0.0-unreleased.0';
const bundles = [
    {
        name: 'SGN',
        fileName: 'sgn-sdk',
        pkg: {baseContents: {version, name: 'shopgun-sdk'}},
        input: path.join(libDir, 'sgn-sdk.ts'),
        output: path.join(distDir, 'shopgun-sdk')
    },
    {
        name: 'Incito',
        fileName: 'incito',
        pkg: {baseContents: {version, name: 'incito-browser'}},
        input: path.join(libDir, 'incito-browser', 'incito.ts'),
        output: path.join(distDir, 'incito-browser')
    },
    {
        name: 'Verso',
        fileName: 'verso',
        pkg: {baseContents: {version, name: 'verso-browser'}},
        input: path.join(libDir, 'verso-browser', 'verso.ts'),
        output: path.join(distDir, 'verso-browser')
    },
    {
        name: 'Tjek',
        pkg: {baseContents: {version, name: '@tjek/sdk', sideEffects: false}},
        input: path.join(libDir, 'tjek-sdk.ts'),
        output: path.join(distDir, 'tjek-sdk')
    },
    {
        input: path.join(libDir, 'kits', 'events', 'index.ts'),
        output: path.join(distDir, 'tjek-sdk', 'events')
    },
    {
        input: path.join(libDir, 'kits', 'events', 'tracker.ts'),
        output: path.join(distDir, 'tjek-sdk', 'events', 'tracker')
    },
    {
        input: path.join(libDir, 'incito-browser', 'incito.ts'),
        output: path.join(distDir, 'tjek-sdk', 'incito-publication', 'incito')
    },
    {
        input: path.join(
            libDir,
            'kits',
            'paged-publication',
            'bootstrapper.ts'
        ),
        output: path.join(
            distDir,
            'tjek-sdk',
            'paged-publication',
            'bootstrapper'
        )
    }
].filter((_, i) => (process.env.CI ? i === 0 : true));

const getBabelPlugin = () =>
    babel({
        exclude: ['node_modules/**'],
        extensions: ['.js', '.ts'],
        babelHelpers: 'runtime'
    });

const external = [
    /@babel\/runtime/,
    /core-js/,
    'cross-fetch',
    'md5',
    'mustache',
    'preact'
];

let configs = bundles
    .map(({fileName = 'index', ...bundle}) => ({
        ...bundle,
        fileName,
        outputs: {
            // Exclusive bundles(external `require`s untouched), for node, webpack etc.
            jsCJS: `${bundle.output}/${fileName}.cjs.js`, // CommonJS
            jsES: `${bundle.output}/${fileName}.es.js`, // ES Module
            // Inclusive bundles(external `require`s resolved), for browsers etc.
            jsBrowser: `${bundle.output}/${fileName}.js`,
            jsBrowserMin: `${bundle.output}/${fileName}.min.js`
        }
    }))
    .reduce(
        (cfgs, {name, fileName = 'index', input, output, outputs, pkg}) => [
            ...cfgs,
            {
                input,
                output: [
                    {file: outputs.jsCJS, format: 'cjs', exports: 'auto'},
                    {file: outputs.jsES, format: 'es', exports: 'auto'}
                ],
                external,
                plugins: [
                    stylusPlugin(),
                    replace({
                        'process.env.NODE_ENV': JSON.stringify(
                            process.env.NODE_ENV
                        ),
                        preventAssignment: true
                    }),
                    typescript(),
                    commonjs({extensions: ['.ts', '.js']}),
                    getBabelPlugin(),
                    generatePackageJson({
                        outputFolder: output,
                        ...pkg,
                        baseContents: {
                            main: fileName + '.cjs.js',
                            module: fileName + '.es.js',
                            'jsnext:main': fileName + '.es.js',
                            ...(pkg && pkg.baseContents)
                        }
                    }),
                    copy({targets: [{src: 'README.md', dest: output}]})
                ]
            },
            name && {
                input,
                output: {
                    file: outputs.jsBrowser,
                    format: 'umd',
                    name,
                    amd: {define: 'rollupNeedsAnOptionToDisableAMDInUMD'}
                },
                plugins: [
                    stylusPlugin({
                        raw: true,
                        minified: process.env.NODE_ENV === 'production',
                        compiler: {
                            'include css': true,
                            sourcemap: {
                                inline: process.env.NODE_ENV === 'development',
                                comment: process.env.NODE_ENV !== 'production'
                            }
                        }
                    }),
                    replace({
                        'process.env.NODE_ENV': JSON.stringify(
                            process.env.NODE_ENV
                        ),
                        preventAssignment: true
                    }),
                    resolve({
                        mainFields: ['jsnext:main', 'main'],
                        browser: true,
                        preferBuiltins: true
                    }),
                    commonjs({extensions: ['.js', '.ts']}),
                    typescript(),
                    getBabelPlugin()
                ]
            },
            name && {
                input,
                output: {
                    file: outputs.jsBrowserMin,
                    format: 'umd',
                    name,
                    amd: {define: 'rollupNeedsAnOptionToDisableAMDInUMD'}
                },
                plugins: [
                    stylusPlugin(),
                    replace({
                        'process.env.NODE_ENV': JSON.stringify(
                            process.env.NODE_ENV
                        ),
                        preventAssignment: true
                    }),
                    resolve({
                        mainFields: ['jsnext:main', 'main'],
                        browser: true,
                        preferBuiltins: true
                    }),
                    commonjs({
                        extensions: ['.ts', '.js']
                    }),
                    typescript(),
                    getBabelPlugin(),
                    terser()
                ]
            }
        ],
        []
    )
    .filter(Boolean);

// Only output unminified browser packages in development mode
if (process.env.NODE_ENV === 'development') {
    configs = bundles
        .filter((bundle) => bundle.pkg)
        .map((bundle) =>
            configs.find(
                (config) =>
                    bundle.input === config.input &&
                    config.output.format === 'umd'
            )
        );
    // Only output bundles that get tested in CI
} else if (process.env.CI) {
    configs = configs.filter(
        (config) =>
            bundles.find((bundle) => bundle.input === config.input)?.name
    );
}

export default configs;

function stylusPlugin({
    include = ['**/*.styl', '**/*.stylus', '**/*.css'],
    exclude,
    compiler,
    raw,
    minified,
    cleanCSSOptions,
    filter = createFilter(include, exclude)
} = {}) {
    return {
        name: 'rollup-plugin-stylus-compiler',
        resolveId: (id) =>
            filter(id) ? {id, moduleSideEffects: 'no-treeshake'} : null,
        load: (id) => (filter(id) ? id : null),
        transform: (id) =>
            filter(id) ? {code: '', moduleSideEffects: 'no-treeshake'} : null,
        async generateBundle(_, bundle) {
            for (const file of Object.values(bundle)) {
                if (!file.modules) continue;
                const fileName = file.fileName.slice(
                    0,
                    -path.extname(file.fileName).length
                );
                const stylusCode = Object.keys(file.modules).reduce(
                    (code, id) =>
                        filter(id)
                            ? code
                                ? `${code}${EOL}@require '${id}'`
                                : `@require '${id}'`
                            : code,
                    ''
                );
                if (!stylusCode) return;
                const cssCode = await new Promise((y, n) =>
                    stylus(
                        `@require 'node_modules/nib/index.styl'${EOL}${stylusCode}`,
                        compiler
                    )
                        .set('paths', [process.cwd()])
                        .render((e, c) => (e ? n(e) : y(c)))
                );

                if (raw)
                    await this.emitFile({
                        type: 'asset',
                        fileName: fileName + '.css',
                        source: cssCode
                    });

                if (minified) {
                    const {styles} = await new CleanCSS({
                        ...cleanCSSOptions,
                        returnPromise: true
                    }).minify(cssCode);
                    await this.emitFile({
                        type: 'asset',
                        fileName: fileName + '.min.css',
                        source: styles
                    });
                }
            }
        }
    };
}
