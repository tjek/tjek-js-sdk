import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import CleanCSS from 'clean-css';
import {EOL} from 'os';
import path from 'path';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import {terser} from 'rollup-plugin-terser';
import {createFilter} from 'rollup-pluginutils';
import stylus from 'stylus';
import {version} from './package.json';

const stylusPlugin = ({
    include = ['**/*.styl', '**/*.stylus', '**/*.css'],
    exclude,
    compiler,
    raw,
    minified,
    cleanCSSOptions,
    filter = createFilter(include, exclude)
} = {}) => ({
    name: 'rollup-plugin-stylus-compiler',
    resolveId: (id) => (filter(id) ? id : null),
    load: (id) => (filter(id) ? id : null),
    transform: (id) => (filter(id) ? '' : null),
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
});

const libDir = path.join(__dirname, 'lib');
const distDir = path.join(__dirname, 'dist');

const bundles = [
    {
        name: 'SGN',
        fileName: 'sgn-sdk',
        pkg: {
            outputFolder: path.join(distDir, 'shopgun-sdk'),
            baseContents: {name: 'shopgun-sdk'}
        },
        input: path.join(libDir, 'sgn-sdk.js'),
        output: path.join(distDir, 'shopgun-sdk')
    },
    {
        name: 'TjekEventsKit',
        fileName: 'index',
        pkg: {outputFolder: path.join(distDir, 'kits', 'events')},
        input: path.join(libDir, 'kits', 'events', 'index.js'),
        output: path.join(distDir, 'kits', 'events')
    }
].map((bundle) => ({
    ...bundle,
    output: undefined,
    outputs: {
        // Exclusive bundles(external `require`s untouched), for node, webpack etc.
        jsCJS: `${bundle.output}/${bundle.fileName}.cjs.js`, // CommonJS
        jsES: `${bundle.output}/${bundle.fileName}.es.js`, // ES Module
        // Inclusive bundles(external `require`s resolved), for browsers etc.
        jsBrowser: `${bundle.output}/${bundle.fileName}.js`,
        jsBrowserMin: `${bundle.output}/${bundle.fileName}.min.js`
    }
}));

const getBabelPlugin = () =>
    babel({
        exclude: ['node_modules/**'],
        extensions: ['.js', '.jsx', '.es6', '.es', '.mjs'],
        babelHelpers: 'runtime'
    });

const external = [
    /@babel\/runtime/,
    /core-js/,
    'cross-fetch',
    'md5',
    'sha256',
    'microevent',
    'mustache',
    'incito-browser',
    'verso-browser'
];

let configs = bundles.reduce(
    (cfgs, {name, fileName = 'index', input, outputs, pkg}) => [
        ...cfgs,
        {
            input,
            output: {
                file: outputs.jsCJS,
                format: 'cjs',
                exports: 'auto'
            },
            external,
            plugins: [
                stylusPlugin(),
                replace({
                    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
                }),
                commonjs({
                    extensions: ['.js']
                }),
                getBabelPlugin(),
                pkg &&
                    generatePackageJson({
                        ...pkg,
                        baseContents: {
                            version,
                            main: fileName + '.cjs.js',
                            browser: fileName + '.js',
                            module: fileName + '.es.js',
                            'jsnext:main': fileName + '.es.js',
                            ...pkg.baseContents
                        }
                    })
            ]
        },
        {
            input,
            output: {
                file: outputs.jsES,
                format: 'es',
                exports: 'auto'
            },
            external,
            plugins: [
                stylusPlugin(),
                replace({
                    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
                }),
                commonjs({
                    extensions: ['.js']
                }),
                getBabelPlugin()
            ]
        },
        {
            input,
            output: {
                file: outputs.jsBrowser,
                format: 'umd',
                name,
                amd: {
                    define: 'rollupNeedsAnOptionToDisableAMDInUMD'
                }
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
                    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
                }),
                resolve({
                    mainFields: ['jsnext:main', 'main'],
                    browser: true,
                    preferBuiltins: true
                }),
                commonjs({
                    extensions: ['.js']
                }),
                getBabelPlugin()
            ]
        },
        {
            input,
            output: {
                file: outputs.jsBrowserMin,
                format: 'umd',
                name,
                amd: {
                    define: 'rollupNeedsAnOptionToDisableAMDInUMD'
                }
            },
            plugins: [
                stylusPlugin(),
                replace({
                    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
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
);

// Only output unminified browser bundle in development mode
if (process.env.NODE_ENV === 'development') {
    configs = [configs[2], configs[6]];
}

export default configs;
