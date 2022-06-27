const webpackCompiler = require('../../__tests_utils__/webpack-compiler');
const each = require('jest-each').default;
const glob = require('glob');

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

each(
    buildMatrix([
        packages.map((path) => path.replace('/package.json', '')),
        ['development', 'production'],
        ['require', 'import']
    ])
).test('Webpack + Chrome: %s %s %s', async (path, mode, pkg) => {
    await page.evaluate(
        await webpackCompiler(
            pkg === 'import'
                ? `import A from '${path}'; console.log(A)`
                : `const A = require('${path}'); console.log(A)`,
            {mode}
        )
    );
});
