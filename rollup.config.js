import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import path from 'path';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import json from 'rollup-plugin-json';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const bundles = [
    {
        name: 'SGN',
        input: path.join(__dirname, 'lib', 'index.js'),
        output: path.join(__dirname, 'dist', 'sgn-sdk')
    },
    {
        name: 'TjekEventsKit',
        pkg: {
            outputFolder: path.join(__dirname, 'kits', 'events'),
            baseContents: {name: '@tjek/events', version: '0.0.0-alpha.0'}
        },
        input: path.join(__dirname, 'lib', 'kits', 'events', 'index.js'),
        output: path.join(__dirname, 'kits', 'events', 'index')
    }
].map((bundle) => ({
    ...bundle,
    output: undefined,
    outputs: {
        // Exclusive bundles(external `require`s untouched), for node, webpack etc.
        jsCJS: `${bundle.output}.cjs.js`, // CommonJS
        jsES: `${bundle.output}.es.js`, // ES Module
        // Inclusive bundles(external `require`s resolved), for browsers etc.
        jsBrowser: `${bundle.output}.js`,
        jsBrowserMin: `${bundle.output}.min.js`
    }
}));

const getBabelPlugin = () =>
    babel({
        exclude: ['node_modules/**'],
        extensions: ['.js', '.jsx', '.es6', '.es', '.mjs']
    });

let configs = bundles.reduce(
    (cfgs, {name, input, outputs, pkg}) => [
        ...cfgs,
        {
            input,
            output: {
                file: outputs.jsCJS,
                format: 'cjs'
            },
            plugins: [
                json(),
                replace({
                    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
                }),
                commonjs({
                    extensions: ['.js']
                }),
                getBabelPlugin(),
                pkg &&
                    generatePackageJson({
                        baseContents: {
                            main: path.join('index') + '.cjs.js',
                            browser: path.join('index') + '.js',
                            module: path.join('index') + '.es.js',
                            'jsnext:main': path.join('index') + '.es.js',
                            ...pkg.baseContents
                        },
                        ...pkg
                    })
            ]
        },
        {
            input,
            output: {
                file: outputs.jsES,
                format: 'es'
            },
            plugins: [
                json(),
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
                name: 'SGN',
                amd: {
                    define: 'rollupNeedsAnOptionToDisableAMDInUMD'
                }
            },
            plugins: [
                json(),
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
                json(),
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
