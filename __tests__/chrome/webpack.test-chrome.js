const webpackCompiler = require('../../__tests_utils__/webpack-compiler');
const each = require('jest-each').default;

function buildMatrix(options, index = 0, results = [], current = []) {
    options[index].forEach((val) => {
        current[index] = val;
        if (index + 1 < options.length) {
            buildMatrix(options, index + 1, results, current);
        } else results.push([...current]);
    });

    return results;
}

each(
    buildMatrix([
        ['./', './kits/events'],
        ['development', 'production'],
        ['require', 'import']
    ])
).test('Webpack + Chrome: %s %s %s', async (path, mode, pkg) => {
    const code =
        pkg === 'import'
            ? `import A from '${path}'; console.log(A)`
            : `const A = require('${path}'); console.log(A)`;
    await page.evaluate(await webpackCompiler(code, {mode}));
});
