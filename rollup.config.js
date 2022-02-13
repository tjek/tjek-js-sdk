import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import CleanCSS from 'clean-css';
import {EOL} from 'os';
import path from 'path';
import copy from 'rollup-plugin-copy';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import {terser} from 'rollup-plugin-terser';
import {createFilter} from 'rollup-pluginutils';
import stylus from 'stylus';

const libDir = path.join(__dirname, 'lib');
const distDir = path.join(__dirname, 'dist');

const version = '0.0.0-unreleased.0';
const bundles = [
    {
        name: 'SGN',
        fileName: 'sgn-sdk',
        pkg: {baseContents: {version, name: 'shopgun-sdk'}},
        input: path.join(libDir, 'sgn-sdk.js'),
        output: path.join(distDir, 'shopgun-sdk')
    },
    {
        name: 'Incito',
        fileName: 'incito',
        pkg: {baseContents: {version, name: 'incito-browser'}},
        input: path.join(libDir, 'incito-browser', 'incito.js'),
        output: path.join(distDir, 'incito-browser')
    },
    {
        name: 'Verso',
        fileName: 'verso',
        pkg: {baseContents: {version, name: 'verso-browser'}},
        input: path.join(libDir, 'verso-browser', 'verso.js'),
        output: path.join(distDir, 'verso-browser')
    },
    {
        name: 'Tjek',
        pkg: {baseContents: {version, name: '@tjek/sdk'}},
        input: path.join(libDir, 'tjek-sdk.js'),
        output: path.join(distDir, 'tjek-sdk')
    },
    {
        input: path.join(libDir, 'kits', 'events', 'index.js'),
        output: path.join(distDir, 'tjek-sdk', 'events')
    },
    {
        input: path.join(libDir, 'kits', 'events', 'tracker.js'),
        output: path.join(distDir, 'tjek-sdk', 'events', 'tracker')
    }
];

const getBabelPlugin = () =>
    babel({exclude: ['node_modules/**'], babelHelpers: 'runtime'});

const external = [
    /@babel\/runtime/,
    /core-js/,
    'cross-fetch',
    'md5',
    'microevent',
    'mustache'
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
                    commonjs({extensions: ['.js']}),
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
                    commonjs({extensions: ['.js']}),
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
                        extensions: ['.js']
                    }),
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
                const fileName = file.fileName.slice(
                    0,
                    -path.extname(file.fileName).length
                );
                const stylusCode = Object.keys(file.modules)
                    .filter((id) => filter(id))
                    .map((id) => `@require '${id}'`)
                    .join(EOL);
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
