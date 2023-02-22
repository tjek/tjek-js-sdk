const webpackCompiler = require('../../__tests_utils__/webpack-compiler');
const each = require('jest-each').default;
const glob = require('glob');
const {readFile} = require('fs/promises');
const {resolve, dirname} = require('path');

function buildMatrix(options, index = 0, results = [], current = []) {
    options[index].forEach((val) => {
        current[index] = val;
        if (index + 1 < options.length) {
            buildMatrix(options, index + 1, results, current);
        } else results.push([...current]);
    });

    return results;
}

const packages = glob.sync('./dist/**/*/package.json');

each(buildMatrix([packages, ['development', 'production']])).test(
    'Webpack + Chrome: %s %s',
    async (path, mode) => {
        const packageJson = JSON.parse(await readFile(path, 'utf-8'));
        const scriptPath = resolve(dirname(path), packageJson.module);

        await page.evaluate(
            await webpackCompiler(
                `import * as A from '${scriptPath}'; console.log(A)`,
                {mode}
            )
        );
    }
);
